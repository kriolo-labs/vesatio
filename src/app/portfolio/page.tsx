"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { PortfolioGrid } from "@/components/public/portfolio/portfolio-grid";

export default function PortfolioPage() {
    return (
        <PublicLayout>
            <PortfolioGrid />
            <FinalCTASection />
        </PublicLayout>
    );
}
