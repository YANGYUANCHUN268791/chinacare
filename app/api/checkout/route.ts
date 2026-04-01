import { NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { planId } = body

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://healthroute.xyz'
    const successUrl = `${baseUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/pricing?canceled=true`

    const session = await createCheckoutSession(planId, successUrl, cancelUrl)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
