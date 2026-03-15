import Link from "next/link";
import PageThumbnail from "@/components/dashboard/PageThumbnail";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Button from "@/components/ui/Button";

type PageStatus = "published" | "draft";

type PageRowProps = {
  name: string;
  slug: string;
  status: PageStatus;
  editHref: string;
  viewHref?: string;
  // labels
  publishedLabel: string;
  draftLabel: string;
  editLabel: string;
  viewLabel: string;
};

export default function PageRow({
  name,
  slug,
  status,
  editHref,
  viewHref,
  publishedLabel,
  draftLabel,
  editLabel,
  viewLabel,
}: PageRowProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-border last:border-none hover:bg-surface transition-colors gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <PageThumbnail />
        <div className="min-w-0">
          <p className="font-serif text-base font-light tracking-tight text-primary truncate">
            {name}
          </p>
          <p className="text-xs text-muted truncate">slugpage.com/{slug}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <StatusBadge
          status={status}
          publishedLabel={publishedLabel}
          draftLabel={draftLabel}
        />
        <div className="flex gap-1.5">
          {status === "published" && viewHref && (
            <Button href={viewHref} variant="secondary" size="sm">
              ↗ {viewLabel}
            </Button>
          )}
          <Button href={editHref} size="sm">
            {editLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}