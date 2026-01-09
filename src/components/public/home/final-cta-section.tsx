"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden py-40">
      {/* Background */}
      <div className="absolute inset-0 bg-onyx-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620626012053-93f7c8f49517?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-onyx" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="mb-6 font-serif text-4xl text-white md:text-6xl">
            Pronto para o <br />
            <span className="italic text-gold">Excecional</span>?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-light text-diamond-muted">
            Cada projeto Vesatio inicia-se com uma conversa privada. Descubra se somos o parceiro
            ideal para a sua visão.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <Link href="/admission" className="btn-primary-gold min-w-[250px] px-10 py-6 text-lg">
              Solicitar Consultoria
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-white transition-colors hover:text-gold"
            >
              Ver Portfolio <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-8 text-xs uppercase tracking-widest text-white/30">
            Processo de Admissão Exclusivo • Vagas Limitadas
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
