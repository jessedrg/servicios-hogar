import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

async function checkStats() {
  // Total leads
  const totalLeads = await sql`SELECT COUNT(*) as total FROM leads`

  // Leads vendidos
  const soldLeads = await sql`SELECT COUNT(*) as total FROM leads WHERE status = 'accepted'`

  // Leads pendientes
  const pendingLeads = await sql`SELECT COUNT(*) as total FROM leads WHERE status = 'pending'`

  // Ingresos totales
  const totalRevenue = await sql`SELECT COALESCE(SUM(lead_price), 0) as total FROM leads WHERE status = 'accepted'`

  // Leads de hoy
  const todayLeads = await sql`SELECT COUNT(*) as total FROM leads WHERE created_at >= CURRENT_DATE`

  // Leads vendidos hoy
  const todaySold =
    await sql`SELECT COUNT(*) as total FROM leads WHERE status = 'accepted' AND accepted_at >= CURRENT_DATE`

  // Ingresos hoy
  const todayRevenue =
    await sql`SELECT COALESCE(SUM(lead_price), 0) as total FROM leads WHERE status = 'accepted' AND accepted_at >= CURRENT_DATE`

  // Por servicio
  const byService = await sql`
    SELECT 
      service,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'accepted') as vendidos,
      COALESCE(SUM(lead_price) FILTER (WHERE status = 'accepted'), 0) as ingresos
    FROM leads 
    GROUP BY service
    ORDER BY total DESC
  `

  // Partners registrados
  const totalPartners = await sql`SELECT COUNT(*) as total FROM partners`

  console.log("========================================")
  console.log("       ESTADÍSTICAS RAPIDFIX")
  console.log("========================================")
  console.log("")
  console.log("📊 TOTALES:")
  console.log(`   Total leads: ${totalLeads[0].total}`)
  console.log(`   Vendidos: ${soldLeads[0].total}`)
  console.log(`   Pendientes: ${pendingLeads[0].total}`)
  console.log(`   Ingresos: ${Number(totalRevenue[0].total).toFixed(2)}€`)
  console.log(
    `   Tasa conversión: ${totalLeads[0].total > 0 ? ((soldLeads[0].total / totalLeads[0].total) * 100).toFixed(1) : 0}%`,
  )
  console.log("")
  console.log("📅 HOY:")
  console.log(`   Leads: ${todayLeads[0].total}`)
  console.log(`   Vendidos: ${todaySold[0].total}`)
  console.log(`   Ingresos: ${Number(todayRevenue[0].total).toFixed(2)}€`)
  console.log("")
  console.log("🔧 POR SERVICIO:")
  byService.forEach((s: any) => {
    console.log(
      `   ${s.service || "Sin servicio"}: ${s.total} leads, ${s.vendidos} vendidos, ${Number(s.ingresos).toFixed(2)}€`,
    )
  })
  console.log("")
  console.log(`👥 Partners registrados: ${totalPartners[0].total}`)
  console.log("========================================")
}

checkStats()
