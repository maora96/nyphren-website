import Link from "next/link";

export default function ProjectPage() {
  const project = {
    title: "Briarheart",
    description:
      "An interactive fiction experience about sacrifice, failure, and the strange aftermath of saving a world.",
    longDescription: `
      Briarheart is a narrative-driven interactive fiction project focused on consequence, memory, and emotional aftermath.

      Instead of focusing on the moment of victory, the story explores what happens after — when the world is saved, but something goes wrong.

      The system tracks player decisions and subtly shifts tone, text, and outcomes over time.
    `,
    tags: ["Interactive Fiction", "Fantasy"],
    stack: ["Next.js", "TypeScript", "Custom narrative engine"],
    links: {
      live: "#",
      repo: "#",
    },
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />

        {/* NAV */}
        <nav className="border-b border-white/10 bg-[#30253E]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
            <Link
              href="/"
              className="text-2xl text-[#C3D88C] [font-family:var(--font-playfair),serif]"
            >
              nyphren
            </Link>

            <Link
              href="/projects"
              className="text-sm text-white/70 hover:text-white"
            >
              ← back to projects
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Project
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            {project.title}
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75">
            {project.description}
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={project.links.live}
              className="rounded-full bg-gradient-to-r from-[#638872] to-[#94C7B4] px-6 py-2 text-white shadow hover:scale-105 transition"
            >
              View project
            </a>

            <a
              href={project.links.repo}
              className="rounded-full bg-white/10 px-6 py-2 text-white hover:bg-white/20 transition"
            >
              Source code
            </a>
          </div>
        </div>
      </section>

      {/* IMAGE / VISUAL */}
      <section className="-mt-10 px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#94C7B4]/40 via-[#f3efe7] to-[#30253E]/10 h-[300px]" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-[2fr_1fr]">
          {/* MAIN TEXT */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6f1e8] via-[#f3efe7] to-[#ebe5da] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply">
              <img
                src="/bg-paper-texture.avif"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              {project.longDescription
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

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* TAGS */}
            <div className="rounded-2xl bg-[#f3efe7]/90 p-6">
              <p className="mb-3 text-sm text-[#30253E] font-semibold">Type</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#d9ddd2] px-3 py-1 text-xs text-[#4c5147]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* STACK */}
            <div className="rounded-2xl bg-[#f3efe7]/90 p-6">
              <p className="mb-3 text-sm text-[#30253E] font-semibold">Stack</p>

              <ul className="text-sm text-[#4f4b52] space-y-1">
                {project.stack.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#30253E] py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} nyphren
      </footer>
    </main>
  );
}
