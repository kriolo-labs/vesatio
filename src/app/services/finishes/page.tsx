"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { ServiceFeature, ServiceHero } from "@/components/public/services/service-components";

export default function FinishesPage() {
    return (
        <PublicLayout>
            <ServiceHero 
                title="Acabamentos de Alta Performance"
                subtitle="A pele da sua casa. Texturas que respiram, cores que protegem e superfícies que contam histórias."
                image="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2000&auto=format&fit=crop"
            />
            
            <ServiceFeature 
                title="Pintura & Texturas"
                description="Utilizamos apenas tintas de marcas premium com pigmentação superior e durabilidade extrema. As nossas técnicas de aplicação, desde o stucco veneziano ao microcimento polido, transformam paredes em obras de arte."
                image="https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=1200&auto=format&fit=crop"
            />
            
            <ServiceFeature 
                title="Revestimentos Minerais"
                description="Pedra natural, cerâmica de grande formato ou madeiras exóticas. A nossa equipa domina a arte do corte e assentamento de precisão, garantindo juntas invisíveis e alinhamentos perfeitos."
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                reversed
            />
            
            <FinalCTASection />
        </PublicLayout>
    );
}
