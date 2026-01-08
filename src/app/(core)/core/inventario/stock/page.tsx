"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, Box, Package, RefreshCw, ShoppingCart, TrendingUp } from "lucide-react";

export default function StockDashboardPage() {
    return (
        <CoreLayout>
            <PageHeader
                title="Gestão de Stock"
                description="Visão geral e controle de inventário em tempo real."
            >
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-white/10 text-diamond-muted hover:text-white">
                        <RefreshCw size={16} /> Atualizar
                    </Button>
                    <Button className="btn-primary gap-2">
                        <ArrowUpRight size={16} /> Nova Movimentação
                    </Button>
                </div>
            </PageHeader>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-500">
                            <TrendingUp size={20} />
                        </div>
                        <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 text-[10px]">+12%</Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">{formatCurrency(1250000)}</div>
                        <div className="text-xs text-diamond-muted">Valor em Stock</div>
                    </div>
                </Card>

                <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-blue-500/10 text-blue-500">
                            <Box size={20} />
                        </div>
                         <Badge variant="outline" className="border-blue-500/20 text-blue-500 text-[10px]">4 Armazéns</Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">1,450</div>
                        <div className="text-xs text-diamond-muted">Itens Totais</div>
                    </div>
                </Card>

                <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-orange-500/10 text-orange-500">
                            <AlertTriangle size={20} />
                        </div>
                        <Badge variant="outline" className="border-orange-500/20 text-orange-500 text-[10px]">Ação Necessária</Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">8</div>
                        <div className="text-xs text-diamond-muted">Abaixo do Mínimo</div>
                    </div>
                </Card>

                 <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-violet-500/10 text-violet-500">
                            <ShoppingCart size={20} />
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">12</div>
                        <div className="text-xs text-diamond-muted">Encomendas Pendentes</div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Graphics placeholder */}
                <Card className="lg:col-span-2 p-6 bg-onyx-900 border-white/5 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <BarChart3 size={18} className="text-gold"/> 
                            Movimentação de Stock (30 dias)
                        </h3>
                        <div className="flex gap-2">
                             <Badge variant="outline" className="cursor-pointer hover:bg-white/5 border-white/10 text-diamond-muted">Entradas</Badge>
                             <Badge variant="outline" className="cursor-pointer hover:bg-white/5 border-white/10 text-diamond-muted">Saídas</Badge>
                        </div>
                    </div>
                    
                    {/* Placeholder for Chart */}
                    <div className="h-64 md:h-80 w-full bg-white/5 rounded-lg border border-white/5 border-dashed flex flex-col items-center justify-center text-diamond-muted gap-2">
                        <BarChart3 size={32} className="opacity-50" />
                        <span className="text-sm">Gráfico de evolução de valor de stock será implementado com dados reais.</span>
                    </div>
                </Card>

                {/* Sidebar - Low Stock Alerts */}
                <Card className="p-0 bg-onyx-900 border-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-red-500/5">
                        <h3 className="font-semibold text-white flex items-center gap-2 text-red-400">
                            <AlertTriangle size={18} /> 
                            Alertas de Stock Baixo
                        </h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        {[1,2,3].map((i) => (
                            <div key={i} className="p-4 hover:bg-white/5 transition-colors group">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Cimento Portland</h4>
                                    <span className="text-xs font-mono text-red-500 font-bold">12 un</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-diamond-muted">
                                    <span>Mínimo: 50 un</span>
                                    <Button variant="ghost" size="sm" className="h-auto p-0 text-gold hover:text-white">Requisitar</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-white/5 text-center">
                         <Button variant="ghost" size="sm" className="w-full text-xs text-diamond-muted">Ver todos os alertas</Button>
                    </div>
                </Card>
            </div>
            
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                 <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center gap-2 border-white/5 bg-onyx-900 hover:bg-onyx-800 hover:border-gold/30">
                     <Package size={24} className="text-gold"/>
                     <span className="font-semibold text-white">Reconciliação Física</span>
                     <span className="text-[10px] text-diamond-muted">Iniciar contagem cíclica</span>
                 </Button>
                 <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center gap-2 border-white/5 bg-onyx-900 hover:bg-onyx-800 hover:border-gold/30">
                     <ArrowDownRight size={24} className="text-emerald-500"/>
                     <span className="font-semibold text-white">Receção de Mercadoria</span>
                     <span className="text-[10px] text-diamond-muted">Registar entrada via PO</span>
                 </Button>
                 <Button variant="outline" className="h-auto p-4 flex flex-col items-center justify-center gap-2 border-white/5 bg-onyx-900 hover:bg-onyx-800 hover:border-gold/30">
                     <ArrowUpRight size={24} className="text-blue-500"/>
                     <span className="font-semibold text-white">Saída para Projeto</span>
                     <span className="text-[10px] text-diamond-muted">Material entregue em obra</span>
                 </Button>
            </div>
        </CoreLayout>
    );
}
