import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  try {
    const response = await notion.search({
      filter: {
        property: "object",
        value: "data_source",
      },
    });

    return NextResponse.json({
      success: true,
      databases: response.results.map((db: any) => ({
        id: db.id,
        title: db.title?.[0]?.plain_text,
      })),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
