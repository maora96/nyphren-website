import Link from "next/link";

export default function ProjectsPage() {
  const featured = {
    title: "Briarheart",
    description:
      "An interactive fiction experience about sacrifice, failure, and the strange aftermath of saving a world.",
    tags: ["Interactive Fiction", "Fantasy"],
    href: "/projects/briarheart",
  };

  const projects = [
    {
      title: "Strange Systems",
      description:
        "A collection of experimental UI ideas exploring atmosphere and narrative in interfaces.",
      tags: ["Design", "Web"],
      href: "/projects/strange-systems",
    },
    {
      title: "Echo Engine",
      description:
        "A narrative system for branching stories with memory, consequence, and emotional state.",
      tags: ["Dev", "Game Design"],
      href: "/projects/echo-engine",
    },
    {
      title: "Weird Experiments",
      description:
        "Small projects that explore mechanics, mood, and unconventional interactions.",
      tags: ["Experiments"],
      href: "/projects/weird-experiments",
    },
    {
      title: "Worldbuilder Tools",
      description:
        "Utilities for structuring lore, timelines, and narrative threads.",
      tags: ["Tools", "Writing"],
      href: "/projects/worldbuilder-tools",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#94C7B433_0%,transparent_30%)]" />

        <nav className="border-b border-white/10 bg-[#30253E]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
            <Link
              href="/"
              className="text-2xl text-[#C3D88C] [font-family:var(--font-playfair),serif]"
            >
              nyphren
            </Link>

            <div className="flex gap-8 text-sm text-white/75">
              <Link href="/blog" className="transition hover:text-white">
                blog
              </Link>
              <Link
                href="/projects"
                className="text-[#C3D88C] transition hover:opacity-80"
              >
                projects
              </Link>
              <Link href="/about" className="transition hover:text-white">
                about
              </Link>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Projects
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            Things I build
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75">
            Creative works, experiments, and systems — somewhere between code
            and storytelling.
          </p>
        </div>
      </section>

      <section className="-mt-10 px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#f3efe7]/92 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply">
              <img
                src="/bg-paper-texture.avif"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid gap-10 px-8 py-10 md:grid-cols-2 md:px-12">
              <div className="relative z-10">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#638872]">
                  Featured Project
                </p>

                <h2 className="mb-4 text-4xl text-[#30253E] [font-family:var(--font-playfair),serif]">
                  {featured.title}
                </h2>

                <p className="mb-6 leading-8 text-[#4f4b52]">
                  {featured.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#d9ddd2] px-3 py-1 text-xs text-[#4c5147]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={featured.href}
                  className="inline-block rounded-full bg-gradient-to-r from-[#638872] to-[#94C7B4] px-6 py-2 text-white shadow transition hover:scale-105"
                >
                  Explore project
                </Link>
              </div>

              <div className="relative min-h-[240px] rounded-[1.5rem] bg-gradient-to-br from-[#94C7B4]/40 via-[#f3efe7] to-[#30253E]/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#f3efe7]/88 p-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply">
                <img
                  src="/bg-paper-texture.avif"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#94C7B4]/10" />

              <div className="relative z-10 flex h-full flex-col">
                <h3 className="mb-4 text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]">
                  {project.title}
                </h3>

                <p className="mb-6 leading-8 text-[#4f4b52]">
                  {project.description}
                </p>

                <div className="mb-6">
                  <Link
                    href={project.href}
                    className="inline-block text-sm font-medium text-[#638872] transition group-hover:translate-x-1 group-hover:text-[#30253E]"
                  >
                    Explore project →
                  </Link>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 text-xs">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#d9ddd2]/90 px-3 py-1 text-[#4c5147]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#30253E] py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} nyphren
      </footer>
    </main>
  );
}
