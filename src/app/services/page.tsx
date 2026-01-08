"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { FinalCTASection } from "@/components/public/home/final-cta-section";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Hammer, Paintbrush } from "lucide-react";
import Link from "next/link";

export default function ServicesHubPage() {
    return (
        <PublicLayout>
             <section className="relative h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden bg-onyx-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
                <div className="relative z-10 container px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        Expertise Vesatio
                    </motion.h1>
                    <p className="text-xl text-diamond-muted max-w-2xl mx-auto font-light">
                        Um ecossistema de serviços integrados para materializar o impossível.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                <ServiceCard 
                    title="Acabamentos" 
                    icon={<Paintbrush className="w-8 h-8"/>} 
                    href="/services/finishes"
                    desc="Pintura, texturas e revestimentos."
                />
                <ServiceCard 
                    title="Marcenaria" 
                    icon={<Hammer className="w-8 h-8"/>} 
                    href="/services/woodwork"
                    desc="Mobiliário bespoke e cozinhas."
                />
                <ServiceCard 
                    title="Smart Home" 
                    icon={<Cpu className="w-8 h-8"/>} 
                    href="/services/smart-home"
                    desc="Automação e tecnologia."
                />
            </div>

            <FinalCTASection />
        </PublicLayout>
    );
}

function ServiceCard({ title, icon, href, desc }: { title: string, icon: React.ReactNode, href: string, desc: string }) {
    return (
        <Link href={href} className="bg-onyx-800 border border-white/5 p-8 hover:bg-onyx-700 transition-colors group">
            <div className="text-gold mb-6 group-hover:scale-110 transition-transform origin-left">{icon}</div>
            <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
            <p className="text-diamond-muted mb-6">{desc}</p>
            <span className="text-xs uppercase tracking-widest text-white group-hover:text-gold flex items-center">
                Explorar <ArrowRight size={14} className="ml-2" />
            </span>
        </Link>
    )
}
