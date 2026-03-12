import SectionLabel from "@/components/shared/SectionLabel";

const features = [
  {
    title: "Instant publishing",
    desc: "From idea to live page in under a minute. No setup, no config, no waiting.",
  },
  {
    title: "Memorable URL",
    desc: "A clean link at slugpage.com/yourname. Easy to remember, easy to share.",
  },
  {
    title: "Edit anytime, free",
    desc: "The $1 is a one-time publish fee — all edits after that are always free.",
  },
  {
    title: "Mobile ready",
    desc: "Every page looks great on any device. Your visitors get a perfect experience everywhere.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-surface border-y border-border">
      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <SectionLabel>Why SlugPage</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-border">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-8 md:p-10 border-r border-b border-border hover:bg-background transition-colors"
            >
              <div className="font-serif text-lg font-light tracking-tight text-primary mb-2.5">
                {feat.title}
              </div>
              <p className="text-sm font-light text-muted leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}