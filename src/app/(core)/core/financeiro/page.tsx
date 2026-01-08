"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { mockFinancialStats } from "@/types/financeiro";
import {
    AlertCircle,
    ArrowDownRight,
    ArrowUpRight,
    Calendar,
    ChevronRight,
    CreditCard,
    Download,
    FileText,
    History,
    Plus,
    TrendingUp,
    Wallet
} from "lucide-react";
import Link from "next/link";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

// Mock Data for Charts
const cashFlowData = [
    { month: "Ago", inflow: 4500000, outflow: 3200000 },
    { month: "Set", inflow: 5200000, outflow: 3800000 },
    { month: "Out", inflow: 4800000, outflow: 4100000 },
    { month: "Nov", inflow: 6100000, outflow: 4300000 },
    { month: "Dez", inflow: 7500000, outflow: 5200000 },
    { month: "Jan", inflow: 8500000, outflow: 5300000 },
];

const agingData = [
    { name: "A vencer", value: 4500000, color: "#D4AF37" },
    { name: "1-30 dias", value: 1200000, color: "#3b82f6" },
    { name: "31-60 dias", value: 850000, color: "#f59e0b" },
    { name: "61-90 dias", value: 450000, color: "#ef4444" },
    { name: "> 90 dias", value: 300000, color: "#7f1d1d" },
];

const alerts = [
    { id: 1, type: "error", title: "5 Faturas Vencidas", description: "Total de 1.250.000 CVE aguardando cobrança.", link: "/core/financeiro/receber" },
    { id: 2, type: "warning", title: "Conciliação Pendente", description: "32 movimentos bancários sem correspondência.", link: "/core/financeiro/tesouraria/conciliacao" },
    { id: 3, type: "info", title: "Pagamento Programado", description: "IVA Trimestral vence em 5 dias.", link: "/core/financeiro/pagar" },
];

