import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const ADMIN_PASSWORD = process.env.ADMIN_DASHBOARD_PASSWORD || "RapidFix2024!Punk"
const SESSION_SECRET = "rf_admin_session_2024_punk"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set("rf_admin_session", SESSION_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Cambiar a lax para permitir navegación
      path: "/", // Asegurar que la cookie está disponible en todas las rutas
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 })
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value === SESSION_SECRET) {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("rf_admin_session")
  return NextResponse.json({ success: true })
}
