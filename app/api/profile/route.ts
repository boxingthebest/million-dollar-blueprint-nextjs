import { NextRequest, NextResponse } from "next/server"

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

    // TODO: Save profile data to your database here
    // For now, just return success
    console.log("Profile data received:", { email, firstName, lastName, city, state, country })

    return NextResponse.json(
      { 
        success: true, 
        message: "Profile submitted successfully"
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Profile submission error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    )
  }
}

