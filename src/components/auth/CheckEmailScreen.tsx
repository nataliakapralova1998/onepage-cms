import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { Stack } from "@/components/styling/Layout";
import { Heading, Body } from "@/components/styling/Typography";
import { Mail } from "lucide-react";

type CheckEmailScreenProps = {
  email: string;
  cooldown: number;
  onResend: () => void;
  onBack: () => void;
};

const stepKeys = ["openEmail", "clickLink", "landDashboard"] as const;

export default function CheckEmailScreen({
  email,
  cooldown,
  onResend,
  onBack,
}: CheckEmailScreenProps) {
  const t = useTranslations("checkEmail");

  return (
    <Stack gap={6}>
      <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center text-2xl">
        <Mail />
      </div>

      <Stack gap={2}>
        <Heading>
          {t.rich("title", {
            br: () => <br />,
            em: (chunks) => <em>{chunks}</em>,
          })}
        </Heading>
        <Body>{t("subtitle")}</Body>
      </Stack>

      <div className="bg-secondary border border-border rounded-lg px-4 py-3 flex items-center gap-2 text-sm font-medium text-primary">
        <span className="text-muted">@</span>
        <span>{email}</span>
      </div>

      <Stack gap={3}>
        {stepKeys.map((key, index) => (
          <div key={key} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-secondary border border-border text-[0.6rem] font-medium flex items-center justify-center shrink-0 mt-0.5 text-muted">
              {index + 1}
            </div>
            <Body>
              <strong className="text-primary font-medium">
                {t(`${key}.label`)}
              </strong>{" "}
              {t(`${key}.suffix`)}
            </Body>
          </div>
        ))}
      </Stack>

      <Stack gap={2}>
        <Button
          onClick={onResend}
          disabled={cooldown > 0}
          variant="secondary"
          className="w-full justify-center"
        >
          {cooldown > 0
            ? t("resendCooldown", { seconds: cooldown })
            : t("resend")}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center cursor-pointer text-xs text-muted hover:text-primary transition-colors bg-transparent border-none py-2"
        >
          {t("back")}
        </button>
      </Stack>
    </Stack>
  );
}
