import { NextResponse } from "next/server";
import { getAllPublishedPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPublishedPosts();

  const siteUrl = "https://nyphren.com";

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>nyphren</title>
      <link>${siteUrl}</link>
      <description>Writing, systems, and strange ideas</description>

      ${posts
        .map(
          (post) => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${siteUrl}/blog/${post.slug}</link>
          <guid>${siteUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.publishDate || "").toUTCString()}</pubDate>
          <description><![CDATA[${post.excerpt}]]></description>
        </item>
      `,
        )
        .join("")}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
