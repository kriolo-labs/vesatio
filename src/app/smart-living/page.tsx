"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { SmartLivingConcept, SmartLivingHero, SmartLivingPartners, SmartLivingTechnologies } from "@/components/public/smart-living/smart-living-components";

export default function SmartLivingPage() {
    return (
        <PublicLayout>
            <SmartLivingHero />
            <SmartLivingConcept />
            <SmartLivingTechnologies />
            <SmartLivingPartners />
            <FinalCTASection />
        </PublicLayout>
    );
}
