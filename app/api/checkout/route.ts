import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { connectToDatabase } from '@/lib/db'
import Order from '@/models/Order'

const PLANS: Record<string, { name: string; nameZh: string; amount: number }> = {
  consultation: { name: 'AI Consultation Report', nameZh: 'AI 咨询报告', amount: 4900 },
  'full-service': { name: 'Full Service Package', nameZh: '全程陪诊服务', amount: 29900 },
}

function generateOrderId(): string {
  const prefix = 'HC'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = randomUUID().slice(0, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { planId, firstName, lastName, email, phone, country, conditionDescription } = body

    // Validate plan
    const plan = PLANS[planId]
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 })
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !country) {
      return NextResponse.json(
        { error: 'First name, last name, email, and country are required' },
        { status: 400 }
      )
    }

    // Check for duplicate (same email + plan within 5 minutes)
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
    const existing = await Order.findOne({
      email,
      planId,
      createdAt: { $gte: fiveMinAgo },
      paymentStatus: 'paid',
    })
    if (existing) {
      return NextResponse.json(
        { error: 'You already purchased this plan. Please check your email.' },
        { status: 400 }
      )
    }

    // Create order
    const orderId = generateOrderId()
    const cardLast4 = Math.floor(1000 + Math.random() * 9000).toString() // simulated card

    const order = await Order.create({
      orderId,
      planId,
      planName: plan.name,
      amount: plan.amount,
      firstName,
      lastName,
      email,
      phone,
      country,
      conditionDescription: conditionDescription || '',
      paymentMethod: 'simulated',
      paymentStatus: 'paid',
      paidAt: new Date(),
      cardLast4,
      status: 'processing',
    })

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      amount: plan.amount,
      currency: 'USD',
      planName: plan.name,
      planNameZh: plan.nameZh,
      message: 'Simulated payment successful',
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}
