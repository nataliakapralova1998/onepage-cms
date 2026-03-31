"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import EditorTopbar from "@/components/editor/Editortopbar";
import EditorSidebar from "@/components/editor/Editorsidebar";
import EditorPreview from "@/components/editor/Editorpreview";
import PublishModal from "@/components/editor/Publishmodal";
import type { Block, PageData, PageStatus, PageTheme } from "@/lib/types";

type DeviceType = "desktop" | "tablet" | "mobile";

const MOCK_PAGE: PageData = {
  slug: "nagelstudio",
  title: "Nagelstudio Rosa",
  status: "draft",
  theme: {
    palette: "noir",
    headingFont: "Fraunces",
    buttonStyle: "pill",
  },
  blocks: [
    {
      id: "block-1",
      type: "hero",
      headline: "Welkom bij Nagelstudio Rosa 💅",
      subtext: "Professionele nagelverzorging in het hart van Amsterdam. Maak nu een afspraak.",
      ctaText: "Maak een afspraak →",
      ctaHref: "#contact",
    },
    {
      id: "block-2",
      type: "text-image",
      variant: "img-left",
      heading: "Over ons",
      text: "Wij zijn een team van professionals met passie voor ons vak.",
      imageUrl: "",
    },
    {
      id: "block-3",
      type: "links",
      variant: "list",
      items: [
        { id: "link-1", label: "Instagram", href: "https://instagram.com" },
        { id: "link-2", label: "WhatsApp",  href: "https://wa.me" },
        { id: "link-3", label: "Website",   href: "https://example.com" },
      ],
    },
    {
      id: "block-4",
      type: "contact",
      email: "info@nagelstudiorosa.nl",
      phone: "+31 20 123 4567",
    },
  ],
};

export default function EditorPage() {
  const t = useTranslations("editor");
  const tGeneral = useTranslations("general");

  const [page, setPage] = useState<PageData>(MOCK_PAGE);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const handleThemeChange = useCallback((field: keyof PageTheme, value: string) => {
    setPage((previous) => ({
      ...previous,
      theme: { ...previous.theme, [field]: value },
    }));
  }, []);

  const handleBlockChange = useCallback((id: string, field: string, value: string) => {
    setPage((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block) =>
        block.id === id ? { ...block, [field]: value } : block
      ) as Block[],
    }));
  }, []);

  const handleItemChange = useCallback((blockId: string, itemId: string, field: "label" | "href", value: string) => {
    setPage((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block) => {
        if (block.id !== blockId || block.type !== "links") return block;
        return {
          ...block,
          items: block.items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
          ),
        };
      }) as Block[],
    }));
  }, []);

  const handleSlugChange = useCallback((value: string) => {
    setPage((previous) => ({ ...previous, slug: value }));
  }, []);

  function handlePublish() {
    if (page.status === "published") return;
    setPublishModalOpen(true);
  }

  function handlePublishSuccess() {
    setPublishModalOpen(false);
    setPage((previous) => ({ ...previous, status: "published" as PageStatus }));
  }

  function handleOpen() {
    window.open(`https://slugpage.com/${page.slug}`, "_blank");
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(`https://slugpage.com/${page.slug}`);
  }

  return (
    <div className="grid grid-rows-[54px_1fr] grid-cols-[280px_1fr] h-screen overflow-hidden">
      <EditorTopbar
        slug={page.slug}
        status={page.status}
        onSlugChange={handleSlugChange}
        onPublish={handlePublish}
        onOpen={handleOpen}
        publishedLabel={t("published")}
        draftLabel={t("draft")}
        publishLabel={t("publish")}
        openLabel={t("open")}
      />

      <EditorSidebar
        blocks={page.blocks}
        theme={page.theme}
        slug={page.slug}
        heroSectionLabel={t("heroSection")}
        headlineLabel={t("headline")}
        subtextLabel={t("subtext")}
        ctaTextLabel={t("ctaText")}
        ctaHrefLabel={t("ctaHref")}
        ctaHrefPlaceholder={t("ctaHrefPlaceholder")}
        contactSectionLabel={t("contactSection")}
        emailLabel={tGeneral("emailLabel")}
        phoneLabel={t("phone")}
        emailPlaceholder={tGeneral("emailPlaceholder")}
        phonePlaceholder={t("phonePlaceholder")}
        textImageSectionLabel={t("textImageSection")}
        linksSectionLabel={t("linksSection")}
        styleSectionLabel={t("styleSection")}
        paletteSectionLabel={t("palette")}
        fontSectionLabel={t("font")}
        buttonSectionLabel={t("buttonStyle")}
        layoutLabel={t("layout")}
        headingLabel={t("heading")}
        imageLabel={t("image")}
        uploadLabel={t("upload")}
        linksStyleLabel={t("linksStyle")}
        copyLinkLabel={t("copyLink")}
        onThemeChange={handleThemeChange}
        onBlockChange={handleBlockChange}
        onItemChange={handleItemChange}
        onCopyLink={handleCopyLink}
      />

      <EditorPreview
        slug={page.slug}
        blocks={page.blocks}
        theme={page.theme}
        device={device}
        onDeviceChange={setDevice}
      />

      <PublishModal
        open={publishModalOpen}
        slug={page.slug}
        onClose={() => setPublishModalOpen(false)}
        onSuccess={handlePublishSuccess}
        eyebrow={t("publishEyebrow")}
        titleNode={t.rich("publishTitle", { em: (chunks) => <em>{chunks}</em> })}
        subtitle={t("publishSubtitle")}
        pagePublishLabel={t("pagePublish")}
        cardNumberLabel={t("cardNumber")}
        expiryLabel={t("expiry")}
        cvcLabel={t("cvc")}
        cancelLabel={tGeneral("cancel")}
        payLabel={t("pay")}
        processingLabel={t("processing")}
        secureLabel={t("secure")}
      />
    </div>
  );
}