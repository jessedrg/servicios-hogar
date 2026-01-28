import { NextResponse } from "next/server"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"

const PROFESSIONS = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.servicioshogar.xyz"
const URLS_PER_SITEMAP = 10000 // Máximo 50k, usamos 10k para ser seguros

// Obtener todos los códigos postales
function getAllPostalCodes(): string[] {
  return Object.keys(POSTAL_CODE_NAMES).sort()
}

// Calcular número total de sitemaps necesarios
export function getTotalSitemaps(): number {
  const totalCodes = Object.keys(POSTAL_CODE_NAMES).length
  const totalUrls = totalCodes * PROFESSIONS.length
  return Math.ceil(totalUrls / URLS_PER_SITEMAP)
}

interface RouteParams {
  params: Promise<{ part: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { part } = await params
  const partNumber = parseInt(part)
  
  if (isNaN(partNumber) || partNumber < 1) {
    return new NextResponse("Invalid sitemap part", { status: 400 })
  }
  
  const allCodes = getAllPostalCodes()
  const today = new Date().toISOString().split("T")[0]
  
  // Calcular qué URLs van en esta parte
  const startIndex = (partNumber - 1) * URLS_PER_SITEMAP
  const endIndex = startIndex + URLS_PER_SITEMAP
  
  // Generar todas las combinaciones
  const allUrls: { profession: string; cp: string }[] = []
  for (const profession of PROFESSIONS) {
    for (const cp of allCodes) {
      allUrls.push({ profession, cp })
    }
  }
  
  // Obtener solo las URLs de esta parte
  const urlsForThisPart = allUrls.slice(startIndex, endIndex)
  
  if (urlsForThisPart.length === 0) {
    return new NextResponse("Sitemap part not found", { status: 404 })
  }
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (const { profession, cp } of urlsForThisPart) {
    xml += `  <url>
    <loc>${SITE_URL}/${profession}/cp/${cp}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
