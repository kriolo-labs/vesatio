"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/types/inventory";
import { mockProjects } from "@/types/project";
import { RequisitionItem, RequisitionPriority } from "@/types/purchasing";
import { ArrowLeft, Plus, Save, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewRequisitionPage() {
    const router = useRouter();
    const [items, setItems] = useState<RequisitionItem[]>([]);
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    
    // Form States
    const [projectId, setProjectId] = useState<string>("");
    const [priority, setPriority] = useState<RequisitionPriority>("normal");
    const [requiredDate, setRequiredDate] = useState<string>("");
    const [justification, setJustification] = useState<string>("");

    const handleAddProduct = (product: typeof mockProducts[0]) => {
        const newItem: RequisitionItem = {
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            productName: product.name,
            quantity: 1,
            unit: product.unit,
            estimatedPrice: product.averageCost,
            total: product.averageCost,
        };
        setItems([...items, newItem]);
        setIsProductDialogOpen(false);
    };

    const handleUpdateItem = (id: string, field: keyof RequisitionItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'quantity' || field === 'estimatedPrice') {
                    updated.total = (updated.quantity || 0) * (updated.estimatedPrice || 0);
                }
                return updated;
            }
            return item;
        }));
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const totalEstimated = items.reduce((acc, item) => acc + item.total, 0);

    return (
        <CoreLayout>
            <div className="max-w-5xl mx-auto">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mb-4 pl-0 text-diamond-muted hover:text-white"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Voltar para Requisições
                </Button>

                <PageHeader
                    title="Nova Requisição"
                    description="Preencha os detalhes da solicitação de material."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - FORM */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* GENERAL INFO */}
                        <Card className="p-6 bg-onyx-900 border-white/5 space-y-4">
                            <h3 className="font-semibold text-white mb-2">Informações Gerais</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Projeto / Obra (Opcional)</Label>
                                    <Select value={projectId} onValueChange={setProjectId}>
                                        <SelectTrigger className="bg-onyx-950 border-white/10">
                                            <SelectValue placeholder="Selecione um projeto..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockProjects.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Data Necessária</Label>
                                    <Input 
                                        type="date" 
                                        className="bg-onyx-950 border-white/10" 
                                        value={requiredDate}
                                        onChange={(e) => setRequiredDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Prioridade</Label>
                                    <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                        <SelectTrigger className="bg-onyx-950 border-white/10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="urgent">Urgente</SelectItem>
                                            <SelectItem value="critical">Crítica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label>Justificativa / Notas</Label>
                                <Textarea 
                                    className="bg-onyx-950 border-white/10 min-h-[100px]" 
                                    placeholder="Explique a necessidade desta requisição..."
                                    value={justification}
                                    onChange={(e) => setJustification(e.target.value)}
                                />
                            </div>
                        </Card>

                        {/* ITEMS TABLE */}
                        <Card className="p-6 bg-onyx-900 border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-white">Itens Requisitados</h3>
                                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                                            <Plus size={16} className="mr-2"/> Adicionar Produto
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-onyx-900 border-white/10 text-white">
                                        <DialogHeader>
                                            <DialogTitle>Catálogo de Produtos</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 mt-4">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-diamond-muted" />
                                                <Input placeholder="Pesquisar produtos..." className="pl-9 bg-onyx-950 border-white/10 text-white" />
                                            </div>
                                            <div className="max-h-[300px] overflow-y-auto space-y-2">
                                                {mockProducts.map(product => (
                                                    <div key={product.id} className="flex justify-between items-center p-3 rounded bg-onyx-950 border border-white/5 hover:border-gold/30 cursor-pointer" onClick={() => handleAddProduct(product)}>
                                                        <div>
                                                            <div className="font-medium text-white">{product.name}</div>
                                                            <div className="text-xs text-diamond-muted font-mono">{product.sku}</div>
                                                        </div>
                                                        <Badge variant="outline" className="border-white/10 text-diamond-muted text-[10px]">{formatCurrency(product.averageCost)}</Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {items.length > 0 ? (
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div key={item.id} className="p-4 rounded-lg bg-onyx-950 border border-white/5 relative group">
                                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-400" onClick={() => handleRemoveItem(item.id)}>
                                                    <Trash2 size={14}/>
                                                </Button>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                <div className="md:col-span-2">
                                                    <label className="text-[10px] text-diamond-muted uppercase mb-1 block">Produto</label>
                                                    <div className="text-white font-medium">{item.productName}</div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-diamond-muted uppercase mb-1 block">Quantidade</label>
                                                    <div className="flex items-center gap-2">
                                                        <Input 
                                                            type="number" 
                                                            className="h-8 bg-onyx-900 border-white/10 text-right" 
                                                            value={item.quantity}
                                                            onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}    
                                                        />
                                                        <span className="text-xs text-diamond-muted">{item.unit}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-diamond-muted uppercase mb-1 block">Total Est.</label>
                                                    <div className="text-white font-mono text-right h-8 flex items-center justify-end">
                                                        {formatCurrency(item.total)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="flex justify-end pt-4 border-t border-white/5">
                                        <div className="text-right">
                                            <div className="text-xs text-diamond-muted uppercase mb-1">Total Estimado</div>
                                            <div className="text-2xl font-bold text-gold font-mono">{formatCurrency(totalEstimated)}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 border-2 border-dashed border-white/5 rounded-lg text-center">
                                    <p className="text-diamond-muted mb-4">Ainda não adicionou itens.</p>
                                    <Button size="sm" variant="outline" onClick={() => setIsProductDialogOpen(true)}>Adicionar Itens</Button>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* RIGHT COLUMN - SUMMARY & ACTIONS */}
                    <div className="space-y-6">
                         <Card className="p-6 bg-onyx-900 border-white/5 sticky top-6">
                            <h3 className="font-semibold text-white mb-4">Resumo</h3>
                            
                            <div className="space-y-2 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-diamond-muted">Itens</span>
                                    <span className="text-white">{items.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-diamond-muted">Prioridade</span>
                                    <span className="capitalize text-white">{priority}</span>
                                </div>
                                <div className="project-preview pt-4 mt-4 border-t border-white/5">
                                    <span className="text-diamond-muted block mb-1">Projeto</span>
                                    <div className="text-white font-medium">
                                        {mockProjects.find(p => p.id === projectId)?.name || "Nenhum selecionado"}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full btn-primary gap-2">
                                    <Save size={16} /> Submeter Requisição
                                </Button>
                                <Button variant="outline" className="w-full border-white/10 text-diamond-muted hover:text-white">
                                    Guardar Rascunho
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </CoreLayout>
    );
}
