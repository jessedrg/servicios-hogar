import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "")

const DEFAULT_CONFIG = {
  activePhone: "phone1",
  phoneOptions: [
    { id: "phone1", label: "Telefono Principal", number: "711267223" },
    { id: "phone2", label: "Telefono Alternativo", number: "644536400" },
  ],
}

// GET - Fetch current phone config
export async function GET() {
  try {
    const result = await sql`
      SELECT value FROM app_config WHERE key = 'phone_config' LIMIT 1
    `

    console.log("[v0] Phone config GET result:", result)

    if (result.length > 0 && result[0].value) {
      let config = result[0].value
      if (typeof config === "string") {
        try {
          config = JSON.parse(config)
        } catch {
          return NextResponse.json(DEFAULT_CONFIG)
        }
      }
      return NextResponse.json(config)
    }

    // Return default config if not found
    return NextResponse.json(DEFAULT_CONFIG)
  } catch (error) {
    console.error("Error fetching phone config:", error)
    // Return default config on error
    return NextResponse.json(DEFAULT_CONFIG)
  }
}

// POST - Save phone config
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { activePhone, phoneOptions } = body

    console.log("[v0] Phone config POST received:", { activePhone, phoneOptions })

    if (!activePhone || !phoneOptions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const config = { activePhone, phoneOptions }
    const configString = JSON.stringify(config)

    // First try to update existing row
    const updateResult = await sql`
      UPDATE app_config 
      SET value = ${configString}, updated_at = NOW()
      WHERE key = 'phone_config'
      RETURNING *
    `

    console.log("[v0] Phone config UPDATE result:", updateResult)

    // If no row was updated, insert a new one
    if (updateResult.length === 0) {
      const insertResult = await sql`
        INSERT INTO app_config (id, key, value, created_at, updated_at)
        VALUES (gen_random_uuid(), 'phone_config', ${configString}, NOW(), NOW())
        RETURNING *
      `
      console.log("[v0] Phone config INSERT result:", insertResult)
      return NextResponse.json({ success: true, config, saved: insertResult })
    }

    return NextResponse.json({ success: true, config, saved: updateResult })
  } catch (error) {
    console.error("Error saving phone config:", error)
    return NextResponse.json({ error: "Error saving configuration: " + String(error) }, { status: 500 })
  }
}
