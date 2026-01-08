"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/utils";
import { mockLatestInvoices } from "@/types/financeiro";
import {
    CreditCard,
    Download,
    FileDown,
    History,
    Plus,
    Printer,
    Send
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function DetalheFaturaPage() {
    const { id } = useParams();
    const router = useRouter();
    const invoice = mockLatestInvoices.find(i => i.id === id) || mockLatestInvoices[0];

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            <PageHeader 
                title={invoice.number} 
                description={`Fatura emitida para ${invoice.clientName}`}
                backUrl="/core/financeiro/receber"
            >
                <div className="flex gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                                <Download className="w-4 h-4 mr-2" /> PDF / Exportar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-onyx-900 border-white/5 text-diamond">
                            <DropdownMenuItem><FileDown size={14} className="mr-2" /> Descarregar PDF</DropdownMenuItem>
                            <DropdownMenuItem><Printer size={14} className="mr-2" /> Imprimir</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5">
                        <Send className="w-4 h-4 mr-2" /> Enviar por Email
                    </Button>
                    {invoice.status !== 'paid' && (
                        <Button className="bg-gold-gradient text-onyx">
                            <CreditCard className="w-4 h-4 mr-2" /> Registar Recebimento
                        </Button>
                    )}
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Invoice Content */}
                    <Card className="bg-onyx-900 border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-start">
                            <div className="space-y-4">
                                <div className="w-16 h-16 rounded bg-gold/10 flex items-center justify-center text-gold mb-6 font-serif text-2xl">V</div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-serif text-white">Vesatio Solutions, Lda</h2>
                                    <p className="text-sm text-diamond-muted">Av. Amílcar Cabral, Praia, Cabo Verde</p>
                                    <p className="text-sm text-diamond-muted">NIF: 123456789</p>
                                </div>
                            </div>
                            <div className="text-right space-y-2">
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-lg py-1 px-4 italic">PAGA</Badge>
                                <div className="pt-4">
                                    <p className="text-xs text-diamond-muted uppercase font-mono tracking-wider text-right">Fatura Nº</p>
                                    <p className="text-xl font-serif text-gold">{invoice.number}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-xs text-diamond-muted uppercase font-mono tracking-wider">Faturado a:</p>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-white">{invoice.clientName}</h4>
                                    <p className="text-sm text-diamond-muted">Praia, Cabo Verde</p>
                                    <p className="text-sm text-diamond-muted">Projeto: {invoice.projectName}</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-right">
                                <p className="text-xs text-diamond-muted uppercase font-mono tracking-wider">Datas:</p>
                                <div className="space-y-1 text-sm">
                                    <p className="text-diamond-muted">Emissão: <span className="text-white">{invoice.issueDate}</span></p>
                                    <p className="text-diamond-muted">Vencimento: <span className="text-white">{invoice.dueDate}</span></p>
                                    <p className="text-diamond-muted">Paga em: <span className="text-emerald-500">2026-01-08</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/5">
                                    <tr className="text-diamond-muted">
                                        <th className="text-left pb-4 font-medium">Descrição</th>
                                        <th className="text-center pb-4 font-medium">Qtd</th>
                                        <th className="text-right pb-4 font-medium">Preço Unit.</th>
                                        <th className="text-right pb-4 font-medium">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="py-6 text-white font-medium">Execução de Fundações e Estrutura - Bloco A</td>
                                        <td className="text-center text-diamond-muted">1.00</td>
                                        <td className="text-right text-diamond-muted">{formatCurrency(2173913)}</td>
                                        <td className="text-right text-diamond font-medium">{formatCurrency(2173913)}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-6 text-white font-medium">Honorários de Gestão de Obra - Pro-rata Jan/26</td>
                                        <td className="text-center text-diamond-muted">1.00</td>
                                        <td className="text-right text-diamond-muted">{formatCurrency(326087)}</td>
                                        <td className="text-right text-diamond font-medium">{formatCurrency(326087)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 bg-white/[0.02] border-t border-white/5">
                            <div className="flex justify-end">
                                <div className="w-full max-w-[240px] space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-diamond-muted">Subtotal</span>
                                        <span className="text-diamond">{formatCurrency(2173913 + 326087)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-diamond-muted">IVA (15%)</span>
                                        <span className="text-diamond">{formatCurrency((2173913 + 326087) * 0.15)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                        <span className="font-semibold text-white">Total Final</span>
                                        <span className="text-xl font-serif text-gold">{formatCurrency(invoice.amount)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Status Box */}
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                             Estado da Fatura
                        </h3>
                        <div className="space-y-6">
                            <div className="relative pl-6 border-l border-white/10 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <p className="text-sm font-medium text-white">Pagamento Recebido</p>
                                    <p className="text-xs text-diamond-muted">Hoje às 14:32 por AURA AI (Reconciliação)</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <p className="text-sm font-medium text-white">Fatura Emitida</p>
                                    <p className="text-xs text-diamond-muted">06 Jan 2026 às 09:15</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <p className="text-sm font-medium text-white">Lançada no Sistema</p>
                                    <p className="text-xs text-diamond-muted">06 Jan 2026 às 09:12 por Marina S.</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* History / Messages */}
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <History size={18} className="text-gold" /> Notas Internas
                        </h3>
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-onyx-950 border border-white/5">
                                <p className="text-xs text-diamond-muted mb-1 font-medium">Marina S. • 06 Jan</p>
                                <p className="text-sm text-diamond italic">"Cliente solicitou adiantamento para fundações."</p>
                            </div>
                            <Button variant="ghost" className="w-full text-xs text-diamond-muted hover:text-gold border border-dashed border-white/5">
                                <Plus size={12} className="mr-2" /> Adicionar Nota
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5 overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full"></div>
                        <h3 className="font-semibold text-diamond mb-4">Régua de Cobrança</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-emerald-500">Lembrete Vencimento</span>
                                <span className="text-diamond-muted italic">Enviado em 05 Jan</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-diamond-muted">Aviso 1 (Atraso)</span>
                                <span className="text-white/20">Programado 07 Fev</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
