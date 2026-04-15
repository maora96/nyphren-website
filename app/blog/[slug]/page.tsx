import Link from "next/link";

export default function PostPage() {
  const post = {
    title: "The cost of saving a world",
    excerpt:
      "Saving a world is never free, and the price might not be what you expect.",
    content: `
      Saving a world is never free.

      The stories we tell about heroes often ignore what happens after the victory.
      The quiet aftermath, the cost, the absence.

      What happens when the one meant to die… survives?

      Maybe the story doesn’t end there.
    `,
    tags: ["Fantasy", "Writing"],
    date: "April 13, 2026",
    readTime: "3 min read",
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />

        {/* NAV */}
        <nav className="border-b border-white/10 bg-[#30253E]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="text-xl text-[#C3D88C] [font-family:var(--font-playfair),serif]"
            >
              nyphren
            </Link>

            <Link
              href="/blog"
              className="text-sm text-white/70 transition hover:text-white"
            >
              ← back to blog
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-3xl px-6 pb-20 pt-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#94C7B4]">
            {post.date} · {post.readTime}
          </p>

          <h1 className="mb-6 text-4xl leading-tight text-[#f7f4ee] md:text-6xl [font-family:var(--font-playfair),serif]">
            {post.title}
          </h1>

          <p className="mx-auto max-w-xl text-white/70">{post.excerpt}</p>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6f1e8] via-[#f3efe7] to-[#ebe5da] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            {/* TEXTURA */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply">
              <img
                src="/bg-paper-texture.avif"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
              {post.content
                .trim()
                .split("\n\n")
                .map((p, i) => (
                  <p
                    key={i}
                    className="mb-5 text-[18px] leading-9 text-[#4f4b52]"
                  >
                    {p.trim()}
                  </p>
                ))}
            </div>
          </div>

          {/* TAGS */}
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#d9ddd2] px-3 py-1 text-xs text-[#4c5147]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="bg-[#30253E] py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} nyphren
      </footer>
    </main>
  );
}
