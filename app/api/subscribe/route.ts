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

    if (!process.env.RESEND_FROM_EMAIL) {
      return NextResponse.json(
        { success: false, message: "Missing RESEND_FROM_EMAIL" },
        { status: 500 },
      );
    }

    if (!process.env.NEWSLETTER_ARCHIVE_KEY) {
      return NextResponse.json(
        { success: false, message: "Missing NEWSLETTER_ARCHIVE_KEY" },
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
          id: process.env.RESEND_SEGMENT_ID,
        },
      ],
    });

    // If the contact already exists, Resend may return an error.

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }

    const archiveUrl = `https://nyphren.com/api/newsletter/access?key=${process.env.NEWSLETTER_ARCHIVE_KEY}`;

    const welcomeHtml = `
      <div style="margin:0; padding:0; background:#30253E; width:100%; font-family: Inter, Arial, sans-serif; color:#f7f4ee;">
        <div style="max-width:680px; margin:0 auto; padding:48px 20px;">
          <div style="text-align:center; padding:12px 0 40px;">
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size:40px; line-height:1.05; color:#f7f4ee; margin-bottom:14px;">
              nyphren
            </div>

            <div style="font-size:12px; letter-spacing:0.22em; text-transform:uppercase; color:#94C7B4; margin-bottom:18px;">
              Welcome
            </div>

            <div style="font-family: Georgia, 'Times New Roman', serif; font-size:42px; line-height:1.08; color:#f7f4ee; margin-bottom:18px;">
              you’re in
            </div>

            <div style="max-width:560px; margin:0 auto;">
  <div style="
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    border-radius: 20px;
    padding: 22px 24px;
    text-align: justify;
    font-size:16px;
    line-height:1.9;
    color:rgba(247,244,238,0.85);
  ">
    Thanks for subscribing. Here's how this newsletter works: I send out an email on the week that I publish something new on the blog, plus occasional subscriber-only content that doesn’t appear on the public site. I'm a very occasional writer, so I promise I won't spam you. Quite the contrary — you can expect to receive an email from me once in a blue moon, and only when I have something I think is worth sharing. Thank you again and welcome!
  </div>
</div>
          </div>

          <div style="background:linear-gradient(135deg,#f6f1e8 0%,#f3efe7 55%,#ebe5da 100%); border-radius:32px; padding:28px; box-shadow:0 20px 50px rgba(0,0,0,0.18);">
            <div style="font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#638872; margin-bottom:12px;">
              A few useful links
            </div>

            <div style="background: rgba(255,255,255,0.42); border: 1px solid rgba(0,0,0,0.04); border-radius: 24px; padding: 22px;">
              <div style="font-family: Georgia, serif; font-size: 28px; color:#30253E; margin-bottom:10px;">
                Subscriber archive
              </div>

              <div style="font-size:15px; line-height:1.8; color:#4f4b52; margin-bottom:18px;">
                Read newsletter-exclusive posts that don’t appear on the public blog.
              </div>

              <a
                href="${archiveUrl}"
                style="display:inline-block; padding:10px 16px; border-radius:999px; background:linear-gradient(90deg,#638872,#94C7B4); color:#fff; text-decoration:none;"
              >
                Open the archive
              </a>
            </div>

            <div style="margin-top:18px; background: rgba(255,255,255,0.42); border: 1px solid rgba(0,0,0,0.04); border-radius: 24px; padding: 22px;">
              <div style="font-family: Georgia, serif; font-size: 28px; color:#30253E; margin-bottom:10px;">
                Public blog
              </div>

              <div style="font-size:15px; line-height:1.8; color:#4f4b52; margin-bottom:18px;">
                Browse public posts on writing, the creative process, and more.
              </div>

              <a
                href="https://nyphren.com/blog"
                style="display:inline-block; padding:10px 16px; border-radius:999px; background:#30253E; color:#fff; text-decoration:none;"
              >
                Visit the blog
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const { error: welcomeError } = await resend.emails.send({
      from: `nyphren <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "Welcome to nyphren ✦",
      html: welcomeHtml,
    });

    if (welcomeError) {
      return NextResponse.json(
        {
          success: false,
          message: `Subscribed, but failed to send welcome email: ${welcomeError.message}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You’re in. Check your inbox for the welcome email.",
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
