"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    image: string;
}

export function ServiceHero({ title, subtitle, image }: ServiceHeroProps) {
  return (
    <section className="relative h-[70vh] flex flex-col justify-end pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
             <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent z-10" />
             <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
                className="w-full h-full"
            >
                <img src={image} alt={title} className="w-full h-full object-cover" />
             </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
            <Link href="/services" className="inline-flex items-center text-white/60 hover:text-gold mb-8 transition-colors text-sm uppercase tracking-widest">
                <ArrowLeft size={16} className="mr-2" /> Voltar aos Serviços
            </Link>
            
            <ScrollReveal>
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">{title}</h1>
                <p className="text-xl text-diamond-muted max-w-2xl font-light">{subtitle}</p>
            </ScrollReveal>
        </div>
    </section>
  );
}

interface ServiceFeatureProps {
    title: string;
    description: string;
    image?: string;
    reversed?: boolean;
}

export function ServiceFeature({ title, description, image, reversed = false }: ServiceFeatureProps) {
    return (
        <section className="py-24 border-t border-white/5 bg-onyx">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
                    <div className="w-full md:w-1/2">
                         <ScrollReveal>
                            <h3 className="text-3xl font-serif text-white mb-6">{title}</h3>
                            <p className="text-diamond-muted text-lg leading-relaxed">{description}</p>
                         </ScrollReveal>
                    </div>
                    {image && (
                        <div className="w-full md:w-1/2 h-[400px]">
                            <ScrollReveal delay={0.2} className="w-full h-full">
                                <img src={image} alt={title} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                            </ScrollReveal>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
