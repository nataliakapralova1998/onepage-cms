"use client";

import Button from "@/components/ui/Button";
import { Stack } from "@/components/styling/Layout";
import type { AvailabilityStatus } from "@/lib/types";
import { useTranslations } from "next-intl";

type SlugInputProps = {
  value: string;
  status: AvailabilityStatus;
  prefix?: string;
  showValidation?: boolean;
  onChange: (value: string) => void;
  onClaim?: () => void;
};

export default function SlugInput({
  value,
  status,
  prefix = "slugpage.com/",
  showValidation = true,
  onChange,
  onClaim,
}: SlugInputProps) {
  const t = useTranslations("general");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    onChange(cleaned);
  };

  const wrapperClass = [
    "flex items-center border rounded-full bg-background w-full transition-all duration-200",
    status === "available" &&
      "border-green-300 shadow-[0_2px_24px_rgba(34,197,94,0.12)]",
    status === "taken" &&
      "border-red-300 shadow-[0_2px_24px_rgba(239,68,68,0.08)]",
    (status === "idle" || status === "checking") &&
      "border-border shadow-sm focus-within:shadow-md focus-within:border-muted",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Stack gap={4} className="w-full max-w-105">
      <div className={wrapperClass}>
        <span className="pl-5 text-sm text-muted whitespace-nowrap shrink-0">
          {prefix}
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(event) => event.key === "Enter" && onClaim?.()}
          placeholder={t("yourname")}
          className="flex-1 border-none outline-none px-2 py-3.5 text-sm text-primary bg-transparent min-w-0 placeholder:text-muted"
        />
        {onClaim && (
          <Button
            onClick={onClaim}
            disabled={status !== "available"}
            className="m-1"
          >
            {t("claim")} →
          </Button>
        )}
      </div>

      {showValidation && (
        <div className="h-4 flex items-center">
          {status === "checking" && (
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse inline-block" />
              {value} {t("checking")}
            </span>
          )}
          {status === "available" && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              {value} {t("available")}
            </span>
          )}
          {status === "taken" && (
            <span className="flex items-center gap-1.5 text-xs text-error font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-error inline-block" />
              {value} {t("taken")}
            </span>
          )}
        </div>
      )}
    </Stack>
  );
}
