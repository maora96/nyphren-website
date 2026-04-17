import { notFound } from "next/navigation";
import { getPageBlocks, getPostBySlug } from "@/lib/blog";
import Nav from "@/app/components/navbar";
export const revalidate = 60;
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} | nyphren`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-black [font-family:var(--font-inter)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#30253E] text-white">
        <div className="absolute inset-0 -z-10 bg-[#30253E]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#63887255_0%,transparent_40%)]" />

        <Nav />

        <div className="mx-auto max-w-3xl px-6 pb-20 pt-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#94C7B4]">
            {post.publishDate ?? ""}
          </p>

          <h1 className="mb-6 text-4xl leading-tight text-[#f7f4ee] md:text-6xl [font-family:var(--font-playfair),serif]">
            {post.title}
          </h1>

          <p className="mx-auto max-w-xl text-white/70 [font-family:var(--font-inter)]">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6f1e8] via-[#f3efe7] to-[#ebe5da] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply">
              <img
                src="/bg-paper-texture.avif"
                alt=""
                className="w-full h-full object-cover"
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
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "heading_2") {
                  return (
                    <h3
                      key={i}
                      className="mb-4 mt-8 text-3xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "heading_3") {
                  return (
                    <h4
                      key={i}
                      className="mb-4 mt-6 text-2xl text-[#30253E] [font-family:var(--font-playfair),serif]"
                    >
                      {block.text}
                    </h4>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-8 border-l-4 border-[#94C7B4] pl-5 text-[18px] italic leading-9 text-[#4f4b52]"
                    >
                      {block.text}
                    </blockquote>
                  );
                }

                if (block.type === "bulleted_list_item") {
                  return (
                    <li
                      key={i}
                      className="ml-6 list-disc text-[18px] leading-9 text-[#4f4b52]"
                    >
                      {block.text}
                    </li>
                  );
                }

                if (block.type === "numbered_list_item") {
                  return (
                    <li
                      key={i}
                      className="ml-6 list-decimal text-[18px] leading-9 text-[#4f4b52]"
                    >
                      {block.text}
                    </li>
                  );
                }

                if (block.type === "image" && block.imageUrl) {
                  return (
                    <figure key={i} className="my-8">
                      <div className="overflow-hidden rounded-[1.25rem]">
                        <img
                          src={block.imageUrl}
                          alt={block.caption || post.title}
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
                if (!block.text) return null;
                return (
                  <p
                    key={i}
                    className="mb-5 text-[18px] leading-9 text-[#4f4b52]"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>

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

      <footer className="bg-[#30253E] py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} nyphren
      </footer>
    </main>
  );
}
