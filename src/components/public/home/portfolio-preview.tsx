"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        id: "1",
        title: "Villa Sol",
        category: "Arquitetura & Design",
        location: "Praia, Cabo Verde",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
        size: "large"
    },
    {
        id: "2",
        title: "Penthouse Black",
        category: "Alta Marcenaria",
        location: "Luanda, Angola",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
        size: "small"
    },
    {
        id: "3",
        title: "Escritórios Morabeza",
        category: "Smart Office",
        location: "Mindelo, Cabo Verde",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
        size: "small"
    },
    {
        id: "4",
        title: "Residência Ocean",
        category: "Full Service",
        location: "Sal, Cabo Verde",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
        size: "large"
    }
];

export function PortfolioPreview() {
    return (
        <section className="py-24 bg-onyx-950 relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-16">
                    <ScrollReveal>
                        <span className="text-gold text-xs uppercase tracking-[0.2em] mb-3 block">A Coleção</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Projectos Selecionados</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2} className="hidden md:block">
                        <Link href="/portfolio" className="text-white hover:text-gold transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                             Ver Portfolio <ArrowRight size={16} />
                        </Link>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ScrollReveal 
                            key={project.id} 
                            delay={index * 0.1}
                            className={cn(
                                "group relative overflow-hidden",
                                // Simple alternating layout for preview
                                index === 0 || index === 3 ? "md:col-span-2 h-[500px]" : "col-span-1 h-[400px]"
                            )}
                        >
                            <Link href={`/portfolio/${project.id}`} className="block h-full w-full relative">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                
                                <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                                    <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div>
                                            <span className="text-gold text-xs uppercase tracking-widest mb-2 block">{project.category}</span>
                                            <h3 className="text-3xl font-serif text-white mb-1">{project.title}</h3>
                                            <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">{project.location}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-gold group-hover:text-onyx transition-all">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/portfolio" className="btn-outline-gold inline-flex items-center">
                         Ver Portfolio Completo
                    </Link>
                </div>
            </div>
        </section>
    );
}
