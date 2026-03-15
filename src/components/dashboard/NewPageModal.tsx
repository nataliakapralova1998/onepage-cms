"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

import { Stack } from "@/components/styling/Layout";
import { Heading, Body } from "@/components/styling/Typography";
import type { AvailabilityStatus } from "@/lib/types";
import SlugInput from "../ui/SlugInputChecker";

type NewPageModalProps = {
  open: boolean;
  slugValue: string;
  slugStatus: AvailabilityStatus;
  titleNode: React.ReactNode;
  subtitle: string;
  cancelLabel: string;
  submitLabel: string;
  onSlugChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function NewPageModal({
  open,
  slugValue,
  slugStatus,
  titleNode,
  subtitle,
  cancelLabel,
  submitLabel,
  onSlugChange,
  onSubmit,
  onClose,
}: NewPageModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.target === event.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-background border border-border rounded-2xl p-9 w-full max-w-sm"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Stack gap={8}>
              <Stack gap={1}>
                <Heading as="h2">{titleNode}</Heading>
                <Body>{subtitle}</Body>
              </Stack>

              <SlugInput
                value={slugValue}
                status={slugStatus}
                onChange={onSlugChange}
              />

              <div className="flex gap-2">
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1 justify-center"
                >
                  {cancelLabel}
                </Button>
                <Button
                  onClick={onSubmit}
                  disabled={slugStatus !== "available"}
                  className="flex-2 justify-center"
                >
                  {submitLabel}
                </Button>
              </div>
            </Stack>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}