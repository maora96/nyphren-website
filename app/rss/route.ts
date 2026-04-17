import { NextResponse } from "next/server";
import { getAllPublishedPosts, getPageBlocks } from "@/lib/blog";
export const revalidate = 60;
function renderBlocksToHtml(
  blocks: Array<{ type: string; text: string }>,
): string {
  return blocks
    .map((block) => {
      if (!block.text) return "";

      if (block.type === "heading_1") {
        return `<h1>${renderRichText(block.richText)}</h1>`;
      }

      if (block.type === "heading_2") {
        return `<h2>${renderRichText(block.richText)}</h2>`;
      }

      if (block.type === "heading_3") {
        return `<h3>${renderRichText(block.richText)}</h3>`;
      }

      if (block.type === "quote") {
        return `<blockquote>${renderRichText(block.richText)}</blockquote>`;
      }

      if (block.type === "bulleted_list_item") {
        return `<ul><li>${renderRichText(block.richText)}</li></ul>`;
      }

      if (block.type === "numbered_list_item") {
        return `<ol><li>${renderRichText(block.richText)}</li></ol>`;
      }

      return `<p>${renderRichText(block.richText)}</p>`;
    })
    .join("");
}

export async function GET() {
  const siteUrl = "https://nyphren.com";

  const posts = (await getAllPublishedPosts()).slice(0, 20);

  const items = await Promise.all(
    posts.map(async (post) => {
      const blocks = await getPageBlocks(post.id);
      const contentHtml = renderBlocksToHtml(blocks);

      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${siteUrl}/blog/${post.slug}</link>
          <guid>${siteUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.publishDate || "").toUTCString()}</pubDate>

          <description><![CDATA[
            ${post.coverUrl ? `<p><img src="${post.coverUrl}" alt="${post.title}" /></p>` : ""}
            <p>${post.excerpt}</p>
          ]]></description>

          <content:encoded><![CDATA[
            ${post.coverUrl ? `<p><img src="${post.coverUrl}" alt="${post.title}" /></p>` : ""}
            ${contentHtml}
          ]]></content:encoded>

          ${
            post.coverUrl
              ? `<media:content url="${post.coverUrl}" medium="image" />`
              : ""
          }
        </item>
      `;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss
    version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:media="http://search.yahoo.com/mrss/"
  >
    <channel>
      <title>nyphren</title>
      <link>${siteUrl}</link>
      <description>Writing, systems, and strange ideas</description>
      ${items.join("")}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}