const quickActions = [
    { title: "Registar Recebimento", icon: Plus, href: "/core/financeiro/receber/novo", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Registar Pagamento", icon: CreditCard, href: "/core/financeiro/pagar/novo", color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Nova Fatura", icon: FileText, href: "/core/financeiro/receber/nova", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Fluxo de Caixa", icon: TrendingUp, href: "/core/financeiro/fluxo-caixa", color: "text-gold", bg: "bg-gold/10" },
];

export default function FinanceiroDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-3xl text-diamond">Dashboard Financeiro</h1>
                    <p className="text-diamond-muted">Visão executiva da saúde financeira e performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond hover:bg-white/10">
                        <Calendar className="w-4 h-4 mr-2" /> Jan 2026
                    </Button>
                    <Button className="bg-gold-gradient text-onyx">
                        <Download className="w-4 h-4 mr-2" /> Relatório Flash
                    </Button>
                </div>
            </div>

            {/* Main KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6 bg-onyx-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet size={48} className="text-gold" />
                    </div>
                    <p className="text-sm text-diamond-muted mb-1">Saldo Total Disponível</p>
                    <h3 className="text-2xl font-serif text-diamond mb-2">{formatCurrency(mockFinancialStats.totalBalance)}</h3>
                    <div className="flex items-center gap-1 text-xs text-status-success">
                        <ArrowUpRight size={14} />
                        <span>+2.4% vs mês anterior</span>
                    </div>
                </Card>

                <Card className="p-6 bg-onyx-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={48} className="text-gold" />
                    </div>
                    <p className="text-sm text-diamond-muted mb-1">Faturação (Mês)</p>
                    <h3 className="text-2xl font-serif text-diamond mb-2">{formatCurrency(mockFinancialStats.monthlyBilling)}</h3>
                    <div className="flex items-center gap-1 text-xs text-status-success">
                        <ArrowUpRight size={14} />
                        <span>Meta 85% atingida</span>
                    </div>
                </Card>

                <Card className="p-6 bg-onyx-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowDownRight size={48} className="text-rose-500" />
                    </div>
                    <p className="text-sm text-diamond-muted mb-1">EBITDA Estimado</p>
                    <h3 className="text-2xl font-serif text-gold mb-2">{formatCurrency(mockFinancialStats.monthlyEbitda)}</h3>
                    <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20 text-[10px]">Margem 37.6%</Badge>
                </Card>

                <Card className="p-6 bg-onyx-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <History size={48} className="text-blue-500" />
                    </div>
                    <p className="text-sm text-diamond-muted mb-1">Cash Runway</p>
                    <h3 className="text-2xl font-serif text-diamond mb-2">{mockFinancialStats.cashRunway} Meses</h3>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-2">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cash Flow Chart */}
                <Card className="lg:col-span-2 p-6 bg-onyx-900 border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-white">Fluxo de Caixa</h3>
                            <p className="text-xs text-diamond-muted">Entradas vs Saídas (Últimos 6 meses)</p>
                        </div>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gold" />
                                <span className="text-diamond-muted">Entradas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500" />
                                <span className="text-diamond-muted">Saídas</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cashFlowData}>
                                <defs>
                                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis 
                                    dataKey="month" 
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
                                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="inflow" 
                                    stroke="#D4AF37" 
                                    fillOpacity={1} 
                                    fill="url(#colorIn)" 
                                    strokeWidth={2}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="outflow" 
                                    stroke="#ef4444" 
                                    fillOpacity={1} 
                                    fill="url(#colorOut)" 
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Account Balances & Alerts */}
                <div className="space-y-6">
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="font-semibold text-white mb-4">Ações Rápidas</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map((action) => (
                                <Link 
                                    key={action.title} 
                                    href={action.href}
                                    className="p-3 rounded-lg bg-onyx-950 border border-white/5 hover:border-gold/30 transition-all group"
                                >
                                    <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center mb-2`}>
                                        <action.icon size={16} className={action.color} />
                                    </div>
                                    <span className="text-xs font-medium text-diamond group-hover:text-gold transition-colors">{action.title}</span>
                                </Link>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="font-semibold text-white mb-4 flex items-center justify-between">
                            Alertas Críticos
                            {alerts.length > 0 && <Badge className="bg-rose-500/20 text-rose-500 border-rose-500/30">{alerts.length}</Badge>}
                        </h3>
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <Link 
                                    key={alert.id} 
                                    href={alert.link}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-onyx-950 border border-white/5 hover:bg-onyx-800 transition-all"
                                >
                                    <AlertCircle size={18} className={alert.type === 'error' ? 'text-rose-500' : alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'} />
                                    <div>
                                        <p className="text-sm font-medium text-diamond">{alert.title}</p>
                                        <p className="text-xs text-diamond-muted line-clamp-1">{alert.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Aging Receivables */}
                <Card className="p-6 bg-onyx-900 border-white/5">
                    <h3 className="font-semibold text-white mb-1">Aging de Recebíveis</h3>
                    <p className="text-xs text-diamond-muted mb-6">Contas a receber por vencimento</p>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={agingData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    stroke="#ffffff40" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    width={70}
                                />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {agingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Aging Payables (Mocked as similar for now) */}
                <Card className="p-6 bg-onyx-900 border-white/5">
                    <h3 className="font-semibold text-white mb-1">Aging de Pagáveis</h3>
                    <p className="text-xs text-diamond-muted mb-6">Contas a pagar por vencimento</p>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={agingData.map(d => ({ ...d, value: d.value * 0.4 }))} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    stroke="#ffffff40" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    width={70}
                                />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {agingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Aging Receivables */}
                <Card className="p-6 bg-onyx-900 border-white/5">
                    <h3 className="font-semibold text-white mb-4">Receitas vs Despesas</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-diamond-muted">Faturação Bruta</span>
                                <span className="text-diamond font-medium">{formatCurrency(8500000)}</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gold rounded-full" style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-diamond-muted">CPV / Operacional</span>
                                <span className="text-diamond font-medium">{formatCurrency(5300000)}</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 rounded-full" style={{ width: '62%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-diamond-muted">Margem Bruta (EBITDA)</span>
                                <span className="text-gold font-medium">{formatCurrency(3200000)}</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <Link 
                            href="/core/financeiro/dre"
                            className={cn(buttonVariants({ variant: "ghost" }), "w-full text-gold hover:text-gold hover:bg-gold/5 justify-between px-2")}
                        >
                            Ver DRE Completo <ChevronRight size={14} />
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
