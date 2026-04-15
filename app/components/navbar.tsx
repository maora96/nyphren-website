"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    isActive(path)
      ? "text-[#C3D88C]"
      : "text-white/75 hover:text-white transition";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#30253E]/55 backdrop-blur-md [font-family:var(--font-inter)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <Link
          href="/"
          className="text-2xl tracking-wide text-[#C3D88C] [font-family:var(--font-playfair),serif]"
        >
          nyphren
        </Link>

        <div className="flex gap-8 text-sm">
          <Link href="/blog" className={linkClass("/blog")}>
            blog
          </Link>

          <Link href="/projects" className={linkClass("/projects")}>
            projects
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            about
          </Link>
        </div>
      </div>
    </nav>
  );
}
