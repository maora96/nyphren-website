import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative text-white [font-family:var(--font-inter)]">
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/bg-forest2.avif"
          className="w-full h-full object-cover blur-[1px] "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#30253E]/55 via-[#30253E]/95 to-[#30253E]/100" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-[#30253E]/70 border-b border-white/10">
        <div className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
          <h1 className="text-[#C3D88C] text-2xl [font-family:var(--font-playfair),serif] tracking-wide">
            nyphren
          </h1>
          <div className="flex gap-8 text-sm text-gray-300">
            <Link href="/blog" className="hover:text-white transition">
              blog
            </Link>
            <Link href="/projects" className="hover:text-white transition">
              projects
            </Link>
            <Link
              href="/about"
              className="text-[#C3D88C] hover:opacity-80 transition"
            >
              about
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-32 px-6">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl [font-family:var(--font-playfair),serif] mb-6 leading-tight tracking-tight">
            fantasy writer, artist & developer
          </h1>
          <p className="text-lg text-gray-300 mb-10">
            i build worlds — in code and in stories
          </p>
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-[#C3D88C] to-[#94C7B4] text-black px-8 py-3 rounded-full font-medium shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition"
          >
            Read my writing
          </Link>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* BLOCO DE FUNDO (não full screen) */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0">
              <img
                src="/bg-texture.avif"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#638872]/70" />
            </div>

            {/* CARD */}
            <div className="relative z-10 p-6 md:p-10">
              <div className="bg-[#f3efe7]/80 backdrop-blur rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-8 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="uppercase text-sm mb-3 text-gray-600 tracking-wider">
                    Featured Project
                  </p>

                  <h2 className="text-3xl [font-family:var(--font-playfair),serif] mb-4 text-[#30253E]">
                    Briarheart
                  </h2>

                  <p className="mb-4 text-gray-700">
                    Saving the world cost the briarheart their life — it was
                    supposed to also claim your own. But you failed. Why?
                  </p>

                  <div className="flex gap-3 text-sm mb-6 text-gray-600">
                    <span>#interactive fiction</span>
                    <span>#fantasy</span>
                  </div>

                  <button className="bg-gradient-to-r from-[#638872] to-[#80B9B1] text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">
                    Play it
                  </button>
                </div>

                <div className="flex justify-center">
                  <div className="w-52 h-52 rounded-full overflow-hidden border-[6px] border-[#30253E] shadow-lg">
                    <Image
                      src="/avatar.png"
                      alt="project"
                      width={220}
                      height={220}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {/* <section className="py-24 px-6 bg-[#f3efe7] text-black">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl [font-family:var(--font-playfair),serif] mb-6 text-[#30253E]">
              About Me
            </h2>
            <p className="text-lg mb-4 [font-family:var(--font-inter)]">
              I like building things that feel alive.
            </p>
            <p className="text-gray-700 [font-family:var(--font-inter)]">
              Sometimes that’s code. Sometimes that’s stories. Sometimes it’s
              both.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/about-illustration.png"
              alt="about"
              width={260}
              height={260}
            />
          </div>
        </div>
      </section> */}
      {/* ABOUT */}
      <section className="py-24 px-6 bg-[#f3efe7] text-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#638872] [font-family:var(--font-inter)]">
                About Me
              </p>

              <h2 className="mb-6 text-4xl leading-tight text-[#30253E] md:text-5xl [font-family:var(--font-playfair),serif]">
                I build things that feel a little alive.
              </h2>

              <p className="mb-5 max-w-2xl text-lg leading-8 text-[#4f4b52] [font-family:var(--font-inter)]">
                I’m a developer drawn to story-rich experiences, strange little
                worlds, and projects with personality. I like creating things
                that sit somewhere between design, code, and fiction.
              </p>

              <p className="mb-8 max-w-2xl text-[15px] leading-7 text-[#6a6468] [font-family:var(--font-inter)]">
                Sometimes that becomes an interactive project. Sometimes it
                becomes a post, a visual experiment, or a piece of
                worldbuilding. I’m most at home when I’m making something
                atmospheric, expressive, and a little unusual.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm">
                  <p className="mb-1 text-sm uppercase tracking-wide text-[#638872] [font-family:var(--font-inter)]">
                    Writing
                  </p>
                  <p className="text-sm leading-6 text-[#4f4b52] [font-family:var(--font-inter)]">
                    fantasy, reflection, and narrative experiments
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm">
                  <p className="mb-1 text-sm uppercase tracking-wide text-[#638872] [font-family:var(--font-inter)]">
                    Development
                  </p>
                  <p className="text-sm leading-6 text-[#4f4b52] [font-family:var(--font-inter)]">
                    interfaces, interactive systems, and creative coding
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm">
                  <p className="mb-1 text-sm uppercase tracking-wide text-[#638872] [font-family:var(--font-inter)]">
                    Worldbuilding
                  </p>
                  <p className="text-sm leading-6 text-[#4f4b52] [font-family:var(--font-inter)]">
                    mood, lore, visual identity, and strange little details
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute h-72 w-72 rounded-full bg-[#94C7B4]/25 blur-3xl" />
              <div className="relative rounded-[2rem] border border-black/5 bg-white/40 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.10)] backdrop-blur-sm">
                <Image
                  src="/about-illustration.png"
                  alt="About illustration"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-24 px-6 bg-[#f7f4ee] text-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl [font-family:var(--font-playfair),serif] text-[#30253E]">
              Latest Writings
            </h2>

            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-[#8c9b7b] px-5 py-2.5 text-sm text-white shadow-sm transition hover:opacity-90"
            >
              View all posts
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "The cost of saving a world",
                excerpt:
                  "Saving a world is never free, and the price might not be what you expect.",
                tags: ["Fantasy", "Writing"],
                date: "April 13, 2026",
                readTime: "3 min read",
              },
              {
                title: "Designing interactive fiction systems",
                excerpt:
                  "A look behind the curtain at how I design and code interactive stories and games.",
                tags: ["Interactive Fiction"],
                date: "April 6, 2026",
                readTime: "5 min read",
              },
              {
                title: "Why I build weird projects",
                excerpt:
                  "I've always loved building things no-one else cared to. Here's why I think you should too.",
                tags: ["Experiments", "Coding"],
                date: "March 21, 2026",
                readTime: "2 min read",
              },
            ].map((post) => (
              <article
                key={post.title}
                className="group relative overflow-hidden rounded-2xl border border-black/5 bg-[#f3efe7]/85 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.10)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.14)]"
              >
                {/* TEXTURA */}
                <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply">
                  <img
                    src="/bg-paper-texture.avif"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* OVERLAY DE COR */}
                <div className="pointer-events-none absolute inset-0 bg-[#94C7B4]/16" />

                {/* GRADIENT DE PROFUNDIDADE */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#30253E]/10" />

                {/* CONTEÚDO */}
                <div className="relative z-10">
                  <h3 className="mb-3 text-[2rem] leading-[1.05] [font-family:var(--font-playfair),serif] text-[#30253E] md:text-[2.1rem]">
                    {post.title}
                  </h3>

                  <p className="mb-5 text-[15px] leading-7 text-[#4f4b52]">
                    {post.excerpt}
                  </p>

                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
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
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS CTA */}
      {/* <section className="py-28 text-center bg-gradient-to-b from-[#638872]/60 to-[#30253E]">
        <h2 className="text-3xl [font-family:var(--font-playfair),serif] mb-4">
          Projects
        </h2>
        <p className="text-gray-300">
          Creative works I build for fun and curiosity.
        </p>
      </section> */}
      {/* PROJECTS */}
      <section className="py-28 px-6 bg-gradient-to-b from-[#5f7b73] to-[#30253E] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#C3D88C] [font-family:var(--font-inter)]">
              Projects
            </p>
            <h2 className="mb-4 text-4xl md:text-5xl [font-family:var(--font-playfair),serif]">
              Creative works, strange systems, and small worlds
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] leading-7 text-white/75 [font-family:var(--font-inter)]">
              A mix of interactive fiction, design-heavy experiments, and things
              I built because I wanted them to exist.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            {/* FEATURED PROJECT CARD */}
            <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.20)] backdrop-blur-sm">
              <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
                <img
                  src="/bg-paper-texture.avif"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative z-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#C3D88C]">
                    Featured Project
                  </p>

                  <h3 className="mb-4 text-4xl [font-family:var(--font-playfair),serif]">
                    Briarheart
                  </h3>

                  <p className="mb-5 max-w-xl text-[15px] leading-7 text-white/80 [font-family:var(--font-inter)]">
                    A dark interactive fiction project about failure, survival,
                    and what remains after the world should have taken you too.
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">
                      Interactive Fiction
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">
                      Fantasy
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">
                      Narrative Design
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="rounded-full bg-[#C3D88C] px-5 py-2.5 text-sm text-[#30253E] transition hover:opacity-90"
                    >
                      Play project
                    </a>
                    <a
                      href="#"
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
                    >
                      Read more
                    </a>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-lg">
                    <Image
                      src="/avatar.png"
                      alt="Briarheart artwork"
                      width={260}
                      height={260}
                      className="rounded-[1rem] object-cover"
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* SIDE PROJECTS */}
            <div className="grid gap-6">
              <article className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#C3D88C]">
                  Experiment
                </p>
                <h3 className="mb-3 text-2xl [font-family:var(--font-playfair),serif]">
                  Fiction systems
                </h3>
                <p className="mb-4 text-sm leading-7 text-white/75 [font-family:var(--font-inter)]">
                  Prototypes and tools for interactive storytelling, branching
                  logic, and worldbuilding structure.
                </p>
                <a href="#" className="text-sm text-[#C3D88C] hover:opacity-80">
                  Explore
                </a>
              </article>

              <article className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#C3D88C]">
                  Web
                </p>
                <h3 className="mb-3 text-2xl [font-family:var(--font-playfair),serif]">
                  Strange little builds
                </h3>
                <p className="mb-4 text-sm leading-7 text-white/75 [font-family:var(--font-inter)]">
                  Small websites, interface ideas, visual experiments, and coded
                  moods.
                </p>
                <a href="#" className="text-sm text-[#C3D88C] hover:opacity-80">
                  See projects
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-400 bg-[#30253E]">
        <p>© {new Date().getFullYear()} nyphren</p>
      </footer>
    </main>
  );
}
