"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/types/inventory";
import { mockSuppliers, PurchaseOrderItem, Supplier } from "@/types/purchasing";
import { ArrowRight, Building2, Check, Package, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPOPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    
    // Form States
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("");
    
    const [items, setItems] = useState<PurchaseOrderItem[]>([]);
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

    // Helpers
    const handleSelectSupplier = (supplierId: string) => {
        const sup = mockSuppliers.find(s => s.id === supplierId);
        if (sup) {
            setSelectedSupplier(sup);
            setPaymentTerms(sup.paymentTerms); // pre-fill
        }
    };

    const handleAddProduct = (product: typeof mockProducts[0]) => {
        const newItem: PurchaseOrderItem = {
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            productName: product.name,
            quantity: 1,
            unit: product.unit,
            unitPrice: product.averageCost, // Default to cost
            taxRate: 15, // Default tax
            total: product.averageCost * 1.15,
        };
        setItems([...items, newItem]);
        setIsProductDialogOpen(false);
    };

    const handleUpdateItem = (id: string, field: keyof PurchaseOrderItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'quantity' || field === 'unitPrice' || field === 'taxRate') {
                    const subtotal = (updated.quantity || 0) * (updated.unitPrice || 0);
                    const tax = subtotal * ((updated.taxRate || 0) / 100);
                    updated.total = subtotal + tax;
                }
                return updated;
            }
            return item;
        }));
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const taxTotal = items.reduce((acc, item) => acc + ((item.quantity * item.unitPrice) * (item.taxRate / 100)), 0);
    const total = subtotal + taxTotal;

    return (
        <CoreLayout>
            <div className="max-w-4xl mx-auto">
                 {/* Steps Indicator */}
                <div className="mb-8 flex justify-center items-center">
                    <div className={cn("flex items-center gap-2", step >= 1 ? "text-gold" : "text-diamond-muted")}>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border", step >= 1 ? "bg-gold/20 border-gold" : "bg-onyx-900 border-white/10")}>1</div>
                        <span className="font-medium">Fornecedor</span>
                    </div>
                    <div className={cn("w-12 h-[1px] mx-4", step >= 2 ? "bg-gold" : "bg-white/10")} />
                    <div className={cn("flex items-center gap-2", step >= 2 ? "text-gold" : "text-diamond-muted")}>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border", step >= 2 ? "bg-gold/20 border-gold" : "bg-onyx-900 border-white/10")}>2</div>
                        <span className="font-medium">Itens</span>
                    </div>
                    <div className={cn("w-12 h-[1px] mx-4", step >= 3 ? "bg-gold" : "bg-white/10")} />
                    <div className={cn("flex items-center gap-2", step >= 3 ? "text-gold" : "text-diamond-muted")}>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border", step >= 3 ? "bg-gold/20 border-gold" : "bg-onyx-900 border-white/10")}>3</div>
                        <span className="font-medium">Revisão</span>
                    </div>
                </div>

                <Card className="bg-onyx-900 border-white/5 p-8 min-h-[500px] flex flex-col">
                    <div className="flex-1">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Building2 className="text-gold"/> Selecionar Fornecedor
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <Label>Fornecedor</Label>
                                        <Select onValueChange={handleSelectSupplier} value={selectedSupplier?.id}>
                                            <SelectTrigger className="bg-onyx-950 border-white/10 h-10">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockSuppliers.map(s => (
                                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {selectedSupplier && (
                                            <div className="bg-white/5 p-4 rounded-md mt-4 border border-white/5">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={selectedSupplier.logo}/>
                                                        <AvatarFallback className="bg-onyx-800">{selectedSupplier.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-white">{selectedSupplier.name}</div>
                                                        <div className="text-xs text-diamond-muted">{selectedSupplier.city}, {selectedSupplier.country}</div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm text-diamond-muted">
                                                     <div>Rating: <span className="text-gold">{selectedSupplier.rating}/5</span></div>
                                                     <div>Moeda: <span className="text-white">{selectedSupplier.currency}</span></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-4">
                                         <div className="space-y-2">
                                            <Label>Data de Entrega Prevista</Label>
                                            <Input type="date" className="bg-onyx-950 border-white/10" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Condições de Pagamento</Label>
                                            <Input className="bg-onyx-950 border-white/10" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                 <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Package className="text-gold"/> Adicionar Itens
                                    </h2>
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
                                                <Input placeholder="Pesquisar..." className="bg-onyx-950 border-white/10 text-white" />
                                                <div className="max-h-[300px] overflow-y-auto space-y-2">
                                                    {mockProducts.map(product => (
                                                        <div key={product.id} className="flex justify-between items-center p-3 rounded bg-onyx-950 border border-white/5 hover:border-gold/30 cursor-pointer" onClick={() => handleAddProduct(product)}>
                                                            <div>
                                                                <div className="font-medium text-white">{product.name}</div>
                                                                <div className="text-xs text-diamond-muted">{product.sku}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-mono text-xs text-white">{formatCurrency(product.averageCost)}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="space-y-4">
                                     {items.length === 0 ? (
                                        <div className="text-center py-12 text-diamond-muted border border-dashed border-white/10 rounded-lg">
                                            Nenhum item adicionado.
                                        </div>
                                    ) : (
                                        items.map(item => (
                                            <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg bg-onyx-950 border border-white/5 relative group">
                                                 <div className="col-span-4">
                                                    <div className="text-sm font-medium text-white">{item.productName}</div>
                                                </div>
                                                <div className="col-span-2">
                                                    <Input 
                                                        type="number" 
                                                        className="h-8 bg-onyx-900 border-white/10 text-right" 
                                                        value={item.quantity} 
                                                        onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                                                    />
                                                </div>
                                                <div className="col-span-3">
                                                     <Input 
                                                        type="number" 
                                                        className="h-8 bg-onyx-900 border-white/10 text-right" 
                                                        value={item.unitPrice} 
                                                        onChange={(e) => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                                                    />
                                                </div>
                                                 <div className="col-span-2 text-right">
                                                    <div className="font-mono text-sm text-gold font-bold">{formatCurrency(item.total)}</div>
                                                </div>
                                                <div className="col-span-1 flex justifying-end">
                                                     <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleRemoveItem(item.id)}><Trash2 size={12}/></Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="mt-6 flex justify-end text-lg font-bold text-white">
                                    Total: {formatCurrency(total)}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Check className="text-gold"/> Revisão Final
                                </h2>
                                
                                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="text-xs text-diamond-muted uppercase">Fornecedor</label>
                                            <div className="text-lg font-bold text-white">{selectedSupplier?.name}</div>
                                        </div>
                                         <div>
                                            <label className="text-xs text-diamond-muted uppercase">Data Entrega</label>
                                            <div className="text-white">{deliveryDate || "N/A"}</div>
                                        </div>
                                    </div>
                                    
                                     <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                                        {items.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span className="text-diamond-muted">{item.quantity}x {item.productName}</span>
                                                <span className="text-white font-mono">{formatCurrency(item.total)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                        <span className="text-lg font-bold text-white">Total Final</span>
                                        <span className="text-2xl font-bold text-gold font-mono">{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between">
                        <Button 
                            variant="ghost" 
                            onClick={() => step === 1 ? router.back() : setStep(step - 1)}
                            className="text-diamond-muted hover:text-white"
                        >
                            {step === 1 ? 'Cancelar' : 'Voltar'}
                        </Button>
                        
                         <Button 
                            className="btn-primary gap-2"
                            disabled={step === 1 && !selectedSupplier}
                            onClick={() => step === 3 ? console.log("Submit") : setStep(step + 1)}
                        >
                            {step === 3 ? 'Confirmar Ordem' : 'Próximo'} <ArrowRight size={16} />
                        </Button>
                    </div>
                </Card>
            </div>
        </CoreLayout>
    );
}
