"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export function SetupWizardClient() {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else handleFinish();
    };

    const handleFinish = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Bem-vindo à Vesatio",
                description: "O seu portal está pronto.",
                variant: "success"
            });
            window.location.href = "/core/dashboard";
        }, 1500);
    };

    return (
        <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-gold">
                    <span>Configuração {step} de {totalSteps}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1" />
            </div>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
            >
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-serif text-gold">O Seu Perfil</h2>
                            <p className="text-sm text-diamond-muted">Para melhor o servirmos, confirme os seus dados.</p>
                        </div>
                         <div className="space-y-3">
                            <Input label="Endereço Principal" placeholder="Cidade, Rua..." icon={<Home className="h-4 w-4" />} />
                            <Input label="Telefone Preferencial" placeholder="+238 ..." icon={<Phone className="h-4 w-4" />} />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                         <div className="text-center">
                            <h2 className="text-xl font-serif text-white">Notificações de Obra</h2>
                            <p className="text-sm text-diamond-muted">Receba atualizações do seu projeto.</p>
                        </div>
                        <div className="space-y-3 bg-onyx-100 p-4 rounded-lg border border-white/5">
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-sm">Relatórios Semanais</span>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between py-2">
                                <span className="text-sm">Alertas Financeiros</span>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-8 space-y-4">
                        <h2 className="text-2xl font-serif text-gold">Portal do Cliente</h2>
                        <p className="text-diamond-muted max-w-xs mx-auto">
                            Terá acesso a cronogramas, orçamentos e galeria de fotos da sua obra em tempo real.
                        </p>
                        <div className="p-4 bg-gold/10 rounded-lg text-gold text-sm border border-gold/20">
                            ✨ Tudo pronto para explorar.
                        </div>
                    </div>
                )}

                <Button onClick={handleNext} className="w-full btn-primary" isLoading={loading}>
                    {step === totalSteps ? "Entrar no Portal" : "Continuar"}
                    {step < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </motion.div>
        </div>
    );
}
