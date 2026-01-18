import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.NEON_DATABASE_URL!)

// Create new partner
export async function POST(request: Request) {
  try {
    const { name, phone, services, cities } = await request.json()

    if (!name || !phone || !services || services.length === 0) {
      return NextResponse.json({ success: false, error: "Faltan datos" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO partners (name, phone, services, cities, active, created_at, updated_at)
      VALUES (${name}, ${phone}, ${services}, ${cities || []}, true, NOW(), NOW())
      RETURNING id
    `

    return NextResponse.json({ success: true, partnerId: result[0].id })
  } catch (error) {
    console.error("[v0] Error creating partner:", error)
    return NextResponse.json({ success: false, error: "Error al crear partner" }, { status: 500 })
  }
}

// Update partner
export async function PATCH(request: Request) {
  try {
    const { id, name, phone, services, cities } = await request.json()

    if (!id) {
      return NextResponse.json({ success: false, error: "Falta ID" }, { status: 400 })
    }

    await sql`
      UPDATE partners
      SET 
        name = COALESCE(${name}, name),
        phone = COALESCE(${phone}, phone),
        services = COALESCE(${services}, services),
        cities = COALESCE(${cities}, cities),
        updated_at = NOW()
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating partner:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar partner" }, { status: 500 })
  }
}

// Delete partner
export async function DELETE(request: Request) {
  try {
    const { partnerId } = await request.json()

    if (!partnerId) {
      return NextResponse.json({ success: false, error: "Falta ID" }, { status: 400 })
    }

    await sql`DELETE FROM partners WHERE id = ${partnerId}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting partner:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar partner" }, { status: 500 })
  }
}
