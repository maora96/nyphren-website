import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Missing RESEND_API_KEY" },
        { status: 500 },
      );
    }

    if (!process.env.RESEND_SEGMENT_ID) {
      return NextResponse.json(
        { success: false, message: "Missing RESEND_SEGMENT_ID" },
        { status: 500 },
      );
    }

    const { email } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email." },
        { status: 400 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [
        {
          id: process.env.RESEND_SEGMENT_ID!,
        },
      ],
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You’re in. New posts will land in your inbox.",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
