"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className="relative py-40 flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-onyx-900">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620626012053-93f7c8f49517?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-onyx" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                    Pronto para o <br /><span className="text-gold italic">Excecional</span>?
                </h2>
                <p className="text-xl text-diamond-muted max-w-2xl mx-auto mb-12 font-light">
                    Cada projeto Vesatio inicia-se com uma conversa privada. Descubra se somos o parceiro ideal para a sua visão.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <Link href="/admission" className="btn-primary-gold text-lg px-10 py-6 min-w-[250px]">
                        Solicitar Consultoria
                    </Link>
                    <Link href="/portfolio" className="text-white hover:text-gold transition-colors flex items-center gap-2 uppercase tracking-widest text-sm">
                        Ver Portfolio <ArrowRight size={16} />
                    </Link>
                </div>
                
                <p className="mt-8 text-xs text-white/30 uppercase tracking-widest">
                    Processo de Admissão Exclusivo • Vagas Limitadas
                </p>
            </ScrollReveal>
        </div>
    </section>
  );
}
