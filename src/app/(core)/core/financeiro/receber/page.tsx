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
import { Invoice, mockLatestInvoices } from "@/types/financeiro";
import { ColumnDef } from "@tanstack/react-table";
import {
    AlertCircle,
    CheckCircle,
    Download,
    Eye,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContasReceberPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const columns: ColumnDef<Invoice>[] = [
        {
            accessorKey: "number",
            header: "Nº Fatura",
            cell: ({ row }) => <span className="font-mono text-diamond">{row.original.number}</span>,
        },
        {
            accessorKey: "clientName",
            header: "Cliente",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{row.original.clientName}</span>
                    <span className="text-[10px] text-diamond-muted">{row.original.projectName || "S/ Projeto"}</span>
                </div>
            ),
        },
        {
            accessorKey: "issueDate",
            header: "Emissão",
            cell: ({ row }) => <span className="text-xs text-diamond-muted">{row.original.issueDate}</span>,
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
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-diamond">{formatCurrency(row.original.amount)}</span>
                    {row.original.paidAmount > 0 && row.original.paidAmount < row.original.amount && (
                        <span className="text-[10px] text-emerald-500">Pago: {formatCurrency(row.original.paidAmount)}</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const config = {
                    paid: { label: "Paga", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
                    pending: { label: "Pendente", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                    overdue: { label: "Vencida", className: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
                    partial: { label: "Parcial", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                    draft: { label: "Rascunho", className: "bg-diamond-muted/10 text-diamond-muted border-diamond-muted/20" },
                    cancelled: { label: "Cancelada", className: "bg-white/5 text-white/40 border-white/10" },
                };
                const { label, className } = config[status] || config.pending;
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
                            <Link href={`/core/financeiro/receber/${row.original.id}`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" /> Visualizar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> Ver PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        {row.original.status !== 'paid' && (
                            <DropdownMenuItem className="text-emerald-500">
                                <CheckCircle className="mr-2 h-4 w-4" /> Registar Recebimento
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-rose-500">
                            <AlertCircle className="mr-2 h-4 w-4" /> Cancelar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader 
                title="Contas a Receber" 
                description="Gestão de faturas e fluxos de entrada."
                backUrl="/core/financeiro"
            >
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
                        <Download className="w-4 h-4 mr-2" /> Exportar
                    </Button>
                    <Link 
                        href="/core/financeiro/receber/nova"
                        className={cn(buttonVariants({ variant: "default" }), "bg-gold-gradient text-onyx")}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Nova Fatura
                    </Link>
                </div>
            </PageHeader>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-onyx-900 border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-diamond-muted">Total Pendente</p>
                        <TrendingUp size={14} className="text-blue-500" />
                    </div>
                    <p className="text-xl font-serif text-diamond">{formatCurrency(7300000)}</p>
                    <p className="text-[10px] text-diamond-muted mt-1">12 faturas ativas</p>
                </Card>
                <Card className="p-4 bg-onyx-900 border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-diamond-muted">Total Vencido</p>
                        <AlertCircle size={14} className="text-rose-500" />
                    </div>
                    <p className="text-xl font-serif text-rose-500">{formatCurrency(1200000)}</p>
                    <p className="text-[10px] text-rose-500/70 mt-1">5 faturas em atraso</p>
                </Card>
                <Card className="p-4 bg-onyx-900 border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-diamond-muted">Recebido (Mês)</p>
                        <CheckCircle size={14} className="text-emerald-500" />
                    </div>
                    <p className="text-xl font-serif text-emerald-500">{formatCurrency(4800000)}</p>
                    <p className="text-[10px] text-emerald-500/70 mt-1">+15% vs mês anterior</p>
                </Card>
            </div>

            {/* Filters & Table */}
            <Card className="p-6 bg-onyx-900 border-white/5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                        <Input 
                            placeholder="Procurar fatura ou cliente..." 
                            className="pl-10 bg-onyx-950 border-white/5 text-diamond"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-white/5 bg-onyx-950 text-diamond">
                            <Filter className="w-4 h-4 mr-2 text-gold" /> Filtros
                        </Button>
                        <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20 py-1 px-3">
                            Pendente (12)
                        </Badge>
                    </div>
                </div>

                <div className="rounded-lg border border-white/5 overflow-hidden">
                    <DataGrid 
                        columns={columns} 
                        data={mockLatestInvoices} 
                    />
                </div>
            </Card>
        </div>
    );
}
