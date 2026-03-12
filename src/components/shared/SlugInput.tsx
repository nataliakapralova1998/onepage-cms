"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function SlugInput() {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const handleClaim = () => {
    const val = slug.trim();
    if (val) router.push(`/signup?slug=${encodeURIComponent(val)}`);
    else router.push("/signup");
  };

  return (
    <div className="flex items-center border border-border rounded-full bg-background shadow-sm max-w-[420px] w-full focus-within:shadow-md focus-within:border-muted transition-all">
      <span className="pl-5 text-sm text-muted whitespace-nowrap shrink-0">
        slugpage.com/
      </span>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleClaim()}
        placeholder="yourname"
        className="flex-1 border-none outline-none px-2 py-3.5 text-sm text-primary bg-transparent min-w-0 placeholder:text-border"
      />
      <Button onClick={handleClaim} className="m-1">
        Claim →
      </Button>
    </div>
  );
}