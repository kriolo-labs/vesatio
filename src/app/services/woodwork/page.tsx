"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { ServiceFeature, ServiceHero } from "@/components/public/services/service-components";

export default function WoodworkPage() {
    return (
        <PublicLayout>
            <ServiceHero 
                title="Alta Marcenaria Bespoke"
                subtitle="Onde a função encontra a arte. Mobiliário desenhado exclusivamente para o seu espaço, sem compromissos."
                image="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000&auto=format&fit=crop"
            />
            
            <ServiceFeature 
                title="Cozinhas de Chef"
                description="Ergonomia profissional envolta em elegância. Integramos eletrodomésticos de topo com armários que deslizam com um toque, utilizando apenas madeiras nobres e lacados perfeitos."
                image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
            />
            
            <ServiceFeature 
                title="Closets & Roupeiros"
                description="Um santuário para a sua coleção. Iluminação integrada, gavetas forradas a veludo e espelhos que ampliam o espaço. Cada compartimento é pensado para a máxima organização e beleza."
                image="https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=1200&auto=format&fit=crop"
                reversed
            />
            
            <FinalCTASection />
        </PublicLayout>
    );
}
