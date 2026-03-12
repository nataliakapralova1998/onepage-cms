"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import BrowserMockup from "@/components/shared/BrowserMockup";
import SlugInput from "@/components/shared/SlugInput";

export default function Hero() {
  const [slug, setSlug] = useState("");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-30 pb-20">
      <Badge className="mb-10">
        <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_var(--color-success)]" />
        $1 · one minute · live forever
      </Badge>

      <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-light leading-none tracking-tight text-primary mb-7 max-w-[800px]">
        Your page.<br />
        <em>One link.</em>
      </h1>

      <p className="text-base md:text-lg font-light text-muted leading-relaxed max-w-105 mb-12">
        Build a page, pick your slug, pay one dollar. No subscriptions, no setup, no technical knowledge needed.
      </p>

      <SlugInput value={slug} onChange={setSlug} />

      <p className="text-xs text-border mt-5">Free to build · $1 to publish</p>

      <BrowserMockup slug={slug} />
    </section>
  );
}