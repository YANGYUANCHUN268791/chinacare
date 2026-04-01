import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set. Payment features will not work.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

// Plan prices (Stripe Price IDs - replace with your actual Price IDs after creating products in Stripe Dashboard)
export const PLAN_PRICES: Record<string, { priceId: string; name: string }> = {
  consultation: {
    priceId: process.env.STRIPE_PRICE_CONSULTATION || 'price_consultation_placeholder',
    name: 'AI Consultation Report',
  },
  'full-service': {
    priceId: process.env.STRIPE_PRICE_FULL_SERVICE || 'price_full_service_placeholder',
    name: 'Full Service Package',
  },
}

export async function createCheckoutSession(
  planId: string,
  successUrl: string,
  cancelUrl: string
) {
  const plan = PLAN_PRICES[planId]
  
  if (!plan) {
    throw new Error('Invalid plan ID')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      planId,
      planName: plan.name,
    },
  })

  return session
}
