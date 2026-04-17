import { notion, NOTION_PROJECTS_DATA_SOURCE_ID } from "./notion";

export type ProjectMeta = {
  id: string;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  publishDate: string | null;
  tags: string[];
  featured: boolean;
  status: string | null;
  coverUrl: string | null;
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

function mapPageToProjectMeta(page: any): ProjectMeta {
  return {
    id: page.id,
    title: richTextToPlainText(page.properties?.Name?.title),
    slug: richTextToPlainText(page.properties?.slug?.rich_text),
    description: richTextToPlainText(page.properties?.description?.rich_text),
    published: Boolean(page.properties?.published?.checkbox),
    publishDate: page.properties?.publish_date?.date?.start ?? null,
    tags: (page.properties?.tags?.multi_select ?? []).map(
      (tag: { name: string }) => tag.name,
    ),
    featured: Boolean(page.properties?.featured?.checkbox),
    status: page.properties?.status?.select?.name ?? null,
    coverUrl: getCoverUrl(page),
  };
}

export async function getAllPublishedProjects(): Promise<ProjectMeta[]> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_PROJECTS_DATA_SOURCE_ID,
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
    .map(mapPageToProjectMeta)
    .filter((project) => project.slug && project.title);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectMeta | null> {
  const response = await notion.dataSources.query({
    data_source_id: NOTION_PROJECTS_DATA_SOURCE_ID,
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

  return mapPageToProjectMeta(page);
}

export type ProjectBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading_1"; text: string }
  | { type: "heading_2"; text: string }
  | { type: "heading_3"; text: string }
  | { type: "bulleted_list_item"; text: string }
  | { type: "numbered_list_item"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; text: string; imageUrl: string | null; caption?: string }
  | { type: "unsupported"; text: "" };

function blockText(block: any): string {
  const richText = block?.[block.type]?.rich_text ?? [];
  return richTextToPlainText(richText);
}

export async function getProjectBlocks(
  pageId: string,
): Promise<ProjectBlock[]> {
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

    if (block.type === "image") {
      const imageUrl =
        block.image?.type === "external"
          ? (block.image.external?.url ?? null)
          : block.image?.type === "file"
            ? (block.image.file?.url ?? null)
            : null;

      const caption = richTextToPlainText(block.image?.caption ?? []);

      return {
        type: "image",
        text: "",
        imageUrl,
        caption,
      } as ProjectBlock;
    }

    if (!supported.includes(block.type)) {
      return { type: "unsupported", text: "" } as ProjectBlock;
    }

    return {
      type: block.type,
      text: blockText(block),
    } as ProjectBlock;
  });
}
