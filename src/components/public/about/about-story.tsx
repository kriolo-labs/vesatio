"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function AboutStory() {
  return (
    <section className="py-24 bg-onyx relative">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                 <div className="w-full md:w-1/2 space-y-8">
                    <ScrollReveal>
                        <h2 className="text-3xl font-serif text-white mb-6">A Nossa História</h2>
                        <div className="space-y-6 text-diamond-muted leading-relaxed">
                            <p>
                                A Vesatio nasceu de uma inquietação. Observámos que o mercado de luxo em Cabo Verde, embora vibrante, carecia de uma abordagem integrada que unisse a construção técnica rigorosa ao design de interiores emocional.
                            </p>
                            <p>
                                Fundada por visionários com raízes na engenharia e na arquitetura, decidimos criar uma empresa onde o "impossível" fosse apenas o ponto de partida.
                            </p>
                            <p>
                                Hoje, somos mais do que uma construtora. Somos curadores de estilos de vida. A nossa metodologia "Turn-Key" assegura que cada detalhe, desde a fundação até à automação, fala a mesma linguagem de excelência.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
                
                 <div className="w-full md:w-1/2 relative h-[600px]">
                    <ScrollReveal delay={0.2} className="w-full h-full">
                         <div className="grid grid-cols-2 gap-4 h-full">
                             <img 
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" 
                                className="w-full h-4/5 object-cover rounded-sm mt-auto" 
                                alt="Construction Detail"
                            />
                             <img 
                                src="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?q=80&w=800&auto=format&fit=crop" 
                                className="w-full h-4/5 object-cover rounded-sm" 
                                alt="Interior Design"
                            />
                         </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    </section>
  );
}
