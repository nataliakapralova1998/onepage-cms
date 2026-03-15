import { cn } from "@/lib/utils";

type PageStatus = "published" | "draft";

type StatusBadgeProps = {
  status: PageStatus;
  publishedLabel: string;
  draftLabel: string;
};

export default function StatusBadge({ status, publishedLabel, draftLabel }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
        status === "published" && "bg-green-50 text-green-700 border border-green-200",
        status === "draft" && "bg-secondary text-muted border border-border",
      )}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "published" && "bg-success",
          status === "draft" && "bg-muted/50",
        )}
      />
      {status === "published" ? publishedLabel : draftLabel}
    </div>
  );
}