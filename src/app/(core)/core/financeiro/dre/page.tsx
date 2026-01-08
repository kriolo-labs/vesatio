"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/utils";
import {
    ChevronDown,
    Download,
    Printer,
    TrendingUp
} from "lucide-react";

interface DRELines {
    code: string;
    label: string;
    value: number;
    percent?: number;
    isTotal?: boolean;
    isSubtotal?: boolean;
    level: number;
}

const dreData: DRELines[] = [
    { code: "1", label: "RECEITA BRUTA OPERACIONAL", value: 9200000, isTotal: true, level: 0 },
    { code: "1.1", label: "Venda de Serviços de Engenharia", value: 8500000, level: 1 },
    { code: "1.2", label: "Venda de Materiais (Revenda)", value: 700000, level: 1 },
    { code: "2", label: "DEDUÇÕES DA RECEITA", value: -1250000, isSubtotal: true, level: 0 },
    { code: "2.1", label: "Impostos s/ Vendas (IUR/IVA)", value: -1100000, level: 1 },
    { code: "2.2", label: "Devoluções e Abatimentos", value: -150000, level: 1 },
    { code: "3", label: "RECEITA LÍQUIDA OPERACIONAL", value: 7950000, isTotal: true, level: 0, percent: 100 },
    { code: "4", label: "CUSTOS OPERACIONAIS (CPV)", value: -4200000, isSubtotal: true, level: 0, percent: 52.8 },
    { code: "4.1", label: "Mão de Obra Direta", value: -2500000, level: 1 },
    { code: "4.2", label: "Materiais Aplicados", value: -1200000, level: 1 },
    { code: "4.3", label: "Equipamentos e Logística", value: -500000, level: 1 },
    { code: "5", label: "LUCRO BRUTO OPERACIONAL", value: 3750000, isTotal: true, level: 0, percent: 47.1 },
    { code: "6", label: "DESPESAS OPERACIONAIS", value: -1200000, isSubtotal: true, level: 0, percent: 15.1 },
    { code: "6.1", label: "Despesas Administrativas", value: -850000, level: 1 },
    { code: "6.2", label: "Despesas de Vendas/Marketing", value: -150000, level: 1 },
    { code: "6.3", label: "Outras Despesas", value: -200000, level: 1 },
    { code: "7", label: "EBITDA (LAJIDA)", value: 2550000, isTotal: true, level: 0, percent: 32.1 },
    { code: "8", label: "Depreciação e Amortização", value: -450000, level: 0 },
    { code: "9", label: "EBIT (LAJIR)", value: 2100000, isTotal: true, level: 0, percent: 26.4 },
    { code: "10", label: "Resultado Financeiro Líquido", value: -120000, level: 0 },
    { code: "11", label: "LUCRO LÍQUIDO DO PERÍODO", value: 1980000, isTotal: true, level: 0, percent: 24.9 },
];

export default function DREPage() {
    return (
        <div className="space-y-6 text-left pb-20">
            <PageHeader 
                title="Demonstração de Resultados (DRE)" 
                description="Análise de performance econômica multinível."
                backUrl="/core/financeiro"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                        <Printer className="w-4 h-4 mr-2" /> Imprimir
                    </Button>
                    <Button className="bg-gold-gradient text-onyx">
                        <Download className="w-4 h-4 mr-2" /> Exportar Excel
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main DRE Report */}
                <Card className="lg:col-span-3 bg-onyx-900 border-white/5 overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="space-y-1">
                            <h2 className="text-xl font-serif text-white uppercase tracking-wider text-left">Demonstração de Resultados Exercicio</h2>
                            <p className="text-xs text-diamond-muted">Período: 01 Jan 2026 à 31 Jan 2026 • Regime de Competência • Moeda: CVE</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 py-1 px-3">CONSOLIDADO</Badge>
                        </div>
                    </div>

                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-onyx-950/50 text-diamond-muted border-b border-white/5 text-left">
                                <tr>
                                    <th className="px-8 py-4 font-medium uppercase text-[10px] tracking-widest">Descrição da Conta</th>
                                    <th className="px-8 py-4 font-medium text-right uppercase text-[10px] tracking-widest">Valor do Período</th>
                                    <th className="px-8 py-4 font-medium text-right uppercase text-[10px] tracking-widest">% Receita</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {dreData.map((line) => (
                                    <tr 
                                        key={line.code} 
                                        className={`
                                            transition-colors hover:bg-white/[0.02] 
                                            ${line.isTotal ? 'bg-white/[0.04] font-serif' : ''}
                                            ${line.isSubtotal ? 'bg-white/[0.01]' : ''}
                                        `}
                                    >
                                        <td className={`px-8 py-4 ${line.level === 0 ? 'font-medium text-white' : 'pl-16 text-diamond-muted'}`}>
                                            <div className="flex items-center gap-2">
                                                {line.level === 0 && (line.isTotal || line.isSubtotal) ? <ChevronDown size={14} className="text-gold" /> : null}
                                                {line.label}
                                            </div>
                                        </td>
                                        <td className={`px-8 py-4 text-right ${line.isTotal ? 'text-gold text-lg' : line.value < 0 ? 'text-rose-500/80' : 'text-diamond'}`}>
                                            {formatCurrency(line.value)}
                                        </td>
                                        <td className="px-8 py-4 text-right text-xs text-diamond-muted">
                                            {line.percent ? `${line.percent}%` : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 bg-onyx-950/50 border-t border-white/5">
                        <p className="text-[10px] text-diamond-muted italic text-center">Relatório gerado automaticamente em 08 Jan 2026. Os valores apresentados são preliminares.</p>
                    </div>
                </Card>

                {/* Sidebar Analytics */}
                <div className="space-y-6">
                    <Card className="p-6 bg-onyx-900 border-white/5 text-left">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                             Performance Económica
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-diamond-muted">Margem EBITDA</span>
                                    <span className="text-emerald-500 font-medium">32.1%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '32.1%' }} />
                                </div>
                                <p className="text-[10px] text-emerald-500/70 font-medium">+2.5% vs Histórico</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-diamond-muted">Peso dos Impostos</span>
                                    <span className="text-rose-500 font-medium">13.8%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '13.8%' }} />
                                </div>
                                <p className="text-[10px] text-diamond-muted">Dentro da média setorial</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gold/5 border-gold/10 relative overflow-hidden text-left">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingUp size={32} className="text-gold" />
                        </div>
                        <h3 className="font-medium text-gold mb-2">Break-even Point</h3>
                        <p className="text-sm text-diamond mb-4">Seu ponto de equilíbrio é de {formatCurrency(4200000)}/mês.</p>
                        <div className="space-y-1">
                            <p className="text-[10px] text-diamond-muted uppercase font-mono">Status Jan/26</p>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">ATINGIDO</Badge>
                        </div>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5 text-left">
                        <h3 className="font-semibold text-white mb-4">Principais Centros de Custo</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gold" />
                                    <span className="text-xs text-diamond-muted">Torre Atlântico</span>
                                </div>
                                <span className="text-xs text-diamond font-medium">{formatCurrency(2800000)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-xs text-diamond-muted">Villa Sal Rei</span>
                                </div>
                                <span className="text-xs text-diamond font-medium">{formatCurrency(1100000)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-diamond-muted" />
                                    <span className="text-xs text-diamond-muted">Administração</span>
                                </div>
                                <span className="text-xs text-diamond font-medium">{formatCurrency(850000)}</span>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-xs text-gold hover:text-gold hover:bg-gold/5 border border-dashed border-gold/20">
                             Detalhamento de Custos
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
