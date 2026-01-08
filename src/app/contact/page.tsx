"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <PublicLayout>
            <section className="py-32 bg-onyx relative min-h-screen">
                 <div className="container mx-auto px-4">
                     <ScrollReveal className="text-center mb-16">
                         <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Fale Connosco</span>
                         <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Escritórios & Ateliers</h1>
                     </ScrollReveal>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                         <ScrollReveal>
                             <div className="space-y-8">
                                 <Office 
                                    city="Praia" 
                                    address="Edifício Vesatio, Av. Cidade de Lisboa, 1º Andar"
                                    phone="+238 260 00 00"
                                    email="praia@vesatio.com"
                                 />
                                 <Office 
                                    city="Sal" 
                                    address="Santa Maria Business Center, Suite 402"
                                    phone="+238 242 00 00"
                                    email="sal@vesatio.com"
                                 />
                                 <Office 
                                    city="Lisboa" 
                                    address="Avenida da Liberdade, 110 (Escritório de Representação)"
                                    phone="+351 21 000 0000"
                                    email="lisboa@vesatio.com"
                                 />
                             </div>
                         </ScrollReveal>
                         
                         <ScrollReveal delay={0.2} className="bg-onyx-900 border border-white/5 h-[500px] relative rounded-sm overflow-hidden">
                             {/* Mock Map */}
                             <div className="absolute inset-0 bg-onyx-800 flex items-center justify-center text-diamond-muted">
                                 [Mapa Mapbox Dark Mode aqui]
                             </div>
                         </ScrollReveal>
                     </div>
                 </div>
            </section>
        </PublicLayout>
    );
}

function Office({ city, address, phone, email }: { city: string, address: string, phone: string, email: string }) {
    return (
        <div className="border-l-2 border-gold pl-6 py-2">
            <h3 className="text-2xl font-serif text-white mb-2">{city}</h3>
            <p className="text-diamond-muted text-sm mb-4 max-w-xs">{address}</p>
            <div className="space-y-2 text-sm text-white/60">
                <p className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} /> {phone}</p>
                <p className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14} /> {email}</p>
            </div>
        </div>
    )
}
