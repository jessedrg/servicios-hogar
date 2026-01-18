import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { neon } from "@neondatabase/serverless"
import { GestionPartnersClient } from "./gestion-partners-client"

const VALID_SESSION = "rf_admin_session_2024_punk"

async function getPartners() {
  const sql = neon(process.env.NEON_DATABASE_URL!)

  const partners = await sql`
    SELECT 
      id,
      name,
      phone,
      telegram_chat_id,
      services,
      cities,
      active,
      created_at,
      total_leads_accepted,
      balance_euros
    FROM partners
    ORDER BY created_at DESC
  `

  return partners
}

export default async function GestionPartnersPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    redirect("/0x")
  }

  const partners = await getPartners()

  return <GestionPartnersClient partners={partners} />
}
