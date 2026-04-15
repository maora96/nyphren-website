import { NextResponse } from "next/server";
import { getAllPublishedPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = await getAllPublishedPosts();

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
