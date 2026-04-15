import Link from "next/link";

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page ?? "1", 10) || 1,
  );

  const featuredPost = {
    title: "The cost of saving a world",
    excerpt:
      "Saving a world is never free, and the price might not be what you expect. A reflection on sacrifice, narrative tension, and emotional aftermath in fantasy storytelling.",
    tags: ["Fantasy", "Writing"],
    date: "April 13, 2026",
    readTime: "3 min read",
    slug: "the-cost-of-saving-a-world",
  };

  const posts = [
    {
      title: "Designing interactive fiction systems",
      excerpt:
        "A look behind the curtain at how I design and code interactive stories and games.",
      tags: ["Interactive Fiction"],
      date: "April 6, 2026",
      readTime: "5 min read",
      slug: "designing-interactive-fiction-systems",
    },
    {
      title: "Why I build weird projects",
      excerpt:
        "I've always loved building things no-one else cared to. Here's why I think you should too.",
      tags: ["Experiments", "Coding"],
      date: "March 21, 2026",
      readTime: "2 min read",
      slug: "why-i-build-weird-projects",
    },
    {
      title: "Building atmosphere through interface",
      excerpt:
        "How color, spacing, texture, and typography can make a page feel like a place.",
      tags: ["Design", "Web"],
      date: "March 10, 2026",
      readTime: "4 min read",
      slug: "building-atmosphere-through-interface",
    },
    {
      title: "On making things a little stranger",
      excerpt:
        "Some thoughts on creative risk, mood, and why overly polished work can lose its soul.",
      tags: ["Process"],
      date: "February 26, 2026",
      readTime: "3 min read",
      slug: "on-making-things-a-little-stranger",
    },
    {
      title: "Narrative UI and emotional tone",
      excerpt:
        "Why interface choices can completely change the mood of a story-driven experience.",
      tags: ["Design", "Writing"],
      date: "February 14, 2026",
      readTime: "4 min read",
      slug: "narrative-ui-and-emotional-tone",
    },
    {
      title: "Small systems that make worlds feel real",
      excerpt:
        "A few thoughts on interaction, repetition, and detail in worldbuilding-heavy projects.",
      tags: ["Worldbuilding", "Dev"],
      date: "January 30, 2026",
      readTime: "6 min read",
      slug: "small-systems-that-make-worlds-feel-real",
    },
  ];

  const postsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedPosts = posts.slice(
    (safePage - 1) * postsPerPage,
    safePage * postsPerPage,
  );

  const createPageHref = (page: number) => {
    return page <= 1 ? "/blog" : `/blog?page=${page}`;
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black">
      {/* HERO + HEADER */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_38%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#94C7B433_0%,transparent_30%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(48,37,62,0.15)_45%,rgba(48,37,62,0.45)_100%)]" />

        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#30253E]/55 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
            <Link
              href="/"
              className="text-2xl tracking-wide text-[#C3D88C] [font-family:var(--font-playfair),serif]"
            >
              nyphren
            </Link>

            <div className="flex gap-8 text-sm text-white/75">
              <Link
                href="/blog"
                className="text-[#C3D88C] transition hover:opacity-80"
              >
                blog
              </Link>
              <Link href="/projects" className="transition hover:text-white">
                projects
              </Link>
              <Link href="/about" className="transition hover:text-white">
                about
              </Link>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pb-28 md:pt-24">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Blog
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            Writing, systems,
            <br className="hidden md:block" /> and strange ideas
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75">
            Thoughts on interactive fiction, development, design, and the
            occasional weird project.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      {safePage === 1 && (
        <section className="-mt-8 px-6 pb-12 md:-mt-10">
          <div className="mx-auto max-w-6xl">
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <article className="group relative overflow-hidden rounded-[2rem] bg-[#f3efe7]/92 shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition hover:-translate-y-1">
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
                      <span className="text-[#7a7578]">
                        | {featuredPost.date}
                      </span>
                    </div>

                    <p className="text-sm text-[#7a7578]">
                      {featuredPost.readTime}
                    </p>
                  </div>

                  <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#94C7B4]/35 via-[#f3efe7] to-[#30253E]/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff66_0%,transparent_55%)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#638872]/30 to-transparent" />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]">
              {safePage === 1 ? "Latest posts" : `Page ${safePage}`}
            </h2>

            <div className="hidden gap-2 md:flex">
              <button className="rounded-full bg-[#638872] px-4 py-2 text-sm text-white">
                All
              </button>
              <button className="rounded-full bg-[#e6e1d8] px-4 py-2 text-sm text-[#5c565c]">
                Writing
              </button>
              <button className="rounded-full bg-[#e6e1d8] px-4 py-2 text-sm text-[#5c565c]">
                Dev
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {paginatedPosts.map((post, index) => (
              <Link
                key={post.title}
                href={`/blog/${post.slug}`}
                className="block"
              >
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
                      <span className="text-[#7a7578]">| {post.date}</span>
                    </div>

                    <p className="text-sm text-[#7a7578]">{post.readTime}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <Link
              href={createPageHref(Math.max(1, safePage - 1))}
              aria-disabled={safePage === 1}
              className={`rounded-full px-4 py-2 text-sm transition ${
                safePage === 1
                  ? "pointer-events-none bg-[#e6e1d8] text-[#9b9597]"
                  : "bg-[#e6e1d8] text-[#5c565c] hover:bg-[#d9ddd2]"
              }`}
            >
              Previous
            </Link>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={createPageHref(page)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  page === safePage
                    ? "bg-[#638872] text-white"
                    : "bg-[#e6e1d8] text-[#5c565c] hover:bg-[#d9ddd2]"
                }`}
              >
                {page}
              </Link>
            ))}

            <Link
              href={createPageHref(Math.min(totalPages, safePage + 1))}
              aria-disabled={safePage === totalPages}
              className={`rounded-full px-4 py-2 text-sm transition ${
                safePage === totalPages
                  ? "pointer-events-none bg-[#e6e1d8] text-[#9b9597]"
                  : "bg-[#e6e1d8] text-[#5c565c] hover:bg-[#d9ddd2]"
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#30253E] px-6 py-10 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} nyphren</p>
      </footer>
    </main>
  );
}
