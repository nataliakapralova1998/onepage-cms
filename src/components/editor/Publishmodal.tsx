"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stack } from "@/components/styling/Layout";
import { Heading, Body, Eyebrow } from "@/components/styling/Typography";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { Lock } from "lucide-react";

type PublishModalProps = {
  open: boolean;
  slug: string;
  onClose: () => void;
  onSuccess: () => void;
  // labels
  eyebrow: string;
  titleNode: React.ReactNode;
  subtitle: string;
  pagePublishLabel: string;
  cardNumberLabel: string;
  expiryLabel: string;
  cvcLabel: string;
  cancelLabel: string;
  payLabel: string;
  processingLabel: string;
  secureLabel: string;
};

export default function PublishModal({
  open,
  slug,
  onClose,
  onSuccess,
  eyebrow,
  titleNode,
  subtitle,
  pagePublishLabel,
  cardNumberLabel,
  expiryLabel,
  cvcLabel,
  cancelLabel,
  payLabel,
  processingLabel,
  secureLabel,
}: PublishModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  function handleCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").substring(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }

  function handleExpiry(value: string) {
    const digits = value.replace(/\D/g, "").substring(0, 4);
    setExpiry(digits.length >= 2 ? `${digits.substring(0, 2)}/${digits.substring(2)}` : digits);
  }

  async function handlePay() {
    setProcessing(true);
    // TODO: integrate Stripe
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setProcessing(false);
    onSuccess();
  }

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
          onKeyDown={(event) => event.key === "Escape" && onClose()}
        >
          <motion.div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />

          <motion.div
            className="relative bg-background border border-border rounded-2xl p-9 w-full max-w-sm"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Stack gap={6}>
              <Stack gap={1}>
                <Eyebrow>{eyebrow}</Eyebrow>
                <Heading as="h2">{titleNode}</Heading>
                <Body>{subtitle}</Body>
              </Stack>

              <div className="flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3">
                <div>
                  <p className="text-xs text-muted mb-0.5">{pagePublishLabel}</p>
                  <p className="text-sm font-medium text-primary">slugpage.com/{slug}</p>
                </div>
                <span className="font-serif text-3xl font-light tracking-tight text-primary">$1</span>
              </div>

              <Stack gap={3}>
                <FormField
                  label={cardNumberLabel}
                  value={cardNumber}
                  onChange={handleCardNumber}
                  placeholder="1234 5678 9012 3456"
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label={expiryLabel}
                    value={expiry}
                    onChange={handleExpiry}
                    placeholder="MM/YY"
                  />
                  <FormField
                    label={cvcLabel}
                    value={cvc}
                    onChange={(value) => setCvc(value.replace(/\D/g, "").substring(0, 3))}
                    placeholder="123"
                  />
                </div>
              </Stack>

              <Stack gap={2}>
                <div className="flex gap-2">
                  <Button
                    onClick={onClose}
                    variant="secondary"
                    className="flex-1 justify-center"
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    onClick={handlePay}
                    disabled={processing}
                    className="flex-[2] justify-center"
                  >
                    {processing ? processingLabel : payLabel}
                  </Button>
                </div>
                <p className="text-[0.68rem] text-muted text-center"><Lock /> {secureLabel}</p>
              </Stack>
            </Stack>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}