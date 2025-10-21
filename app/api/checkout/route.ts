import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { STRIPE_PRODUCTS } from '@/lib/stripe-products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export async function POST(request: NextRequest) {
  try {
    const { productType, productKey, successUrl, cancelUrl } = await request.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      )
    }

    // Get product details
    let product
    if (productType === 'course') {
      product = STRIPE_PRODUCTS.courses[productKey as keyof typeof STRIPE_PRODUCTS.courses]
    } else if (productType === 'bundle') {
      product = STRIPE_PRODUCTS.bundles[productKey as keyof typeof STRIPE_PRODUCTS.bundles]
    } else if (productType === 'subscription') {
      product = STRIPE_PRODUCTS.subscriptions[productKey as keyof typeof STRIPE_PRODUCTS.subscriptions]
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
            ...(productType === 'subscription' && {
              recurring: {
                interval: (product as any).interval,
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: productType === 'subscription' ? 'subscription' : 'payment',
      success_url: successUrl || `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.headers.get('origin')}/checkout/cancel`,
      metadata: {
        productType,
        productKey,
        productId: product.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

