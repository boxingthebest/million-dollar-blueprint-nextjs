import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get all playbook purchases
    const allPurchases = await prisma.purchase.findMany({
      where: {
        productType: "playbook",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // Limit to recent 100 purchases
    })

    // Get playbook27 purchases
    const playbook27Purchases = await prisma.purchase.findMany({
      where: {
        productKey: "playbook27",
      },
    })

    // Get executivePresence397 purchases
    const executivePresence397Purchases = await prisma.purchase.findMany({
      where: {
        productKey: "executivePresence397",
      },
    })

    // Calculate conversion rate
    const totalPlaybook27 = playbook27Purchases.length
    const totalUpsells = executivePresence397Purchases.filter(p => p.isUpsell).length
    const conversionRate = totalPlaybook27 > 0 ? (totalUpsells / totalPlaybook27) * 100 : 0

    // Calculate revenue
    const playbook27Revenue = playbook27Purchases.reduce((sum, p) => sum + p.amount, 0)
    const executivePresence397Revenue = executivePresence397Purchases.reduce((sum, p) => sum + p.amount, 0)
    const totalRevenue = playbook27Revenue + executivePresence397Revenue

    // Get purchases by day for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentPurchases = await prisma.purchase.findMany({
      where: {
        productType: "playbook",
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Group by date
    const purchasesByDate: Record<string, { playbook27: number; executivePresence397: number; revenue: number }> = {}
    
    recentPurchases.forEach(purchase => {
      const date = purchase.createdAt.toISOString().split('T')[0]
      if (!purchasesByDate[date]) {
        purchasesByDate[date] = { playbook27: 0, executivePresence397: 0, revenue: 0 }
      }
      
      if (purchase.productKey === "playbook27") {
        purchasesByDate[date].playbook27++
      } else if (purchase.productKey === "executivePresence397") {
        purchasesByDate[date].executivePresence397++
      }
      
      purchasesByDate[date].revenue += purchase.amount
    })

    // Convert to array for charts
    const purchaseTrends = Object.entries(purchasesByDate).map(([date, data]) => ({
      date,
      playbook27: data.playbook27,
      executivePresence397: data.executivePresence397,
      revenue: data.revenue / 100, // Convert cents to dollars
    }))

    // Get customer journey data (who bought what)
    const customerJourneys = await prisma.purchase.findMany({
      where: {
        productType: "playbook",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    })

    // Group by email to see customer journey
    const journeyByEmail: Record<string, any[]> = {}
    customerJourneys.forEach(purchase => {
      if (!journeyByEmail[purchase.email]) {
        journeyByEmail[purchase.email] = []
      }
      journeyByEmail[purchase.email].push({
        productKey: purchase.productKey,
        productName: purchase.productName,
        amount: purchase.amount / 100,
        isUpsell: purchase.isUpsell,
        createdAt: purchase.createdAt,
      })
    })

    // Convert to array and sort by most recent
    const customerJourneyList = Object.entries(journeyByEmail).map(([email, purchases]) => ({
      email,
      purchases: purchases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      totalSpent: purchases.reduce((sum, p) => sum + p.amount, 0),
      hasUpsold: purchases.some(p => p.isUpsell),
    }))

    return NextResponse.json({
      overview: {
        totalPurchases: allPurchases.length,
        totalPlaybook27: totalPlaybook27,
        totalExecutivePresence397: executivePresence397Purchases.length,
        totalUpsells: totalUpsells,
        conversionRate: Math.round(conversionRate * 100) / 100,
        playbook27Revenue: playbook27Revenue / 100,
        executivePresence397Revenue: executivePresence397Revenue / 100,
        totalRevenue: totalRevenue / 100,
      },
      purchaseTrends,
      recentPurchases: allPurchases.slice(0, 20).map(p => ({
        id: p.id,
        email: p.email,
        productKey: p.productKey,
        productName: p.productName,
        amount: p.amount / 100,
        isUpsell: p.isUpsell,
        createdAt: p.createdAt,
      })),
      customerJourneys: customerJourneyList.slice(0, 20),
    })
  } catch (error) {
    console.error("Playbook analytics error:", error)
    return NextResponse.json(
      { error: "Failed to fetch playbook analytics" },
      { status: 500 }
    )
  }
}
