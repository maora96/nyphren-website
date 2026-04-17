import { notion, NOTION_PUBLISHED_WORKS_DATA_SOURCE_ID } from "./notion";

export type PublishedWorkMeta = {
  id: string;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  publishDate: string | null;
  tags: string[];
  featured: boolean;
  coverUrl: string | null;
  url: string | null;
};

type RichTextItem = {
  plain_text?: string;
};

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

export async function getAllPublishedWorks(): Promise<PublishedWorkMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_PUBLISHED_WORKS_DATA_SOURCE_ID,
    filter: {
      property: "published",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "publish_date",
        direction: "descending",
      },
    ],
  });

  return response.results
    .map(mapPageToPublishedWorksMeta)
    .filter((work) => work.slug && work.title);
}

export async function getPublishedWorkBySlug(
  slug: string,
): Promise<PublishedWorkMeta | null> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_PUBLISHED_WORKS_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: "published",
          checkbox: { equals: true },
        },
        {
          property: "slug",
          rich_text: { equals: slug },
        },
      ],
    },
    page_size: 1,
  });

  const page = response.results[0];
  if (!page) return null;
  return mapPageToPublishedWorksMeta(page);
}

function mapPageToPublishedWorksMeta(page: any): PublishedWorkMeta {
  return {
    id: page.id,
    title: richTextToPlainText(page.properties?.Name?.title),
    slug: richTextToPlainText(page.properties?.slug?.rich_text),
    description: richTextToPlainText(page.properties?.description?.rich_text),
    publishDate: page.properties?.publish_date?.date?.start ?? null,
    tags: (page.properties?.tags?.multi_select ?? []).map(
      (tag: { name: string }) => tag.name,
    ),
    featured: Boolean(page.properties?.featured?.checkbox),
    coverUrl: getCoverUrl(page),
    published: Boolean(page.properties?.published?.checkbox),
    url: page.properties?.url?.url ?? null,
  };
}

export type PublishedWorkBlock =
  | { type: "paragraph"; text: string; richText: RichTextSpan[] }
  | { type: "heading_1"; text: string; richText: RichTextSpan[] }
  | { type: "heading_2"; text: string; richText: RichTextSpan[] }
  | { type: "heading_3"; text: string; richText: RichTextSpan[] }
  | { type: "bulleted_list_item"; text: string; richText: RichTextSpan[] }
  | { type: "numbered_list_item"; text: string; richText: RichTextSpan[] }
  | { type: "quote"; text: string; richText: RichTextSpan[] }
  | {
      type: "image";
      text: string;
      imageUrl: string | null;
      caption?: string;
      richText: RichTextSpan[];
    }
  | { type: "unsupported"; text: ""; richText: RichTextSpan[] };

function blockText(block: any): string {
  const richText = block?.[block.type]?.rich_text ?? [];
  return richText.map((item: any) => item.plain_text ?? "").join("");
}

export async function getPublishedWorkBlocks(
  pageId: string,
): Promise<PublishedWorkBlock[]> {
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
      "image",
    ];

    if (!supported.includes(block.type)) {
      return { type: "unsupported", text: "" } as PublishedWorkBlock;
    }

    if (block.type === "image") {
      const imageUrl =
        block.image?.type === "external"
          ? (block.image.external?.url ?? null)
          : block.image?.type === "file"
            ? (block.image.file?.url ?? null)
            : null;

      const caption =
        block.image?.caption
          ?.map((item: any) => item.plain_text ?? "")
          .join("") ?? "";

      return {
        type: "image",
        text: "",
        richText: [],
        imageUrl,
        caption,
      } as PublishedWorkBlock;
    }

    const richText = block?.[block.type]?.rich_text ?? [];

    return {
      type: block.type,
      text: blockText(block),
      richText: mapRichText(richText),
    } as PublishedWorkBlock;
  });
}

export type RichTextSpan = {
  text: string;
  href: string | null;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
};

function mapRichText(richText: any[] = []): RichTextSpan[] {
  return richText.map((item) => ({
    text: item.plain_text ?? "",
    href: item.href ?? item.text?.link?.url ?? null,
    bold: Boolean(item.annotations?.bold),
    italic: Boolean(item.annotations?.italic),
    underline: Boolean(item.annotations?.underline),
    strikethrough: Boolean(item.annotations?.strikethrough),
    code: Boolean(item.annotations?.code),
  }));
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
