import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.NEON_NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL || "")

export async function GET() {
  try {
    console.log("[v0] Starting database setup...")
    console.log(
      "[v0] Using database URL:",
      process.env.NEON_DATABASE_URL ? "NEON_DATABASE_URL found" : "Using fallback",
    )

    // Create partners table
    await sql`
      CREATE TABLE IF NOT EXISTS partners (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        telegram_chat_id VARCHAR(100) UNIQUE NOT NULL,
        services TEXT[] NOT NULL,
        cities TEXT[] NOT NULL,
        credits INTEGER DEFAULT 0,
        total_leads_received INTEGER DEFAULT 0,
        total_leads_accepted INTEGER DEFAULT 0,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log("[v0] Partners table created")

    // Create leads table
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        service VARCHAR(100) NOT NULL,
        problem TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        city VARCHAR(100) NOT NULL,
        name VARCHAR(255),
        credit_cost INTEGER DEFAULT 1,
        status VARCHAR(50) DEFAULT 'pending',
        partner_id UUID REFERENCES partners(id),
        telegram_message_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        accepted_at TIMESTAMP,
        CONSTRAINT fk_partner FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL
      )
    `
    console.log("[v0] Leads table created")

    // Create credit_transactions table
    await sql`
      CREATE TABLE IF NOT EXISTS credit_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        partner_id UUID NOT NULL REFERENCES partners(id),
        amount INTEGER NOT NULL,
        type VARCHAR(50) NOT NULL,
        stripe_session_id VARCHAR(255),
        lead_id UUID REFERENCES leads(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log("[v0] Credit transactions table created")

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_partners_telegram ON partners(telegram_chat_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(active) WHERE active = true`
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_partner_status ON leads(partner_id, status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_credit_transactions_partner ON credit_transactions(partner_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_credit_transactions_created ON credit_transactions(created_at DESC)`
    console.log("[v0] Indexes created")

    try {
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS credit_cost INTEGER DEFAULT 1`
      console.log("[v0] Added credit_cost column to existing leads table")
    } catch (e) {
      console.log("[v0] credit_cost column already exists or error:", e)
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
      tables: ["partners", "leads", "credit_transactions"],
    })
  } catch (error) {
    console.error("[v0] Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
