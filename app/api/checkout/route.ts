import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Order from '@/models/Order'
import { createCheckoutSession, PLANS } from '@/lib/stripe'
import { randomUUID } from 'crypto'

/**
 * 生成唯一订单号
 * 格式：HC-时间戳-随机字符
 */
function generateOrderId(): string {
  const prefix = 'HC'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = randomUUID().slice(0, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export async function POST(request: Request) {
  console.log('[CHECKOUT] POST received')
  try {
    // 连接数据库
    await connectToDatabase()

    // 解析请求体
    const body = await request.json()
    console.log('[CHECKOUT] body parsed:', Object.keys(body))
    const { planId, firstName, lastName, email, phone, country, conditionDescription } = body

    // 验证方案 ID
    const plan = PLANS[planId]
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan ID / 无效的方案 ID' },
        { status: 400 }
      )
    }

    // 验证必填字段
    if (!firstName || !lastName || !email || !country) {
      return NextResponse.json(
        { error: 'First name, last name, email, and country are required / 名、姓、邮箱和国家为必填项' },
        { status: 400 }
      )
    }

    // 检查重复订单（同一邮箱 + 同一方案，5 分钟内已付款）
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
    const existing = await Order.findOne({
      email,
      planId,
      createdAt: { $gte: fiveMinAgo },
      paymentStatus: 'paid',
    })
    if (existing) {
      return NextResponse.json(
        { error: 'You already purchased this plan. Please check your email. / 您已购买此方案，请查看邮箱。' },
        { status: 400 }
      )
    }

    // 生成订单号
    const orderId = generateOrderId()

    // 在数据库中创建「待支付」订单记录
    await Order.create({
      orderId,
      planId,
      planName: plan.name,
      amount: plan.amount,
      currency: plan.currency.toUpperCase(),
      firstName,
      lastName,
      email,
      phone: phone || '',
      country,
      conditionDescription: conditionDescription || '',
      paymentMethod: 'stripe',
      paymentStatus: 'pending', // 待支付（等待 Stripe Webhook 确认）
      status: 'pending',
    })

    // 构建成功/取消跳转 URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://healthroute.xyz'
    const locale = body.locale || 'en' // 从前端传入当前语言

    const successUrl = `${baseUrl}/${locale}/pricing/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`
    const cancelUrl = `${baseUrl}/${locale}/pricing?canceled=true`

    // 调用 Stripe 创建 Checkout Session
    const session = await createCheckoutSession({
      planId,
      customerEmail: email,
      firstName,
      lastName,
      phone: phone || '',
      country,
      conditionDescription: conditionDescription || '',
      successUrl,
      cancelUrl,
    })

    // 返回 Stripe Checkout URL 给前端跳转
    return NextResponse.json({
      success: true,
      url: session.url,       // Stripe 支付页面 URL（前端用这个跳转）
      sessionId: session.id,  // Session ID（用于后续查询）
      orderId,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    
    // 友好的错误信息
    const message = error instanceof Error ? error.message : 'Payment failed / 支付失败'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
