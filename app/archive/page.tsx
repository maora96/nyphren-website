import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getNewsletterArchivePosts } from "@/lib/blog";

export const revalidate = 60;

export default async function NewsletterArchivePage() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get("newsletter_access")?.value;

  console.log("Access cookie:", accessCookie); // Debugging line
  console.log("Expected key:", process.env.NEWSLETTER_ARCHIVE_KEY); // Debugging line

  if (
    !process.env.NEWSLETTER_ARCHIVE_KEY ||
    accessCookie !== process.env.NEWSLETTER_ARCHIVE_KEY
  ) {
    //redirect("/subscribe");
  }

  const posts = await getNewsletterArchivePosts();

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      <section className="relative overflow-hidden bg-[#30253E] px-6 py-20 text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_38%)]" />

        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-10 inline-block text-2xl tracking-wide text-[#C3D88C] [font-family:var(--font-playfair),serif]"
          >
            nyphren
          </Link>

          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Subscriber archive
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            newsletter exclusives
          </h1>

          <p className="max-w-2xl text-[16px] leading-8 text-white/75">
            Writing that lives outside the public blog.
          </p>
        </div>
      </section>

      <section className="-mt-8 px-6 pb-24 md:-mt-10">
        <div className="mx-auto grid max-w-5xl gap-8">
          {posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/archive/${post.slug}`}
              className="block"
            >
              <article
                key={post.id}
                className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#f3efe7] p-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply">
                  <img
                    src="/bg-paper-texture.avif"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-[#638872] px-3 py-1 text-xs text-white">
                      Newsletter exclusive
                    </span>
                  </div>

                  <h2 className="mb-4 text-4xl text-[#30253E] [font-family:var(--font-playfair),serif]">
                    {post.title}
                  </h2>

                  <p className="mb-4 text-sm text-[#7a7578]">
                    {post.publishDate}
                  </p>

                  <p className="text-[16px] leading-8 text-[#4f4b52]">
                    {post.excerpt}
                  </p>

                  <p className="mt-6 text-sm font-medium text-[#638872]">
                    Read full post →
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
