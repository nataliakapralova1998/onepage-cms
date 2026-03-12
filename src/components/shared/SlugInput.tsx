"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

type SlugInputProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function SlugInput({ value, onChange }: SlugInputProps) {
  const router = useRouter();
  const t = useTranslations('general')

  const handleClaim = () => {
    const val = value.trim();
    if (val) router.push(`/signup?slug=${encodeURIComponent(val)}`);
    else router.push("/signup");
  };

  return (
    <div className="flex items-center border border-border rounded-full bg-background shadow-sm max-w-105 w-full focus-within:shadow-md focus-within:border-muted transition-all">
      <span className="pl-5 text-sm text-muted whitespace-nowrap shrink-0">
        slugpage.com/
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleClaim()}
        placeholder="yourname"
        className="flex-1 border-none outline-none px-2 py-3.5 text-sm text-primary bg-transparent min-w-0 placeholder:text-border"
      />
      <Button onClick={handleClaim} className="m-1">
        {t("claim")} →
      </Button>
    </div>
  );
}
