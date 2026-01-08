"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/utils";
import {
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CheckCircle,
    Download,
    Layers
} from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const data = [
    { name: "Ago", Realizado: 1200000, Projetado: 1100000 },
    { name: "Set", Realizado: 1400000, Projetado: 1350000 },
    { name: "Out", Realizado: 800000, Projetado: 1200000 },
    { name: "Nov", Realizado: 1800000, Projetado: 1500000 },
    { name: "Dez", Realizado: 2300000, Projetado: 2100000 },
    { name: "Jan", Realizado: 1250000, Projetado: 2800000 },
    { name: "Fev", Realizado: 0, Projetado: 2400000 },
    { name: "Mar", Realizado: 0, Projetado: 2900000 },
];

export default function FluxoCaixaPage() {
    return (
        <div className="space-y-6 text-left">
            <PageHeader 
                title="Fluxo de Caixa" 
                description="Análise de realizado vs projetado e projeção de liquidez."
                backUrl="/core/financeiro"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                        <BarChart3 className="w-4 h-4 mr-2" /> Análise de Cenários
                    </Button>
                    <Button className="bg-gold-gradient text-onyx">
                        <Download className="w-4 h-4 mr-2" /> Exportar Projeção
                    </Button>
                </div>
            </PageHeader>

            {/* High Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-onyx-900 border-white/5">
                    <p className="text-xs text-diamond-muted mb-1">Posição Atual de Caixa</p>
                    <h3 className="text-2xl font-serif text-white">{formatCurrency(12500000)}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 mt-2">
                        <CheckCircle size={12} />
                        <span>Suficiente para 8.5 meses</span>
                    </div>
                </Card>
                <Card className="p-6 bg-onyx-900 border-white/5">
                    <p className="text-xs text-diamond-muted mb-1">Geração de Caixa (Acum. Ano)</p>
                    <h3 className="text-2xl font-serif text-gold">+{formatCurrency(15400000)}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 mt-2">
                        <ArrowUpRight size={12} />
                        <span>24% acima do projetado</span>
                    </div>
                </Card>
                <Card className="p-6 bg-onyx-900 border-white/5">
                    <p className="text-xs text-diamond-muted mb-1">Ponto de Equilíbrio (Mês)</p>
                    <h3 className="text-2xl font-serif text-diamond">{formatCurrency(4200000)}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-rose-500 mt-2">
                        <AlertTriangle size={12} />
                        <span>Atingido em 18 de Jan</span>
                    </div>
                </Card>
            </div>

            {/* Chart Area */}
            <Card className="p-6 bg-onyx-900 border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-semibold text-white">Fluxo de Caixa Operacional</h3>
                        <p className="text-xs text-diamond-muted">Comparativo Mensal (CVE)</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-gold" />
                            <span className="text-[10px] text-diamond-muted uppercase font-mono tracking-wider">Realizado</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-white/10" />
                            <span className="text-[10px] text-diamond-muted uppercase font-mono tracking-wider">Projetado</span>
                         </div>
                    </div>
                </div>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                stroke="#ffffff40" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="#ffffff40" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(value) => `${value/1000000}M`}
                            />
                            <Tooltip 
                                cursor={{fill: 'rgba(212, 175, 55, 0.05)'}}
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            />
                            <Bar dataKey="Projetado" fill="#ffffff10" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Realizado" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Breakdown Table */}
            <Card className="bg-onyx-900 border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="font-semibold text-white">Detalhamento por Categorias</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/[0.02] text-diamond-muted border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium uppercase text-[10px] tracking-widest">Categoria</th>
                                <th className="px-6 py-4 font-medium text-right uppercase text-[10px] tracking-widest">Jan (Real)</th>
                                <th className="px-6 py-4 font-medium text-right uppercase text-[10px] tracking-widest">Fev (Proj)</th>
                                <th className="px-6 py-4 font-medium text-right uppercase text-[10px] tracking-widest">Mar (Proj)</th>
                                <th className="px-6 py-4 font-medium text-right uppercase text-[10px] tracking-widest">Var. %</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="bg-emerald-500/[0.02]">
                                <td className="px-6 py-4 font-medium text-emerald-500 flex items-center gap-2">
                                    <ArrowUpRight size={14} /> Entradas Operacionais
                                </td>
                                <td className="px-6 py-4 text-right font-medium">{formatCurrency(8500000)}</td>
                                <td className="px-6 py-4 text-right text-diamond-muted">{formatCurrency(9200000)}</td>
                                <td className="px-6 py-4 text-right text-diamond-muted">{formatCurrency(9800000)}</td>
                                <td className="px-6 py-4 text-right text-emerald-500">+8.2%</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 pl-12 text-diamond-muted text-xs italic">Faturamento de Obras</td>
                                <td className="px-6 py-4 text-right text-xs">7.200.000</td>
                                <td className="px-6 py-4 text-right text-xs">7.800.000</td>
                                <td className="px-6 py-4 text-right text-xs">8.100.000</td>
                                <td className="px-6 py-4 text-right text-emerald-500"></td>
                            </tr>
                            <tr className="bg-rose-500/[0.02]">
                                <td className="px-6 py-4 font-medium text-rose-500 flex items-center gap-2">
                                    <ArrowDownRight size={14} /> Saídas Operacionais
                                </td>
                                <td className="px-6 py-4 text-right font-medium">{formatCurrency(5300000)}</td>
                                <td className="px-6 py-4 text-right text-diamond-muted">{formatCurrency(5100000)}</td>
                                <td className="px-6 py-4 text-right text-diamond-muted">{formatCurrency(5400000)}</td>
                                <td className="px-6 py-4 text-right text-emerald-500">-3.7%</td>
                            </tr>
                             <tr className="bg-onyx-950">
                                <td className="px-6 py-4 font-serif text-gold flex items-center gap-2">
                                    <Layers size={14} /> FLUXO LÍQUIDO (Geração)
                                </td>
                                <td className="px-6 py-4 text-right font-serif text-lg text-gold">{formatCurrency(3200000)}</td>
                                <td className="px-6 py-4 text-right text-diamond font-serif text-lg">{formatCurrency(4100000)}</td>
                                <td className="px-6 py-4 text-right text-diamond font-serif text-lg">{formatCurrency(4400000)}</td>
                                <td className="px-6 py-4 text-right text-emerald-500">+28.1%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
