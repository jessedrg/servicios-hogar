import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

const PHONE_OPTIONS = [
  { id: "phone1", label: "Telefono Principal", number: "711267223" },
  { id: "phone2", label: "Telefono Alternativo", number: "644536400" },
]

export async function GET() {
  try {
    const result = await sql`
      SELECT value FROM app_config WHERE key = 'active_phone'
    `

    const activePhone = result[0]?.value || "phone1"
    const phoneConfig = PHONE_OPTIONS.find((p) => p.id === activePhone) || PHONE_OPTIONS[0]

    return Response.json({
      success: true,
      activePhone,
      phoneNumber: phoneConfig.number,
      phoneOptions: PHONE_OPTIONS,
    })
  } catch (error) {
    console.error("Error getting config:", error)
    return Response.json({
      success: true,
      activePhone: "phone1",
      phoneNumber: "711267223",
      phoneOptions: PHONE_OPTIONS,
    })
  }
}

export async function POST(request: Request) {
  try {
    const { activePhone } = await request.json()

    if (!PHONE_OPTIONS.find((p) => p.id === activePhone)) {
      return Response.json({ success: false, error: "Invalid phone option" }, { status: 400 })
    }

    // Upsert the config
    await sql`
      INSERT INTO app_config (id, key, value, created_at, updated_at)
      VALUES (gen_random_uuid(), 'active_phone', ${activePhone}, NOW(), NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${activePhone}, updated_at = NOW()
    `

    const phoneConfig = PHONE_OPTIONS.find((p) => p.id === activePhone)!

    return Response.json({
      success: true,
      activePhone,
      phoneNumber: phoneConfig.number,
    })
  } catch (error) {
    console.error("Error saving config:", error)
    return Response.json({ success: false, error: "Error saving config" }, { status: 500 })
  }
}
