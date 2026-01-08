"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import {
    AlertCircle,
    CheckCircle,
    FileText,
    PieChart,
    Plus,
    Save,
    Trash2,
    Upload
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LançarDespesaPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [amount, setAmount] = useState<number>(0);
    const [allocations, setAllocations] = useState([{ costCenter: "", percentage: 100 }]);

    const addAllocation = () => {
        setAllocations([...allocations, { costCenter: "", percentage: 0 }]);
    };

    const removeAllocation = (index: number) => {
        setAllocations(allocations.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        toast({
            title: "Despesa lançada",
            description: "Despesa lançada e enviada para aprovação",
        });
        router.push("/core/financeiro/pagar");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            <PageHeader 
                title="Lançar Despesa" 
                description="Registo de fatura de fornecedor ou despesa operacional."
                backUrl="/core/financeiro/pagar"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                        <Save className="w-4 h-4 mr-2" /> Guardar Rascunho
                    </Button>
                    <Button className="bg-gold-gradient text-onyx" onClick={handleSubmit}>
                        Submeter Aprovação
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                        <h3 className="text-lg font-serif text-diamond flex items-center gap-2">
                            <FileText size={18} className="text-gold" /> Dados do Documento
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Fornecedor</Label>
                                <Select>
                                    <SelectTrigger className="bg-onyx-950 border-white/5 text-diamond">
                                        <SelectValue placeholder="Selecionar fornecedor" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-onyx-900 border-white/5 text-diamond">
                                        <SelectItem value="f1">Materiais Leste, Lda</SelectItem>
                                        <SelectItem value="f2">Energia CV</SelectItem>
                                        <SelectItem value="f3">Aluguer Máquinas Sul</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Número do Documento</Label>
                                <Input placeholder="Ex: FT 2026/001" className="bg-onyx-950 border-white/5 text-diamond" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Data de Emissão</Label>
                                <Input type="date" className="bg-onyx-950 border-white/5 text-diamond" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Data de Vencimento</Label>
                                <Input type="date" className="bg-onyx-950 border-white/5 text-diamond" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Categoria / Plano de Contas</Label>
                                <Select>
                                    <SelectTrigger className="bg-onyx-950 border-white/5 text-diamond">
                                        <SelectValue placeholder="Selecionar categoria" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-onyx-900 border-white/5 text-diamond">
                                        <SelectItem value="c1">Materiais de Construção</SelectItem>
                                        <SelectItem value="c2">Sub-empreitadas</SelectItem>
                                        <SelectItem value="c3">Combustíveis</SelectItem>
                                        <SelectItem value="c4">Utilidades (Água/Luz)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-diamond-muted">Valor Total (c/ IVA)</Label>
                                <div className="relative">
                                    <Input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                                        className="bg-onyx-950 border-white/5 text-diamond pr-12" 
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-diamond-muted">CVE</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Cost Center Allocation */}
                    <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-serif text-diamond flex items-center gap-2">
                                <PieChart size={18} className="text-gold" /> Rateio por Centro de Custo
                            </h3>
                            <Button variant="ghost" size="sm" className="text-gold hover:bg-gold/5" onClick={addAllocation}>
                                <Plus size={14} className="mr-2" /> Adicionar Rateio
                            </Button>
                        </div>
                        
                        <div className="space-y-4">
                            {allocations.map((alloc, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 items-center group">
                                    <div className="col-span-7">
                                        <Select>
                                            <SelectTrigger className="bg-onyx-950 border-white/5 text-diamond font-medium">
                                                <SelectValue placeholder="Selecionar Centro de Custo" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-onyx-900 border-white/5 text-diamond">
                                                <SelectItem value="p1">Projeto: Torre Atlântico</SelectItem>
                                                <SelectItem value="p2">Projeto: Villa Sal Rei</SelectItem>
                                                <SelectItem value="d1">Departamento: Logística</SelectItem>
                                                <SelectItem value="d2">Administração Central</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-3 relative">
                                        <Input 
                                            type="number" 
                                            placeholder="%" 
                                            className="bg-onyx-950 border-white/5 text-diamond pr-8 text-center" 
                                            defaultValue={alloc.percentage}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-diamond-muted">%</span>
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-9 w-9 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeAllocation(index)}
                                            disabled={allocations.length === 1}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-2 flex justify-between items-center px-2">
                                <p className="text-xs text-diamond-muted">Total Alocado: <span className="text-white font-medium">100%</span></p>
                                <p className="text-xs text-diamond-muted">Valor Alocado: <span className="text-gold font-medium">{formatCurrency(amount)}</span></p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* AURA Smart Analysis */}
                    <Card className="p-6 bg-onyx-900 border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gold/10 rounded-bl-full"></div>
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <AlertCircle size={18} className="text-gold" /> Análise AURA
                        </h3>
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                <div className="flex items-start gap-2">
                                    <CheckCircle size={14} className="text-emerald-500 mt-0.5" />
                                    <p className="text-xs text-emerald-500/90 font-medium">Nenhum duplicado encontrado para este NIF/Valor nos últimos 30 dias.</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-onyx-950 border border-white/5 space-y-2">
                                <p className="text-[10px] text-diamond-muted uppercase font-mono tracking-wider">Histograma Fornecedor</p>
                                <div className="h-12 flex items-end gap-1 px-1">
                                    {[30, 45, 25, 60, 40, 55, 35].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gold/20 rounded-t" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-diamond-muted">Média mensal: {formatCurrency(650000)}</p>
                            </div>
                        </div>
                    </Card>

                    {/* File Upload */}
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white">Anexo Digital</h3>
                            <Badge variant="outline" className="text-[10px] border-white/10 text-diamond-muted">PDF, JPG</Badge>
                        </div>
                        <div className="border-2 border-dashed border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-gold/30 hover:bg-gold/5 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Upload size={20} className="text-diamond-muted group-hover:text-gold" />
                            </div>
                            <p className="text-sm text-diamond font-medium">Arraste ou Clique</p>
                            <p className="text-xs text-diamond-muted mt-1">Carregue a fatura ou recibo digitalizado.</p>
                        </div>
                    </Card>

                    {/* Meta Info */}
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <div className="space-y-4">
                            <div className="space-y-2 text-left">
                                <Label className="text-xs text-diamond-muted uppercase font-mono">Descrição Adicional</Label>
                                <textarea className="w-full h-24 bg-onyx-950 border border-white/5 rounded-lg p-3 text-sm text-diamond focus:outline-none focus:ring-1 focus:ring-gold/50" placeholder="Notas para a aprovação..."></textarea>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
