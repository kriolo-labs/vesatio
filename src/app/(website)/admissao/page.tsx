"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Upload,
    Send,
    CheckCircle,
    Home,
    Building2,
    Hotel,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projectTypes = [
    { id: "residential", label: "Residencial", icon: Home },
    { id: "commercial", label: "Comercial", icon: Building2 },
    { id: "hospitality", label: "Hotelaria", icon: Hotel },
];

const budgetRanges = [
    { id: "small", label: "2M - 5M CVE" },
    { id: "medium", label: "5M - 15M CVE" },
    { id: "large", label: "15M - 50M CVE" },
    { id: "premium", label: "> 50M CVE" },
];

export default function AdmissaoPage() {
    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        location: "",
        timeline: "",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFormState("success");
    };

    if (formState === "success") {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md mx-auto px-6"
                >
                    <div className="w-24 h-24 mx-auto bg-status-success/10 rounded-full flex items-center justify-center mb-8">
                        <CheckCircle className="w-12 h-12 text-status-success" />
                    </div>
                    <h1 className="font-serif text-3xl text-diamond mb-4">
                        Candidatura Recebida
                    </h1>
                    <p className="text-diamond-muted mb-8">
                        A sua candidatura foi recebida com sucesso. A nossa equipa irá analisar o seu projecto e entrará em contacto nos próximos 2 dias úteis.
                    </p>
                    <p className="text-gold text-sm">
                        Número de referência: ADM-2026-{Math.floor(Math.random() * 1000)}
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-padding bg-onyx relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-radial opacity-20" />
                <div className="container-narrow relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold text-sm font-medium tracking-wider uppercase">
                            Processo Selectivo
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl text-diamond mt-4 mb-6">
                            Solicitar Admissão
                        </h1>
                        <p className="text-xl text-diamond-muted">
                            A Vesatio trabalha exclusivamente com projectos que partilham a nossa visão de excelência. Preencha o formulário abaixo para iniciar o processo de admissão.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form */}
            <section className="section-padding bg-onyx-50">
                <div className="container-narrow">
                    {/* Progress */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-2">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${s <= step
                                            ? "bg-gold text-onyx"
                                            : "bg-onyx-200 text-diamond-muted"
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-16 h-0.5 ${s < step ? "bg-gold" : "bg-onyx-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-panel-gold p-8"
                        >
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="font-serif text-2xl text-diamond mb-6">
                                        Informações Pessoais
                                    </h2>
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
                                        <div className="md:col-span-2">
                                            <label className="block text-sm text-diamond-muted mb-2">
                                                Telefone *
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="font-serif text-2xl text-diamond mb-6">
                                        Sobre o Projecto
                                    </h2>

                                    <div>
                                        <label className="block text-sm text-diamond-muted mb-4">
                                            Tipo de Projecto *
                                        </label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {projectTypes.map((type) => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, projectType: type.id })}
                                                    className={`p-6 rounded-xl border transition-all ${formData.projectType === type.id
                                                            ? "bg-gold/10 border-gold"
                                                            : "bg-onyx-100 border-transparent hover:border-gold/30"
                                                        }`}
                                                >
                                                    <type.icon className={`w-8 h-8 mx-auto mb-2 ${formData.projectType === type.id ? "text-gold" : "text-diamond-muted"
                                                        }`} />
                                                    <span className={
                                                        formData.projectType === type.id ? "text-gold" : "text-diamond-muted"
                                                    }>
                                                        {type.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-diamond-muted mb-4">
                                            Orçamento Estimado *
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {budgetRanges.map((range) => (
                                                <button
                                                    key={range.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, budget: range.id })}
                                                    className={`p-4 rounded-xl border text-sm transition-all ${formData.budget === range.id
                                                            ? "bg-gold/10 border-gold text-gold"
                                                            : "bg-onyx-100 border-transparent hover:border-gold/30 text-diamond-muted"
                                                        }`}
                                                >
                                                    {range.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-diamond-muted mb-2">
                                            Localização *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Ilha, Cidade"
                                            className="input-field"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="font-serif text-2xl text-diamond mb-6">
                                        Detalhes do Projecto
                                    </h2>

                                    <div>
                                        <label className="block text-sm text-diamond-muted mb-2">
                                            Prazo Desejado
                                        </label>
                                        <select
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            className="input-field"
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="3m">3 meses</option>
                                            <option value="6m">6 meses</option>
                                            <option value="12m">12 meses</option>
                                            <option value="flexible">Flexível</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-diamond-muted mb-2">
                                            Descrição do Projecto *
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={6}
                                            className="input-field resize-none"
                                            placeholder="Descreva a sua visão, necessidades específicas, e quaisquer detalhes relevantes..."
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                                {step > 1 ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(step - 1)}
                                    >
                                        Anterior
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {step < 3 ? (
                                    <Button type="button" onClick={() => setStep(step + 1)}>
                                        Próximo
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={formState === "loading"}>
                                        {formState === "loading" ? (
                                            "A enviar..."
                                        ) : (
                                            <>
                                                Submeter Candidatura
                                                <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </form>
                </div>
            </section>
        </div>
    );
}
