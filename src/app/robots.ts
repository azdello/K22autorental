import type { MetadataRoute } from "next";

const siteUrl = "https://k22autorentals.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/enquiry/confirmation"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
