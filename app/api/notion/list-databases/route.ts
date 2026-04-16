import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const response = await notion.search({
      filter: {
        property: "object",
        value: "data_source",
      },
    });

    const results = response.results.map((item: any) => ({
      id: item.id,
      name: item.title?.[0]?.plain_text ?? "Untitled",
    }));

    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
