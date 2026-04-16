import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (!process.env.NEWSLETTER_ARCHIVE_KEY) {
    return new NextResponse("Missing NEWSLETTER_ARCHIVE_KEY", { status: 500 });
  }

  if (!key || key !== process.env.NEWSLETTER_ARCHIVE_KEY) {
    return new NextResponse("Invalid access link", { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/archive", req.url));

  response.cookies.set(
    "newsletter_access",
    process.env.NEWSLETTER_ARCHIVE_KEY,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
  );

  return response;
}
