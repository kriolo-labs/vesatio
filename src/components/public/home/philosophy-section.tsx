"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function PhilosophySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={targetRef}
      className="relative overflow-hidden border-t border-white/5 bg-onyx-900 py-32"
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gold/5 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gold/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          {/* Visual Side */}
          <div className="relative h-[600px] w-full md:w-1/2">
            <motion.div style={{ y }} className="h-full w-full">
              <div className="relative h-[500px] w-full overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                  alt="Marble Texture"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              {/* Floating Element */}
              <ScrollReveal
                delay={0.2}
                className="absolute -bottom-12 -right-12 z-20 flex h-64 w-64 flex-col justify-center border border-white/10 bg-onyx p-8 shadow-2xl"
              >
                <span className="mb-2 font-serif text-5xl text-gold">15+</span>
                <span className="text-sm uppercase tracking-widest text-diamond-muted">
                  Anos de
                  <br />
                  Excelência
                </span>
              </ScrollReveal>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full space-y-8 md:w-1/2">
            <ScrollReveal animation="fade-up">
              <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-gold">
                A Nossa Filosofia
              </span>
              <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">
                Construímos o invísivel. <br />
                <span className="text-white/40">Percebemos o essencial.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-lg font-light leading-relaxed text-diamond-muted">
                Na Vesatio, acreditamos que o verdadeiro luxo reside na ausência de fricção. Os
                nossos espaços não são apenas visualmente impactantes; são projetados para
                orquestrar a sua vida com silêncio e precisão. Desde a marcenaria que se funde com a
                arquitetura até à tecnologia que antecipa o seu toque.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.4}>
              <blockquote className="my-8 border-l-2 border-gold">
                <p className="font-serif text-xl italic text-white">
                  &quot;Silent Wealth é a arte de viver bem, sem ter de anunciar.&quot;
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
