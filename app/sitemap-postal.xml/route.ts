import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PROFESSIONS = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.servicioshogar.xyz"

// Cargar códigos postales únicos del CSV
function getUniquePostalCodes(): string[] {
  const csvPath = path.join(process.cwd(), "postalcat.csv")
  const content = fs.readFileSync(csvPath, "utf-8")
  const lines = content.split("\n")
  
  const postalCodes = new Set<string>()
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const parts = line.split(";")
    if (parts.length < 2) continue
    
    const cp = parts[1]
    if (cp && /^\d{5}$/.test(cp)) {
      postalCodes.add(cp)
    }
  }
  
  return Array.from(postalCodes).sort()
}

export async function GET() {
  const postalCodes = getUniquePostalCodes()
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
