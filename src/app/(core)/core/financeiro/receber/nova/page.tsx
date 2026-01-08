"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import {
    Calculator,
    FileText,
    Link as LinkIcon,
    Plus,
    Save,
    Send,
    Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InvoiceItemForm {
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number;
}

export default function NovaFaturaPage() {
    const router = useRouter();
    const [items, setItems] = useState<InvoiceItemForm[]>([
        { description: "", quantity: 1, unitPrice: 0, tax: 15 }
    ]);

    const { toast } = useToast();

    const addItem = () => {
        setItems([...items, { description: "", quantity: 1, unitPrice: 0, tax: 15 }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof InvoiceItemForm, value: string | number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const totalTax = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice * (item.tax / 100)), 0);
    const total = subtotal + totalTax;

    const handleSubmit = (status: 'draft' | 'emitted') => {
        toast({
            title: status === 'draft' ? "Rascunho guardado" : "Fatura emitida",
            description: status === 'draft' ? "Rascunho guardado com sucesso" : "Fatura emitida e enviada",
        });
        router.push("/core/financeiro/receber");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            <PageHeader 
                title="Nova Fatura" 
                description="Criação manual ou importação de orçamento."
                backUrl="/core/financeiro/receber"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond" onClick={() => handleSubmit('draft')}>
                        <Save className="w-4 h-4 mr-2" /> Guardar Rascunho
                    </Button>
                    <Button className="bg-gold-gradient text-onyx" onClick={() => handleSubmit('emitted')}>
                        <Send className="w-4 h-4 mr-2" /> Emitir e Enviar
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                        <h3 className="text-lg font-serif text-diamond flex items-center gap-2">
                            <FileText size={18} className="text-gold" /> Informação Geral
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Cliente</Label>
                                <Select>
                                    <SelectTrigger className="bg-onyx-950 border-white/5 text-diamond">
                                        <SelectValue placeholder="Selecionar cliente" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-onyx-900 border-white/5 text-diamond">
                                        <SelectItem value="c1">Imobiliária Praia</SelectItem>
                                        <SelectItem value="c2">Condomínio Oasis</SelectItem>
                                        <SelectItem value="c3">Câmara Municipal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Projeto Associado</Label>
                                <Select>
                                    <SelectTrigger className="bg-onyx-950 border-white/5 text-diamond">
                                        <SelectValue placeholder="Opcional" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-onyx-900 border-white/5 text-diamond">
                                        <SelectItem value="p1">Torre Atlântico</SelectItem>
                                        <SelectItem value="p2">Villa Sal Rei</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Data de Emissão</Label>
                                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="bg-onyx-950 border-white/5 text-diamond" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Data de Vencimento</Label>
                                <Input type="date" className="bg-onyx-950 border-white/5 text-diamond" />
                            </div>
                        </div>
                    </Card>

                    {/* Items */}
                    <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-serif text-diamond flex items-center gap-2">
                                <Plus size={18} className="text-gold" /> Itens da Fatura
                            </h3>
                            <Button variant="outline" size="sm" className="border-gold/20 text-gold hover:bg-gold/5">
                                <LinkIcon size={14} className="mr-2" /> Importar Orçamento
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-diamond-muted px-2">
                                <div className="col-span-6">Descrição</div>
                                <div className="col-span-1">Qtd</div>
                                <div className="col-span-2">Preço Unit.</div>
                                <div className="col-span-1">IVA %</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 items-start group">
                                    <div className="col-span-6 flex gap-2">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-9 w-9 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                            onClick={() => removeItem(index)}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                        <Input 
                                            placeholder="Ex: Execução de fundações..." 
                                            value={item.description}
                                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                                            className="bg-onyx-950 border-white/5 text-diamond" 
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Input 
                                            type="number" 
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                            className="bg-onyx-950 border-white/5 text-diamond text-center" 
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Input 
                                            type="number" 
                                            value={item.unitPrice}
                                            onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                            className="bg-onyx-950 border-white/5 text-diamond" 
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Input 
                                            type="number" 
                                            value={item.tax}
                                            onChange={(e) => updateItem(index, 'tax', parseFloat(e.target.value) || 0)}
                                            className="bg-onyx-950 border-white/5 text-diamond text-center" 
                                        />
                                    </div>
                                    <div className="col-span-2 text-right pt-2.5 text-sm font-medium text-diamond">
                                        {formatCurrency(item.quantity * item.unitPrice * (1 + item.tax / 100))}
                                    </div>
                                </div>
                            ))}

                            <Button 
                                variant="ghost" 
                                className="w-full border-dashed border-white/10 text-diamond-muted hover:text-gold hover:bg-gold/5"
                                onClick={addItem}
                            >
                                <Plus size={14} className="mr-2" /> Adicionar Linha
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Sidebar summary */}
                <div className="space-y-6">
                    <Card className="p-6 bg-onyx-900 border-white/5 sticky top-6">
                        <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                            <Calculator size={18} className="text-gold" /> Resumo do Total
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-diamond-muted">Subtotal</span>
                                <span className="text-diamond">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-diamond-muted">Impostos (IVA)</span>
                                <span className="text-diamond">{formatCurrency(totalTax)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-diamond-muted">Descontos</span>
                                <span className="text-rose-500">-{formatCurrency(0)}</span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-white/5 flex justify-between items-center">
                                <span className="font-medium text-white">Total Final</span>
                                <span className="text-xl font-serif text-gold">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-diamond-muted uppercase font-mono">Notas na Fatura</Label>
                                <textarea className="w-full h-24 bg-onyx-950 border border-white/5 rounded-lg p-3 text-sm text-diamond focus:outline-none focus:ring-1 focus:ring-gold/50 placeholder:text-white/10" placeholder="A aparecer no PDF..."></textarea>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-diamond-muted uppercase font-mono">Notas Internas</Label>
                                <textarea className="w-full h-24 bg-onyx-950 border border-white/5 rounded-lg p-3 text-sm text-diamond focus:outline-none focus:ring-1 focus:ring-gold/50 placeholder:text-white/10" placeholder="Apenas visível para a equipa..."></textarea>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
