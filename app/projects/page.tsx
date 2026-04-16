import Link from "next/link";
import { getAllPublishedProjects } from "@/lib/projects";
import Nav from "../components/navbar";
export const revalidate = 60;
export default async function ProjectsPage() {
  const projects = await getAllPublishedProjects();
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const otherProjects = projects.filter(
    (project) => project.id !== featured?.id,
  );

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#94C7B433_0%,transparent_30%)]" />

        {/* NAV */}
        <Nav />

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Projects
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            Things I built
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75">
            Writing, games, etc
          </p>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      {featured && (
        <section className="-mt-10 px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <Link href={`/projects/${featured.slug}`} className="block">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#f3efe7]/92 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition hover:-translate-y-1">
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

                    <div className="mb-4 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#d9ddd2] px-3 py-1 text-xs text-[#4c5147]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {featured.status && (
                      <p className="mb-6 text-sm text-[#7a7578]">
                        Status: {featured.status}
                      </p>
                    )}

                    <span className="inline-block rounded-full bg-gradient-to-r from-[#638872] to-[#94C7B4] px-6 py-2 text-white shadow transition hover:scale-105">
                      Explore project
                    </span>
                  </div>

                  {/* <div className="relative min-h-[240px] rounded-[1.5rem] bg-gradient-to-br from-[#94C7B4]/40 via-[#f3efe7] to-[#30253E]/10" /> */}
                  <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#94C7B4]/35 via-[#f3efe7] to-[#30253E]/10">
                    {featured.coverUrl ? (
                      <>
                        <img
                          src={featured.coverUrl}
                          alt={featured.title}
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
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* PROJECT GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {otherProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block"
            >
              <div className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#f3efe7]/88 p-8 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
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
                    <span className="inline-block text-sm font-medium text-[#638872] transition group-hover:translate-x-1 group-hover:text-[#30253E]">
                      Explore project →
                    </span>
                  </div>

                  <div className="mt-auto mb-4 flex flex-wrap gap-2 text-xs">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#d9ddd2]/90 px-3 py-1 text-[#4c5147]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.status && (
                    <p className="text-sm text-[#7a7578]">
                      Status: {project.status}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#30253E] py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} nyphren
      </footer>
    </main>
  );
}
