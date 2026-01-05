export const dynamic = "force-dynamic"
// Force env var reload - updated webhook secret 2025-11-28

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import { getWelcomeEmailHTML, getWelcomeEmailText } from "@/lib/email-templates"
import nodemailer from "nodemailer"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      )
    }

    // Initialize Stripe inside the handler
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    })

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

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
        console.log("Webhook received for session:", session.id)

        // Get customer email
        const customerEmail = session.customer_email || session.customer_details?.email
        console.log("Customer email:", customerEmail)

        if (!customerEmail) {
          console.error("No customer email found in session")
          break
        }

        // Get product metadata
        const metadata = session.metadata
        console.log("Session metadata:", JSON.stringify(metadata))
        
        // Support both 'course' (new standard) and 'productKey' (legacy)
        const productKey = metadata?.course || metadata?.productKey
        
        if (!productKey) {
          console.error("No course or productKey in metadata. Full metadata:", JSON.stringify(metadata))
          break
        }
        console.log("Product key identified:", productKey)

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
              emailVerified: new Date(), // Auto-verify email for paid users
            },
          })
        } else if (!user.emailVerified) {
          // Auto-verify existing users who purchase
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          })
        }

        // Map product key to course slugs (bundles return array, single courses return single slug)
        const productToCourses: Record<string, string[]> = {
          // --- BUNDLES ---
          "bundle-flagship": ["get-paid-train-ai", "make-first-1k-ai"],
          "bundle-professional": ["get-paid-train-ai", "make-first-1k-ai", "ai-side-hustle", "ai-resistant-skills", "executive-presence", "sales", "leadership", "marketing", "wealth", "wellness"],
          "bundle-vip": ["get-paid-train-ai", "make-first-1k-ai", "ai-side-hustle", "ai-resistant-skills", "executive-presence", "sales", "leadership", "marketing", "wealth", "wellness"],
          
          // --- INDIVIDUAL COURSES ---
          "get-paid-train-ai": ["get-paid-train-ai"],
          "make-first-1k-ai": ["make-first-1k-ai"],
          "ai-side-hustle": ["ai-side-hustle"],
          "ai-resistant-skills": ["ai-resistant-skills"],
          "executive-presence": ["executive-presence"],
          "sales": ["sales"],
          "leadership": ["leadership"],
          "marketing": ["marketing"],
          "wealth": ["wealth"],
          "wellness": ["wellness"],

          // --- LEGACY SUPPORT ---
          "starter-bundle": ["ai-resistant-skills", "executive-presence"],
          "complete-mastery-bundle": ["get-paid-train-ai", "make-first-1k-ai", "ai-side-hustle", "ai-resistant-skills", "executive-presence", "sales", "leadership", "marketing", "wealth", "wellness"],
          "sales-mastery": ["sales"],
          "executive-energy-system": ["wellness"],
          "playbook27": ["executive-presence"],
          "executivePresence397": ["executive-presence"]
        }

        const courseSlugs = productToCourses[productKey]

        if (!courseSlugs) {
          console.error("Unknown product key:", metadata.productKey)
          break
        }

        // PURCHASE TRACKING TEMPORARILY DISABLED - Will be enabled after migration
        // Record the purchase (wrapped in try-catch for graceful degradation)
        // try {
        //   const productNames: Record<string, string> = {
        //     "playbook27": "Executive Presence Playbook ($27)",
        //     "executivePresence397": "Executive Presence Complete Course ($397)",
        //     "starter-bundle": "Starter Bundle",
        //     "complete-mastery-bundle": "Complete Mastery Bundle",
        //     "ai-resistant-skills": "AI-Resistant Skills",
        //     "executive-energy-system": "Executive Energy System",
        //     "sales-mastery": "Sales Mastery",
        //     "leadership": "Leadership",
        //     "marketing": "Marketing",
        //     "wealth": "Wealth",
        //   }
        //
        //   const isPlaybookUpsell = metadata.productKey === "executivePresence397"
        //   let originalPurchaseId: string | undefined
        //
        //   // If this is an upsell, find the original playbook purchase
        //   if (isPlaybookUpsell) {
        //     const originalPurchase = await prisma.purchase.findFirst({
        //       where: {
        //         email: customerEmail,
        //         productKey: "playbook27",
        //       },
        //       orderBy: {
        //         createdAt: "desc",
        //       },
        //     })
        //     originalPurchaseId = originalPurchase?.id
        //   }
        //
        //   // Create purchase record
        //   await prisma.purchase.create({
        //     data: {
        //       email: customerEmail,
        //       userId: user.id,
        //       productType: metadata.productKey.startsWith("playbook") || metadata.productKey.startsWith("executivePresence") ? "playbook" : "course",
        //       productKey: metadata.productKey,
        //       productName: productNames[metadata.productKey] || metadata.productKey,
        //       amount: session.amount_total || 0,
        //       currency: session.currency || "usd",
        //       stripeSessionId: session.id,
        //       stripePaymentId: session.payment_intent as string | undefined,
        //       status: "completed",
        //       isUpsell: isPlaybookUpsell,
        //       originalPurchaseId: originalPurchaseId,
        //       metadata: {
        //         customerName: session.customer_details?.name,
        //         lineItems: session.line_items,
        //       },
        //     },
        //   })
        //   console.log(`Recorded purchase for ${customerEmail}: ${metadata.productKey}`)
        // } catch (purchaseError) {
        //   // Purchase table may not exist yet - log but don't fail the webhook
        //   console.error("Failed to record purchase (table may not exist yet):", purchaseError)
        // }

        // Enroll user in all courses for this product
        for (const courseSlug of courseSlugs) {
          const course = await prisma.course.findUnique({
            where: { slug: courseSlug },
          })

          if (!course) {
            console.error("Course not found:", courseSlug)
            continue
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
        }

        // Generate password reset token for new users
        try {
          // Delete any existing reset tokens
          await prisma.passwordResetToken.deleteMany({
            where: { email: customerEmail },
          })

          // Generate reset token
          const resetToken = crypto.randomBytes(32).toString("hex")
          const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex")

          // Create reset token in database (expires in 24 hours for new users)
          await prisma.passwordResetToken.create({
            data: {
              email: customerEmail,
              token: hashedToken,
              expires: new Date(Date.now() + 86400000), // 24 hours
            },
          })

          // Create password setup URL
          const setupUrl = `${process.env.NEXTAUTH_URL || "https://www.milliondollarblueprint.ai"}/auth/reset-password?token=${resetToken}`

          // Send welcome email with password setup link
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          })

          await transporter.sendMail({
            from: `${process.env.SMTP_FROM_NAME || "Million Dollar Blueprint"} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: "Welcome to Million Dollar Blueprint! 🎉",
            html: getWelcomeEmailHTML(user.name || customerEmail.split("@")[0], setupUrl),
            text: getWelcomeEmailText(user.name || customerEmail.split("@")[0], setupUrl),
          })
          console.log(`Sent welcome email with password setup link to ${customerEmail}`)
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError)
          // Don't break the webhook if email fails
        }
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

