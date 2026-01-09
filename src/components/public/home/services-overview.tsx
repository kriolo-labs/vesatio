"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, Cpu, Hammer, Paintbrush } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Paintbrush className="h-8 w-8 text-gold" />,
    title: "Acabamentos",
    desc: "Pintura de alta performance, texturas exclusivas e revestimentos que definem atmosferas.",
    bgImage:
      "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop",
    link: "/services/finishes",
  },
  {
    icon: <Hammer className="h-8 w-8 text-gold" />,
    title: "Alta Marcenaria",
    desc: "Mobiliário bespoke, cozinhas de luxo e closets desenhados para a sua coleção.",
    bgImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800&auto=format&fit=crop",
    link: "/services/woodwork",
  },
  {
    icon: <Cpu className="h-8 w-8 text-gold" />,
    title: "Smart Living",
    desc: "Domótica invisível. O controlo total da sua casa na ponta dos dedos ou na sua voz.",
    bgImage:
      "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=800&auto=format&fit=crop",
    link: "/services/smart-home",
  },
];

export function ServicesOverview() {
  return (
    <section className="relative z-10 bg-onyx py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal className="mb-16 text-center">
          <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-gold">Expertise</span>
          <h2 className="font-serif text-3xl text-white md:text-4xl">Serviços Exclusivos</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="h-full">
              <Link
                href={service.link}
                className="group relative block h-[500px] w-full overflow-hidden border border-white/5 bg-onyx-900 transition-all duration-500 hover:border-gold/30"
              >
                {/* Background Image - Visible by default now (low opacity) */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-700 ease-out group-hover:opacity-40"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-transparent opacity-90" />

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                  <div className="mb-auto pt-8 opacity-100 transition-opacity">{service.icon}</div>

                  <h3 className="mb-4 font-serif text-2xl text-white transition-colors group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="mb-8 max-w-xs text-sm leading-relaxed text-diamond-muted">
                    {service.desc}
                  </p>

                  <span className="inline-flex items-center text-xs uppercase tracking-widest text-white transition-colors group-hover:text-gold">
                    Saber Mais <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn-primary inline-flex items-center">
            Ver Todos os Serviços
          </Link>
        </div>
      </div>
    </section>
  );
}
