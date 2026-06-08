import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Order from '@/models/Order'

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const order = await Order.findOne({ orderId })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
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
