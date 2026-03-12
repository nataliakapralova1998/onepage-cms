import SectionLabel from "@/components/shared/SectionLabel";

const steps = [
  {
    num: "01",
    title: "Pick your",
    em: "slug",
    desc: "Choose a unique URL that represents you. Your name, your brand, your studio — whatever fits.",
  },
  {
    num: "02",
    title: "Build your",
    em: "page",
    desc: "Add your headline, description, and a call-to-action. Everything looks great out of the box.",
  },
  {
    num: "03",
    title: "Pay $1,",
    em: "go live",
    desc: "One dollar. Your page is live forever. Share anywhere — Instagram, business card, email.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="max-w-[960px] mx-auto px-6 md:px-12 py-20 md:py-24">
      <SectionLabel>How it works</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {steps.map((step) => (
          <div key={step.num}>
            <div className="font-serif text-sm font-light text-muted mb-5">
              {step.num}
            </div>
            <div className="font-serif text-xl font-light tracking-tight text-primary mb-3 leading-snug">
              {step.title} <em>{step.em}</em>
            </div>
            <p className="text-sm font-light text-muted leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}