import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { neon } from "@neondatabase/serverless"
import { DashboardClient } from "./dashboard-client"

const VALID_SESSION = "rf_admin_session_2024_punk"
const OWNER_TELEGRAM_ID = process.env.ADMIN_USER_IDS?.split(",")[0] || ""

const defaultStats = {
  total: 0,
  sold: 0,
  revenue: 0,
  todayLeads: 0,
  todaySold: 0,
  todayRevenue: 0,
  todayPending: 0,
  todayPotential: 0,
  weekLeads: 0,
  weekSold: 0,
  weekRevenue: 0,
  weekPending: 0,
  weekPotential: 0,
  recentLeads: [] as any[],
  byService: [] as any[],
  funnelStats: [] as any[],
  partners: 0,
  partnersList: [] as any[],
  ownerTelegramId: OWNER_TELEGRAM_ID,
  conversionRate: "0",
  incompleteChats: [] as any[],
  dateRange: "all",
}

async function getStats(dateRange?: string) {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!)

    let stats: any = {}
    let recentLeads: any[] = []
    let partnersList: any[] = []

    // Query 1: Stats (single consolidated query)
    try {
      const statsResult = await sql`
        WITH stats AS (
          SELECT 
            COUNT(*) as total_all,
            COUNT(*) FILTER (WHERE status IN ('accepted', 'paid', 'sold')) as sold_all,
            COALESCE(SUM(lead_price) FILTER (WHERE status IN ('accepted', 'paid', 'sold')), 0) as revenue_all,
            COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE) as total_today,
            COUNT(*) FILTER (WHERE status IN ('accepted', 'paid', 'sold') AND DATE(created_at) = CURRENT_DATE) as sold_today,
            COALESCE(SUM(lead_price) FILTER (WHERE status IN ('accepted', 'paid', 'sold') AND DATE(created_at) = CURRENT_DATE), 0) as revenue_today,
            COUNT(*) FILTER (WHERE status = 'pending' AND DATE(created_at) = CURRENT_DATE) as pending_today,
            COALESCE(SUM(lead_price) FILTER (WHERE status = 'pending' AND DATE(created_at) = CURRENT_DATE), 0) as potential_today,
            COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as total_week,
            COUNT(*) FILTER (WHERE status IN ('accepted', 'paid', 'sold') AND created_at >= NOW() - INTERVAL '7 days') as sold_week,
            COALESCE(SUM(lead_price) FILTER (WHERE status IN ('accepted', 'paid', 'sold') AND created_at >= NOW() - INTERVAL '7 days'), 0) as revenue_week,
            COUNT(*) FILTER (WHERE status = 'pending' AND created_at >= NOW() - INTERVAL '7 days') as pending_week,
            COALESCE(SUM(lead_price) FILTER (WHERE status = 'pending' AND created_at >= NOW() - INTERVAL '7 days'), 0) as potential_week
          FROM leads
        ),
        partner_count AS (
          SELECT COUNT(*) as count FROM partners WHERE active = true
        )
        SELECT s.*, p.count as partners_count FROM stats s, partner_count p
      `
      stats = statsResult[0] || {}
    } catch {
      stats = {}
    }

    // Small delay between queries
    await new Promise((r) => setTimeout(r, 50))

    // Query 2: Get leads based on date range
    try {
      if (dateRange === "today") {
        recentLeads =
          await sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, service_time, created_at, commission, amount_charged, client_cost, notes, source FROM leads WHERE DATE(created_at) = CURRENT_DATE ORDER BY created_at DESC LIMIT 100`
      } else if (dateRange === "yesterday") {
        recentLeads =
          await sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, service_time, created_at, commission, amount_charged, client_cost, notes, source FROM leads WHERE DATE(created_at) = CURRENT_DATE - 1 ORDER BY created_at DESC LIMIT 100`
      } else if (dateRange === "week") {
        recentLeads =
          await sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, service_time, created_at, commission, amount_charged, client_cost, notes, source FROM leads WHERE created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 100`
      } else if (dateRange === "month") {
        recentLeads =
          await sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, service_time, created_at, commission, amount_charged, client_cost, notes, source FROM leads WHERE created_at >= NOW() - INTERVAL '30 days' ORDER BY created_at DESC LIMIT 100`
      } else {
        recentLeads =
          await sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, service_time, created_at, commission, amount_charged, client_cost, notes, source FROM leads ORDER BY created_at DESC LIMIT 100`
      }
    } catch {
      recentLeads = []
    }

    // Small delay
    await new Promise((r) => setTimeout(r, 50))

    // Query 3: Get partners
    try {
      partnersList = await sql`
        SELECT 
          p.id, p.name, p.phone, p.telegram_chat_id, p.services, p.cities, p.active, p.created_at, p.total_leads_accepted, p.balance_euros,
          COUNT(l.id) as leads_bought,
          COALESCE(SUM(l.lead_price), 0) as total_spent
        FROM partners p
        LEFT JOIN leads l ON l.partner_id = p.id AND l.status IN ('accepted', 'paid', 'sold')
        GROUP BY p.id, p.name, p.phone, p.telegram_chat_id, p.services, p.cities, p.active, p.created_at, p.total_leads_accepted, p.balance_euros
        ORDER BY p.created_at DESC
      `
    } catch {
      partnersList = []
    }

    const total = Number(stats.total_all || 0)
    const sold = Number(stats.sold_all || 0)

    return {
      total,
      sold,
      revenue: Number(stats.revenue_all || 0),
      todayLeads: Number(stats.total_today || 0),
      todaySold: Number(stats.sold_today || 0),
      todayRevenue: Number(stats.revenue_today || 0),
      todayPending: Number(stats.pending_today || 0),
      todayPotential: Number(stats.potential_today || 0),
      weekLeads: Number(stats.total_week || 0),
      weekSold: Number(stats.sold_week || 0),
      weekRevenue: Number(stats.revenue_week || 0),
      weekPending: Number(stats.pending_week || 0),
      weekPotential: Number(stats.potential_week || 0),
      recentLeads: recentLeads || [],
      byService: [],
      funnelStats: [],
      partners: Number(stats.partners_count || 0),
      partnersList: (partnersList || []).map((p: any) => ({
        ...p,
        isOwner: p.telegram_chat_id === OWNER_TELEGRAM_ID,
      })),
      ownerTelegramId: OWNER_TELEGRAM_ID,
      conversionRate: total > 0 ? ((sold / total) * 100).toFixed(1) : "0",
      incompleteChats: [],
      dateRange: dateRange || "all",
    }
  } catch (error: any) {
    console.error("getStats error:", error?.message || error)
    return { ...defaultStats, dateRange: dateRange || "all" }
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    redirect("/0x")
  }

  const params = await searchParams
  const stats = await getStats(params.range)

  return <DashboardClient initialStats={stats} />
}
