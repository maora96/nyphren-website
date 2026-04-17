import { RichTextSpan } from "@/lib/blog";

export function renderRichText(spans: RichTextSpan[]) {
  return spans.map((span, index) => {
    let className = "";

    if (span.bold) className += " font-semibold";
    if (span.italic) className += " italic";
    if (span.underline) className += " underline";
    if (span.strikethrough) className += " line-through";
    if (span.code) {
      className += " rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.95em]";
    }

    const content = (
      <span key={index} className={className.trim()}>
        {span.text}
      </span>
    );

    if (span.href) {
      return (
        <a
          key={index}
          href={span.href}
          target="_blank"
          rel="noreferrer"
          className="text-[#638872] underline underline-offset-4 hover:opacity-80"
        >
          {content}
        </a>
      );
    }

    return content;
  });
}
