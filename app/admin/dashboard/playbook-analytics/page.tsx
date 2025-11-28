"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, TrendingUp, DollarSign, Users, Target, CheckCircle2, XCircle, Calendar } from "lucide-react"

interface PlaybookAnalytics {
  overview: {
    totalPurchases: number
    totalPlaybook27: number
    totalExecutivePresence397: number
    totalUpsells: number
    conversionRate: number
    playbook27Revenue: number
    executivePresence397Revenue: number
    totalRevenue: number
  }
  purchaseTrends: Array<{
    date: string
    playbook27: number
    executivePresence397: number
    revenue: number
  }>
  recentPurchases: Array<{
    id: string
    email: string
    productKey: string
    productName: string
    amount: number
    isUpsell: boolean
    createdAt: string
  }>
  customerJourneys: Array<{
    email: string
    purchases: Array<{
      productKey: string
      productName: string
      amount: number
      isUpsell: boolean
      createdAt: string
    }>
    totalSpent: number
    hasUpsold: boolean
  }>
}

export default function PlaybookAnalyticsPage() {
  const { data: session, status } = useSession()
  const [analytics, setAnalytics] = useState<PlaybookAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }
  }, [status])

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/admin/playbook-analytics")
        if (!response.ok) {
          throw new Error("Failed to fetch analytics")
        }
        const data = await response.json()
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchAnalytics()
    }
  }, [status])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  if (!analytics) {
    return null
  }

  const { overview, purchaseTrends, recentPurchases, customerJourneys } = analytics

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black text-white mb-2">
            📊 Playbook Analytics
          </h1>
          <p className="text-slate-300 text-lg">
            Track all playbook purchases, upsells, and conversion metrics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Purchases */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-2xl border border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-100" />
              <span className="text-blue-100 text-sm font-bold">TOTAL</span>
            </div>
            <div className="text-4xl font-black text-white mb-2">{overview.totalPurchases}</div>
            <div className="text-blue-100 font-semibold">Total Purchases</div>
            <div className="mt-4 pt-4 border-t border-blue-500/50">
              <div className="text-sm text-blue-100">
                <div className="flex justify-between mb-1">
                  <span>$27 Playbook:</span>
                  <span className="font-bold">{overview.totalPlaybook27}</span>
                </div>
                <div className="flex justify-between">
                  <span>$397 Course:</span>
                  <span className="font-bold">{overview.totalExecutivePresence397}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-2xl border border-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10 text-emerald-100" />
              <span className="text-emerald-100 text-sm font-bold">CONVERSION</span>
            </div>
            <div className="text-4xl font-black text-white mb-2">{overview.conversionRate}%</div>
            <div className="text-emerald-100 font-semibold">Upsell Conversion Rate</div>
            <div className="mt-4 pt-4 border-t border-emerald-500/50">
              <div className="text-sm text-emerald-100">
                <div className="flex justify-between">
                  <span>Upsells:</span>
                  <span className="font-bold">{overview.totalUpsells} / {overview.totalPlaybook27}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-2xl border border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-purple-100" />
              <span className="text-purple-100 text-sm font-bold">REVENUE</span>
            </div>
            <div className="text-4xl font-black text-white mb-2">${overview.totalRevenue.toLocaleString()}</div>
            <div className="text-purple-100 font-semibold">Total Revenue</div>
            <div className="mt-4 pt-4 border-t border-purple-500/50">
              <div className="text-sm text-purple-100">
                <div className="flex justify-between mb-1">
                  <span>$27 Playbook:</span>
                  <span className="font-bold">${overview.playbook27Revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>$397 Course:</span>
                  <span className="font-bold">${overview.executivePresence397Revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 shadow-2xl border border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-orange-100" />
              <span className="text-orange-100 text-sm font-bold">AOV</span>
            </div>
            <div className="text-4xl font-black text-white mb-2">
              ${Math.round(overview.totalRevenue / overview.totalPurchases).toLocaleString()}
            </div>
            <div className="text-orange-100 font-semibold">Average Order Value</div>
            <div className="mt-4 pt-4 border-t border-orange-500/50">
              <div className="text-sm text-orange-100">
                <div className="flex justify-between">
                  <span>Per Customer</span>
                  <span className="font-bold">${Math.round(overview.totalRevenue / overview.totalPurchases)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Trends Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-blue-400" />
            Purchase Trends (Last 30 Days)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-bold">Date</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-bold">$27 Playbook</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-bold">$397 Course</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-bold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {purchaseTrends.slice().reverse().map((trend, index) => (
                  <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4 text-slate-300 font-semibold">
                      {new Date(trend.date).toLocaleDateString()}
                    </td>
                    <td className="text-center py-3 px-4 text-blue-400 font-bold">{trend.playbook27}</td>
                    <td className="text-center py-3 px-4 text-emerald-400 font-bold">{trend.executivePresence397}</td>
                    <td className="text-right py-3 px-4 text-purple-400 font-bold">
                      ${trend.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            Recent Purchases
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-bold">Email</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-bold">Product</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-bold">Amount</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-bold">Upsell?</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4 text-slate-300 font-semibold">{purchase.email}</td>
                    <td className="py-3 px-4 text-slate-300">{purchase.productName}</td>
                    <td className="text-center py-3 px-4 text-emerald-400 font-bold">${purchase.amount}</td>
                    <td className="text-center py-3 px-4">
                      {purchase.isUpsell ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold text-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          YES
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-600/50 text-slate-400 px-3 py-1 rounded-full font-bold text-xs">
                          <XCircle className="w-3 h-3" />
                          NO
                        </span>
                      )}
                    </td>
                    <td className="text-right py-3 px-4 text-slate-400 font-semibold">
                      {new Date(purchase.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Journeys */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-blue-400" />
            Customer Journeys
          </h2>
          <div className="space-y-4">
            {customerJourneys.map((journey, index) => (
              <div
                key={index}
                className={`bg-slate-700/50 border-2 rounded-xl p-5 ${
                  journey.hasUpsold ? "border-emerald-500" : "border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white font-bold text-lg">{journey.email}</div>
                    <div className="text-slate-400 text-sm">
                      {journey.purchases.length} purchase{journey.purchases.length > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400">${journey.totalSpent.toLocaleString()}</div>
                    <div className="text-slate-400 text-sm">Total Spent</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {journey.purchases.map((purchase, pIndex) => (
                    <div
                      key={pIndex}
                      className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${purchase.isUpsell ? "bg-emerald-400" : "bg-blue-400"}`}></div>
                        <div>
                          <div className="text-white font-semibold">{purchase.productName}</div>
                          <div className="text-slate-400 text-xs">
                            {new Date(purchase.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-emerald-400 font-bold">${purchase.amount}</div>
                    </div>
                  ))}
                </div>
                {journey.hasUpsold && (
                  <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Successfully Upsold to Complete Course!
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
