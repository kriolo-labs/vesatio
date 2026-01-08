"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { ServiceFeature, ServiceHero } from "@/components/public/services/service-components";

export default function SmartHomePage() {
    return (
        <PublicLayout>
            <ServiceHero 
                title="Smart Living & Domótica"
                subtitle="A casa que pensa. Tecnologia invisível que orquestra luz, clima e som para o seu conforto absoluto."
                image="https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2000&auto=format&fit=crop"
            />
            
            <ServiceFeature 
                title="Controlo Total"
                description="Gerencie toda a sua residência a partir do seu smartphone ou via comandos de voz. Desde verificar câmaras de segurança até ajustar a temperatura da piscina antes de chegar a casa."
                image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
            />
            
            <ServiceFeature 
                title="Cenários Imersivos"
                description="Com um toque, ative o modo 'Cinema': as luzes diminuem, as cortinas fecham e o som surround envolve a sala. Crie atmosferas para cada momento do seu dia."
                image="https://images.unsplash.com/photo-1513506003011-3b03c801e128?q=80&w=1200&auto=format&fit=crop"
                reversed
            />
            
            <FinalCTASection />
        </PublicLayout>
    );
}
