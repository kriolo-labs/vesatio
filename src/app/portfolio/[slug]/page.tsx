"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for individual project
const projectData = {
    title: "Villa Sol",
    location: "Praia, Cabo Verde",
    category: "Arquitetura & Design",
    year: "2023",
    area: "450 m²",
    description: "Uma residência que desafia a gravidade, suspensa sobre a falésia. O conceito partiu da eliminação de barreiras entre o interior e o horizonte atlântico. Utilizamos vidro estrutural de grandes dimensões e betão aparente para criar uma estética brutalista mas calorosa, suavizada por madeiras locais.",
    specs: ["Domótica Control4", "Cozinha Gaggenau", "Revestimento Pedra Vulcânica"],
    images: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200"
    ]
};

export default function ProjectDetailPage() {
    const params = useParams();
    // In real app, fetch data based on params.slug

    return (
        <PublicLayout>
            {/* Hero */}
            <section className="relative h-[80vh]">
                <div className="absolute inset-0">
                    <img src={projectData.images[0]} alt={projectData.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
                </div>
                
                <div className="absolute top-24 left-0 p-4 md:p-8 z-20">
                    <Link href="/portfolio" className="text-white/80 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-gold transition-colors">
                        <ArrowLeft size={14} /> Voltar
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
                    <div className="container mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <span className="text-gold text-sm uppercase tracking-[0.2em] mb-4 block">{projectData.category}</span>
                            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">{projectData.title}</h1>
                            <div className="flex flex-wrap gap-8 text-white/80 text-sm tracking-wide border-t border-white/20 pt-6 max-w-2xl">
                                <div><span className="block text-white/40 text-xs mb-1">Localização</span>{projectData.location}</div>
                                <div><span className="block text-white/40 text-xs mb-1">Ano</span>{projectData.year}</div>
                                <div><span className="block text-white/40 text-xs mb-1">Área</span>{projectData.area}</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 bg-onyx">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-2/3">
                            <h2 className="text-2xl font-serif text-white mb-6">O Conceito</h2>
                            <p className="text-diamond-muted text-lg leading-relaxed mb-12">{projectData.description}</p>
                            
                            <h3 className="text-lg font-serif text-white mb-4">Especificações</h3>
                            <ul className="space-y-2">
                                {projectData.specs.map((spec, i) => (
                                    <li key={i} className="flex items-center text-diamond-muted">
                                        <div className="w-1.5 h-1.5 bg-gold rounded-full mr-3" />
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/3">
                             {/* Sidebar info or just sticky cta */}
                             <div className="sticky top-32 p-8 bg-onyx-900 border border-white/5 rounded-sm">
                                <h3 className="text-xl font-serif text-white mb-4">Interessado num projeto similar?</h3>
                                <p className="text-sm text-diamond-muted mb-6">Agende uma consultoria para discutir a sua visão.</p>
                                <Link href="/admission" className="btn-primary w-full justify-center">
                                    Iniciar Conversa
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12 bg-onyx cursor-none"> 
                {/* Note: In real setup, we might re-enable cursor or use custom "VIEW" cursor */}
                <div className="container mx-auto px-4">
                    <div className="space-y-8">
                        {projectData.images.slice(1).map((img, i) => (
                            <ScrollReveal key={i}>
                                <img src={img} alt="Detail" className="w-full object-cover rounded-sm hover:opacity-90 transition-opacity" />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 border-t border-white/5 flex justify-between container mx-auto px-4">
                <Link href="#" className="text-right ml-auto group">
                    <span className="text-xs text-diamond-muted uppercase tracking-widest block mb-1">Próximo Projeto</span>
                    <span className="text-2xl font-serif text-white group-hover:text-gold transition-colors flex items-center justify-end gap-3">
                        Penthouse Black <ArrowRight />
                    </span>
                </Link>
            </section>
        </PublicLayout>
    );
}
