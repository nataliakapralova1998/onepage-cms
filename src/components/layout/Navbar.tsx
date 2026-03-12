"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-12 h-15">
          <Link href="/" className="font-serif text-lg tracking-tight">
            SlugPage
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Button href="/login" variant="ghost">
              Log in
            </Button>
            <Button href="/signup">Get started</Button>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                open
                  ? { translateY: 8, rotate: 45 }
                  : { translateY: 0, rotate: 0 }
              }
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-primary origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-primary"
            />
            <motion.span
              animate={
                open
                  ? { translateY: -8, rotate: -45 }
                  : { translateY: 0, rotate: 0 }
              }
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-primary origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-background flex flex-col px-6 pt-20 pb-12 md:hidden"
          >
            <div className="flex flex-col gap-1 flex-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  className="font-serif text-3xl font-light tracking-tight text-primary py-4 border-b border-border hover:text-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              <Button
                href="/login"
                variant="secondary"
                className="w-full justify-center py-3"
              >
                Log in
              </Button>
              <Button href="/signup" className="w-full justify-center py-3">
                Get started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
