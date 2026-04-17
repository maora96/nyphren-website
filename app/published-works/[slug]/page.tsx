import {
  getPublishedWorkBlocks,
  getPublishedWorkBySlug,
} from "@/lib/published-works";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/app/components/navbar";
import { getProjectBlocks } from "@/lib/projects";
import { renderRichText } from "@/app/components/render-rich-text";
export const revalidate = 60;
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const publishedWork = await getPublishedWorkBySlug(slug);

  if (!publishedWork) {
    return { title: "publishedWork not found" };
  }

  return {
    title: `${publishedWork.title} | nyphren`,
    description: publishedWork.description,
  };
}

export default async function PublishedWorkPage({ params }: PageProps) {
  const { slug } = await params;
  const publishedWork = await getPublishedWorkBySlug(slug);

  if (!publishedWork) notFound();

  const blocks = await getPublishedWorkBlocks(publishedWork.id);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />

        {/* NAV */}

        <Nav />

        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-[#94C7B4]">
            Published Work
          </p>

          <h1 className="mb-6 text-5xl leading-[1.02] text-[#f7f4ee] md:text-7xl [font-family:var(--font-playfair),serif]">
            {publishedWork.title}
          </h1>

          <p className="mx-auto max-w-2xl text-[16px] leading-8 text-white/75">
            {publishedWork.description}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {publishedWork.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* VISUAL */}
      {publishedWork.coverUrl && (
        <section className="-mt-10 px-6 pb-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative h-[300px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#94C7B4]/40 via-[#f3efe7] to-[#30253E]/10">
              <Image
                src={publishedWork.coverUrl || ""}
                alt={publishedWork.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>
      )}

      <div className="flex justify-center px-6 pb-16">
        {publishedWork.url && (
          <a
            href={publishedWork.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-gradient-to-r from-[#638872] to-[#94C7B4] px-6 py-2 text-white shadow transition hover:scale-105"
          >
            Check it out
          </a>
        )}
      </div>

      {/* CONTENT */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6f1e8] via-[#f3efe7] to-[#ebe5da] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply">
              <img
                src="/bg-paper-texture.avif"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-10">
              {blocks.map((block, i) => {
                if (block.type === "heading_1") {
                  return (
                    <h2
                      key={i}
                      className="mb-5 mt-10 text-4xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {renderRichText(block.richText)}
                    </h2>
                  );
                }

                if (block.type === "heading_2") {
                  return (
                    <h3
                      key={i}
                      className="mb-4 mt-8 text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {renderRichText(block.richText)}
                    </h3>
                  );
                }

                if (block.type === "heading_3") {
                  return (
                    <h4
                      key={i}
                      className="mb-4 mt-6 text-2xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {renderRichText(block.richText)}
                    </h4>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-8 border-l-4 border-[#94C7B4] pl-5 text-[18px] italic leading-9 text-[#4f4b52]"
                    >
                      {renderRichText(block.richText)}
                    </blockquote>
                  );
                }

                if (block.type === "bulleted_list_item") {
                  return (
                    <li
                      key={i}
                      className="ml-6 list-disc text-[18px] leading-9 text-[#4f4b52]"
                    >
                      {renderRichText(block.richText)}
                    </li>
                  );
                }

                if (block.type === "numbered_list_item") {
                  return (
                    <li
                      key={i}
                      className="ml-6 list-decimal text-[18px] leading-9 text-[#4f4b52]"
                    >
                      {renderRichText(block.richText)}
                    </li>
                  );
                }

                if (block.type === "image" && block.imageUrl) {
                  return (
                    <figure key={i} className="my-8">
                      <div className="overflow-hidden rounded-[1.25rem]">
                        <img
                          src={block.imageUrl}
                          alt={block.caption || publishedWork.title}
                          className="w-full object-cover"
                        />
                      </div>

                      {block.caption ? (
                        <figcaption className="mt-3 text-center text-sm text-[#7a7578]">
                          {block.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  );
                }

                if (!block.richText) return null;

                return (
                  <p
                    key={i}
                    className="mb-5 text-[18px] leading-9 text-[#4f4b52]"
                  >
                    {renderRichText(block.richText)}
                  </p>
                );
              })}
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
