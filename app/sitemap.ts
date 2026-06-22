import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://zhiyue-brand-concept.vercel.app",
      lastModified: new Date("2026-06-22"),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
