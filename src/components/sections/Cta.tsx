import Button from "@/components/ui/Button";
import SectionLabel from "@/components/shared/SectionLabel";

export default function CtaSection() {
  return (
    <section className="text-center max-w-[960px] mx-auto px-6 md:px-12 py-24 md:py-32">
      <SectionLabel className="justify-center flex">Get started</SectionLabel>
      <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-tight leading-tight text-primary mb-4">
        One dollar.<br /><em>Your page, live.</em>
      </h2>
      <p className="text-base font-light text-muted mb-10 leading-relaxed">
        No subscription. No setup. Just build, pay once, and share your link.
      </p>
      <Button href="/signup" size="lg">Claim your slug →</Button>
    </section>
  );
}