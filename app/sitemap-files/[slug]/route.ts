import { NextResponse } from "next/server"
import { VALID_PROFESSIONS, CITIES, MODIFIERS, PROBLEMS, type Profession } from "@/lib/sitemap-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Max 50,000 URLs per sitemap (Google limit)
const MAX_URLS_PER_SITEMAP = 45000 // Leave margin

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const baseUrl = "https://www.hogarya.eu"
    const date = new Date().toISOString().split("T")[0]
    const id = slug.endsWith(".xml") ? slug.slice(0, -4) : slug

    const urls: string[] = []

    // Handle chunked problemas sitemaps: electricista-problemas-1, electricista-problemas-2, etc.
    const problemasMatch = id.match(/^(.+)-problemas-(\d+)$/)
    if (problemasMatch) {
      const profession = problemasMatch[1] as Profession
      const chunkIndex = parseInt(problemasMatch[2], 10) - 1 // 1-indexed to 0-indexed
      const problems = PROBLEMS[profession] || []
      
      // Calculate which problems go in this chunk
      const urlsPerProblem = CITIES.length
      const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem)
      const startProblem = chunkIndex * problemsPerChunk
      const endProblem = Math.min(startProblem + problemsPerChunk, problems.length)
      
      for (let i = startProblem; i < endProblem; i++) {
        const problem = problems[i]
        for (const city of CITIES) {
          urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}/`)
        }
      }
    } else if (id.endsWith("-problemas")) {
      // Legacy: if no chunk number, return first chunk only
      const profession = id.replace("-problemas", "") as Profession
      const problems = PROBLEMS[profession] || []
      const urlsPerProblem = CITIES.length
      const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem)
      
      for (let i = 0; i < Math.min(problemsPerChunk, problems.length); i++) {
        const problem = problems[i]
        for (const city of CITIES) {
          urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}/`)
        }
      }
    } else if (id.startsWith("precio-") || id.startsWith("presupuesto-")) {
      const prefix = id.startsWith("precio-") ? "precio" : "presupuesto"
      const profession = id.replace(`${prefix}-`, "")
      if (VALID_PROFESSIONS.includes(profession as Profession)) {
        for (const city of CITIES) {
          urls.push(`${baseUrl}/${prefix}-${profession}/${city}/`)
        }
      }
    } else {
      let foundProfession = ""
      let foundModifier = ""

      if (VALID_PROFESSIONS.includes(id as Profession)) {
        foundProfession = id
        foundModifier = ""
      } else {
        for (const prof of VALID_PROFESSIONS) {
          for (const mod of MODIFIERS) {
            if (mod && id === `${prof}${mod}`) {
              foundProfession = prof
              foundModifier = mod
              break
            }
          }
          if (foundProfession) break
        }
      }

      if (foundProfession) {
        for (const city of CITIES) {
          if (foundModifier) {
            urls.push(`${baseUrl}/${foundProfession}${foundModifier}/${city}/`)
          } else {
            urls.push(`${baseUrl}/${foundProfession}/${city}/`)
          }
        }
      }
    }

    // Optimized XML generation using array join (faster than string concatenation)
    const xmlParts = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(url => `<url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
      '</urlset>'
    ]
    const xml = xmlParts.join('\n')

    return new NextResponse(xml, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
    })
  } catch (error) {
    console.error("[v0] Sitemap error:", error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      },
    )
  }
}