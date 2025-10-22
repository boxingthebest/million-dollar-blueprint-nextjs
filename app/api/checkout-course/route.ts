import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    // Get course slug from query params
    const searchParams = request.nextUrl.searchParams
    const courseSlug = searchParams.get('courseSlug') || 'ai-resistant-skills-paid'

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      )
    }

    // Initialize Stripe client
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
    })

    // Course pricing - map course slug to product details
    const courseProducts: Record<string, { name: string; price: number; description: string; productKey: string }> = {
      'ai-resistant-skills-paid': {
        name: 'AI-Resistant Skills: Future-Proof Your Career',
        price: 19700, // $197.00 in cents
        description: 'Master the 5 human skills AI will never replicate with proprietary frameworks from Fortune 100 executives.',
        productKey: 'ai-resistant-skills'
      }
    }

    const product = courseProducts[courseSlug]
    
    if (!product) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'https://milliondollarblueprint.ai'

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
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
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&courseSlug=${courseSlug}`,
      cancel_url: `${origin}/courses/ai-resistant-skills`,
      metadata: {
        productType: 'course',
        productKey: product.productKey,
        courseSlug: courseSlug,
        userEmail: session.user.email,
      },
    })

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

