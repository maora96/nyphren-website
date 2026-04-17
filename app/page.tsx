import Image from "next/image";
import Link from "next/link";
import {
  getAllPublishedPosts,
  getPageBlocks,
  calculateReadingTimeFromBlocks,
} from "@/lib/blog";
import { getAllPublishedProjects } from "@/lib/projects";
import Nav from "./components/navbar";
import NewsletterForm from "./components/newsletter";
export const revalidate = 60;

export default async function Home() {
  const latestPostsRaw = (await getAllPublishedPosts()).slice(0, 3);

  const latestPosts = await Promise.all(
    latestPostsRaw.map(async (post) => {
      const blocks = await getPageBlocks(post.id);
      const readTime = calculateReadingTimeFromBlocks(blocks);

      return {
        ...post,
        readTime,
      };
    }),
  );
  const latestProjects = (await getAllPublishedProjects()).slice(0, 3);

  const featuredProject =
    latestProjects.find((project) => project.featured) ?? latestProjects[0];

  const sideProjects = latestProjects
    .filter((project) => project.id !== featuredProject?.id)
    .slice(0, 2);

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

      <Nav />

      {/* HERO */}
      <section className="text-center py-32 px-6">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl [font-family:var(--font-playfair),serif] mb-6 leading-tight tracking-tight">
            fantasy writer, artist & developer
          </h1>
          <p className="text-lg text-gray-300 mb-10">but mostly just tired</p>
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
                    {featuredProject.title}
                  </h2>

                  <p className="mb-4 text-gray-700">
                    {featuredProject.description}
                  </p>

                  <div className="flex gap-3 text-sm mb-6 text-gray-600">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#d9ddd2] text-[#4c5147] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="inline-block bg-gradient-to-r from-[#638872] to-[#80B9B1] text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
                  >
                    More
                  </Link>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-52 h-52 rounded-full overflow-hidden border-[6px] border-[#30253E] shadow-lg">
                    <Image
                      src={featuredProject.coverUrl || ""}
                      alt={featuredProject.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6 bg-[#f3efe7] text-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#638872] [font-family:var(--font-inter)]">
                About Me
              </p>

              <h2 className="mb-6 text-4xl leading-tight text-[#30253E] md:text-5xl [font-family:var(--font-playfair),serif]">
                nemo aka nyphren aka ren
              </h2>

              <p className="mb-5 max-w-2xl text-lg leading-8 text-[#4f4b52] [font-family:var(--font-inter)]">
                I’m a writer drawn to complex platonic relationships, weird
                magic and worlds, and forest creatures. I like creating things
                that sit somewhere between art, code, and writing.
              </p>

              <p className="mb-8 max-w-2xl text-[15px] leading-7 text-[#6a6468] [font-family:var(--font-inter)]">
                Sometimes that becomes an little interactive game, sometimes a
                short story, sometimes a novel I will probably take a decade to
                write.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm">
                  <p className="mb-1 text-sm uppercase tracking-wide text-[#638872] [font-family:var(--font-inter)]">
                    Writing
                  </p>
                  <p className="text-sm leading-6 text-[#4f4b52] [font-family:var(--font-inter)]">
                    fantasy, post-apocalyptic settings and complicated
                    relationships
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm">
                  <p className="mb-1 text-sm uppercase tracking-wide text-[#638872] [font-family:var(--font-inter)]">
                    Games
                  </p>
                  <p className="text-sm leading-6 text-[#4f4b52] [font-family:var(--font-inter)]">
                    interactive fiction, small visual novels, sometimes stuff
                    in-between
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute h-72 w-72 rounded-full bg-[#94C7B4]/25 blur-3xl" />
              <div className="relative rounded-[2rem] border border-black/5 bg-white/40 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.10)] backdrop-blur-sm">
                <Image
                  src="/icon-ren.jpg"
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
            {latestPosts.length > 0
              ? latestPosts.map((post) => (
                  <Link
                    key={post.title}
                    href={`/blog/${post.slug}`}
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
                        <span className="text-[#7a7578]">
                          | {post.publishDate}
                        </span>
                      </div>

                      <p className="text-sm text-[#7a7578]">{post.readTime}</p>
                    </div>
                  </Link>
                ))
              : "No posts yet, stay tuned!"}
          </div>
        </div>
      </section>

      <NewsletterForm />

      {/* PROJECTS */}
      <section className="py-28 px-6 bg-gradient-to-b from-[#5f7b73] to-[#30253E] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#C3D88C] [font-family:var(--font-inter)]">
              Projects
            </p>
            <h2 className="mb-4 text-4xl md:text-5xl [font-family:var(--font-playfair),serif]">
              Short stories, interactive fiction, novels in progress
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] leading-7 text-white/75 [font-family:var(--font-inter)]">
              And sometimes some DND musings too
            </p>
          </div>

          {featuredProject && (
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

                <div className="relative z-10 grid gap-8 items-center md:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#C3D88C]">
                      Featured Project
                    </p>

                    <h3 className="mb-4 text-4xl [font-family:var(--font-playfair),serif]">
                      {featuredProject.title}
                    </h3>

                    <p className="mb-5 max-w-xl text-[15px] leading-7 text-white/80 [font-family:var(--font-inter)]">
                      {featuredProject.description}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2 text-xs">
                      {featuredProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-3 py-1 text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/projects/${featuredProject.slug}`}
                        className="rounded-full bg-[#C3D88C] px-5 py-2.5 text-sm text-[#30253E] transition hover:opacity-90"
                      >
                        Explore project
                      </Link>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-lg">
                      {featuredProject.coverUrl ? (
                        <img
                          src={featuredProject.coverUrl}
                          alt={featuredProject.title}
                          className="h-[260px] w-[260px] rounded-[1rem] object-cover"
                        />
                      ) : (
                        <div className="h-[260px] w-[260px] rounded-[1rem] bg-gradient-to-br from-[#94C7B4]/40 via-[#f3efe7] to-[#30253E]/10" />
                      )}
                    </div>
                  </div>
                </div>
              </article>

              {/* SIDE PROJECTS */}
              <div className="grid gap-6">
                {sideProjects.map((project) => (
                  <article
                    key={project.id}
                    className="group rounded-[1.75rem] border border-white/10 bg-white/8 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                  >
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#C3D88C]">
                      {project.status ?? "Project"}
                    </p>

                    <h3 className="mb-3 text-2xl [font-family:var(--font-playfair),serif]">
                      {project.title}
                    </h3>

                    <p className="mb-4 text-sm leading-7 text-white/75 [font-family:var(--font-inter)]">
                      {project.description}
                    </p>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm text-[#C3D88C] transition group-hover:translate-x-1 hover:opacity-80"
                    >
                      Explore →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-400 bg-[#30253E]">
        <p>© {new Date().getFullYear()} nyphren</p>
      </footer>
    </main>
  );
}
