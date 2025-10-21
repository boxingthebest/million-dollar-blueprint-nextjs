import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message)
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Get customer email
        const customerEmail = session.customer_email || session.customer_details?.email

        if (!customerEmail) {
          console.error("No customer email found in session")
          break
        }

        // Get product metadata
        const metadata = session.metadata
        if (!metadata?.productKey) {
          console.error("No product key in metadata")
          break
        }

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: customerEmail },
        })

        if (!user) {
          // Create user if they don't exist
          user = await prisma.user.create({
            data: {
              email: customerEmail,
              name: session.customer_details?.name || customerEmail.split("@")[0],
            },
          })
        }

        // Map product key to course slug
        const courseSlugMap: Record<string, string> = {
          "ai-resistant-skills": "ai-resistant-skills",
          "leadership": "leadership",
          "marketing": "marketing",
          "sales": "sales",
          "wealth": "wealth",
          "wellness": "wellness",
        }

        const courseSlug = courseSlugMap[metadata.productKey]

        if (!courseSlug) {
          console.error("Unknown product key:", metadata.productKey)
          break
        }

        // Find course
        const course = await prisma.course.findUnique({
          where: { slug: courseSlug },
        })

        if (!course) {
          console.error("Course not found:", courseSlug)
          break
        }

        // Create enrollment if it doesn't exist
        await prisma.enrollment.upsert({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
          update: {},
          create: {
            userId: user.id,
            courseId: course.id,
          },
        })

        console.log(`Enrolled user ${customerEmail} in course ${course.title}`)
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("PaymentIntent succeeded:", paymentIntent.id)
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error("PaymentIntent failed:", paymentIntent.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

