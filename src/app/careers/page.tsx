"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

const jobs = [
    {
        title: "Arquiteto Sénior",
        dept: "Design & Projeto",
        location: "Praia, Cabo Verde",
        type: "Full-time"
    },
    {
        title: "Engenheiro Civil - Diretor de Obra",
        dept: "Operações",
        location: "Sal, Cabo Verde",
        type: "Full-time"
    },
    {
        title: "Especialista em Domótica",
        dept: "Smart Living",
        location: "Remoto / Híbrido",
        type: "Part-time"
    }
];

export default function CareersPage() {
    return (
        <PublicLayout>
            <section className="py-32 bg-onyx-950 relative">
                 <div className="container mx-auto px-4">
                     <ScrollReveal className="text-center mb-16">
                         <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Talento</span>
                         <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Junte-se à Elite</h1>
                         <p className="text-xl text-diamond-muted max-w-2xl mx-auto font-light">
                             Na Vesatio, não procuramos apenas profissionais. Procuramos obsessivos pelo detalhe, visionários e mestres da sua arte.
                         </p>
                     </ScrollReveal>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                         {jobs.map((job, index) => (
                             <ScrollReveal key={index} delay={index * 0.1}>
                                 <div className="bg-onyx border border-white/5 p-8 hover:border-gold/30 transition-colors group">
                                     <span className="text-xs uppercase tracking-widest text-gold mb-2 block">{job.dept}</span>
                                     <h3 className="text-2xl font-serif text-white mb-4">{job.title}</h3>
                                     <div className="space-y-2 mb-8 text-sm text-diamond-muted">
                                         <p className="flex items-center gap-2"><MapPin size={14} /> {job.location}</p>
                                         <p className="flex items-center gap-2"><Clock size={14} /> {job.type}</p>
                                     </div>
                                     <Link href="#" className="text-white group-hover:text-gold transition-colors text-sm uppercase tracking-widest">
                                         Candidatar-se
                                     </Link>
                                 </div>
                             </ScrollReveal>
                         ))}
                     </div>

                     <ScrollReveal className="text-center bg-onyx-800 p-12 border border-white/5 rounded-sm">
                         <h3 className="text-2xl font-serif text-white mb-4">Candidatura Espontânea</h3>
                         <p className="text-diamond-muted mb-8 max-w-md mx-auto">
                             Não encontra a vaga ideal? Estamos sempre à procura de talento excecional. Envie-nos o seu portfólio.
                         </p>
                         <Link href="mailto:careers@vesatio.com" className="btn-primary-gold inline-block">
                             Enviar CV & Portfólio
                         </Link>
                     </ScrollReveal>
                 </div>
            </section>
        </PublicLayout>
    );
}
