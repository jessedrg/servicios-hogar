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
      `${siteUrl}/sitemap-cat-2026.xml`,
    ],
  }
}
