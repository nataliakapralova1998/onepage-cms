"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import Badge from "@/components/ui/Badge";
import BrowserMockup from "@/components/sections/hero/BrowserMockup";
import SlugInput from "@/components/sections/hero/SlugInput";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export default function Hero() {
  const [slug, setSlug] = useState("");
  const t = useTranslations("hero");
  

  return (
    <section className="min-h-screen flex items-center px-6 pt-24 pb-12 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div
          className="w-225 h-150 rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(ellipse at center, #e8e8e8 0%, transparent 70%)",
            transform: "translateY(-80px)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <motion.div
          className="flex flex-col items-start text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_var(--color-success)]" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1
            className="font-serif text-[clamp(2.8rem,5vw,5rem)] font-light leading-none tracking-tight text-primary mb-6"
            variants={container}
          >
            <motion.span className="block" variants={fadeUp}>
              {t("titleLine1")}
            </motion.span>
            <motion.span className="block" variants={fadeUp}>
              <em>{t("titleLine2")}</em>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-base font-light text-muted leading-relaxed max-w-sm mb-10"
            variants={fadeUp}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div className="w-full max-w-sm" variants={fadeUp}>
            <SlugInput value={slug} onChange={setSlug} />
          </motion.div>
        </motion.div>

        <BrowserMockup slug={slug} />
      </div>
    </section>
  );
}