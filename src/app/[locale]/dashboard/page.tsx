"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container, Stack } from "@/components/styling/Layout";
import { Heading } from "@/components/styling/Typography";
import Button from "@/components/ui/Button";
import PageRow from "@/components/dashboard/PageRow";
import EmptyState from "@/components/dashboard/EmptyState";
import NewPageModal from "@/components/dashboard/NewPageModal";
import type { AvailabilityStatus } from "@/lib/types";

// Placeholder — replace with real data fetching
const MOCK_PAGES = [
  {
    id: "1",
    name: "Nagelstudio Rosa",
    slug: "nagelstudio",
    status: "published" as const,
  },
  { id: "2", name: "My Portfolio", slug: "john", status: "draft" as const },
];

export default function DashboardPage() {
  const router = useRouter();
  const t = useTranslations("dashboard");

  const [modalOpen, setModalOpen] = useState(false);
  const [slugValue, setSlugValue] = useState("");
  const [slugStatus, setSlugStatus] = useState<AvailabilityStatus>("idle");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!slugValue || slugValue.length < 2) {
      setSlugStatus("idle");
      return;
    }

    if (!isFirstRender.current) {
      setSlugStatus("checking");
    }
    isFirstRender.current = false;

    const controller = new AbortController();
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/slugs/check?slug=${encodeURIComponent(slugValue)}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setSlugStatus(data.available ? "available" : "taken");
      } catch {
        if (!controller.signal.aborted) setSlugStatus("idle");
      }
    }, 500);

    return () => {
      clearTimeout(debounceRef.current!);
      controller.abort();
    };
  }, [slugValue]);

  function handleOpenModal() {
    setSlugValue("");
    setSlugStatus("idle");
    isFirstRender.current = true;
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSlugValue("");
    setSlugStatus("idle");
  }

  function handleSubmit() {
    if (slugStatus !== "available") return;
    router.push(`/dashboard/editor/new?slug=${encodeURIComponent(slugValue)}`);
  }

  const pages = MOCK_PAGES;

  return (
    <>
      <Container size="lg" className="pt-20">
        <Stack gap={12}>
          <div className="flex items-end justify-between">
            <Heading>
              {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
            </Heading>
            <Button onClick={handleOpenModal}>+ {t("newPage")}</Button>
          </div>

          {pages.length === 0 ? (
            <EmptyState
              title={t.rich("emptyTitle", {
                em: (chunks) => <em>{chunks}</em>,
              })}
              subtitle={t("emptySubtitle")}
              buttonLabel={`+ ${t("emptyButtonLabel")}`}
              onCta={handleOpenModal}
            />
          ) : (
            <div className="border border-border rounded-xl overflow-hidden">
              {pages.map((page) => (
                <PageRow
                  key={page.id}
                  name={page.name}
                  slug={page.slug}
                  status={page.status}
                  editHref={`/dashboard/editor/${page.id}`}
                  viewHref={`https://slugpage.com/${page.slug}`}
                  publishedLabel={t("published")}
                  draftLabel={t("draft")}
                  editLabel={t("edit")}
                  viewLabel={t("view")}
                />
              ))}
            </div>
          )}
        </Stack>
      </Container>

      <NewPageModal
        open={modalOpen}
        slugValue={slugValue}
        slugStatus={slugStatus}
        titleNode={t.rich("modalTitle", { em: (chunks) => <em>{chunks}</em> })}
        subtitle={t("modalSubtitle")}
        cancelLabel={t("cancel")}
        submitLabel={t("startBuilding")}
        onSlugChange={setSlugValue}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </>
  );
}
