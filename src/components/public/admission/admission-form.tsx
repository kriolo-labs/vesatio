"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation Schema
const admissionSchema = z.object({
  fullName: z.string().min(2, "Nome necessário"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Telefone inválido"),
  location: z.string().min(2, "Localização necessária"),
  projectType: z.string().min(1, "Selecione um tipo"),
  budget: z.string().min(1, "Selecione um nível de investimento"),
  description: z.string().min(20, "Por favor, descreva o projeto com mais detalhe (min. 20 caracteres)")
});

type AdmissionValues = z.infer<typeof admissionSchema>;

// Budget Options - Crucial for filtering logic
const budgetOptions = [
    { value: "entry", label: "Até 2.000.000 CVE", tier: "low" },
    { value: "mid", label: "2.000.000 - 4.000.000 CVE", tier: "mid" },
    { value: "high", label: "4.000.000 - 10.000.000 CVE", tier: "high" },
    { value: "ultra", label: "Acima de 10.000.000 CVE", tier: "ultra" }
];

export function AdmissionForm() {
    const [step, setStep] = useState<"form" | "success" | "waitlist">("form");
    const [loading, setLoading] = useState(false);

    const form = useForm<AdmissionValues>({
        resolver: zodResolver(admissionSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            projectType: "",
            budget: "",
            description: ""
        }
    });

    const onSubmit = async (data: AdmissionValues) => {
        setLoading(true);
        
        // Mock API call simulation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Logic "Velvet Rope"
        const selectedBudget = budgetOptions.find(opt => opt.value === data.budget);
        
        if (selectedBudget?.tier === "low") {
            setStep("waitlist");
        } else {
            setStep("success");
            // Here we would create Lead in Supabase CRM
            toast({
                title: "Candidatura Recebida",
                description: "Os seus dados foram enviados para análise prioritária.",
            });
        }
        setLoading(false);
    };

    if (step === "success") {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-12 bg-onyx-800 border border-gold/20 rounded-sm">
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                    <Check size={40} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">Bem-vindo(a) à Vesatio</h3>
                <p className="text-diamond-muted text-lg leading-relaxed max-w-lg mx-auto">
                    A sua visão alinha-se com a nossa. Um Senior Consultant entrará em contacto consigo nas próximas 48 horas úteis para agendar a sua sessão de descoberta privada.
                </p>
                <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-xs uppercase tracking-widest text-white/40">Status: <span className="text-gold">Priority Review</span></p>
                </div>
            </motion.div>
        )
    }

    if (step === "waitlist") {
        return (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-12 bg-onyx-800 border border-white/5 rounded-sm">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/40">
                    <Loader2 size={40} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">Agradecemos o seu interesse</h3>
                <p className="text-diamond-muted text-md leading-relaxed max-w-lg mx-auto mb-6">
                    De momento, a nossa capacidade de execução está focada exclusivamente em projetos de grande escala. Adicionámos o seu contacto à nossa Lista de Espera Preferencial.
                </p>
                <p className="text-diamond-muted text-md leading-relaxed max-w-lg mx-auto">
                    Assim que abrirmos novas vagas para projetos deste perfil, entraremos em contacto.
                </p>
             </motion.div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold">Nome Completo</label>
                    <Input {...form.register("fullName")} placeholder="Seu nome" className="bg-onyx-900 border-white/10" />
                    {form.formState.errors.fullName && <span className="text-red-500 text-xs">{form.formState.errors.fullName.message}</span>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold">Email Privado</label>
                    <Input {...form.register("email")} placeholder="nome@exemplo.com" className="bg-onyx-900 border-white/10" />
                     {form.formState.errors.email && <span className="text-red-500 text-xs">{form.formState.errors.email.message}</span>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold">Telefone</label>
                    <Input {...form.register("phone")} placeholder="+238 999 9999" className="bg-onyx-900 border-white/10" />
                     {form.formState.errors.phone && <span className="text-red-500 text-xs">{form.formState.errors.phone.message}</span>}
                </div>
                 <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold">Localização do Projeto</label>
                    <Input {...form.register("location")} placeholder="Cidade, Ilha" className="bg-onyx-900 border-white/10" />
                     {form.formState.errors.location && <span className="text-red-500 text-xs">{form.formState.errors.location.message}</span>}
                </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-xl font-serif text-white">Sobre a Obra</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gold">Tipo de Projeto</label>
                        <select {...form.register("projectType")} className="w-full bg-onyx-900 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-gold transition-colors">
                            <option value="">Selecione...</option>
                            <option value="construcao">Construção Nova</option>
                            <option value="remodelacao">Remodelação Total</option>
                            <option value="interiores">Design de Interiores</option>
                            <option value="corporativo">Comercial / Corporativo</option>
                        </select>
                        {form.formState.errors.projectType && <span className="text-red-500 text-xs">{form.formState.errors.projectType.message}</span>}
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs uppercase tracking-widest text-gold">Nível de Investimento Previsto</label>
                         <div className="relative">
                            <select {...form.register("budget")} className="w-full bg-onyx-900 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                                <option value="">Selecione um intervalo...</option>
                                {budgetOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                         </div>
                         <p className="text-xs text-white/30 pt-1">Inclui materiais e execução.</p>
                         {form.formState.errors.budget && <span className="text-red-500 text-xs">{form.formState.errors.budget.message}</span>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold">Descrição da Visão</label>
                    <textarea 
                        {...form.register("description")} 
                        rows={5}
                        className="w-full bg-onyx-900 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                        placeholder="Conte-nos sobre os seus objetivos, estilo preferido e requisitos especiais..."
                    />
                     {form.formState.errors.description && <span className="text-red-500 text-xs">{form.formState.errors.description.message}</span>}
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-6 text-lg bg-gold hover:bg-gold-light text-onyx font-bold tracking-widest uppercase transition-all"
            >
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Submeter Candidatura"}
            </Button>

            <p className="text-center text-xs text-white/30">
                Ao submeter, concorda com a nossa Política de Privacidade. Todas as informações são estritamente confidenciais.
            </p>
        </form>
    );
}
