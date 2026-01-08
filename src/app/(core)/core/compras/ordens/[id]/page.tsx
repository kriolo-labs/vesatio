"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCurrency } from "@/lib/utils";
import { mockPOs, POStatus } from "@/types/purchasing";
import {
    ArrowLeft, Bot, Box, Building2, Calendar,
    CheckCircle2,
    CreditCard,
    FileText, Mail, Printer,
    Send, Sparkles, Truck
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function PODetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    
    // In a real app, fetch data based on ID
    const po = mockPOs.find(p => p.id === id) || mockPOs[0];

    if (!po) return <div>Ordem de Compra não encontrada</div>;

    const StatusBadge = ({ status }: { status: POStatus }) => {
        const config = {
            draft: { label: "Rascunho", color: "text-diamond-muted bg-white/5 border-white/10" },
            sent: { label: "Enviada", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
            partial_received: { label: "Parcial", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
            closed: { label: "Fechada", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
            cancelled: { label: "Cancelada", color: "text-red-500 bg-red-500/10 border-red-500/20" },
        }[status];
        
        return (
             <Badge variant="outline" className={cn("text-xs uppercase px-2 py-0.5", config?.color)}>
                {config?.label}
            </Badge>
        )
    };

    return (
        <CoreLayout>
            <div className="mb-6">
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mb-4 pl-0 text-diamond-muted hover:text-white"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Voltar para Ordens
                </Button>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                         <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white font-mono">{po.code}</h1>
                            <StatusBadge status={po.status} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-diamond-muted mt-1">
                            <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(po.date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><Building2 size={14}/> {po.supplierName}</span>
                            <span className="flex items-center gap-1"><CreditCard size={14}/> {formatCurrency(po.total)}</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                         <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white">
                             <Printer size={16} className="mr-2"/> Imprimir
                        </Button>
                        <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white">
                             <Mail size={16} className="mr-2"/> Enviar Email
                        </Button>
                         {po.status === 'draft' && (
                            <Button className="btn-primary">
                                <Send size={16} className="mr-2"/> Aprovar & Enviar
                            </Button>
                         )}
                         {po.status === 'sent' && (
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                                <Truck size={16} className="mr-2"/> Registar Receção
                            </Button>
                         )}
                    </div>
                </div>
            </div>

            <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="bg-onyx-900 border border-white/5 p-1">
                    <TabsTrigger value="details" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Detalhes da Ordem</TabsTrigger>
                    <TabsTrigger value="quotes" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted flex gap-2">
                        <Sparkles size={14}/> Cotação Tripla (AURA)
                    </TabsTrigger>
                     <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Histórico & Log</TabsTrigger>
                </TabsList>

                {/* TAB: DETAILS */}
                <TabsContent value="details" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT: Items & Info */}
                        <div className="lg:col-span-2 space-y-6">
                             <Card className="bg-onyx-900 border-white/5 overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                    <h3 className="font-semibold text-white flex items-center gap-2"><Box size={16} className="text-gold"/> Itens da Encomenda</h3>
                                    <span className="text-xs text-diamond-muted">{po.items.length} itens listados</span>
                                </div>
                                <div>
                                    <table className="w-full text-sm">
                                        <thead className="text-xs text-diamond-muted uppercase bg-onyx-950 border-b border-white/5">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Item</th>
                                                <th className="px-4 py-3 text-right">Qtd.</th>
                                                <th className="px-4 py-3 text-right">Unid.</th>
                                                <th className="px-4 py-3 text-right">Preço Un.</th>
                                                <th className="px-4 py-3 text-right">Imposto</th>
                                                <th className="px-4 py-3 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {po.items.map(item => (
                                                <tr key={item.id} className="hover:bg-white/5">
                                                    <td className="px-4 py-3">
                                                        <div className="text-white font-medium">{item.productName}</div>
                                                        <div className="text-[10px] text-diamond-muted font-mono">{item.productId}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-white">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-right text-diamond-muted">{item.unit}</td>
                                                    <td className="px-4 py-3 text-right font-mono text-diamond-muted">{formatCurrency(item.unitPrice)}</td>
                                                    <td className="px-4 py-3 text-right text-diamond-muted">{item.taxRate}%</td>
                                                    <td className="px-4 py-3 text-right font-mono font-bold text-white">{formatCurrency(item.total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-onyx-950/50">
                                            <tr>
                                                <td colSpan={5} className="px-4 py-3 text-right text-diamond-muted font-medium">Subtotal</td>
                                                <td className="px-4 py-3 text-right font-mono text-white">{formatCurrency(po.subtotal)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5} className="px-4 py-3 text-right text-diamond-muted font-medium">Impostos</td>
                                                <td className="px-4 py-3 text-right font-mono text-white">{formatCurrency(po.taxTotal)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5} className="px-4 py-3 text-right text-diamond-muted font-medium">Portes de Envio</td>
                                                <td className="px-4 py-3 text-right font-mono text-white">{formatCurrency(po.shippingCost)}</td>
                                            </tr>
                                            <tr className="border-t border-white/10 bg-gold/5">
                                                <td colSpan={5} className="px-4 py-3 text-right text-gold font-bold uppercase">Total Final</td>
                                                <td className="px-4 py-3 text-right font-mono font-bold text-gold text-lg">{formatCurrency(po.total)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        
                        {/* RIGHT: Supplier Info & Terms */}
                         <div className="space-y-6">
                             <Card className="p-6 bg-onyx-900 border-white/5">
                                <h3 className="text-sm font-semibold text-white uppercase mb-4 flex items-center gap-2">
                                    <Building2 size={16} className="text-gold" /> Fornecedor
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-lg font-bold text-white">{po.supplierName}</div>
                                        <div className="text-xs text-diamond-muted">ID: {po.supplierId}</div>
                                    </div>
                                    <div className="h-px bg-white/5 my-2" />
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-[10px] text-diamond-muted uppercase block">Contacto</span>
                                            <span className="text-white">Geral</span>
                                        </div>
                                         <div>
                                            <span className="text-[10px] text-diamond-muted uppercase block">Telefone</span>
                                            <span className="text-white">+238 261 0000</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-onyx-900 border-white/5">
                                <h3 className="text-sm font-semibold text-white uppercase mb-4 flex items-center gap-2">
                                    <FileText size={16} className="text-gold" /> Termos & Notas
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-diamond-muted">Condições Pagamento</span>
                                        <span className="text-white">{po.paymentTerms}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-diamond-muted">Data Entrega Prevista</span>
                                        <span className="text-white">{new Date(po.deliveryDate).toLocaleDateString()}</span>
                                    </div>
                                    {po.notes && (
                                        <div className="pt-2 border-t border-white/5 mt-2">
                                            <span className="text-[10px] text-diamond-muted uppercase block mb-1">Notas</span>
                                            <p className="text-diamond-muted text-xs leading-relaxed italic">"{po.notes}"</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* TAB: TRIPLE QUOTE AI */}
                <TabsContent value="quotes">
                    {po.quotes ? (
                        <div className="space-y-6">
                            <Card className="bg-onyx-900 border border-gold/20 p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <Bot size={120} className="text-gold/10" />
                                </div>
                                <div className="relative z-10">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                                        <Sparkles className="text-gold fill-gold animate-pulse" /> Análise AURA: Melhor Escolha
                                    </h2>
                                    <p className="text-diamond-muted max-w-2xl mb-6">
                                        A IA analisou 3 cotações baseando-se no preço, prazo de entrega e histórico de confiabilidade (AURA Score).
                                        A recomendação é <strong>{po.quotes.sort((a,b) => b.auraScore - a.auraScore)[0].supplierName}</strong>.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {po.quotes.map((quote, idx) => {
                                            const isBest = idx === 0; // Mock logic, usually based on score
                                            return (
                                                <div key={quote.supplierId} className={cn("rounded-lg border p-5 relative transition-all hover:scale-105", isBest ? "bg-gold/10 border-gold/50 shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]" : "bg-onyx-950 border-white/5 opacity-80 hover:opacity-100")}>
                                                    {isBest && (
                                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                            <CheckCircle2 size={12} /> RECOMENDADO
                                                        </div>
                                                    )}
                                                    
                                                    <div className="text-center mb-4 mt-2">
                                                        <div className="font-bold text-white text-lg">{quote.supplierName}</div>
                                                        <div className="text-xs text-diamond-muted">Fornecedor</div>
                                                    </div>
                                                    
                                                    <div className="space-y-3 mb-6">
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-sm text-diamond-muted">Preço Total</span>
                                                            <span className="font-mono font-bold text-white">{formatCurrency(quote.price)}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                            <span className="text-sm text-diamond-muted">Prazo (Dias)</span>
                                                            <span className="font-mono text-white">{quote.deliveryDays} dias</span>
                                                        </div>
                                                         <div className="flex justify-between items-center py-2">
                                                            <span className="text-sm text-diamond-muted">AURA Score</span>
                                                            <span className={cn("font-bold", quote.auraScore >= 9 ? "text-emerald-500" : quote.auraScore >= 7 ? "text-yellow-500" : "text-red-500")}>{quote.auraScore}/10</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                                                        {quote.features.map(feat => (
                                                            <Badge key={feat} variant="secondary" className="bg-white/5 text-[10px] text-diamond-muted border-white/10">{feat}</Badge>
                                                        ))}
                                                    </div>
                                                    
                                                    <Button variant={isBest ? "default" : "outline"} className={cn("w-full", isBest ? "btn-primary" : "border-white/10 text-diamond-muted hover:text-white")}>
                                                        Selecionar
                                                    </Button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-lg text-diamond-muted">
                            <Bot size={48} className="mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-white mb-2">Sem Cotações Comparativas</h3>
                            <p>Esta ordem foi criada diretamente. Utilize o assistente de cotação para comparar fornecedores.</p>
                        </div>
                    )}
                </TabsContent>

                 {/* TAB: HISTORY - PLACEHOLDER */}
                 <TabsContent value="history">
                     <Card className="p-6 bg-onyx-900 border-white/5 text-center text-diamond-muted">
                         Histórico de alterações e logs de aprovação aparecerão aqui.
                     </Card>
                 </TabsContent>
            </Tabs>
        </CoreLayout>
    );
}
