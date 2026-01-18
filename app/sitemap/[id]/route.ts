import { PROFESSIONS, CITIES_SPAIN } from "@/lib/seo-data"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const baseUrl = "https://hogarya.es"
  const currentDate = new Date().toISOString()

  // Remover .xml del id
  const sitemapId = id.replace(".xml", "")

  let urls: { loc: string; priority: number }[] = []

  // Buscar si es un sitemap de profesión base: electricista, fontanero, etc.
  const profession = PROFESSIONS.find((p) => p.slug === sitemapId)
  if (profession) {
    // Sitemap /{profession}/{city}
    urls = CITIES_SPAIN.map((city) => ({
      loc: `${baseUrl}/${profession.slug}/${city.slug}`,
      priority: 0.8,
    }))
  }

  // Buscar si es un sitemap urgente: electricista-urgente, fontanero-urgente, etc.
  const urgentMatch = sitemapId.match(/^(.+)-urgente$/)
  if (urgentMatch) {
    const professionSlug = urgentMatch[1]
    const prof = PROFESSIONS.find((p) => p.slug === professionSlug)
    if (prof) {
      urls = CITIES_SPAIN.map((city) => ({
        loc: `${baseUrl}/${prof.slug}-urgente/${city.slug}`,
        priority: 0.85,
      }))
    }
  }

  // Buscar si es un sitemap de problema: electricista-apagon, fontanero-fuga-agua, etc.
  if (urls.length === 0) {
    for (const prof of PROFESSIONS) {
      for (const problem of prof.problems) {
        if (sitemapId === `${prof.slug}-${problem.slug}`) {
          urls = CITIES_SPAIN.map((city) => ({
            loc: `${baseUrl}/problema/${prof.slug}/${problem.slug}/${city.slug}`,
            priority: 0.75,
          }))
          break
        }
      }
      if (urls.length > 0) break
    }
  }

  // Si no se encontró el sitemap, devolver 404
  if (urls.length === 0) {
    return new Response("Sitemap not found", { status: 404 })
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
