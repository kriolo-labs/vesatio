import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { HeroSection } from "@/components/public/home/hero-section";
import { PhilosophySection } from "@/components/public/home/philosophy-section";
import { PortfolioPreview } from "@/components/public/home/portfolio-preview";
import { ServicesOverview } from "@/components/public/home/services-overview";
import { TestimonialsSection } from "@/components/public/home/testimonials-section";

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <PhilosophySection />
      <ServicesOverview />
      <PortfolioPreview />
      <TestimonialsSection />
      <FinalCTASection />
    </PublicLayout>
  );
}
