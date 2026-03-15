"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import AuthNavbar from "@/components/layout/AuthNavbar";
import { useTranslations } from "next-intl";
import type { AvailabilityStatus, Screen } from "@/lib/types";
import AuthCard from "@/components/auth/AuthCard";
import CheckEmailScreen from "@/components/auth/CheckEmailScreen";
import SignUpScreen from "@/components/auth/SignupScreen";

export default function SignUp() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("slug") ?? "";
  const t = useTranslations("signup");
  const tGeneral = useTranslations("general");

  const [screen, setScreen] = useState<Screen>("signup");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [slugValue, setSlugValue] = useState(initialSlug);
  const [slugStatus, setSlugStatus] = useState<AvailabilityStatus>(
    initialSlug ? "checking" : "idle",
  );
  const [resendCooldown, setResendCooldown] = useState(0);

  const slugDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);

    if (!slugValue || slugValue.length < 2) {
      setSlugStatus("idle");
      return;
    }

    // Skip setting "checking" on first render — already set in useState
    if (!isFirstRender.current) {
      setSlugStatus("checking");
    }
    isFirstRender.current = false;

    const controller = new AbortController();
    slugDebounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/slugs/check?slug=${encodeURIComponent(slugValue)}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setSlugStatus(data.available ? "available" : "taken");
      } catch {
        if (!controller.signal.aborted) setSlugStatus("idle");
      }
    }, 500);

    return () => {
      clearTimeout(slugDebounceRef.current!);
      controller.abort();
    };
  }, [slugValue]);

  async function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setEmailError(t("emailError"));
      return;
    }
    if (slugStatus !== "available") return;

    setEmailError("");
    setSubmitting(true);

    try {
      await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, slug: slugValue }),
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
      body: JSON.stringify({ email: sentEmail, slug: slugValue }),
    }).catch(() => {});

    setResendCooldown(30);
    resendIntervalRef.current = setInterval(() => {
      setResendCooldown((previous) => {
        if (previous <= 1) {
          if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
  }

  return (
    <>
      <AuthNavbar />
      <AuthCard>
        {screen === "check" ? (
          <CheckEmailScreen
            email={sentEmail}
            cooldown={resendCooldown}
            onResend={handleResend}
            onBack={() => setScreen("signup")}
          />
        ) : (
          <SignUpScreen
            content={{
              emailLabel: tGeneral("emailLabel"),
              emailPlaceholder: tGeneral("emailPlaceholder"),
              submitLabel: tGeneral("sendMagicLink"),
              submittingLabel: tGeneral("sending"),
              dividerLabel: tGeneral("or"),
            }}
            state={{
              slug: slugValue,
              slugStatus,
              email,
              emailError,
              submitting,
            }}
            onEmailChange={(value) => {
              setEmail(value);
              setEmailError("");
            }}
            onSlugChange={setSlugValue}
            onSubmit={handleSubmit}
          />
        )}
      </AuthCard>
    </>
  );
}