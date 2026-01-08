"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { Mic, Music, Shield, Smartphone, Sun, Wifi } from "lucide-react";

export function SmartLivingHero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-onyx-950">
            {/* Background - Cyber/Tech aesthetic */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-onyx-800 via-onyx-950 to-black opacity-80" />
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40" />
            </div>

            <div className="relative z-20 text-center container px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block animate-pulse">Full Integration</span>
                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tight">
                        A Casa <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">Invisível</span>
                    </h1>
                    <p className="text-xl text-diamond-muted max-w-2xl mx-auto font-light">
                        Onde a tecnologia desaparece e o conforto permanece.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export function SmartLivingConcept() {
    return (
        <section className="py-24 bg-onyx container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="w-full md:w-1/2">
                    <ScrollReveal>
                        <h2 className="text-3xl font-serif text-white mb-6">Mais do que Gadgets.<br/>Um Organismo Vivo.</h2>
                        <p className="text-diamond-muted text-lg leading-relaxed mb-6">
                            Para a Vesatio, uma Smart Home não é uma coleção de dispositivos desconectados. É um ecossistema unificado onde a iluminação, o clima, a segurança e o entretenimento dialogam em tempo real.
                        </p>
                        <p className="text-diamond-muted text-lg leading-relaxed">
                            A nossa infraestrutura é desenhada antes do primeiro tijolo ser assente, garantindo que a "inteligência" da casa esteja profundamente enraizada nas suas paredes, e não apenas ligada a uma tomada.
                        </p>
                    </ScrollReveal>
                </div>
                <div className="w-full md:w-1/2">
                    <ScrollReveal delay={0.2} className="relative">
                        <div className="aspect-square bg-gradient-to-br from-onyx-800 to-black rounded-full border border-white/5 p-12 flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-gold/5 blur-3xl animate-pulse" />
                             {/* Abstract Visualization of Connection */}
                             <div className="grid grid-cols-2 gap-8 relative z-10">
                                <TechIcon icon={<Sun />} label="Clima" />
                                <TechIcon icon={<Shield />} label="Segurança" />
                                <TechIcon icon={<Music />} label="Audio" />
                                <TechIcon icon={<Mic />} label="Voz" />
                             </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

function TechIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex flex-col items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
                {icon}
            </div>
            <span className="text-xs uppercase tracking-widest">{label}</span>
        </div>
    )
}

export function SmartLivingTechnologies() {
    const techs = [
        { icon: <Wifi />, title: "Rede Enterprise", desc: "Wi-Fi 6 de nível corporativo e cablagem estruturada." },
        { icon: <Sun />, title: "Iluminação Circadiana", desc: "Luzes que se ajustam ao ciclo solar para o seu bem-estar." },
        { icon: <Smartphone />, title: "App Centralizada", desc: "Uma única interface para controlar toda a propriedade." },
        { icon: <Shield />, title: "Segurança Preditiva", desc: "Câmaras com IA e controlo de acessos biométrico." }
    ]

    return (
        <section className="py-24 bg-onyx-900 border-t border-white/5">
            <div className="container mx-auto px-4">
                <ScrollReveal className="text-center mb-16">
                     <h2 className="text-3xl font-serif text-white">Tecnologias Integradas</h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {techs.map((t, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="p-8 bg-onyx border border-white/5 hover:border-gold/30 transition-colors h-full">
                                <div className="text-gold mb-4 w-10 h-10">{t.icon}</div>
                                <h3 className="text-xl font-serif text-white mb-2">{t.title}</h3>
                                <p className="text-diamond-muted text-sm">{t.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function SmartLivingPartners() {
    return (
        <section className="py-16 bg-onyx text-center border-t border-white/5">
             <div className="container mx-auto px-4">
                <p className="text-xs uppercase tracking-widest text-white/30 mb-8">Trusted by World Leaders</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    {/* Mock Logos - Text for now */}
                    <span className="text-xl font-bold text-white">CONTROL4</span>
                    <span className="text-xl font-bold text-white">CRESTRON</span>
                    <span className="text-xl font-bold text-white">LUTRON</span>
                    <span className="text-xl font-bold text-white">SONOS</span>
                    <span className="text-xl font-bold text-white">SAVANT</span>
                </div>
             </div>
        </section>
    )
}
