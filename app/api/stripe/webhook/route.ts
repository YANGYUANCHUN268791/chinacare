import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { constructWebhookEvent } from '@/lib/stripe'
import { connectToDatabase } from '@/lib/db'
import Order from '@/models/Order'

/**
 * Stripe Webhook 端点
 * 
 * Stripe 在支付状态变化时会调用此接口：
 * - checkout.session.completed → 支付成功
 * - checkout.session.async_payment_failed → 异步支付失败（如银行转账）
 * 
 * 配置方法：Stripe Dashboard → Developers → Webhooks
 * → 添加端点：https://healthroute.xyz/api/stripe/webhook
 * → 选择事件：checkout.session.completed, checkout.session.async_payment_failed
 */
export async function POST(request: Request) {
  try {
    // 获取原始请求体（必须用 text()，不能 json()，因为需要验证签名）
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('Missing stripe-signature header')
      return NextResponse.json({ error: 'Missing signature / 缺少签名' }, { status: 400 })
    }

    // 验证签名并构造事件对象（确保请求确实来自 Stripe）
    let event: Stripe.Event
    try {
      event = constructWebhookEvent(body, signature)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature / 无效签名' },
        { status: 400 }
      )
    }

    // 处理不同的事件类型
    switch (event.type) {
      case 'checkout.session.completed': {
        // ✅ 支付成功！更新订单状态
        const session = event.data.object as Stripe.Checkout.Session

        console.log(`💰 Payment successful! Session: ${session.id}`)

        // 连接数据库并更新订单
        await connectToDatabase()

        const orderId = session.metadata?.order_id || session.metadata?.orderId
        
        if (orderId) {
          await Order.findOneAndUpdate(
            { orderId },
            {
              $set: {
                paymentStatus: 'paid',       // 已付款
                status: 'processing',         // 处理中
                paidAt: new Date(),           // 付款时间
                stripeSessionId: session.id,  // Stripe Session ID
                stripePaymentIntentId: session.payment_intent as string, // Payment Intent ID
              }
            }
          )
          console.log(`✅ Order ${orderId} updated to PAID`)
        } else {
          // 如果没有 order_id（可能是直接从 Dashboard 创建的），记录日志
          console.warn('No orderId in session metadata:', session.metadata)
        }

        break
      }

      case 'checkout.session.async_payment_failed': {
        // ❌ 异步支付失败（如银行转账超时）
        const session = event.data.object as Stripe.Checkout.Session
        console.error(`❌ Async payment failed! Session: ${session.id}`)

        await connectToDatabase()
        const orderId = session.metadata?.order_id || session.metadata?.orderId

        if (orderId) {
          await Order.findOneAndUpdate(
            { orderId },
            {
              $set: {
                paymentStatus: 'failed',     // 支付失败
                status: 'cancelled',         // 已取消
              }
            }
          )
        }

        break
      }

      default:
        // 忽略其他事件类型
        console.log(`Unhandled event type: ${event.type}`)
    }

    // 返回 200 给 Stripe（表示已收到，防止 Stripe 重试）
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed / Webhook 处理失败' },
      { status: 500 }
    )
  }
}
