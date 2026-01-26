import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.hogarya.eu").replace(/\/$/, "")
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/0x/"],
    },
    sitemap: [
      `${siteUrl}/sitemap-v2.xml`,
      `${siteUrl}/sitemaps/sitemap-cat-index.xml`,
    ],
  }
}
