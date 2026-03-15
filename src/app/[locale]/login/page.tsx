"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

import AuthNavbar from "@/components/layout/AuthNavbar";
import AuthCard from "@/components/auth/AuthCard";
import AuthDivider from "@/components/auth/AuthDivider";
import CheckEmailScreen from "@/components/auth/CheckEmailScreen";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { Stack } from "@/components/styling/Layout";
import {
  Eyebrow,
  Heading,
  Body,
  InlineLink,
} from "@/components/styling/Typography";
import type { Screen } from "@/lib/types";

export default function LoginPage() {
  const t = useTranslations("login");
  const tGeneral = useTranslations("general");

  const [screen, setScreen] = useState<Screen>("signup");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const resendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setEmailError(tGeneral("emailError"));
      return;
    }
    setEmailError("");
    setSubmitting(true);

    try {
      await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
    } catch {
      // Continue to check email screen regardless
    }

    setSentEmail(trimmed);
    setSubmitting(false);
    setScreen("check");
  }

  function handleResend() {
    if (resendCooldown > 0) return;

    fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: sentEmail }),
    }).catch(() => {});

    setResendCooldown(30);
    resendIntervalRef.current = setInterval(() => {
      setResendCooldown((previous) => {
        if (previous <= 1) {
          if (resendIntervalRef.current)
            clearInterval(resendIntervalRef.current);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
  }

  return (
    <>
      <AuthNavbar
        hint={t("navHint")}
        linkLabel={t("navLink")}
        linkHref="/signup"
      />
      <AuthCard>
        {screen === "check" ? (
          <CheckEmailScreen
            email={sentEmail}
            cooldown={resendCooldown}
            onResend={handleResend}
            onBack={() => setScreen("signup")}
          />
        ) : (
          <Stack gap={6}>
            <Stack gap={2}>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <Heading>
                {t("titleLine1")} <em>{t("titleLine2")}</em>
              </Heading>
              <Body>{t("subtitle")}</Body>
            </Stack>

            <Stack gap={4}>
              <FormField
                label={tGeneral("emailLabel")}
                type="email"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setEmailError("");
                }}
                onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
                placeholder={tGeneral("emailPlaceholder")}
                error={emailError}
              />
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full justify-center"
                size="lg"
              >
                {submitting ? tGeneral("sending") : tGeneral("sendMagicLink")}
              </Button>
            </Stack>

            <AuthDivider label={tGeneral("or")} />

            <Body className="text-center">
              {t("signupPrompt")}{" "}
              <InlineLink href="/signup">{t("signupLink")}</InlineLink>
            </Body>
          </Stack>
        )}
      </AuthCard>
    </>
  );
}
