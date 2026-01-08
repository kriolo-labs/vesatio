"use client";

import { motion } from "framer-motion";
import {
    Sparkles,
    Home,
    Lightbulb,
    Hammer,
    Palette,
    Shield,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
    {
        id: "acabamentos",
        icon: Sparkles,
        title: "Acabamentos Premium",
        description: "Materiais importados de Itália, Portugal e Alemanha. Mármores, madeiras nobres e metais preciosos aplicados com mestria artesanal.",
        features: [
            "Mármore Calacatta & Statuario",
            "Madeiras exóticas certificadas",
            "Metais com acabamento dourado",
            "Técnicas ancestrais portuguesas",
        ],
    },
    {
        id: "smart",
        icon: Lightbulb,
        title: "Smart Home",
        description: "Automação residencial de ponta. Controle iluminação, clima, segurança e entretenimento com um toque.",
        features: [
            "Controlo por voz e app",
            "Iluminação circadiana",
            "Climatização inteligente",
            "Segurança 24/7 integrada",
        ],
    },
    {
        id: "marcenaria",
        icon: Hammer,
        title: "Marcenaria Bespoke",
        description: "Peças únicas desenhadas para o seu espaço. Cada mobiliário é uma obra de arte funcional.",
        features: [
            "Design personalizado",
            "Madeiras certificadas FSC",
            "Técnicas tradicionais",
            "Garantia vitalícia",
        ],
    },
    {
        id: "interior",
        icon: Palette,
        title: "Design de Interiores",
        description: "Projectos completos que reflectem a sua personalidade e elevam o seu estilo de vida.",
        features: [
            "Consultoria exclusiva",
            "Renders fotorrealísticos 3D",
            "Curadoria de mobiliário",
            "Gestão completa do projecto",
        ],
    },
];

const process = [
    { step: 1, title: "Admissão", description: "Avaliação do projecto e alinhamento de expectativas" },
    { step: 2, title: "Briefing", description: "Definição detalhada do escopo e orçamento" },
    { step: 3, title: "Projecto", description: "Desenvolvimento de renders e especificações" },
    { step: 4, title: "Execução", description: "Implementação com acompanhamento contínuo" },
    { step: 5, title: "Entrega", description: "Verificação de qualidade e handover" },
];

export default function ServicosPage() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-padding bg-onyx relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-radial opacity-20" />
                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-gold text-sm font-medium tracking-wider uppercase">
                            Os Nossos Serviços
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-diamond mt-4 mb-6">
                            Excelência em Cada Detalhe
                        </h1>
                        <p className="text-xl text-diamond-muted leading-relaxed">
                            Oferecemos uma gama completa de serviços para transformar o seu espaço num santuário de luxo e conforto.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-onyx-50">
                <div className="container-wide">
                    <div className="space-y-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                id={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center">
                                            <service.icon className="w-7 h-7 text-gold" />
                                        </div>
                                        <h2 className="font-serif text-3xl text-diamond">{service.title}</h2>
                                    </div>
                                    <p className="text-lg text-diamond-muted mb-8">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-gold rounded-full" />
                                                <span className="text-diamond">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Image Placeholder */}
                                <div className={`aspect-[4/3] rounded-2xl bg-onyx-100 overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""
                                    }`}>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <service.icon className="w-20 h-20 text-diamond-muted/20" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section-padding bg-onyx">
                <div className="container-wide">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold text-sm font-medium tracking-wider uppercase">
                            Metodologia
                        </span>
                        <h2 className="font-serif text-4xl text-diamond mt-4">
                            O Nosso Processo
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {process.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gold-gradient rounded-full flex items-center justify-center">
                                    <span className="text-onyx font-serif text-2xl">{item.step}</span>
                                </div>
                                <h3 className="font-medium text-diamond mb-2">{item.title}</h3>
                                <p className="text-sm text-diamond-muted">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-onyx-50">
                <div className="container-narrow text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel-gold p-12"
                    >
                        <h2 className="font-serif text-3xl text-diamond mb-4">
                            Pronto para Começar?
                        </h2>
                        <p className="text-diamond-muted mb-8">
                            Solicite admissão e deixe-nos transformar a sua visão em realidade.
                        </p>
                        <Link href="/admissao">
                            <Button size="lg">
                                Solicitar Admissão
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
