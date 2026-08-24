import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://integra.net.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/activities", "/gallery", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
