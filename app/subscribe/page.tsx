import Link from "next/link";
import NewsletterForm from "../components/newsletter";

export default function SubscribePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#30253E] text-white [font-family:var(--font-inter)]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_38%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,#94C7B433_0%,transparent_28%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(48,37,62,0.1),rgba(48,37,62,0.45))]" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="text-2xl tracking-wide text-[#C3D88C] [font-family:var(--font-playfair),serif]"
          >
            nyphren
          </Link>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="max-w-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
              Newsletter
            </p>

            <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
              get new posts
              <br />
              in your inbox
            </h1>

            <p className="max-w-xl text-[16px] leading-8 text-white/75">
              Occasional writing on books, the creative process and whatever
              else comes up in my mind.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/70">
              <span className="rounded-full bg-white/10 px-3 py-1">
                blog updates
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                creative process
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1">
                no spam
              </span>
            </div>

            <p className="mt-8 text-sm text-white/55">
              Prefer browsing first? Visit the{" "}
              <Link href="/blog" className="text-[#C3D88C] hover:opacity-80">
                blog
              </Link>
              .
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#f3efe7] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.20)] md:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply">
                <img
                  src="/bg-paper-texture.avif"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#94C7B4]/10" />

              <div className="relative z-10">
                <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[#638872]">
                  Subscribe
                </p>

                <h2 className="mb-4 text-4xl text-[#30253E] [font-family:var(--font-playfair),serif]">
                  Newsletter
                </h2>

                <p className="mb-8 text-[15px] leading-8 text-[#4f4b52]">
                  New posts are sent by email automatically whenever something
                  new appears.
                </p>

                <NewsletterForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
