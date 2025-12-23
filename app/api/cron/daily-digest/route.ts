import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDailyLeadDigest } from "@/lib/email";

// This endpoint can be called by a cron job service (e.g., Vercel Cron, GitHub Actions)
// Recommended schedule: Daily at 9 PM EST

export async function GET(req: NextRequest) {
  try {
    // Verify cron secret for security (optional but recommended)
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get leads captured today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todaysLeads = await prisma.newsletterSubscriber.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        email: true,
        createdAt: true,
      },
    });

    // Send daily digest
    const result = await sendDailyLeadDigest(todaysLeads);

    if (result.skipped) {
      return NextResponse.json({ 
        success: true, 
        message: "No new leads today, digest skipped",
        leadsCount: 0,
      });
    }

    return NextResponse.json({ 
      success: result.success, 
      message: result.success ? "Daily digest sent successfully" : "Failed to send digest",
      leadsCount: todaysLeads.length,
    });
  } catch (error) {
    console.error("Daily digest cron error:", error);
    return NextResponse.json(
      { error: "Failed to process daily digest" },
      { status: 500 }
    );
  }
}

// Also support POST for flexibility
export async function POST(req: NextRequest) {
  return GET(req);
}
