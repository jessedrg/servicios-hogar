import { NextResponse } from "next/server"

const PROFESSIONS = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.servicioshogar.xyz"

// Generar códigos postales de las principales ciudades
function getTopPostalCodes(): string[] {
  const codes: string[] = []
  
  // Barcelona (08001-08042)
  for (let i = 8001; i <= 8042; i++) codes.push(i.toString().padStart(5, '0'))
  // Madrid (28001-28055)
  for (let i = 28001; i <= 28055; i++) codes.push(i.toString())
  // Valencia (46001-46026)
  for (let i = 46001; i <= 46026; i++) codes.push(i.toString())
  // Sevilla (41001-41020)
  for (let i = 41001; i <= 41020; i++) codes.push(i.toString())
  // Zaragoza (50001-50018)
  for (let i = 50001; i <= 50018; i++) codes.push(i.toString())
  // Málaga (29001-29018)
  for (let i = 29001; i <= 29018; i++) codes.push(i.toString())
  // Bilbao (48001-48015)
  for (let i = 48001; i <= 48015; i++) codes.push(i.toString())
  // Alicante (03001-03016)
  for (let i = 3001; i <= 3016; i++) codes.push(i.toString().padStart(5, '0'))
  // Murcia (30001-30012)
  for (let i = 30001; i <= 30012; i++) codes.push(i.toString())
  // Palma (07001-07015)
  for (let i = 7001; i <= 7015; i++) codes.push(i.toString().padStart(5, '0'))
  // Las Palmas (35001-35020)
  for (let i = 35001; i <= 35020; i++) codes.push(i.toString())
  // Girona (17001-17007)
  for (let i = 17001; i <= 17007; i++) codes.push(i.toString())
  // Tarragona (43001-43007)
  for (let i = 43001; i <= 43007; i++) codes.push(i.toString())
  // Lleida (25001-25008)
  for (let i = 25001; i <= 25008; i++) codes.push(i.toString())
  
  return codes
}

export async function GET() {
  const postalCodes = getTopPostalCodes()
  const today = new Date().toISOString().split("T")[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Generar URLs para cada combinación profesión + código postal
  for (const profession of PROFESSIONS) {
    for (const cp of postalCodes) {
      xml += `  <url>
    <loc>${SITE_URL}/${profession}/cp/${cp}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
    }
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
