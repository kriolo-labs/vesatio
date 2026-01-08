"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactoPage() {
    const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("loading");

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFormState("success");
    };

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
                            Contacte-nos
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-diamond mt-4 mb-6">
                            Vamos Conversar
                        </h1>
                        <p className="text-xl text-diamond-muted leading-relaxed">
                            Estamos prontos para ouvir as suas ideias e transformá-las em realidade.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-onyx-50">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="font-serif text-3xl text-diamond mb-8">
                                Informações de Contacto
                            </h2>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-diamond mb-1">Morada</h3>
                                        <p className="text-diamond-muted">
                                            Rua 5 de Julho, N.º 123<br />
                                            Platô, Praia<br />
                                            Santiago, Cabo Verde
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-diamond mb-1">Telefone</h3>
                                        <a
                                            href="tel:+2389912345678"
                                            className="text-diamond-muted hover:text-gold transition-colors"
                                        >
                                            +238 991 234 567
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-diamond mb-1">Email</h3>
                                        <a
                                            href="mailto:hello@vesatio.cv"
                                            className="text-diamond-muted hover:text-gold transition-colors"
                                        >
                                            hello@vesatio.cv
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-diamond mb-1">Horário</h3>
                                        <p className="text-diamond-muted">
                                            Segunda a Sexta: 09:00 - 18:00<br />
                                            Sábado: 09:00 - 13:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="glass-panel-gold p-8">
                                {formState === "success" ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 mx-auto bg-status-success/10 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-status-success" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-diamond mb-2">
                                            Mensagem Enviada!
                                        </h3>
                                        <p className="text-diamond-muted">
                                            Entraremos em contacto brevemente.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-diamond-muted mb-2">
                                                    Nome Completo *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="input-field"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-diamond-muted mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="input-field"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-diamond-muted mb-2">
                                                    Telefone
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-diamond-muted mb-2">
                                                    Assunto *
                                                </label>
                                                <select
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="input-field"
                                                    required
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="projeto">Novo Projecto</option>
                                                    <option value="orcamento">Pedido de Orçamento</option>
                                                    <option value="parceria">Parceria</option>
                                                    <option value="outro">Outro</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-diamond-muted mb-2">
                                                Mensagem *
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={5}
                                                className="input-field resize-none"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={formState === "loading"}
                                        >
                                            {formState === "loading" ? (
                                                "A enviar..."
                                            ) : (
                                                <>
                                                    Enviar Mensagem
                                                    <Send className="w-4 h-4 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
