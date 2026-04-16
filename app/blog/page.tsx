import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/blog";
import Nav from "../components/navbar";
import NewsletterForm from "../components/newsletter";
export const revalidate = 60;
export default async function BlogPage() {
  const posts = await getAllPublishedPosts();
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const otherPosts = posts.filter((post) => post.id !== featuredPost?.id);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black">
      {/* HERO + HEADER */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_38%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#94C7B433_0%,transparent_30%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(48,37,62,0.15)_45%,rgba(48,37,62,0.45)_100%)]" />

        <Nav />

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pb-28 md:pt-24">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Blog
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            My thoughts
            <br className="hidden md:block" /> on a bajillion things
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75 [font-family:var(--font-inter)]">
            Mostly on writing, games and storytelling in general
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="-mt-8 px-6 pb-12 md:-mt-10">
          <div className="mx-auto max-w-6xl">
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <article className="group relative overflow-hidden rounded-[2rem] bg-[#f3efe7] shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition hover:-translate-y-1">
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply">
                  <img
                    src="/bg-paper-texture.avif"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid gap-8 px-8 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-10">
                  <div className="relative z-10">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#638872]">
                      Featured Post
                    </p>

                    <h2 className="mb-4 max-w-[14ch] text-4xl leading-[1.02] text-[#30253E] md:text-5xl [font-family:var(--font-playfair),serif]">
                      {featuredPost.title}
                    </h2>

                    <p className="mb-6 max-w-[58ch] text-[15px] leading-8 text-[#4f4b52]">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#d9ddd2] px-3 py-1 text-[#4c5147]"
                        >
                          {tag}
                        </span>
                      ))}
                      {featuredPost.publishDate && (
                        <span className="text-[#7a7578]">
                          | {featuredPost.publishDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#94C7B4]/35 via-[#f3efe7] to-[#30253E]/10">
                    {featuredPost.coverUrl ? (
                      <>
                        <img
                          src={featuredPost.coverUrl}
                          alt={featuredPost.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff33_0%,transparent_55%)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#638872]/35 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff66_0%,transparent_55%)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#638872]/30 to-transparent" />
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]">
              Latest posts
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {otherPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                <article
                  className={`group relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#f3efe7]/88 p-7 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)] ${
                    index % 2 === 1 ? "md:translate-y-6" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply">
                    <img
                      src="/bg-paper-texture.avif"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#94C7B4]/10" />

                  <div className="relative z-10">
                    <h3 className="mb-4 max-w-[14ch] text-4xl leading-[1.02] text-[#30253E] [font-family:var(--font-playfair),serif]">
                      {post.title}
                    </h3>

                    <p className="mb-6 max-w-[46ch] text-[15px] leading-8 text-[#4f4b52]">
                      {post.excerpt}
                    </p>

                    <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#d9ddd2]/90 px-3 py-1 text-[#4c5147]"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.publishDate && (
                        <span className="text-[#7a7578]">
                          | {post.publishDate}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />

      <footer className="border-t border-white/10 bg-[#30253E] px-6 py-10 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} nyphren</p>
      </footer>
    </main>
  );
}
