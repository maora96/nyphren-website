import { NextResponse } from "next/server";
import { getAllPublishedProjects } from "@/lib/projects";

export async function GET() {
  try {
    const projects = await getAllPublishedProjects();

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
