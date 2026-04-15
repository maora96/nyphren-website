import { notion, NOTION_DATA_SOURCE_ID } from "./notion";

export type BlogPostMeta = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  publishDate: string | null;
  tags: string[];
  featured: boolean;
};

type RichTextItem = {
  plain_text?: string;
};

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
  };
}

export async function getAllPublishedPosts(): Promise<BlogPostMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
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
    data_source_id: NOTION_DATA_SOURCE_ID,
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
