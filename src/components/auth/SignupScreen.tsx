import Button from "@/components/ui/Button";

import { Stack } from "../styling/Layout";
import {
  Eyebrow,
  Body,
  Caption,
  Heading,
  InlineLink,
} from "../styling/Typography";
import FormField from "../ui/FormField";
import AuthDivider from "./AuthDivider";
import SlugStatusPill from "./SlugStatusPill";
import { useTranslations } from "next-intl";
import type { AvailabilityStatus } from "@/lib/types";
import SlugInput from "../ui/SlugInputChecker";

type SignUpFormContent = {
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  dividerLabel: string;
};

type SignUpFormState = {
  slug: string;
  slugStatus: AvailabilityStatus;
  email: string;
  emailError: string;
  submitting: boolean;
};

type SignUpFormProps = {
  content: SignUpFormContent;
  state: SignUpFormState;
  onEmailChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onSubmit: () => void;
};

export default function SignUpScreen({
  content,
  state,
  onEmailChange,
  onSlugChange,
  onSubmit,
}: SignUpFormProps) {
  const t = useTranslations("signup");
  return (
    <Stack gap={6}>
      <Stack gap={2}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <Heading>
          {t.rich("title", {
            br: () => <br />,
            em: (chunks) => <em>{chunks}</em>,
          })}
        </Heading>
        <Body>{t("subtitle")}</Body>
      </Stack> 

      <SlugInput
        value={state.slug}
        status={state.slugStatus}
        onChange={onSlugChange}
        showValidation={false}
      />
      <SlugStatusPill slug={state.slug} status={state.slugStatus} />
      <Stack gap={4}>
        <FormField
          label={content.emailLabel}
          type="email"
          value={state.email}
          onChange={onEmailChange}
          onKeyDown={(event) => event.key === "Enter" && onSubmit()}
          placeholder={content.emailPlaceholder}
          error={state.emailError}
        />
        <Button
          onClick={onSubmit}
          disabled={state.submitting}
          className="w-full justify-center"
          size="lg"
        >
          {state.submitting ? content.submittingLabel : content.submitLabel}
        </Button>
      </Stack>

      <Caption className="text-center">
        {t.rich("terms", {
          terms: (chunks) => <InlineLink href="/terms">{chunks}</InlineLink>,
          privacy: (chunks) => (
            <InlineLink href="/privacy">{chunks}</InlineLink>
          ),
        })}
      </Caption>

      <AuthDivider label={content.dividerLabel} />

      <Body className="text-center">
        {t.rich("loginPrompt", {
          link: (chunks) => <InlineLink href="/login">{chunks}</InlineLink>,
        })}
      </Body>
    </Stack>
  );
}
