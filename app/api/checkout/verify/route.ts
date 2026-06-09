import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Order from '@/models/Order'
import { getStripe } from '@/lib/stripe'

/**
 * 支付验证 API
 * 
 * 两种验证方式：
 * 1. 通过 orderId 查询数据库（模拟支付 / Webhook 已更新后）
 * 2. 通过 sessionId 调用 Stripe API 实时查询（Stripe 真实支付）
 */
export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { orderId, sessionId } = body

    // 方式 1：通过 Session ID 向 Stripe API 查询实时状态
    if (sessionId) {
      try {
        const stripe = getStripe()
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === 'paid') {
          // 同时尝试用 metadata 中的信息更新/查找订单
          const metaOrderId = session.metadata?.order_id || session.metadata?.orderId

          if (metaOrderId) {
            // 更新订单为已付款（幂等操作，重复调用不会出错）
            await Order.findOneAndUpdate(
              { orderId: metaOrderId },
              {
                $set: {
                  paymentStatus: 'paid',
                  status: 'processing',
                  paidAt: new Date(),
                  stripeSessionId: session.id,
                  stripePaymentIntentId: (session.payment_intent as string) || '',
                }
              }
            )
          }

          return NextResponse.json({
            success: true,
            paymentStatus: 'paid',
            sessionId: session.id,
            customerEmail: session.customer_email,
            amountTotal: session.amount_total,
            currency: session.currency,
            orderId: metaOrderId || null,
          })
        } else {
          return NextResponse.json(
            { error: 'Payment not completed / 支付未完成', paymentStatus: session.payment_status },
            { status: 400 }
          )
        }
      } catch (stripeError) {
        console.error('Stripe API error:', stripeError)
        // Stripe API 调用失败，降级到数据库查询
      }
    }

    // 方式 2：通过订单号查询数据库
    if (orderId) {
      const order = await Order.findOne({ orderId })

      if (!order) {
        return NextResponse.json({ error: 'Order not found / 订单不存在' }, { status: 404 })
      }

      if (order.paymentStatus === 'paid') {
        return NextResponse.json({
          success: true,
          orderId: order.orderId,
          planName: order.planName,
          amount: order.amount,
          currency: order.currency,
          customerEmail: order.email,
          paidAt: order.paidAt,
          paymentStatus: 'paid',
        })
      }

      return NextResponse.json(
        { error: `Payment status: ${order.paymentStatus} / 支付状态: ${order.paymentStatus}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Order ID or Session ID is required / 需要提供订单号或会话 ID' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment / 验证支付失败' },
      { status: 500 }
    )
  }
}
