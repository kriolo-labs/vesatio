"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function PhilosophySection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative py-32 overflow-hidden bg-onyx-900 border-t border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                
                {/* Visual Side */}
                 <div className="w-full md:w-1/2 h-[600px] relative">
                    <motion.div 
                        style={{ y }}
                        className="w-full h-full"
                    >
                        <div className="relative w-full h-[500px] overflow-hidden rounded-sm">
                             <img 
                                src="https://images.unsplash.com/photo-1628148812674-da48af686001?q=80&w=1200&auto=format&fit=crop" 
                                alt="Marble Texture" 
                                className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                        {/* Floating Element */}
                         <ScrollReveal delay={0.2} className="absolute -bottom-12 -right-12 w-64 h-64 bg-onyx border border-white/10 p-8 flex flex-col justify-center shadow-2xl z-20">
                            <span className="text-5xl font-serif text-gold mb-2">15+</span>
                            <span className="text-sm text-diamond-muted uppercase tracking-widest">Anos de<br/>Excelência</span>
                         </ScrollReveal>
                    </motion.div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 space-y-8">
                     <ScrollReveal animation="fade-up">
                        <span className="text-gold text-sm uppercase tracking-widest font-medium mb-4 block">A Nossa Filosofia</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
                            Construímos o invísivel. <br/><span className="text-white/40">Percebemos o essencial.</span>
                        </h2>
                     </ScrollReveal>
                     
                     <ScrollReveal animation="fade-up" delay={0.2}>
                         <p className="text-diamond-muted text-lg leading-relaxed font-light">
                             Na Vesatio, acreditamos que o verdadeiro luxo reside na ausência de fricção.
                             Os nossos espaços não são apenas visualmente impactantes; são projetados para orquestrar a sua vida com silêncio e precisão. 
                             Desde a marcenaria que se funde com a arquitetura até à tecnologia que antecipa o seu toque.
                         </p>
                     </ScrollReveal>

                     <ScrollReveal animation="fade-up" delay={0.4}>
                         <blockquote className="border-l-2 border-gold pl-6 py-2 my-8">
                             <p className="text-xl text-white font-serif italic">"Silent Wealth é a arte de viver bem, sem ter de anunciar."</p>
                         </blockquote>
                     </ScrollReveal>
                </div>
            </div>
        </div>
    </section>
  );
}
