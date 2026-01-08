"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoodsReceiptItem, mockPOs } from "@/types/purchasing";
import { ArrowLeft, ArrowRight, Check, ScanLine, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function NewReceiptContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preSelectedPOId = searchParams.get('poId');

    const [step, setStep] = useState(1);
    const [selectedPOId, setSelectedPOId] = useState<string>("");
    const [receiptItems, setReceiptItems] = useState<GoodsReceiptItem[]>([]);
    const [documentRef, setDocumentRef] = useState("");

    // Effect to handle pre-selection
    useEffect(() => {
        if (preSelectedPOId && !selectedPOId) {
            handleSelectPO(preSelectedPOId);
        }
    }, [preSelectedPOId]);

    const handleSelectPO = (poId: string) => {
        setSelectedPOId(poId);
        const po = mockPOs.find(p => p.id === poId);
        if (po) {
            // Transform PO items to Receipt Items
            const newItems: GoodsReceiptItem[] = po.items.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                itemPOId: item.id,
                productName: item.productName,
                quantityOrdered: item.quantity,
                quantityReceived: item.quantity, // Default to full receipt
                quantityRejected: 0,
            }));
            setReceiptItems(newItems);
            setStep(2);
        }
    };

    const handleUpdateQuantity = (id: string, field: 'quantityReceived' | 'quantityRejected', value: number) => {
        setReceiptItems(items => items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const selectedPO = mockPOs.find(p => p.id === selectedPOId);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mb-4 pl-0 text-diamond-muted hover:text-white"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Cancelar
                </Button>
                    <h1 className="text-2xl font-bold text-white mb-2">Registar Entrada de Mercadoria</h1>
                    <p className="text-diamond-muted text-sm">Passo {step} de 3</p>
            </div>

            <Card className="bg-onyx-900 border-white/5 p-8 min-h-[500px]">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-xl mx-auto text-center py-12">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ScanLine size={32} className="text-gold" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Selecionar Ordem de Compra</h2>
                            <p className="text-diamond-muted mb-8 text-sm">Pesquise pelo nº da PO ou selecione da lista de ordens pendentes.</p>
                            
                            <div className="space-y-4 text-left">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-diamond-muted" size={16} />
                                <Input placeholder="Pesquisar PO-24-..." className="pl-10 h-10 bg-onyx-950 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-diamond-muted uppercase font-bold ml-1">Ordens Pendentes</label>
                                {mockPOs.filter(p => p.status === 'sent').map(po => (
                                    <div 
                                        key={po.id} 
                                        className="p-4 rounded border border-white/5 bg-white/5 hover:border-gold/50 cursor-pointer transition-colors flex justify-between items-center group"
                                        onClick={() => handleSelectPO(po.id)}
                                    >
                                        <div>
                                            <div className="font-mono text-gold font-bold">{po.code}</div>
                                            <div className="text-sm text-white">{po.supplierName}</div>
                                        </div>
                                        <div className="text-right">
                                                <div className="text-xs text-diamond-muted">{new Date(po.date).toLocaleDateString()}</div>
                                                <Badge variant="outline" className="mt-1 border-white/10 text-diamond-muted group-hover:text-white group-hover:border-white/20">Selecionar</Badge>
                                        </div>
                                    </div>
                                ))}
                                {mockPOs.filter(p => p.status === 'sent').length === 0 && (
                                    <div className="text-center p-4 text-diamond-muted italic">Nenhuma ordem pendente encontrada.</div>
                                )}
                            </div>
                            </div>
                    </div>
                )}

                {step === 2 && selectedPO && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex justify-between items-start mb-8 bg-white/5 p-4 rounded-lg border border-white/5">
                            <div>
                                <div className="text-xs text-diamond-muted uppercase font-bold mb-1">A Receber de</div>
                                <div className="text-lg font-bold text-white">{selectedPO.supplierName}</div>
                                <div className="text-sm text-gold font-mono">{selectedPO.code}</div>
                            </div>
                            <div className="w-[200px]">
                                    <Label className="text-xs mb-1.5 block">Nº Guia de Remessa</Label>
                                    <Input 
                                    placeholder="Ex: GR-12345" 
                                    value={documentRef} 
                                    onChange={e => setDocumentRef(e.target.value)}
                                    className="bg-onyx-950 border-white/10 h-9"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="text-sm font-medium text-white mb-2 ml-1">Itens e Quantidades</div>
                            {receiptItems.map(item => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded bg-onyx-950 border border-white/5">
                                    <div className="md:col-span-6">
                                        <div className="font-medium text-white">{item.productName}</div>
                                        <div className="text-xs text-diamond-muted">Pedido: <span className="font-mono text-white">{item.quantityOrdered}</span> un.</div>
                                    </div>
                                    <div className="md:col-span-3">
                                        <Label className="text-[10px] text-emerald-500 uppercase">Recebido</Label>
                                        <Input 
                                            type="number" 
                                            className="h-9 bg-onyx-900 border-white/10 text-white font-mono" 
                                            value={item.quantityReceived}
                                            onChange={e => handleUpdateQuantity(item.id, 'quantityReceived', Number(e.target.value))}    
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <Label className="text-[10px] text-red-500 uppercase">Rejeitado</Label>
                                        <Input 
                                            type="number" 
                                            className="h-9 bg-onyx-900 border-white/10 text-white font-mono" 
                                            value={item.quantityRejected}
                                            onChange={e => handleUpdateQuantity(item.id, 'quantityRejected', Number(e.target.value))}    
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setStep(1)} className="text-diamond-muted hover:text-white">Voltar</Button>
                            <Button className="btn-primary gap-2" onClick={() => setStep(3)} disabled={!documentRef}>
                                Confirmar Receção <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center py-16">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                            <Check size={40} className="text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Receção Registada com Sucesso!</h2>
                        <p className="text-diamond-muted max-w-md mx-auto mb-8">
                            A entrada de stock foi processada. O inventário foi atualizado e a ordem de compra marcada como recebida.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white" onClick={() => router.push('/core/compras/recepcoes')}>
                                Voltar à Lista
                            </Button>
                            <Button className="btn-primary" onClick={() => router.push('/core/inventario/stock')}>
                                Ver Stock Atualizado
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default function NewReceiptPage() {
    return (
        <CoreLayout>
            <Suspense fallback={<div className="text-white p-8 text-center">Carregando...</div>}>
                <NewReceiptContent />
            </Suspense>
        </CoreLayout>
    );
}
