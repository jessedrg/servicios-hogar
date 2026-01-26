import { NextResponse } from "next/server"
import { VALID_PROFESSIONS, MODIFIERS, PROBLEMS, CITIES } from "@/lib/sitemap-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.hogarya.eu").replace(/\/$/, "")
const MAX_URLS_PER_SITEMAP = 45000

export async function GET() {
  const date = new Date().toISOString().split("T")[0]

  const sitemaps: string[] = []

  // Sitemaps for each profession + modifier
  for (const profession of VALID_PROFESSIONS) {
    for (const modifier of MODIFIERS) {
      const id = modifier ? `${profession}${modifier}` : profession
      sitemaps.push(`${BASE_URL}/sitemap-files/${id}.xml`)
    }
  }

  // Sitemaps for price/budget prefixes
  for (const profession of VALID_PROFESSIONS) {
    sitemaps.push(`${BASE_URL}/sitemap-files/precio-${profession}.xml`)
    sitemaps.push(`${BASE_URL}/sitemap-files/presupuesto-${profession}.xml`)
  }

  // Sitemaps for problems - CHUNKED to respect 50k limit
  const urlsPerProblem = CITIES.length // 8,118
  const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem) // ~5

  for (const profession of VALID_PROFESSIONS) {
    const problems = PROBLEMS[profession] || []
    const numChunks = Math.ceil(problems.length / problemsPerChunk)
    
    for (let i = 1; i <= numChunks; i++) {
      sitemaps.push(`${BASE_URL}/sitemap-files/${profession}-problemas-${i}.xml`)
    }
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const sitemap of sitemaps) {
    xml += `  <sitemap>\n    <loc>${sitemap}</loc>\n    <lastmod>${date}</lastmod>\n  </sitemap>\n`
  }

  xml += "</sitemapindex>"

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
