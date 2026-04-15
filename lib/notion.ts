import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  throw new Error("Missing NOTION_API_KEY");
}

if (!process.env.NOTION_DATA_SOURCE_ID) {
  throw new Error("Missing NOTION_DATA_SOURCE_ID");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID;
