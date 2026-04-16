"use client";

import { useState } from "react";

type NewsletterFormProps = {
  compact?: boolean;
};

export default function NewsletterForm({
  compact = false,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Subscribed successfully.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="w-full rounded-full border border-black/10 bg-white/80 px-5 py-3 text-[#30253E] outline-none placeholder:text-[#7a7578] focus:border-[#638872] disabled:opacity-70"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-gradient-to-r from-[#638872] to-[#94C7B4] px-6 py-3 text-white shadow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>

        {message ? (
          <p
            className={`mt-2 text-sm ${
              status === "success" ? "text-[#638872]" : "text-red-600"
            }`}
          >
            {message}
          </p>
        ) : null}
      </form>
    );
  }

  return (
    <section className="bg-[#f7f4ee] px-6 py-24 [font-family:var(--font-inter)]">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#f3efe7]/90 p-8 shadow-[0_12px_30px_rgba(0,0,0,0.10)] md:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply">
            <img
              src="/bg-paper-texture.avif"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>

          <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[#638872]">
                Newsletter
              </p>

              <h2 className="mb-4 text-4xl text-[#30253E] [font-family:var(--font-playfair),serif]">
                Get new posts in your inbox
              </h2>

              <p className="text-[15px] leading-8 text-[#4f4b52]">
                New writing on books, the creative process and whatever else
                comes up in my mind.
              </p>

              <p className="mt-3 text-sm text-[#7a7578]">
                No spam. Just occasional writing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className="w-full rounded-full border border-black/10 bg-white/80 px-5 py-3 text-[#30253E] outline-none placeholder:text-[#7a7578] focus:border-[#638872] disabled:opacity-70"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-gradient-to-r from-[#638872] to-[#94C7B4] px-6 py-3 text-white shadow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>

              {message ? (
                <p
                  className={`mt-2 text-sm ${
                    status === "success" ? "text-[#638872]" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
