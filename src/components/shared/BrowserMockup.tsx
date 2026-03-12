import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

type BrowserMockupProps = {
  slug?: string;
};

export default function BrowserMockup({ slug }: BrowserMockupProps) {
  const t = useTranslations("browserMockup");
  const displaySlug = slug?.trim() || "nagelstudio";

  return (
    <div className="mt-20 w-full max-w-[680px]">
      <div className="bg-background border border-border rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="bg-surface border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="flex-1 bg-background border border-border rounded-md px-3 py-1 mx-2 text-[0.68rem] text-muted text-center">
            slugpage.com/{displaySlug}
          </div>
        </div>
        <div className="px-8 md:px-12 py-12 md:py-16 text-left">
          <p className="text-xs font-medium tracking-widest uppercase text-muted mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-2xl md:text-[2rem] font-light tracking-tight leading-snug text-primary mb-3">
            {t.rich("title", {
              br: () => <br />,
              em: (chunks) => <em>{chunks}</em>,
            })}
          </h2>
          <p className="text-sm font-light text-muted leading-relaxed mb-6 max-w-sm">
            {t("desc")}
          </p>
          <Button size="sm">{t("cta")}</Button>
        </div>
      </div>
    </div>
  );
}