"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { Expense } from "@/types/financeiro";
import { ColumnDef } from "@tanstack/react-table";
import {
    AlertCircle,
    CheckCircle,
    CreditCard,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Plus,
    Search
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockExpenses: Expense[] = [
    {
        id: "exp-001",
        number: "FAT-FORN-2451",
        supplierName: "Materiais Leste, Lda",
        issueDate: "2026-01-02",
        dueDate: "2026-01-15",
        amount: 850000,
        status: "pending",
        category: "Materiais de Construção",
        description: "Pedra Britada e Areia lavada"
    },
    {
        id: "exp-002",
        number: "DOC-2026-012",
        supplierName: "Energia CV",
        issueDate: "2026-01-01",
        dueDate: "2026-01-10",
        amount: 45000,
        status: "approved",
        category: "Utilidades",
        description: "Consumo Escritório Dez/25"
    },
    {
        id: "exp-003",
        number: "FT-FORN-2460",
        supplierName: "Materiais Leste, Lda",
        issueDate: "2026-01-04",
        dueDate: "2026-01-20",
        amount: 1200000,
        status: "pending",
        category: "Materiais de Construção",
        description: "Cimento e Ferro 12mm"
    },
];

export default function ContasPagarPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const columns: ColumnDef<Expense>[] = [
        {
            accessorKey: "number",
            header: "Nº Documento",
            cell: ({ row }) => <span className="font-mono text-diamond">{row.original.number}</span>,
        },
        {
            accessorKey: "supplierName",
            header: "Fornecedor",
            cell: ({ row }) => (
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white">{row.original.supplierName}</span>
                    <span className="text-[10px] text-diamond-muted">{row.original.category}</span>
                </div>
            ),
        },
        {
            accessorKey: "dueDate",
            header: "Vencimento",
            cell: ({ row }) => {
                const isOverdue = new Date(row.original.dueDate) < new Date() && row.original.status !== 'paid';
                return (
                    <span className={`text-xs ${isOverdue ? 'text-rose-500 font-medium' : 'text-diamond-muted'}`}>
                        {row.original.dueDate}
                    </span>
                );
            },
        },
        {
            accessorKey: "amount",
            header: "Valor",
            cell: ({ row }) => (
                <div className="text-right">
                    <span className="text-sm font-medium text-diamond">{formatCurrency(row.original.amount)}</span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const config = {
                    paid: { label: "Pago", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
                    approved: { label: "Aprovado", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                    pending: { label: "Pendente", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                    cancelled: { label: "Cancelado", className: "bg-white/5 text-white/40 border-white/10" },
                };
                const { label, className } = (config as any)[status] || config.pending;
                return <Badge variant="outline" className={className}>{label}</Badge>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-diamond-muted">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-onyx-900 border-white/5 text-diamond">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Ver Detalhe
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Ver Anexo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        {row.original.status === 'pending' && (
                            <DropdownMenuItem className="text-emerald-500">
                                <CheckCircle className="mr-2 h-4 w-4" /> Aprovar Pagamento
                            </DropdownMenuItem>
                        )}
                        {row.original.status === 'approved' && (
                            <DropdownMenuItem className="text-gold">
                                <CreditCard className="mr-2 h-4 w-4" /> Agendar Pagamento
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }
    ];

    return (
        <div className="space-y-6 text-left">
            <PageHeader 
                title="Contas a Pagar" 
                description="Gestão de despesas e obrigações a fornecedores."
                backUrl="/core/financeiro"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                        <Download className="w-4 h-4 mr-2" /> Remessa Bancária
                    </Button>
                    <Link 
                        href="/core/financeiro/pagar/nova"
                        className={cn(buttonVariants({ variant: "default" }), "bg-gold-gradient text-onyx")}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Lançar Despesa
                    </Link>
                </div>
            </PageHeader>

            {/* AURA Smart Alert for Fragmentation */}
            <Card className="p-4 bg-gold/5 border-gold/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/20 rounded-full animate-pulse">
                        <AlertCircle className="text-gold w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gold">AURA: Possível Fragmentação Detectada</p>
                        <p className="text-xs text-diamond-muted">Existem 2 faturas do "Materiais Leste" com soma de {formatCurrency(2050000)}, acima do limite de aprovação direta.</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="border-gold/20 text-gold hover:bg-gold/10">Verificar</Button>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-onyx-900 border-white/5 text-left">
                    <p className="text-xs text-diamond-muted mb-1">Total a Pagar</p>
                    <p className="text-xl font-serif text-diamond">{formatCurrency(2100000)}</p>
                </Card>
                <Card className="p-4 bg-onyx-900 border-white/5 text-left">
                    <p className="text-xs text-diamond-muted mb-1">Aprovado</p>
                    <p className="text-xl font-serif text-blue-500">{formatCurrency(45000)}</p>
                </Card>
                <Card className="p-4 bg-onyx-900 border-white/5 text-left">
                    <p className="text-xs text-diamond-muted mb-1">Vencido</p>
                    <p className="text-xl font-serif text-rose-500">{formatCurrency(450000)}</p>
                </Card>
                <Card className="p-4 bg-onyx-900 border-white/5 text-left">
                    <p className="text-xs text-diamond-muted mb-1">Próximos 7 dias</p>
                    <p className="text-xl font-serif text-amber-500">{formatCurrency(1250000)}</p>
                </Card>
            </div>

            {/* Filters & Table */}
            <Card className="p-6 bg-onyx-900 border-white/5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                        <Input 
                            placeholder="Procurar fornecedor ou documento..." 
                            className="pl-10 bg-onyx-950 border-white/5 text-diamond"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-white/5 bg-onyx-950 text-diamond">
                            <Filter className="w-4 h-4 mr-2 text-gold" /> Filtros
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-white/5 overflow-hidden">
                    <DataGrid 
                        columns={columns} 
                        data={mockExpenses} 
                    />
                </div>
            </Card>
        </div>
    );
}
