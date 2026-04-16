import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getPageBlocks, getPostBySlug } from "@/lib/blog";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsletterArchivePostPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get("newsletter_access")?.value;

  if (
    !process.env.NEWSLETTER_ARCHIVE_KEY ||
    accessCookie !== process.env.NEWSLETTER_ARCHIVE_KEY
  ) {
    redirect("/subscribe");
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.showOnBlog) {
    notFound();
  }

  const blocks = await getPageBlocks(post.id);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />

        <div className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/archive"
            className="mb-10 inline-block text-sm text-[#C3D88C] transition hover:opacity-80"
          >
            ← back to archive
          </Link>

          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Newsletter exclusive
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            {post.title}
          </h1>

          {post.publishDate && (
            <p className="text-sm text-white/65">{post.publishDate}</p>
          )}
        </div>
      </section>

      <article className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6f1e8] via-[#f3efe7] to-[#ebe5da] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply">
              <img
                src="/bg-paper-texture.avif"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-10">
              {post.coverUrl ? (
                <div className="mb-8 overflow-hidden rounded-[1.5rem]">
                  <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : null}

              {blocks.map((block, i) => {
                if (!block.text) return null;

                if (block.type === "heading_1") {
                  return (
                    <h2
                      key={i}
                      className="mb-5 mt-10 text-4xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "heading_2") {
                  return (
                    <h3
                      key={i}
                      className="mb-4 mt-8 text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "heading_3") {
                  return (
                    <h4
                      key={i}
                      className="mb-4 mt-6 text-2xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {block.text}
                    </h4>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-8 border-l-4 border-[#94C7B4] pl-5 text-[18px] italic leading-9 text-[#4f4b52]"
                    >
                      {block.text}
                    </blockquote>
                  );
                }

                if (block.type === "bulleted_list_item") {
                  return (
                    <li
                      key={i}
                      className="ml-6 list-disc text-[18px] leading-9 text-[#4f4b52]"
                    >
                      {block.text}
                    </li>
                  );
                }

                if (block.type === "numbered_list_item") {
                  return (
                    <li
                      key={i}
                      className="ml-6 list-decimal text-[18px] leading-9 text-[#4f4b52]"
                    >
                      {block.text}
                    </li>
                  );
                }

                return (
                  <p
                    key={i}
                    className="mb-5 text-[18px] leading-9 text-[#4f4b52]"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
