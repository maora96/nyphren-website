import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getNewsletterPosts,
  getPageBlocks,
  markNewsletterSent,
  renderBlocksToHtml,
} from "@/lib/blog";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error("Missing RESEND_FROM_EMAIL");
    }

    if (!process.env.RESEND_SEGMENT_ID) {
      throw new Error("Missing RESEND_SEGMENT_ID");
    }

    const authHeader = req.headers.get("authorization");

    if (!process.env.NEWSLETTER_API_SECRET) {
      throw new Error("Missing NEWSLETTER_API_SECRET");
    }

    if (authHeader !== `Bearer ${process.env.NEWSLETTER_API_SECRET}`) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const {
      introText,
      postsCount = 3,
      includeNewsletterOnly = true,
      subject,
    } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const posts = await getNewsletterPosts({
      limit: postsCount,
      includeNewsletterOnly,
    });

    if (!posts.length) {
      return NextResponse.json({
        success: false,
        message: "No posts available",
      });
    }

    const publicPosts = posts.filter((p) => p.showOnBlog);
    const exclusivePosts = posts.filter((p) => !p.showOnBlog);
    const archiveUrl = `https://nyphren.com/api/newsletter/access?key=${process.env.NEWSLETTER_ARCHIVE_KEY}`;

    const publicHtml = await Promise.all(
      publicPosts.map(async (post) => {
        const postUrl = `https://nyphren.com/blog/${post.slug}`;

        return `
          <div style="margin-top: 18px; background: rgba(255,255,255,0.42); border: 1px solid rgba(0,0,0,0.04); border-radius: 24px; padding: 22px;">
            ${
              post.coverUrl
                ? `
              <div style="margin-bottom:16px; border-radius:20px; overflow:hidden;">
                <img
                  src="${post.coverUrl}"
                  alt="${post.title}"
                  style="display:block; width:100%; height:auto; max-height:260px; object-fit:cover;"
                />
              </div>
            `
                : ""
            }

            <div style="font-family: Georgia, serif; font-size: 28px; color:#30253E; margin-bottom:10px;">
              ${post.title}
            </div>

            <div style="font-size:15px; line-height:1.8; color:#4f4b52; margin-bottom:14px;">
              ${post.excerpt}
            </div>

            ${
              post.tags?.length
                ? `
              <div style="margin-bottom:18px;">
                ${post.tags
                  .map(
                    (tag) => `
                  <span style="display:inline-block; margin:0 8px 8px 0; padding:6px 12px; border-radius:999px; background:#d9ddd2; color:#4c5147; font-size:12px;">
                    ${tag}
                  </span>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }

            <a
              href="${postUrl}"
              style="display:inline-block; padding:10px 16px; border-radius:999px; background:linear-gradient(90deg,#638872,#94C7B4); color:#fff; text-decoration:none;"
            >
              Read the full post
            </a>
          </div>
        `;
      }),
    );

    const exclusiveHtml = await Promise.all(
      exclusivePosts.map(async (post) => {
        const blocks = await getPageBlocks(post.id);
        const fullHtml = renderBlocksToHtml(blocks);

        return `
          <div style="margin-top: 28px; background:#ffffff; border-radius:28px; padding:28px; box-shadow:0 12px 40px rgba(0,0,0,0.12);">
            <div style="margin-bottom:12px;">
              <span style="display:inline-block; padding:6px 12px; border-radius:999px; background:#638872; color:#fff; font-size:12px; letter-spacing:0.05em;">
                ✦ Newsletter exclusive
              </span>
            </div>

            <div style="font-family: Georgia, serif; font-size:34px; line-height:1.1; color:#30253E; margin-bottom:16px;">
              ${post.title}
            </div>

            ${
              post.coverUrl
                ? `
              <div style="margin-bottom:20px; border-radius:20px; overflow:hidden;">
                <img
                  src="${post.coverUrl}"
                  alt="${post.title}"
                  style="display:block; width:100%; height:auto; max-height:320px; object-fit:cover;"
                />
              </div>
            `
                : ""
            }

            ${
              post.tags?.length
                ? `
              <div style="margin-bottom:18px;">
                ${post.tags
                  .map(
                    (tag) => `
                  <span style="display:inline-block; margin:0 8px 8px 0; padding:6px 12px; border-radius:999px; background:#d9ddd2; color:#4c5147; font-size:12px;">
                    ${tag}
                  </span>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }

            <div style="font-size:16px; line-height:1.9; color:#4f4b52;">
              ${fullHtml}
            </div>
          </div>
        `;
      }),
    );

    const finalSubject = subject || "New writing from nyphren ✦";

    const html = `
      <div style="margin:0; padding:0; background:#30253E; width:100%; font-family: Inter, Arial, sans-serif; color:#f7f4ee;">
        <div style="max-width:680px; margin:0 auto; padding:48px 20px;">
          <div style="text-align:center; padding:12px 0 40px;">
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size:40px; line-height:1.05; color:#f7f4ee; margin-bottom:14px;">
              nyphren
            </div>

            <div style="font-size:12px; letter-spacing:0.22em; text-transform:uppercase; color:#94C7B4; margin-bottom:18px;">
              Newsletter
            </div>

            <div style="max-width:560px; margin:0 auto; font-size:16px; line-height:1.8; color:rgba(247,244,238,0.78);">
              ${introText || ""}
            </div>
          </div>

          <div style="background:linear-gradient(135deg,#f6f1e8 0%,#f3efe7 55%,#ebe5da 100%); border-radius:32px; padding:28px; box-shadow:0 20px 50px rgba(0,0,0,0.18);">
            <div style="font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#638872; margin-bottom:12px;">
              Latest writing
            </div>

            ${publicHtml.join("")}

            ${
              exclusiveHtml.length
                ? `
              <div style="margin-top:32px; padding-top:24px; border-top:1px solid rgba(0,0,0,0.08);">
                <div style="font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#638872; margin-bottom:12px;">
                  For subscribers only
                </div>
                ${exclusiveHtml.join("")}
              </div>
            `
                : ""
            }
          </div>

          <div style="padding:28px 8px 0; text-align:center; font-size:13px; line-height:1.8; color:rgba(247,244,238,0.55);">
            You’re receiving this because you subscribed to nyphren.
            <br /><br />
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#94C7B4; text-decoration:none;">
              Unsubscribe
            </a>
          </div>
          <p style="margin-top:24px; text-align:center;">
  <a
    href="${archiveUrl}"
    style="color:#94C7B4; text-decoration:none;"
  >
    Open the subscriber archive
  </a>
</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.broadcasts.create({
      segmentId: process.env.RESEND_SEGMENT_ID,
      from: `nyphren <${process.env.RESEND_FROM_EMAIL}>`,
      subject: finalSubject,
      html,
      send: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    for (const post of posts) {
      await markNewsletterSent(post.id);
    }

    return NextResponse.json({
      success: true,
      sent: posts.length,
      subject: finalSubject,
      broadcastId: data?.id,
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
