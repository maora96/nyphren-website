import { notion, NOTION_BLOG_DATA_SOURCE_ID } from "./notion";

export type BlogPostMeta = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  publishDate: string | null;
  tags: string[];
  featured: boolean;
  coverUrl: string | null;
  showOnBlog: boolean;
};
type RichTextItem = {
  plain_text?: string;
};

export async function getNewsletterPosts({
  limit,
  includeNewsletterOnly,
}: {
  limit: number;
  includeNewsletterOnly: boolean;
}): Promise<BlogPostMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_BLOG_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "send_to_newsletter",
          checkbox: { equals: true },
        },
        {
          property: "newsletter_sent",
          checkbox: { equals: false },
        },
      ],
    },
    sorts: [
      {
        property: "publish_date",
        direction: "descending",
      },
    ],
  });

  let posts = response.results
    .map(mapPageToPostMeta)
    .filter((post) => post.slug && post.title);

  if (!includeNewsletterOnly) {
    posts = posts.filter((post) => post.showOnBlog);
  }

  return posts.slice(0, limit);
}

export async function getPendingNewsletterPosts(): Promise<BlogPostMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_BLOG_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "newsletter_sent",
          checkbox: {
            equals: false,
          },
        },
      ],
    },
    sorts: [
      {
        property: "publish_date",
        direction: "ascending",
      },
    ],
  });

  return response.results
    .map(mapPageToPostMeta)
    .filter((post) => post.slug && post.title);
}

export async function markNewsletterSent(pageId: string) {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      newsletter_sent: {
        checkbox: true,
      },
    },
  });
}

function getCoverUrl(page: any): string | null {
  const cover = page.cover;
  if (!cover) return null;

  if (cover.type === "external") {
    return cover.external?.url ?? null;
  }

  if (cover.type === "file") {
    return cover.file?.url ?? null;
  }

  return null;
}

function richTextToPlainText(value: RichTextItem[] | undefined): string {
  if (!value || !Array.isArray(value)) return "";
  return value.map((item) => item.plain_text ?? "").join("");
}

function mapPageToPostMeta(page: any): BlogPostMeta {
  return {
    id: page.id,
    title: richTextToPlainText(page.properties?.Name?.title),
    slug: richTextToPlainText(page.properties?.slug?.rich_text),
    excerpt: richTextToPlainText(page.properties?.excerpt?.rich_text),
    published: Boolean(page.properties?.published?.checkbox),
    publishDate: page.properties?.publish_date?.date?.start ?? null,
    tags: (page.properties?.tags?.multi_select ?? []).map(
      (tag: { name: string }) => tag.name,
    ),
    featured: Boolean(page.properties?.featured?.checkbox),
    coverUrl: getCoverUrl(page),
    showOnBlog: Boolean(page.properties?.show_on_blog?.checkbox),
  };
}

export async function getAllPublishedPosts(): Promise<BlogPostMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_BLOG_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "show_on_blog",
          checkbox: { equals: true },
        },
      ],
    },
    sorts: [
      {
        property: "publish_date",
        direction: "descending",
      },
    ],
  });

  return response.results
    .map(mapPageToPostMeta)
    .filter((post) => post.slug && post.title);
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPostMeta | null> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_BLOG_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
    page_size: 1,
  });

  const page = response.results[0];
  if (!page) return null;

  return mapPageToPostMeta(page);
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading_1"; text: string }
  | { type: "heading_2"; text: string }
  | { type: "heading_3"; text: string }
  | { type: "bulleted_list_item"; text: string }
  | { type: "numbered_list_item"; text: string }
  | { type: "quote"; text: string }
  | { type: "unsupported"; text: "" };

function blockText(block: any): string {
  const richText = block?.[block.type]?.rich_text ?? [];
  return richTextToPlainText(richText);
}

export async function getPageBlocks(pageId: string): Promise<BlogBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return response.results.map((block: any) => {
    const supported = [
      "paragraph",
      "heading_1",
      "heading_2",
      "heading_3",
      "bulleted_list_item",
      "numbered_list_item",
      "quote",
    ];

    if (!supported.includes(block.type)) {
      return { type: "unsupported", text: "" } as BlogBlock;
    }

    return {
      type: block.type,
      text: blockText(block),
    } as BlogBlock;
  });
}

export function renderBlocksToHtml(
  blocks: Array<{ type: string; text: string }>,
): string {
  return blocks
    .map((block) => {
      if (!block.text) return "";

      const text = block.text;

      if (block.type === "heading_1") {
        return `<h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 34px; line-height: 1.1; color: #30253E; margin: 28px 0 14px;">${text}</h1>`;
      }

      if (block.type === "heading_2") {
        return `<h2 style="font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 1.15; color: #30253E; margin: 24px 0 12px;">${text}</h2>`;
      }

      if (block.type === "heading_3") {
        return `<h3 style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; line-height: 1.2; color: #30253E; margin: 20px 0 10px;">${text}</h3>`;
      }

      if (block.type === "quote") {
        return `<blockquote style="margin: 22px 0; padding-left: 16px; border-left: 4px solid #94C7B4; color: #4f4b52; font-style: italic; line-height: 1.8;">${text}</blockquote>`;
      }

      if (block.type === "bulleted_list_item") {
        return `<li style="margin: 8px 0; color: #4f4b52; line-height: 1.8;">${text}</li>`;
      }

      if (block.type === "numbered_list_item") {
        return `<li style="margin: 8px 0; color: #4f4b52; line-height: 1.8;">${text}</li>`;
      }

      return `<p style="margin: 0 0 16px; color: #4f4b52; font-size: 16px; line-height: 1.9;">${text}</p>`;
    })
    .join("");
}

export async function getNewsletterArchivePosts(): Promise<BlogPostMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_BLOG_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "send_to_newsletter",
          checkbox: { equals: true },
        },
        {
          property: "show_on_blog",
          checkbox: { equals: false },
        },
      ],
    },
    sorts: [
      {
        property: "publish_date",
        direction: "descending",
      },
    ],
  });

  return response.results
    .map(mapPageToPostMeta)
    .filter((post) => post.slug && post.title);
}

export function calculateReadingTimeFromBlocks(
  blocks: Array<{ type: string; text: string }>,
): string {
  const fullText = blocks
    .map((block) => block.text ?? "")
    .join(" ")
    .trim();

  const words = fullText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min`;
}
