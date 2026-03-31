import Link from "next/link";
import Button from "@/components/ui/Button";

import { cn } from "@/lib/utils";
import type { PageStatus } from "@/lib/types";

type EditorTopbarProps = {
  slug: string;
  status: PageStatus;
  onSlugChange: (value: string) => void;
  onPublish: () => void;
  onOpen: () => void;
  // labels
  publishedLabel: string;
  draftLabel: string;
  publishLabel: string;
  openLabel: string;
};

export default function EditorTopbar({
  slug,
  status,
  onSlugChange,
  onPublish,
  onOpen,
  publishedLabel,
  draftLabel,
  publishLabel,
  openLabel,
}: EditorTopbarProps) {
  return (
    <header className="col-span-2 flex items-center justify-between px-6 h-14 border-b border-border bg-background gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="font-serif text-base tracking-tight text-primary">
          SlugPage
        </Link>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1 text-sm text-muted">
          <span>slugpage.com/</span>
          <input
            type="text"
            value={slug}
            onChange={(event) => onSlugChange(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            className="border-none outline-none bg-transparent text-primary font-medium w-32 min-w-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
          status === "published" && "bg-green-50 text-green-700 border border-green-200",
          status === "draft" && "bg-secondary text-muted border border-border",
        )}>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            status === "published" ? "bg-success" : "bg-muted/40",
          )} />
          {status === "published" ? publishedLabel : draftLabel}
        </div>

        <Button onClick={onOpen} variant="secondary" size="sm">
          ↗ {openLabel}
        </Button>
        <Button onClick={onPublish} size="sm" disabled={status === "published"}>
          {status === "published" ? `✓ ${publishedLabel}` : `${publishLabel} →`}
        </Button>
      </div>
    </header>
  );
}