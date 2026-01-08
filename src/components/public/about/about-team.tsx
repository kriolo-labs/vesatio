"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Linkedin, Mail } from "lucide-react";

const team = [
    {
        name: "Carlos Ferreira",
        role: "Fundador & CEO",
        bio: "Visionário com 20 anos de experiência em engenharia civil e gestão de projetos de grande escala.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Ana Tavares",
        role: "Diretora Criativa",
        bio: "Arquiteta multipremiada, responsável pela linguagem visual única da Vesatio.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Ricardo Mendes",
        role: "Head de Operações",
        bio: "Especialista em logística e execução, garantindo que cada prazo é cumprido com rigor.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
    },
    {
        name: "Sofia Gomes",
        role: "Head de Smart Living",
        bio: "Engenheira de sistemas focada na integração perfeita entre tecnologia e habitabilidade.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
    }
];

export function AboutTeam() {
  return (
    <section className="py-24 bg-onyx-900 border-t border-white/5">
        <div className="container mx-auto px-4">
             <ScrollReveal className="text-center mb-16">
                 <span className="text-gold text-xs uppercase tracking-[0.2em] mb-3 block">Liderança</span>
                 <h2 className="text-3xl md:text-4xl font-serif text-white">Mentes por trás da Obra</h2>
             </ScrollReveal>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {team.map((member, index) => (
                     <ScrollReveal key={index} delay={index * 0.1}>
                         <div className="group relative">
                             <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6">
                                 <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <a href="#" className="text-white hover:text-gold"><Linkedin size={20} /></a>
                                        <a href="#" className="text-white hover:text-gold"><Mail size={20} /></a>
                                    </div>
                                </div>
                             </div>
                             
                             <h3 className="text-xl font-serif text-white mb-1 group-hover:text-gold transition-colors">{member.name}</h3>
                             <p className="text-gold text-xs uppercase tracking-widest mb-3">{member.role}</p>
                             <p className="text-diamond-muted text-sm leading-relaxed opacity-80">{member.bio}</p>
                         </div>
                     </ScrollReveal>
                 ))}
             </div>
        </div>
    </section>
  );
}
