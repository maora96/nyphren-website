import { NextRequest, NextResponse } from "next/server";

type SubscribeBody = {
  email?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email }: SubscribeBody = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email." },
        { status: 400 },
      );
    }

    if (!process.env.MAILERLITE_API_KEY) {
      return NextResponse.json(
        { success: false, message: "MailerLite is not configured." },
        { status: 500 },
      );
    }

    const payload: Record<string, unknown> = {
      email,
      status: "active",
    };

    if (process.env.MAILERLITE_GROUP_ID) {
      payload.groups = [process.env.MAILERLITE_GROUP_ID];
    }

    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.errors?.email?.[0] ||
        "Something went wrong. Please try again.";

      return NextResponse.json(
        { success: false, message },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You’re in. New posts will land in your inbox.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
