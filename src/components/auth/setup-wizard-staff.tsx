"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

// Simplified Wizard for Staff
export function SetupWizardStaff({ role }: { role: string }) {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else handleFinish();
    };

    const handleFinish = async () => {
        setLoading(true);
        // Save logic here (update profile, etc)
        // Simulate delay
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Setup concluído!",
                description: "O seu ambiente está pronto.",
                variant: "success"
            });
            window.location.href = "/core/dashboard";
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-gold">
                    <span>Passo {step} de {totalSteps}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1" />
            </div>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-serif text-gold">Bem-vindo, {role}</h2>
                            <p className="text-sm text-diamond-muted">Vamos configurar o seu perfil profissional.</p>
                        </div>
                        <div className="space-y-3">
                            <Input label="Nome Completo" placeholder="O seu nome" />
                            <Input label="Telefone" placeholder="+238 999 99 99" />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div className="text-center">
                             <h2 className="text-xl font-serif text-white">Segurança</h2>
                             <p className="text-sm text-diamond-muted">Proteja a sua conta com 2FA.</p>
                        </div>
                        <div className="bg-onyx-100 p-4 rounded-lg flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-gold" />
                                <div>
                                    <p className="font-medium text-sm">Autenticação de Dois Fatores</p>
                                    <p className="text-xs text-diamond-muted">Recomendado para staff.</p>
                                </div>
                            </div>
                            <Switch />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                         <div className="text-center">
                             <h2 className="text-xl font-serif text-white">Notificações</h2>
                             <p className="text-sm text-diamond-muted">Como quer ser contactado?</p>
                        </div>
                         <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-onyx-100 rounded border border-white/5">
                                <span className="text-sm">Email</span>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-onyx-100 rounded border border-white/5">
                                <span className="text-sm">Push Notifications</span>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between p-3 bg-onyx-100 rounded border border-white/5">
                                <span className="text-sm">WhatsApp</span>
                                <Switch />
                            </div>
                        </div>
                    </div>
                )}
                
                {step === 4 && (
                    <div className="text-center space-y-4 py-8">
                        <CheckCircleIcon className="h-16 w-16 text-gold mx-auto" />
                        <h2 className="text-2xl font-serif text-white">Tudo Pronto!</h2>
                        <p className="text-diamond-muted">O seu ambiente de trabalho foi configurado.</p>
                    </div>
                )}

                <Button onClick={handleNext} className="w-full btn-primary" isLoading={loading}>
                    {step === totalSteps ? "Ir para Dashboard" : "Continuar"}
                    {step < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </motion.div>
        </div>
    );
}

function CheckCircleIcon({className}: {className?: string}) {
    return (
        <div className={className}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        </div>
    )
}
