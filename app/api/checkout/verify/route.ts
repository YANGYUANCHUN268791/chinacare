import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Here you would typically:
      // 1. Create a user account
      // 2. Send confirmation email
      // 3. Add to your database
      
      return NextResponse.json({ 
        success: true, 
        customerEmail: session.customer_email,
        planId: session.metadata?.planId 
      })
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}