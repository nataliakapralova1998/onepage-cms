"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
] as const;

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const selectedLanguage =
    LANGUAGES.find((language) => language.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(code: string) {
    router.push(pathname, { locale: code });
    router.refresh();
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex items-center  cursor-pointer gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-muted border border-border hover:text-primary hover:border-primary"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedLanguage.code.toUpperCase()}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex" }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] min-w-32.5 bg-background border border-border  hover:bg-background/90 rounded-xl overflow-hidden z-50"
          >
            {LANGUAGES.map((language, index) => (
              <div key={language.code}>
                {index > 0 && <div className="h-px bg-border" />}
                <button
                  type="button"
                  role="option"
                  aria-selected={language.code === locale}
                  onClick={() => handleSelect(language.code)}
                  className="w-full cursor-pointer flex items-center justify-between px-3 py-2 text-sm text-left  hover:bg-muted-foreground transition-colors duration-100"
                >
                  <span
                    className={
                      language.code === locale
                        ? "font-medium text-primary"
                        : "text-muted"
                    }
                  >
                    {language.label}
                  </span>
                  {language.code === locale && (
                    <span className="text-muted text-xs">✓</span>
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
