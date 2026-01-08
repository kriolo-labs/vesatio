"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Data
const projects = [
    {
        id: "villa-sol",
        title: "Villa Sol",
        category: "Arquitetura",
        location: "Praia, Cabo Verde",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
        year: 2023,
        featured: true
    },
    {
        id: "penthouse-black",
        title: "Penthouse Black",
        category: "Marcenaria",
        location: "Luanda, Angola",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
        year: 2024, 
        featured: false
    },
     {
        id: "escritorios-morabeza",
        title: "Escritórios Morabeza",
        category: "Smart Office",
        location: "Mindelo, Cabo Verde",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
        year: 2023,
        featured: false
    },
    {
        id: "residencia-ocean",
        title: "Residência Ocean",
        category: "Full Service",
        location: "Sal, Cabo Verde",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
        year: 2022,
        featured: true
    },
     {
        id: "casa-dunas",
        title: "Casa Dunas",
        category: "Arquitetura",
        location: "Boa Vista, Cabo Verde",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop",
        year: 2024,
        featured: false
    },
    {
        id: "showroom-vesatio",
        title: "Showroom Vesatio",
        category: "Marcenaria",
        location: "Praia, Cabo Verde",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
        year: 2023,
        featured: true
    }
];

const categories = ["Todos", "Arquitetura", "Marcenaria", "Smart Office", "Full Service"];

export function PortfolioGrid() {
    const [filter, setFilter] = useState("Todos");

    const filteredProjects = filter === "Todos" 
        ? projects 
        : projects.filter(p => p.category === filter);

    return (
        <section className="py-24 bg-onyx min-h-screen">
            <div className="container mx-auto px-4">
                
                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Portfólio</h1>
                        <p className="text-diamond-muted">Uma coleção de espaços que redefinem o luxo.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-all duration-300",
                                    filter === cat 
                                        ? "bg-gold border-gold text-onyx font-bold" 
                                        : "bg-transparent border-white/10 text-white hover:border-gold hover:text-gold"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className={cn(
                                    "group relative aspect-[3/4] overflow-hidden rounded-sm bg-onyx-900 border border-white/5",
                                    project.featured ? "md:col-span-2 md:aspect-[16/9]" : ""
                                )}
                            >
                                <Link href={`/portfolio/${project.id}`} className="block w-full h-full">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    
                                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                                         <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-gold text-xs uppercase tracking-widest mb-1 block">{project.category}</span>
                                            <div className="flex justify-between items-end">
                                                <h3 className="text-2xl font-serif text-white">{project.title}</h3>
                                                <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-white/60 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{project.location}</p>
                                         </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
