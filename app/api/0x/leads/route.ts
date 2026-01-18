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
    const { name, phone, city, service, problem, requested_date, service_time, source } = await request.json()

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Faltan campos requeridos (nombre, teléfono, servicio)" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    const result = await sql`
      INSERT INTO leads (name, phone, city, service, problem, requested_date, service_time, status, source, created_at)
      VALUES (${name}, ${phone}, ${city || ""}, ${service}, ${problem || ""}, ${requested_date || null}, ${service_time || null}, 'pending', ${source || "manual"}, NOW())
      RETURNING id, name, phone, city, service, problem, status, lead_price, partner_id, requested_date, service_time, source, created_at, commission, amount_charged, client_cost, notes
    `

    return NextResponse.json({ success: true, lead: result[0] })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Error al crear lead" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { leadId, status, partnerId, estimatedPrice, lead_price } = await request.json()

    if (!leadId) {
      return NextResponse.json({ error: "Falta leadId" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    if (status) {
      await sql`UPDATE leads SET status = ${status} WHERE id = ${leadId}`
      return NextResponse.json({ success: true })
    }

    if (partnerId !== undefined) {
      await sql`UPDATE leads SET partner_id = ${partnerId || null} WHERE id = ${leadId}`
      return NextResponse.json({ success: true })
    }

    const priceToUpdate = estimatedPrice ?? lead_price
    if (priceToUpdate !== undefined) {
      await sql`UPDATE leads SET lead_price = ${priceToUpdate} WHERE id = ${leadId}`
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const body = await request.json()
    console.log("[v0] PUT /api/0x/leads - Raw body:", JSON.stringify(body))

    const {
      id,
      name,
      phone,
      city,
      service,
      problem,
      lead_price,
      service_time,
      status,
      partner_id,
      commission,
      amount_charged,
      client_cost,
      notes,
    } = body

    if (!id) {
      return NextResponse.json({ error: "Falta id" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    const updateValues = {
      name: name ?? "",
      phone: phone ?? "",
      city: city ?? "",
      service: service ?? "",
      problem: problem ?? "",
      lead_price: Number(lead_price) || 0,
      service_time: service_time || null,
      status: status || "pending",
      partner_id: partner_id || null,
      commission: Number(commission) || 0,
      amount_charged: Number(amount_charged) || 0,
      client_cost: Number(client_cost) || 0,
      notes: notes || null,
    }
    console.log("[v0] PUT - Values for SQL update:", JSON.stringify(updateValues))

    const result = await sql`
      UPDATE leads SET
        name = ${updateValues.name},
        phone = ${updateValues.phone},
        city = ${updateValues.city},
        service = ${updateValues.service},
        problem = ${updateValues.problem},
        lead_price = ${updateValues.lead_price},
        service_time = ${updateValues.service_time},
        status = ${updateValues.status},
        partner_id = ${updateValues.partner_id},
        commission = ${updateValues.commission},
        amount_charged = ${updateValues.amount_charged},
        client_cost = ${updateValues.client_cost},
        notes = ${updateValues.notes}
      WHERE id = ${id}
      RETURNING id, name, phone, city, service, problem, lead_price, service_time, status, partner_id, commission, amount_charged, client_cost, notes
    `

    console.log("[v0] PUT - SQL result:", JSON.stringify(result))
    console.log("[v0] PUT - Result row count:", result.length)

    if (result.length > 0) {
      console.log("[v0] PUT - Updated lead commission:", result[0].commission)
      console.log("[v0] PUT - Updated lead amount_charged:", result[0].amount_charged)
      console.log("[v0] PUT - Updated lead client_cost:", result[0].client_cost)
    }

    if (!result[0]) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: result[0] })
  } catch (error) {
    console.error("[v0] PUT - Error:", error)
    return NextResponse.json({ error: "Error al actualizar lead" }, { status: 500 })
  }
}
