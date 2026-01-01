export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

export async function GET(request: NextRequest) {
  try {
    // Check if user is logged in (optional - works for both logged in and guest)
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      )
    }

    // Initialize Stripe client
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })

    // Course details
    const product = {
      name: 'Make Your First $1K with AI',
      price: 4700, // $47.00 in cents
      description: 'A step-by-step system to make your first $1,000 using AI tools like ChatGPT. Includes 6 video modules + bonus content.',
      productKey: 'make-first-1k-ai'
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'https://www.milliondollarblueprint.ai'

    // Create Stripe checkout session
    const checkoutSessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&course=make-first-1k-ai`,
      cancel_url: `${origin}/courses/make-first-1k-ai`,
      metadata: {
        productType: 'course',
        productKey: product.productKey,
        courseSlug: 'make-first-1k-ai',
      },
    }

    // If user is logged in, pre-fill their email
    if (userEmail) {
      checkoutSessionConfig.customer_email = userEmail
      checkoutSessionConfig.metadata!.userEmail = userEmail
    }

    const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionConfig)

    // Redirect to Stripe checkout
    return NextResponse.redirect(checkoutSession.url!)
    
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// POST endpoint for programmatic access
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { email } = body

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })

    const product = {
      name: 'Make Your First $1K with AI',
      price: 4700,
      description: 'A step-by-step system to make your first $1,000 using AI tools like ChatGPT. Includes 6 video modules + bonus content.',
      productKey: 'make-first-1k-ai'
    }

    const origin = process.env.NEXTAUTH_URL || 'https://www.milliondollarblueprint.ai'

    const checkoutSessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&course=make-first-1k-ai`,
      cancel_url: `${origin}/courses/make-first-1k-ai`,
      metadata: {
        productType: 'course',
        productKey: product.productKey,
        courseSlug: 'make-first-1k-ai',
      },
    }

    if (email) {
      checkoutSessionConfig.customer_email = email
      checkoutSessionConfig.metadata!.userEmail = email
    }

    const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionConfig)

    return NextResponse.json({ 
      url: checkoutSession.url,
      sessionId: checkoutSession.id 
    })
    
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
