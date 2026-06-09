import Stripe from 'stripe'

// Stripe 客户端单例（Singleton，全局只创建一次）
let _stripe: Stripe | null = null

/**
 * 获取 Stripe 客户端实例
 * 必须设置 STRIPE_SECRET_KEY 环境变量
 */
export function getStripe(): Stripe {
  if (!_stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY 环境变量未设置')
    }
    _stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20', // API 版本（固定）
      typescript: true,
    })
  }
  return _stripe
}

/**
 * 服务方案定义
 * priceId 需要在 Stripe Dashboard 创建产品后填入
 * 测试阶段先用固定金额创建 Checkout Session
 */
export const PLANS: Record<string, {
  name: string
  nameZh: string
  amount: number // 单位：分（cents），4900 = $49.00
  currency: string
}> = {
  consultation: {
    name: 'AI Consultation Report',
    nameZh: 'AI 咨询报告',
    amount: 4900, // $49.00
    currency: 'usd',
  },
  'full-service': {
    name: 'Full Service Package',
    nameZh: '全程陪诊服务',
    amount: 29900, // $299.00
    currency: 'usd',
  },
}

/**
 * 创建 Stripe Checkout Session（结账会话）
 * 用户会被重定向到 Stripe 托管的支付页面
 */
export async function createCheckoutSession(params: {
  planId: string
  customerEmail: string
  firstName: string
  lastName: string
  phone?: string
  country: string
  conditionDescription?: string
  successUrl: string
  cancelUrl: string
}) {
  const { planId, customerEmail, firstName, lastName, phone, country, conditionDescription, successUrl, cancelUrl } = params

  const plan = PLANS[planId]
  if (!plan) {
    throw new Error(`无效的方案 ID: ${planId}`)
  }

  const stripe = getStripe()

  // 创建 Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // 支持信用卡支付
    mode: 'payment', // 一次性付款（非订阅）
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: plan.currency,
          product_data: {
            name: `${plan.name} - ${plan.nameZh}`,
            description: `ChinaCare Medical Tourism - ${plan.name}`,
          },
          unit_amount: plan.amount,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl, // 支付成功后跳转
    cancel_url: cancelUrl,   // 取消支付后跳转
    metadata: {
      // 将用户信息存入 metadata，webhook 可读取
      planId,
      planName: plan.name,
      planNameZh: plan.nameZh,
      firstName,
      lastName,
      phone: phone || '',
      country,
      conditionDescription: conditionDescription || '',
    },
    // 自定义文字（多语言支持）
    custom_text: {
      submit: {
        message: country === 'CN' || country === 'China'
          ? '您正在通过安全的 Stripe 支付页面完成付款。'
          : 'You are completing payment through secure Stripe checkout.',
      },
    },
  })

  return session
}

/**
 * 验证 Webhook 签名（确保请求来自 Stripe）
 */
export function constructWebhookEvent(
  body: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET 环境变量未设置')
  }
  return getStripe().webhooks.constructEvent(body, signature, webhookSecret)
}
