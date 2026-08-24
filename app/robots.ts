import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://integra.net.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/sign-in", "/my-tickets", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
