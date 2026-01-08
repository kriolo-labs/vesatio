"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
    {
        id: 1,
        quote: "A Vesatio transformou a nossa visão numa realidade que supera qualquer expectativa. O nível de detalhe é obsessivo.",
        author: "Miguel S.",
        role: "CEO, Tech Ventures",
        project: "Penthouse T5, Praia"
    },
    {
        id: 2,
        quote: "Pela primeira vez, sinto que a minha casa trabalha para mim. A integração tecnológica é invisível mas onipresente.",
        author: "Sarah L.",
        role: "Investidora",
        project: "Smart Villa, Sal"
    },
    {
        id: 3,
        quote: "Profissionalismo raro. Cumprimento de prazos e um acabamento que não se encontra em mais lado nenhum em África.",
        author: "Dr. Paulo R.",
        role: "Diretor Clínico",
        project: "Clínica Privada"
    }
];

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 bg-onyx relative overflow-hidden">
             {/* Decorative Quotes */}
             <div className="absolute top-20 left-10 text-white/5 pointer-events-none">
                <Quote size={200} />
             </div>

             <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal className="max-w-4xl mx-auto text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                             <p className="text-2xl md:text-4xl font-serif text-white leading-snug">
                                "{testimonials[current].quote}"
                             </p>
                             
                             <div className="flex flex-col items-center">
                                 <div className="h-0.5 w-12 bg-gold mb-4" />
                                 <h4 className="text-lg font-bold text-white mb-1">{testimonials[current].author}</h4>
                                 <p className="text-sm text-diamond-muted">{testimonials[current].role} • <span className="text-gold">{testimonials[current].project}</span></p>
                             </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </ScrollReveal>
             </div>
        </section>
    );
}
