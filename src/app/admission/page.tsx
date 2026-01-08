"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { AdmissionForm } from "@/components/public/admission/admission-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function AdmissionPage() {
    return (
        <PublicLayout>
            <section className="min-h-screen py-32 bg-onyx-950 relative overflow-hidden flex flex-col justify-center">
                 {/* Background Elements */}
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

                 <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                     <ScrollReveal className="text-center mb-16">
                         <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Processo de Seleção</span>
                         <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Inicie o Seu Legado</h1>
                         <p className="text-xl text-diamond-muted font-light leading-relaxed">
                             Para garantir a excelência absoluta em cada detalhe, aceitamos apenas um número limitado de projetos por ano. 
                             Este formulário é o primeiro passo para avaliarmos a compatibilidade da sua visão com a nossa metodologia.
                         </p>
                     </ScrollReveal>

                     <ScrollReveal delay={0.2} className="bg-onyx border border-white/5 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                         <AdmissionForm />
                     </ScrollReveal>
                 </div>
            </section>
        </PublicLayout>
    );
}
