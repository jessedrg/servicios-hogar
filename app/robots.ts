import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.servicioshogar.xyz").replace(/\/$/, "")
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/0x/"],
    },
    sitemap: [
      `${siteUrl}/sitemap-v2.xml`,
      `${siteUrl}/sitemap-postal-index.xml`,
      `${siteUrl}/sitemap-cat-index-1.xml`,
      `${siteUrl}/sitemap-cat-index-2.xml`,
      `${siteUrl}/sitemap-cat-index-3.xml`,
      `${siteUrl}/sitemap-cat-index-4.xml`,
      `${siteUrl}/sitemap-cat-index-5.xml`,
    ],
  }
}
