import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { neon } from "@neondatabase/serverless"
import { PartnersClient } from "./partners-client"

const SESSION_SECRET = "rf_admin_session_2024_punk"

async function getPartnersData() {
  const sql = neon(process.env.NEON_DATABASE_URL!)

  const ownerTelegramId = process.env.ADMIN_USER_IDS?.split(",")[0] || ""

  let partners: any[] = []
  try {
    partners = await sql`
      SELECT 
        p.*,
        COALESCE(
          (SELECT COUNT(*) FROM leads l WHERE l.status = 'accepted' AND l.partner_id = p.id),
          0
        ) as leads_bought,
        COALESCE(
          (SELECT SUM(COALESCE(l.lead_price, l.credit_cost, 0)) FROM leads l WHERE l.status = 'accepted' AND l.partner_id = p.id),
          0
        ) as total_spent,
        (SELECT MAX(l.accepted_at) FROM leads l WHERE l.status = 'accepted' AND l.partner_id = p.id) as last_purchase
      FROM partners p
      ORDER BY p.created_at DESC
    `
  } catch (e) {
    console.error("[v0] Partners query error:", e)
    // Fallback - just get partners without stats
    try {
      partners = await sql`
        SELECT p.*, 0 as leads_bought, 0 as total_spent, NULL as last_purchase
        FROM partners p
        ORDER BY p.created_at DESC
      `
    } catch (e2) {
      console.error("[v0] Fallback query error:", e2)
      partners = []
    }
  }

  return {
    partners: partners.map((p: any) => ({
      ...p,
      isOwner: p.telegram_chat_id === ownerTelegramId,
    })),
    ownerTelegramId,
  }
}

export default async function PartnersPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (!session || session.value !== SESSION_SECRET) {
    redirect("/0x")
  }

  let data
  try {
    data = await getPartnersData()
  } catch (error) {
    // If database error, return empty data
    data = {
      partners: [],
      ownerTelegramId: process.env.ADMIN_USER_IDS?.split(",")[0] || "",
    }
  }

  return <PartnersClient data={data} />
}
