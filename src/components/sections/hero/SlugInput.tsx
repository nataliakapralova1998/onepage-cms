"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

type AvailabilityStatus = "idle" | "checking" | "available" | "taken";

type SlugInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SlugInput({ value, onChange }: SlugInputProps) {
  const router = useRouter();
  const t = useTranslations("general");
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value || value.length < 2) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/slugs/check?slug=${encodeURIComponent(value)}`);
        const data = await response.json();
        setStatus(data.available ? "available" : "taken");
      } catch {
        // Fallback for demo/dev — remove when API is live
        const takenSlugs = ["admin", "app", "login", "signup", "dashboard"];
        setStatus(takenSlugs.includes(value.toLowerCase()) ? "taken" : "available");
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    onChange(cleaned);
  };

  const handleClaim = () => {
    if (status !== "available") return;
    const trimmed = value.trim();
    if (trimmed) router.push(`/signup?slug=${encodeURIComponent(trimmed)}`);
    else router.push("/signup");
  };

  const wrapperClass = [
    "flex items-center border rounded-full bg-background max-w-105 w-full transition-all duration-200",
    status === "available" && "border-green-300 shadow-[0_2px_24px_rgba(34,197,94,0.12)]",
    status === "taken" && "border-red-300 shadow-[0_2px_24px_rgba(239,68,68,0.08)]",
    status === "idle" || status === "checking"
      ? "border-border shadow-sm focus-within:shadow-md focus-within:border-muted"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-start gap-4 w-full max-w-105">
      <div className={wrapperClass}>
        <span className="pl-5 text-sm text-muted whitespace-nowrap shrink-0">
          slugpage.com/
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleClaim()}
          placeholder="yourname"
          className="flex-1 border-none outline-none px-2 py-3.5 text-sm text-primary bg-transparent min-w-0 placeholder:text-muted"
        />
        <Button
          onClick={handleClaim}
          disabled={status !== "available"}
          className="m-1"
        >
          {t("claim")} →
        </Button>
      </div>

      {/* Status line */}
      <div className="h-4 flex items-center">
        {status === "checking" && (
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse inline-block" />
            Checking availability…
          </span>
        )}
        {status === "available" && (
          <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            {value} is available ✓
          </span>
        )}
        {status === "taken" && (
          <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            {value} is already taken
          </span>
        )}
      </div>
    </div>
  );
}