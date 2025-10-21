import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"
import crypto from "crypto"

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us4"
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      email,
      firstName,
      lastName,
      city,
      state,
      country,
      age,
      gender,
      phone,
      company,
      yearsExperience,
      industry,
      role, 
      challenge, 
      goal, 
      timeline 
    } = body

    // Validate required fields
    if (!email || !firstName || !lastName || !city || !state || !country || !role || !challenge || !goal || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Add or update contact in Mailchimp
    const listId = process.env.MAILCHIMP_AUDIENCE_ID!

    try {
      // Create MD5 hash of lowercase email for subscriber hash
      const subscriberHash = crypto
        .createHash('md5')
        .update(email.toLowerCase())
        .digest('hex')

      // Prepare merge fields (using standard Mailchimp fields)
      const mergeFields: any = {
        FNAME: firstName,
        LNAME: lastName,
      }

      // Add phone if provided
      if (phone) {
        mergeFields.PHONE = phone
      }

      // Prepare tags for segmentation
      const tags: string[] = []
      if (timeline) tags.push(`Timeline: ${timeline}`)
      if (yearsExperience) tags.push(`Experience: ${yearsExperience}`)
      if (industry) tags.push(`Industry: ${industry}`)
      if (gender) tags.push(`Gender: ${gender}`)

      // Create or update the subscriber
      const response = await mailchimp.lists.setListMember(
        listId,
        subscriberHash,
        {
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: mergeFields,
          tags: tags,
          // Store additional data in marketing permissions notes
          marketing_permissions: [],
        }
      )

      // Add a note with all the profile information
      try {
        const noteContent = `
Profile Information:
- Location: ${city}, ${state}, ${country}
- Age: ${age || 'Not provided'}
- Gender: ${gender || 'Not provided'}
- Company: ${company || 'Not provided'}
- Industry: ${industry || 'Not provided'}
- Years of Experience: ${yearsExperience || 'Not provided'}
- Current Role: ${role}
- Career Challenge: ${challenge}
- Career Goal: ${goal}
- Timeline: ${timeline}
        `.trim()

        await mailchimp.lists.createListMemberNote(
          listId,
          subscriberHash,
          {
            note: noteContent
          }
        )
      } catch (noteError) {
        console.log("Could not add note, but contact was created successfully")
      }

      console.log("Successfully added/updated contact in Mailchimp:", response.id)

      return NextResponse.json(
        { 
          success: true, 
          message: "Profile submitted successfully",
          contactId: response.id 
        },
        { status: 200 }
      )
    } catch (mailchimpError: any) {
      console.error("Mailchimp API error:", mailchimpError.response?.body || mailchimpError)
      
      // Return error details for debugging
      return NextResponse.json(
        { 
          error: "Failed to add contact to Mailchimp",
          details: mailchimpError.response?.body?.detail || mailchimpError.message
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Profile submission error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    )
  }
}

