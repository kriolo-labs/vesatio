"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { mockAccounts } from "@/types/financeiro";
import {
    ArrowDownRight,
    ArrowRightLeft,
    ArrowUpRight,
    ChevronRight,
    Clock,
    Landmark,
    Plus,
    RefreshCcw,
    TrendingUp,
    Wallet
} from "lucide-react";
import Link from "next/link";

const mockRecentMovements = [
    { id: 1, date: "Hoje, 10:20", description: "Transferência Recebida FT-2026-002", amount: 4800000, type: "credit", account: "BCA Main", status: "reconciled" },
    { id: 2, date: "Hoje, 09:15", description: "Pagamento Fornecedor Energia CV", amount: -45000, type: "debit", account: "BCA Main", status: "pending" },
    { id: 3, date: "Ontem, 16:45", description: "Levantamento em Dinheiro (Caixa)", amount: -5000, type: "debit", account: "Caixa Físico", status: "reconciled" },
    { id: 4, date: "06 Jan", description: "Pagamento Salários - Gestão", amount: -1250000, type: "debit", account: "BCA Main", status: "reconciled" },
];

export default function TesourariaPage() {
    return (
        <div className="space-y-6 text-left">
            <PageHeader 
                title="Tesouraria" 
                description="Gestão de saldos bancários, caixa e conciliação."
                backUrl="/core/financeiro"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                        <RefreshCcw className="w-4 h-4 mr-2" /> Sincronizar Bancos
                    </Button>
                    <Link 
                        href="/core/financeiro/tesouraria/novo-movimento"
                        className={cn(buttonVariants({ variant: "default" }), "bg-gold-gradient text-onyx")}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Novo Movimento
                    </Link>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bank Accounts Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockAccounts.map((account) => (
                            <Card key={account.id} className="p-6 bg-onyx-900 border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all">
                                    <Landmark size={64} className="text-gold" />
                                </div>
                                <div className="flex items-start justify-between mb-4">
                                    <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20 uppercase text-[10px] tracking-widest">{account.type}</Badge>
                                    <span className="text-[10px] text-diamond-muted italic">Sincronizado há 2h</span>
                                </div>
                                <h3 className="text-lg font-serif text-white mb-1">{account.bankName}</h3>
                                <p className="text-2xl font-serif text-diamond mb-4">{formatCurrency(account.balance)}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <Link 
                                        href={`/core/financeiro/tesouraria/extrato/${account.id}`}
                                        className={cn(buttonVariants({ variant: "ghost" }), "text-gold h-auto p-0 text-xs hover:bg-transparent")}
                                    >
                                        Ver Extrato
                                    </Link>
                                    <p className="text-[10px] text-diamond-muted">Última Verificação: {account.lastVerifiedBalance}</p>
                                </div>
                            </Card>
                        ))}

                        {/* Physical Cash Card */}
                        <Card className="p-6 bg-onyx-900 border-white/5 border-dashed relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all">
                                <Wallet size={64} className="text-emerald-500" />
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase text-[10px] tracking-widest">Caixa Físico</Badge>
                                <span className="text-[10px] text-diamond-muted">Sede Praia</span>
                            </div>
                            <h3 className="text-lg font-serif text-white mb-1">Pequeno Caixa</h3>
                            <p className="text-2xl font-serif text-emerald-500 mb-4">{formatCurrency(125000)}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <Button variant="ghost" className="text-emerald-500 h-auto p-0 text-xs hover:bg-transparent">Abrir/Fechar Caixa</Button>
                                <p className="text-[10px] text-diamond-muted text-right">Responsável: Marina S.</p>
                            </div>
                        </Card>

                        {/* Add Account Card */}
                        <div className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gold/30 hover:bg-gold/5 transition-all cursor-pointer group h-full">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:bg-gold/20 transition-colors">
                                <Plus size={20} className="text-diamond-muted group-hover:text-gold" />
                            </div>
                            <span className="text-sm font-medium text-diamond-muted group-hover:text-diamond">Ligar Nova Conta</span>
                            <span className="text-[10px] text-diamond-muted/60 mt-1">Sincronização via API ou CSV</span>
                        </div>
                    </div>

                    {/* Recent Movements Table */}
                    <Card className="bg-onyx-900 border-white/5">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-serif text-white">Últimos Movimentos</h3>
                                <p className="text-xs text-diamond-muted">Movimentações consolidadas de todas as contas.</p>
                            </div>
                            <Link 
                                href="/core/financeiro/tesouraria/movimentos" 
                                className={cn(buttonVariants({ variant: "ghost" }), "text-gold hover:text-gold hover:bg-gold/5 text-sm h-8 px-3")}
                            >
                                Ver Tudo <ChevronRight size={14} className="ml-1" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-white/[0.02] text-diamond-muted border-b border-white/5 text-left">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Data</th>
                                        <th className="px-6 py-3 font-medium">Descrição / Origem</th>
                                        <th className="px-6 py-3 font-medium">Conta</th>
                                        <th className="px-6 py-3 font-medium text-right">Valor</th>
                                        <th className="px-6 py-3 font-medium text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {mockRecentMovements.map((move) => (
                                        <tr key={move.id} className="hover:bg-white/[0.01] transition-colors">
                                            <td className="px-6 py-4 text-xs text-diamond-muted whitespace-nowrap">{move.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {move.type === 'credit' ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-rose-500" />}
                                                    <span className="text-white font-medium">{move.description}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-diamond-muted">{move.account}</td>
                                            <td className={`px-6 py-4 text-right font-medium ${move.type === 'credit' ? 'text-emerald-500' : 'text-diamond'}`}>
                                                {formatCurrency(move.amount)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {move.status === 'reconciled' ? (
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] py-0">OK</Badge>
                                                ) : (
                                                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] py-0">PEND</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Alerts & Reconcile Teaser */}
                <div className="space-y-6">
                    <Card className="p-6 bg-gold-gradient text-onyx shadow-gold-glow/20 border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12">
                            <RefreshCcw size={80} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                             Conciliação Inteligente
                        </h3>
                        <p className="text-sm opacity-90 mb-6">AURA encontrou 8 correspondências automáticas para as faturas emitidas esta semana.</p>
                        <Link 
                            href="/core/financeiro/tesouraria/conciliacao"
                            className={cn(buttonVariants({ variant: "default" }), "w-full bg-onyx text-white hover:bg-onyx/90 border-none shadow-xl")}
                        >
                            Confirmar Agora
                        </Link>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-gold" /> Performance de Caixa
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-diamond-muted">Cobertura de Despesas</span>
                                    <span className="text-emerald-500 font-medium">Ótima</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={14} className="text-diamond-muted" />
                                    <span className="text-xs text-diamond-muted">Ciclo Financeiro Médio</span>
                                </div>
                                <p className="text-lg font-serif text-diamond">42 Dias</p>
                                <p className="text-[10px] text-rose-500">+3 dias vs mês anterior</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="font-semibold text-white mb-4">Transferências Rápidas</h3>
                        <div className="space-y-3">
                             <Button variant="outline" className="w-full justify-start border-white/5 bg-onyx-950 text-diamond group">
                                <ArrowRightLeft size={16} className="mr-3 text-gold group-hover:rotate-180 transition-transform duration-500" />
                                <div className="text-left">
                                    <p className="text-xs font-medium">BCA ➔ Caixa</p>
                                    <p className="text-[10px] text-diamond-muted">Reposição de Fundo Maneio</p>
                                </div>
                             </Button>
                             <Button variant="outline" className="w-full justify-start border-white/5 bg-onyx-950 text-diamond group">
                                <ArrowRightLeft size={16} className="mr-3 text-gold group-hover:rotate-180 transition-transform duration-500" />
                                <div className="text-left">
                                    <p className="text-xs font-medium">Caixa ➔ Depósito</p>
                                    <p className="text-[10px] text-diamond-muted">Entrega de Valores</p>
                                </div>
                             </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
