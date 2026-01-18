import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.NEON_NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL || "")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { telegram_chat_id, name, email, phone, service_type } = body

    console.log("[v0] Registering partner:", { telegram_chat_id, name, email, service_type })

    // Check if partner already exists
    const existing = await sql`
      SELECT * FROM partners 
      WHERE telegram_chat_id = ${telegram_chat_id}
    `

    if (existing.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Partner already registered",
        partner: existing[0],
      })
    }

    // Insert new partner with 0 credits
    const result = await sql`
      INSERT INTO partners (
        telegram_chat_id,
        name,
        email,
        phone,
        service_type,
        credits,
        created_at
      ) VALUES (
        ${telegram_chat_id},
        ${name},
        ${email || null},
        ${phone || null},
        ${service_type || "general"},
        0,
        NOW()
      )
      RETURNING *
    `

    console.log("[v0] Partner registered successfully:", result[0])

    return NextResponse.json({
      success: true,
      message: "Partner registered successfully",
      partner: result[0],
    })
  } catch (error) {
    console.error("[v0] Error registering partner:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to register partner",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET endpoint to register via URL parameters (easier for testing)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const telegram_chat_id = searchParams.get("chat_id")
    const name = searchParams.get("name") || "Partner"
    const email = searchParams.get("email")
    const phone = searchParams.get("phone")
    const service_type = searchParams.get("service_type") || "general"

    if (!telegram_chat_id) {
      return NextResponse.json({ success: false, error: "chat_id parameter is required" }, { status: 400 })
    }

    console.log("[v0] Registering partner via GET:", { telegram_chat_id, name, service_type })

    // Check if partner already exists
    const existing = await sql`
      SELECT * FROM partners 
      WHERE telegram_chat_id = ${telegram_chat_id}
    `

    if (existing.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Partner already registered",
        partner: existing[0],
      })
    }

    // Insert new partner with 0 credits
    const result = await sql`
      INSERT INTO partners (
        telegram_chat_id,
        name,
        email,
        phone,
        service_type,
        credits,
        created_at
      ) VALUES (
        ${telegram_chat_id},
        ${name},
        ${email || null},
        ${phone || null},
        ${service_type},
        0,
        NOW()
      )
      RETURNING *
    `

    console.log("[v0] Partner registered successfully:", result[0])

    return NextResponse.json({
      success: true,
      message: "Partner registered successfully! Now you can use /credits in Telegram.",
      partner: result[0],
    })
  } catch (error) {
    console.error("[v0] Error registering partner:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to register partner",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
