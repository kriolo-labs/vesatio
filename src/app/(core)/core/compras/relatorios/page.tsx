"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import {
    BarChart3,
    CreditCard, DollarSign, Download,
    PieChart, TrendingDown, TrendingUp, Wallet
} from "lucide-react";

export default function PurchasingReportsPage() {
    return (
        <CoreLayout>
             <PageHeader
                title="Relatórios de Compras"
                description="Dashboard analítico de despesas e performance de fornecedores."
            >
                <div className="flex gap-2">
                     <Select defaultValue="this_month">
                        <SelectTrigger className="w-[180px] bg-onyx-900 border-white/10 text-white">
                            <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="this_month">Este Mês</SelectItem>
                            <SelectItem value="last_month">Mês Passado</SelectItem>
                            <SelectItem value="this_quarter">Este Trimestre</SelectItem>
                            <SelectItem value="this_year">Este Ano</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white">
                        <Download size={16} className="mr-2" /> Exportar
                    </Button>
                </div>
            </PageHeader>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-gold/10 text-gold">
                            <DollarSign size={20} />
                        </div>
                        <Badge variant="outline" className="border-red-500/20 text-red-500 text-[10px] flex items-center gap-1">
                             <TrendingUp size={10}/> +12%
                        </Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">{formatCurrency(4850000)}</div>
                        <div className="text-xs text-diamond-muted">Total Gasto (Ano)</div>
                    </div>
                </Card>

                 <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-blue-500/10 text-blue-500">
                            <Wallet size={20} />
                        </div>
                        <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 text-[10px] flex items-center gap-1">
                             <TrendingDown size={10}/> -5%
                        </Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">{formatCurrency(450000)}</div>
                        <div className="text-xs text-diamond-muted">Média por PO</div>
                    </div>
                </Card>

                <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-purple-500/10 text-purple-500">
                            <BarChart3 size={20} />
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">124</div>
                        <div className="text-xs text-diamond-muted">Total de Ordens</div>
                    </div>
                </Card>
                
                 <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-500">
                            <CreditCard size={20} />
                        </div>
                        <span className="text-xs text-diamond-muted">Pagamentos</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">{formatCurrency(120000)}</div>
                        <div className="text-xs text-diamond-muted">A Pagar (30 dias)</div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Spending by Category Chart */}
                <Card className="lg:col-span-2 p-6 bg-onyx-900 border-white/5 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <PieChart size={18} className="text-gold"/>
                            Despesa por Categoria
                        </h3>
                    </div>
                    <div className="h-64 flex items-center justify-center border border-dashed border-white/5 rounded-lg bg-onyx-950/50">
                        <div className="text-center text-diamond-muted">
                            <PieChart size={48} className="mx-auto mb-2 opacity-50" />
                            <span>Gráfico de Distribuição de Despesas</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                         <div className="text-center">
                            <div className="text-sm text-diamond-muted">Materiais</div>
                            <div className="font-bold text-white">65%</div>
                            <div className="text-xs text-emerald-500">{formatCurrency(3152500)}</div>
                        </div>
                         <div className="text-center border-l border-white/5">
                            <div className="text-sm text-diamond-muted">Equipamentos</div>
                            <div className="font-bold text-white">25%</div>
                            <div className="text-xs text-blue-500">{formatCurrency(1212500)}</div>
                        </div>
                         <div className="text-center border-l border-white/5">
                            <div className="text-sm text-diamond-muted">Serviços</div>
                            <div className="font-bold text-white">10%</div>
                            <div className="text-xs text-purple-500">{formatCurrency(485000)}</div>
                        </div>
                    </div>
                </Card>

                {/* Top Suppliers */}
                <Card className="p-6 bg-onyx-900 border-white/5">
                     <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-gold"/> Top Fornecedores
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: "ConstruMat, Lda", value: 1250000, percent: 25 },
                            { name: "Global Tools GmbH", value: 850000, percent: 18 },
                            { name: "BetaBetão SA", value: 620000, percent: 12 },
                            { name: "Tintas & Cores", value: 410000, percent: 8 },
                            { name: "ElectroCabo CV", value: 350000, percent: 7 },
                        ].map((s, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white">{s.name}</span>
                                    <span className="text-diamond-muted">{formatCurrency(s.value)}</span>
                                </div>
                                <div className="h-1.5 w-full bg-onyx-950 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gold/50 rounded-full" 
                                        style={{ width: `${s.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </CoreLayout>
    );
}
