"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/types/inventory";
import { BarChart3, Box, FileText, History, Image as ImageIcon, Package, Settings, Truck } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = mockProducts.find(p => p.id === params.id) || mockProducts[0];

    return (
        <CoreLayout>
             {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                <div className="flex items-center gap-4">
                     <div className="w-20 h-20 rounded-lg border border-white/10 bg-onyx-900 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <Package size={32} className="text-diamond-muted" />
                        )}
                     </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-gold bg-gold/10 px-1 rounded">{product.sku}</span>
                            <StatusBadge status={product.status} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">{product.name}</h1>
                        <p className="text-sm text-diamond-muted">
                            {product.category} &gt; {product.subCategory}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-white/10 text-diamond-muted hover:text-white">
                        <Settings size={16} /> Ações
                    </Button>
                    <Button className="btn-primary gap-2">
                        <Truck size={16} /> Encomendar
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="info" className="space-y-6">
                <TabsList className="bg-onyx-900 border border-white/5 w-full justify-start h-12 p-1 overflow-x-auto">
                    <TabsTrigger value="info" className="gap-2"><FileText size={14}/> Informações</TabsTrigger>
                    <TabsTrigger value="stock" className="gap-2"><Box size={14}/> Stock & Localização</TabsTrigger>
                    <TabsTrigger value="suppliers" className="gap-2"><Truck size={14}/> Fornecedores</TabsTrigger>
                    <TabsTrigger value="history" className="gap-2"><History size={14}/> Movimentações</TabsTrigger>
                    <TabsTrigger value="gallery" className="gap-2"><ImageIcon size={14}/> Galeria</TabsTrigger>
                </TabsList>

                {/* INFO TAB */}
                <TabsContent value="info" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2 p-6 bg-onyx-900 border-white/5 space-y-6">
                            <h3 className="font-semibold text-white">Dados Gerais</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-xs text-diamond-muted">Nome do Produto</Label>
                                    <div className="text-sm text-white font-medium">{product.name}</div>
                                </div>
                                 <div className="space-y-1">
                                    <Label className="text-xs text-diamond-muted">Categoria</Label>
                                    <div className="text-sm text-white">{product.category} / {product.subCategory}</div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-diamond-muted">Descrição</Label>
                                    <div className="text-sm text-diamond-muted">{product.description || "Sem descrição disponível."}</div>
                                </div>
                            </div>
                            
                            <Separator className="bg-white/5" />
                            
                             <h3 className="font-semibold text-white">Especificações</h3>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white/5 p-3 rounded">
                                    <Label className="text-[10px] text-diamond-muted uppercase">Unidade</Label>
                                    <div className="text-sm text-white font-mono">{product.unit}</div>
                                </div>
                                <div className="bg-white/5 p-3 rounded">
                                    <Label className="text-[10px] text-diamond-muted uppercase">Peso</Label>
                                    <div className="text-sm text-white font-mono">{product.weight || "-"}</div>
                                </div>
                                <div className="bg-white/5 p-3 rounded">
                                    <Label className="text-[10px] text-diamond-muted uppercase">Dimensões</Label>
                                    <div className="text-sm text-white font-mono">{product.dimensions || "-"}</div>
                                </div>
                             </div>
                        </Card>

                        <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                            <h3 className="font-semibold text-white">Métricas Financeiras</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                    <span className="text-sm text-diamond-muted">Custo Médio</span>
                                    <span className="text-lg font-bold text-white font-mono">{formatCurrency(product.averageCost)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                    <span className="text-sm text-diamond-muted">Última Compra</span>
                                    <span className="text-sm text-white font-mono">{formatCurrency(product.lastPurchasePrice || product.averageCost)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                    <span className="text-sm text-diamond-muted">Valor em Stock</span>
                                    <span className="text-lg font-bold text-emerald-500 font-mono">{formatCurrency(product.stockTotal * product.averageCost)}</span>
                                </div>
                            </div>
                            
                            <div className="pt-4">
                                <Label className="text-xs text-diamond-muted mb-2 block">Evolução de Preço</Label>
                                <div className="h-32 bg-white/5 rounded flex items-center justify-center text-xs text-diamond-muted">
                                    <BarChart3 size={24} className="mb-2 opacity-50"/>
                                    Gráfico Indisponível
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* STOCK TAB */}
                <TabsContent value="stock" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                         <Card className="p-4 bg-onyx-900 border-white/5">
                             <Label className="text-xs text-diamond-muted">Stock Total</Label>
                             <div className="text-2xl font-bold text-white mt-1">{product.stockTotal} <span className="text-sm font-normal text-diamond-muted">{product.unit}</span></div>
                         </Card>
                         <Card className="p-4 bg-onyx-900 border-white/5">
                             <Label className="text-xs text-diamond-muted">Disponível</Label>
                             <div className="text-2xl font-bold text-emerald-500 mt-1">{product.stockTotal - mockProducts[0].stocks[0].reserved} <span className="text-sm font-normal text-diamond-muted">{product.unit}</span></div>
                         </Card>
                         <Card className="p-4 bg-onyx-900 border-white/5">
                             <Label className="text-xs text-diamond-muted">Reservado</Label>
                             <div className="text-2xl font-bold text-gold mt-1">{mockProducts[0].stocks[0].reserved} <span className="text-sm font-normal text-diamond-muted">{product.unit}</span></div>
                         </Card>
                         <Card className="p-4 bg-onyx-900 border-white/5">
                             <Label className="text-xs text-diamond-muted">A Chegar</Label>
                             <div className="text-2xl font-bold text-blue-500 mt-1">{mockProducts[0].stocks[0].incoming} <span className="text-sm font-normal text-diamond-muted">{product.unit}</span></div>
                         </Card>
                    </div>

                    <Card className="bg-onyx-900 border-white/5">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-semibold text-white">Localização em Armazéns</h3>
                            <Button size="sm" variant="outline" className="border-white/10 text-diamond-muted">+ Ajuste Manual</Button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {product.stocks.map((stock, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-onyx-950 flex items-center justify-center text-diamond-muted">
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-white">{stock.warehouseName}</h4>
                                            <p className="text-xs text-diamond-muted">Local: <span className="text-gold font-mono">{stock.location || "N/A"}</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-white">{stock.quantity} {product.unit}</div>
                                        <div className="text-xs text-diamond-muted">{stock.reserved > 0 ? `${stock.reserved} res.` : 'Livre'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                {/* SUPPLIERS TAB */}
                <TabsContent value="suppliers">
                    <Card className="bg-onyx-900 border-white/5">
                         <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-semibold text-white">Fornecedores Homologados</h3>
                            <Button size="sm" variant="outline" className="border-white/10 text-diamond-muted">+ Adicionar</Button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {product.suppliers?.length > 0 ? product.suppliers.map((supplier, i) => (
                                <div key={i} className="p-4 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-medium text-white">{supplier.name}</h4>
                                            {supplier.isPreferred && <Badge variant="secondary" className="text-[10px] bg-gold/10 text-gold border-none">Preferencial</Badge>}
                                        </div>
                                        <p className="text-xs text-diamond-muted">SKU Fornecedor: {supplier.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-white font-mono">{formatCurrency(supplier.price)}</div>
                                        <div className="text-xs text-diamond-muted">Lead time: {supplier.leadTime} dias</div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-diamond-muted text-sm">
                                    Nenhum fornecedor associado a este produto.
                                </div>
                            )}
                        </div>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="history" className="text-center py-20 text-diamond-muted">
                    <p>Implementação do Histórico de Movimentações na Fase 10.2</p>
                </TabsContent>
                 <TabsContent value="gallery" className="text-center py-20 text-diamond-muted">
                    <p>Galeria de Imagens em breve.</p>
                </TabsContent>

            </Tabs>
        </CoreLayout>
    );
}
