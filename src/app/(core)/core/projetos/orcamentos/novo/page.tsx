"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BudgetItem, categoryOptions, unitOptions } from "@/types/budget";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, FileText, Plus, Save, Trash2, Wand2 } from "lucide-react";
import { useState } from "react";

// Steps
const steps = [
    { id: 1, title: "Cliente & Info" },
    { id: 2, title: "Itens do Orçamento" },
    { id: 3, title: "Totais & Termos" },
    { id: 4, title: "Revisão" }
];

export default function NewBudgetPage() {
    const [currentStep, setCurrentStep] = useState(1);
    
    // Form State (Simplified)
    const [client, setClient] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [items, setItems] = useState<Partial<BudgetItem>[]>([
        { id: "1", description: "Pintura de Paredes Interiores", category: "labor", quantity: 150, unit: "m²", unitPrice: 850, total: 127500 }
    ]);
    
    const calculateTotal = () => items.reduce((acc, item) => acc + (item.total || 0), 0);
    const total = calculateTotal();

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const addItem = () => {
        const newItem: Partial<BudgetItem> = {
            id: Math.random().toString(),
            description: "",
            category: "material",
            quantity: 1,
            unit: "un",
            unitPrice: 0,
            total: 0
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'quantity' || field === 'unitPrice') {
                    updated.total = (updated.quantity || 0) * (updated.unitPrice || 0);
                }
                return updated;
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <CoreLayout>
            <PageHeader
                title="Novo Orçamento"
                description="Assistente de criação de orçamento de projeto."
                backUrl="/core/projetos"
            />

            {/* Stepper */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/5 -z-10" />
                    {steps.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-onyx-950 px-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${isActive ? 'border-gold text-gold bg-gold/10' : isCompleted ? 'border-emerald-500 bg-emerald-500 text-white border-none' : 'border-white/10 text-diamond-muted'}`}>
                                    {isCompleted ? <Check size={14} /> : step.id}
                                </div>
                                <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-diamond-muted'}`}>{step.title}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 1: CLIENT & INFO */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                        >
                            <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-white">Informações do Projeto</h2>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Cliente</Label>
                                            <Select value={client} onValueChange={setClient}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um cliente" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Sofia Martinez</SelectItem>
                                                    <SelectItem value="2">Tech Solutions Lda</SelectItem>
                                                    <SelectItem value="new">+ Novo Cliente</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Tipo de Projeto</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="residencial">Residencial</SelectItem>
                                                    <SelectItem value="comercial">Comercial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Nome do Projeto / Orçamento</Label>
                                        <Input 
                                            placeholder="Ex: Renovação Villa Atlântico" 
                                            value={projectTitle}
                                            onChange={e => setProjectTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Descrição</Label>
                                        <Textarea placeholder="Descreva o escopo do projeto..." className="h-24" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* STEP 2: ITEMS */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                        >
                            <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-white">Itens do Orçamento</h2>
                                    <Button variant="outline" size="sm" className="gap-2 text-gold border-gold/30 hover:bg-gold/10">
                                        <Wand2 size={16} /> Assistente AURA
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div key={item.id} className="grid grid-cols-12 gap-2 items-end p-3 bg-white/5 rounded-lg group">
                                            <div className="col-span-5 space-y-1">
                                                <Label className="text-xs text-diamond-muted">Descrição</Label>
                                                <Input 
                                                    value={item.description} 
                                                    onChange={(e) => updateItem(item.id!, 'description', e.target.value)}
                                                    className="h-8 text-sm"
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <Label className="text-xs text-diamond-muted">Categoria</Label>
                                                <Select 
                                                    value={item.category} 
                                                    onValueChange={(val) => updateItem(item.id!, 'category', val)}
                                                >
                                                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        {categoryOptions.map(opt => (
                                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="col-span-1 space-y-1">
                                                <Label className="text-xs text-diamond-muted">Qtd</Label>
                                                <Input 
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id!, 'quantity', Number(e.target.value))}
                                                    className="h-8 text-sm"
                                                />
                                            </div>
                                            <div className="col-span-1 space-y-1">
                                                <Label className="text-xs text-diamond-muted">Unid</Label>
                                                 <Select 
                                                    value={item.unit} 
                                                    onValueChange={(val) => updateItem(item.id!, 'unit', val)}
                                                >
                                                    <SelectTrigger className="h-8 text-xs px-1"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        {unitOptions.map(opt => (
                                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <Label className="text-xs text-diamond-muted">Preço Unit.</Label>
                                                <Input 
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) => updateItem(item.id!, 'unitPrice', Number(e.target.value))}
                                                    className="h-8 text-sm text-right"
                                                />
                                            </div>
                                             <div className="col-span-1 flex justify-center pb-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-6 w-6 text-red-500/50 hover:text-red-500 hover:bg-red-500/10"
                                                    onClick={() => removeItem(item.id!)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="outline" onClick={addItem} className="w-full border-dashed border-white/20 hover:border-white/40 text-diamond-muted">
                                        <Plus size={16} className="mr-2" /> Adicionar Item
                                    </Button>

                                    <div className="flex justify-end pt-4 border-t border-white/10">
                                        <div className="text-right">
                                            <p className="text-sm text-diamond-muted">Total Estimado</p>
                                            <p className="text-2xl font-bold text-white">{total.toLocaleString()} CVE</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                     {/* STEP 3 & 4 (Simplified for demo) */}
                    {(currentStep === 3 || currentStep === 4) && (
                        <motion.div
                             key="step34"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                        >
                            <Card className="p-8 bg-onyx-900 border-white/5 text-center py-20">
                                <FileText size={48} className="mx-auto text-gold mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">Resumo do Orçamento</h2>
                                <p className="text-diamond-muted max-w-md mx-auto mb-8">
                                    O orçamento para <strong>{client === "1" ? "Sofia Martinez" : "Cliente"}</strong> no valor total de <strong>{total.toLocaleString()} CVE</strong> está pronto para revisão.
                                </p>
                                
                                <div className="bg-white/5 p-4 rounded max-w-sm mx-auto text-left space-y-2 mb-8 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-diamond-muted">Subtotal:</span>
                                        <span>{total.toLocaleString()} CVE</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-diamond-muted">IVA (15%):</span>
                                        <span>{(total * 0.15).toLocaleString()} CVE</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg text-emerald-500">
                                        <span>Total:</span>
                                        <span>{(total * 1.15).toLocaleString()} CVE</span>
                                    </div>
                                </div>

                                {currentStep === 4 && (
                                     <div className="flex justify-center gap-4">
                                        <Button variant="outline" className="gap-2"><Save size={16}/> Salvar Rascunho</Button>
                                        <Button className="btn-primary gap-2"><Check size={16}/> Finalizar e Enviar</Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <Button 
                        variant="ghost" 
                        onClick={prevStep} 
                        disabled={currentStep === 1}
                        className="text-diamond-muted hover:text-white"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Voltar
                    </Button>
                    
                     {currentStep < 4 ? (
                        <Button onClick={nextStep} className="btn-primary">
                            Próximo <ArrowRight size={16} className="ml-2" />
                        </Button>
                     ) : null}
                </div>
            </div>
        </CoreLayout>
    );
}
