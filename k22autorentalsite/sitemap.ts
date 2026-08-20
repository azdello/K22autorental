import type { MetadataRoute } from "next";

const siteUrl = "https://k22autorentals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/fleet", "/choose-us", "/enquiry"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
