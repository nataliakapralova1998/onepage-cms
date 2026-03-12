import Cta from "@/components/sections/Cta";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/hero/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ProofStrip from "@/components/sections/ProofStrip";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <Navbar />
      <Hero />
      <ProofStrip />
      <HowItWorks />
      <Features />
      <Cta />
      <Footer />
    </div>
  );
}