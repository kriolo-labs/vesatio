"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, Cpu, Hammer, Paintbrush } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: <Paintbrush className="w-8 h-8 text-gold" />,
        title: "Acabamentos",
        desc: "Pintura de alta performance, texturas exclusivas e revestimentos que definem atmosferas.",
        bgImage: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop",
        link: "/services/finishes"
    },
    {
        icon: <Hammer className="w-8 h-8 text-gold" />,
        title: "Alta Marcenaria",
        desc: "Mobiliário bespoke, cozinhas de luxo e closets desenhados para a sua coleção.",
        bgImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800&auto=format&fit=crop",
        link: "/services/woodwork"
    },
    {
        icon: <Cpu className="w-8 h-8 text-gold" />,
        title: "Smart Living",
        desc: "Domótica invisível. O controlo total da sua casa na ponta dos dedos ou na sua voz.",
        bgImage: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=800&auto=format&fit=crop",
        link: "/services/smart-home"
    }
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-onyx relative z-10">
        <div className="container mx-auto px-4">
            <ScrollReveal className="mb-16 text-center">
                <span className="text-gold text-xs uppercase tracking-[0.2em] mb-3 block">Expertise</span>
                <h2 className="text-3xl md:text-4xl font-serif text-white">Serviços Exclusivos</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <ScrollReveal key={index} delay={index * 0.2} className="h-full">
                        <Link href={service.link} className="group relative block h-[500px] w-full overflow-hidden bg-onyx-900 border border-white/5">
                            {/* Background Image Reveal on Hover */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out"
                                style={{ backgroundImage: `url(${service.bgImage})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-transparent opacity-90 transition-opacity" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:-translate-y-4">
                                <div className="mb-auto pt-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                    {service.icon}
                                </div>
                                
                                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
                                <p className="text-diamond-muted text-sm leading-relaxed mb-8 max-w-xs">{service.desc}</p>
                                
                                <span className="inline-flex items-center text-xs uppercase tracking-widest text-white group-hover:text-gold transition-colors">
                                    Saber Mais <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
            
            <div className="text-center mt-12">
                 <Link href="/services" className="btn-primary inline-flex items-center">
                    Ver Todos os Serviços
                 </Link>
            </div>
        </div>
    </section>
  );
}
