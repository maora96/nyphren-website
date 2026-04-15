import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
    });

    return NextResponse.json({
      success: true,
      count: response.results.length,
      results: response.results,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
