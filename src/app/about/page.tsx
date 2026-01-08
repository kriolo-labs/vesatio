"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { AboutHero } from "@/components/public/about/about-hero";
import { AboutStory } from "@/components/public/about/about-story";
import { AboutTeam } from "@/components/public/about/about-team";
import { FinalCTASection } from "@/components/public/home/final-cta-section";

export default function AboutPage() {
  return (
    <PublicLayout>
      <AboutHero />
      <AboutStory />
      <AboutTeam />
      <FinalCTASection />
    </PublicLayout>
  );
}
