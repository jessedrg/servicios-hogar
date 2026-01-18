import { PROFESSIONS } from "@/lib/seo-data"

export async function GET() {
  const baseUrl = "https://hogarya.es"
  const currentDate = new Date().toISOString()

  // Generar lista de sitemaps
  const sitemaps: string[] = [
    `${baseUrl}/sitemap.xml`, // Sitemap principal con rutas estáticas
  ]

  // Añadir sitemaps por profesión
  PROFESSIONS.forEach((profession) => {
    // Sitemap de ciudades: /{profession}/{city}
    sitemaps.push(`${baseUrl}/sitemap/${profession.slug}.xml`)
    // Sitemap urgente: /{profession}-urgente/{city}
    sitemaps.push(`${baseUrl}/sitemap/${profession.slug}-urgente.xml`)
    // Sitemap de problemas (dividido por problema para no exceder límites)
    profession.problems.forEach((problem) => {
      sitemaps.push(`${baseUrl}/sitemap/${profession.slug}-${problem.slug}.xml`)
    })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
