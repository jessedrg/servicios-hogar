import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/0x/"],
    },
    sitemap: "https://www.hogarya.eu/sitemap-v1.xml",
  }
}
