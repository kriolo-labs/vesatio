"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import {
    ArrowUpRight,
    BarChart3,
    Briefcase,
    Building,
    Calculator,
    ChevronRight,
    Clock,
    FileText,
    PieChart,
    Scale,
    TrendingUp,
    Zap
} from "lucide-react";

const reports = [
    {
        category: "Performance Executiva",
        items: [
            { id: "r1", title: "Análise EBITDA Multinível", description: "Visão detalhada de margens por unidade e período.", icon: BarChart3, color: "text-gold" },
            { id: "r2", title: "Fluxo de Caixa Projetado 12m", description: "Projeção de liquidez a longo prazo com cenários.", icon: TrendingUp, color: "text-gold" },
            { id: "r3", title: "Balanced Scorecard Financeiro", description: "KPIs estratégicos comparados com metas anuais.", icon: Zap, color: "text-gold" },
        ]
    },
    {
        category: "Gestão Operacional",
        items: [
            { id: "r4", title: "Relatório de Aging Detalhado", description: "Análise profunda de atrasos por cliente e vendedor.", icon: Clock, color: "text-blue-500" },
            { id: "r5", title: "Rateio de Custos por Unidade", description: "Distribuição de despesas administrativas por obra.", icon: Briefcase, color: "text-blue-500" },
            { id: "r6", title: "Rentabilidade por Projeto", description: "Comparativo de margem bruta entre todas as obras.", icon: Scale, color: "text-blue-500" },
        ]
    },
    {
        category: "Fiscal e Contabilístico",
        items: [
            { id: "r7", title: "Sumário de Impostos (IVA/IUR)", description: "Projeção de obrigações fiscais do trimestre.", icon: Calculator, color: "text-emerald-500" },
            { id: "r8", title: "Balancete de Verificação", description: "Extração técnica para contabilidade externa.", icon: FileText, color: "text-emerald-500" },
            { id: "r9", title: "Extrato Consolidado de Bancos", description: "Movimentação completa e reconciliada.", icon: Building, color: "text-emerald-500" },
        ]
    }
];

export default function RelatoriosFinanceirosPage() {
    return (
        <div className="space-y-8 text-left pb-20">
            <PageHeader 
                title="Relatórios Avançados" 
                description="Central de análises financeiras e inteligência de dados."
                backUrl="/core/financeiro"
            />

            {/* Quick Access Featured Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card className="p-6 bg-gold-gradient text-onyx relative overflow-hidden group cursor-pointer border-none shadow-gold-glow/20">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp size={96} />
                    </div>
                    <Badge className="bg-onyx/20 text-onyx border-onyx/30 mb-4 font-mono font-bold">DESTAQUE</Badge>
                    <h3 className="text-2xl font-serif font-bold mb-2">Relatório Mensal de Gestão</h3>
                    <p className="text-sm opacity-90 max-w-sm mb-6">PDF consolidado com DRE, Fluxo de Caixa e principais KPIs para o conselho de administração.</p>
                    <Button className="bg-onyx text-white hover:bg-onyx/90 border-none shadow-xl">Gerar Relatório Jan/26</Button>
                 </Card>

                 <Card className="p-6 bg-onyx-900 border-white/5 relative overflow-hidden group cursor-pointer hover:border-blue-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                        <Clock size={96} className="text-blue-500" />
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 font-mono">AUTOMÁTICO</Badge>
                    <h3 className="text-2xl font-serif text-white mb-2">Régua de Cobrança (AURA)</h3>
                    <p className="text-sm text-diamond-muted max-w-sm mb-6">Visualize a eficácia das notificações automáticas e o histórico de recebimentos.</p>
                    <Button variant="outline" className="border-white/10 text-diamond group-hover:bg-blue-500 group-hover:text-white transition-colors">Visualizar Dashboard</Button>
                 </Card>
            </div>

            {/* Catalog */}
            <div className="space-y-8 text-left">
                {reports.map((section) => (
                    <div key={section.category} className="space-y-4">
                        <h2 className="text-xs uppercase font-mono tracking-widest text-diamond-muted px-2 border-l-2 border-gold">{section.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((report) => (
                                <Card key={report.id} className="p-5 bg-onyx-900 border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-all cursor-pointer group">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${report.color}`}>
                                            <report.icon size={20} />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-medium text-white group-hover:text-gold transition-colors flex items-center justify-between">
                                                {report.title}
                                                <ChevronRight size={14} className="text-diamond-muted opacity-0 group-hover:opacity-100 transition-all" />
                                            </h4>
                                            <p className="text-xs text-diamond-muted line-clamp-2">{report.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                        <div className="flex gap-1">
                                            <Badge variant="outline" className="text-[9px] border-white/5 text-diamond-muted">PDF</Badge>
                                            <Badge variant="outline" className="text-[9px] border-white/5 text-diamond-muted">XLSX</Badge>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-diamond-muted italic opacity-0 group-hover:opacity-100 transition-opacity">
                                            Último acesso: Ontem
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Report Builder Teaser */}
            <Card className="p-8 bg-onyx-950 border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <PieChart size={24} className="text-diamond-muted" />
                </div>
                <h3 className="text-diamond font-medium mb-1">Precisa de um relatório específico?</h3>
                <p className="text-sm text-diamond-muted mb-6 max-w-sm">Use o AURA AI para construir visualizações personalizadas falando em linguagem natural.</p>
                <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5">
                     Pedir ao AURA <ArrowUpRight size={14} className="ml-2" />
                </Button>
            </Card>
        </div>
    );
}
