import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

const VALID_SESSION = "rf_admin_session_2024_punk"

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { name, phone, services, cities } = await request.json()

    if (!name || !phone || !services || services.length === 0) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    await sql`
      INSERT INTO partners (name, phone, services, cities, active, created_at)
      VALUES (${name}, ${phone}, ${services}, ${cities || []}, true, NOW())
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating partner:", error)
    return NextResponse.json({ error: "Error al crear partner" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { partnerId, name, phone, services, cities, active } = await request.json()

    if (!partnerId) {
      return NextResponse.json({ error: "Falta partnerId" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    if (typeof active === "boolean") {
      await sql`
        UPDATE partners 
        SET active = ${active}, updated_at = NOW()
        WHERE id = ${partnerId}
      `
    } else {
      await sql`
        UPDATE partners 
        SET 
          name = COALESCE(${name}, name),
          phone = COALESCE(${phone}, phone),
          services = COALESCE(${services}, services),
          cities = COALESCE(${cities}, cities),
          updated_at = NOW()
        WHERE id = ${partnerId}
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating partner:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { partnerId } = await request.json()

    if (!partnerId) {
      return NextResponse.json({ error: "Falta partnerId" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    await sql`DELETE FROM partners WHERE id = ${partnerId}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting partner:", error)
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 })
  }
}
