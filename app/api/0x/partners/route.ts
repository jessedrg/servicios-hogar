import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const VALID_SESSION = "rf_admin_session_2024_punk"
const OWNER_TELEGRAM_ID = process.env.ADMIN_USER_IDS?.split(",")[0] || ""

export async function DELETE(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { partnerId, telegramChatId } = await request.json()

  if (telegramChatId === OWNER_TELEGRAM_ID) {
    return NextResponse.json({ error: "No puedes eliminar al propietario" }, { status: 403 })
  }

  const sql = neon(process.env.NEON_DATABASE_URL!)

  // Soft delete - just mark as inactive
  await sql`UPDATE partners SET active = false WHERE id = ${partnerId}`

  return NextResponse.json({ success: true, message: "Partner expulsado correctamente" })
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { partnerId, active } = await request.json()

  const sql = neon(process.env.NEON_DATABASE_URL!)

  await sql`UPDATE partners SET active = ${active} WHERE id = ${partnerId}`

  return NextResponse.json({ success: true, message: active ? "Partner reactivado" : "Partner desactivado" })
}
