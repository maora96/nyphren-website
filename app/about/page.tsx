import Link from "next/link";
import Nav from "../components/navbar";

export default function AboutPage() {
  const links = [
    {
      name: "Instagram",
      href: "https://instagram.com/nyphren",
      description: "art, sketches, posted once in a blue moon",
    },
    {
      name: "Bluesky",
      href: "https://bsky.app/profile/nyphren.bsky.social",
      description: "mostly personal thoughts and some art/writing sharing",
    },
    {
      name: "Writing blog",
      href: "https://writingmoth.tumblr.com",
      description: "for my short stories and novel projects",
    },
    {
      name: "Dev blog",
      href: "https://wilderlingdev.tumblr.com",
      description: "for my games",
    },
    {
      name: "Personal blog",
      href: "https://nyphren.tumblr.com",
      description: "mostly fandom stuff and some dnd",
    },
  ];

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
            About
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            nemo aka nyphren aka ren
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75">
            I’m a writer drawn to complex platonic relationships, weird magic
            and worlds, and forest creatures. I like creating things that sit
            somewhere between art, code, and writing.
          </p>
        </div>
      </section>

      {/* LINKS HUB */}
      <section className="-mt-10 px-6 pb-24">
        <div className="mx-auto max-w-4xl space-y-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#f3efe7]/90 p-8 shadow-[0_12px_30px_rgba(0,0,0,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
                {/* TEXTURA */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply">
                  <img
                    src="/bg-paper-texture.avif"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* OVERLAY SUAVE */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#94C7B4]/10 via-transparent to-[#30253E]/5" />

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]">
                      {link.name}
                    </h2>

                    <p className="mt-2 text-[15px] text-[#4f4b52]">
                      {link.description}
                    </p>
                  </div>

                  <span className="text-[#638872] text-sm transition group-hover:translate-x-1">
                    open →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* OPTIONAL EXTRA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-[#7a7578]">
            if you prefer something quieter, you can also just read the{" "}
            <Link href="/blog" className="text-[#638872] hover:underline">
              blog
            </Link>{" "}
            or explore the{" "}
            <Link href="/projects" className="text-[#638872] hover:underline">
              projects
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#30253E] py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} nyphren
      </footer>
    </main>
  );
}
