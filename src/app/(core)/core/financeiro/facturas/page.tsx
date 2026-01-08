"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Download,
    Eye,
    Send,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

// Mock invoices
const mockInvoices = [
    {
        id: "FAT-2026-001",
        client: "Carlos Mendes",
        project: "Villa Sal Rei",
        amount: 2500000,
        dueDate: "2026-01-15",
        status: "paid",
        paidAt: "2026-01-10",
    },
    {
        id: "FAT-2026-002",
        client: "Maria Silva",
        project: "Penthouse Mindelo",
        amount: 1800000,
        dueDate: "2026-01-20",
        status: "pending",
    },
    {
        id: "FAT-2026-003",
        client: "Grupo Hoteleiro CV",
        project: "Hotel Praia Mar",
        amount: 5000000,
        dueDate: "2026-01-10",
        status: "overdue",
    },
    {
        id: "FAT-2025-089",
        client: "João Tavares",
        project: "Residência Tarrafal",
        amount: 750000,
        dueDate: "2025-12-30",
        status: "paid",
        paidAt: "2025-12-28",
    },
];

const statusConfig = {
    pending: { label: "Pendente", color: "bg-status-warning/20 text-status-warning", icon: Clock },
    paid: { label: "Pago", color: "bg-status-success/20 text-status-success", icon: CheckCircle },
    overdue: { label: "Vencida", color: "bg-status-error/20 text-status-error", icon: XCircle },
    cancelled: { label: "Cancelada", color: "bg-onyx-200 text-diamond-muted", icon: XCircle },
};

export default function InvoicesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const filteredInvoices = mockInvoices.filter((invoice) => {
        const matchesSearch =
            invoice.id.toLowerCase().includes(search.toLowerCase()) ||
            invoice.client.toLowerCase().includes(search.toLowerCase()) ||
            invoice.project.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = !statusFilter || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const totalPending = mockInvoices
        .filter((i) => i.status === "pending")
        .reduce((sum, i) => sum + i.amount, 0);
    const totalOverdue = mockInvoices
        .filter((i) => i.status === "overdue")
        .reduce((sum, i) => sum + i.amount, 0);
    const totalPaid = mockInvoices
        .filter((i) => i.status === "paid")
        .reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-diamond">Facturas</h1>
                    <p className="text-diamond-muted">Gestão de facturação</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Factura
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => setStatusFilter(statusFilter === "pending" ? null : "pending")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        statusFilter === "pending" && "ring-2 ring-status-warning"
                    )}
                >
                    <p className="text-sm text-diamond-muted mb-1">Pendente</p>
                    <p className="text-2xl font-serif text-status-warning">{formatCurrency(totalPending)}</p>
                </button>
                <button
                    onClick={() => setStatusFilter(statusFilter === "overdue" ? null : "overdue")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        statusFilter === "overdue" && "ring-2 ring-status-error"
                    )}
                >
                    <p className="text-sm text-diamond-muted mb-1">Vencido</p>
                    <p className="text-2xl font-serif text-status-error">{formatCurrency(totalOverdue)}</p>
                </button>
                <button
                    onClick={() => setStatusFilter(statusFilter === "paid" ? null : "paid")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        statusFilter === "paid" && "ring-2 ring-status-success"
                    )}
                >
                    <p className="text-sm text-diamond-muted mb-1">Recebido (mês)</p>
                    <p className="text-2xl font-serif text-status-success">{formatCurrency(totalPaid)}</p>
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por número, cliente ou projecto..."
                    className="input-field pl-10"
                />
            </div>

            {/* Invoices Table */}
            <div className="glass-panel overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Factura</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Cliente</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Projecto</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Valor</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Vencimento</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Estado</th>
                                <th className="w-24 p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice, index) => {
                                const status = statusConfig[invoice.status as keyof typeof statusConfig];
                                const StatusIcon = status.icon;

                                return (
                                    <motion.tr
                                        key={invoice.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={cn(
                                            "border-b border-white/5 hover:bg-onyx-100 transition-colors",
                                            invoice.status === "overdue" && "bg-status-error/5"
                                        )}
                                    >
                                        <td className="p-4">
                                            <span className="font-mono text-sm text-gold">{invoice.id}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-diamond">{invoice.client}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-diamond-muted">{invoice.project}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-medium text-diamond">{formatCurrency(invoice.amount)}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-diamond-muted">{formatDate(invoice.dueDate)}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={cn("badge", status.color)}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1 justify-end">
                                                <button className="p-2 hover:bg-onyx-200 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4 text-diamond-muted" />
                                                </button>
                                                <button className="p-2 hover:bg-onyx-200 rounded-lg transition-colors">
                                                    <Download className="w-4 h-4 text-diamond-muted" />
                                                </button>
                                                {invoice.status === "pending" && (
                                                    <button className="p-2 hover:bg-onyx-200 rounded-lg transition-colors">
                                                        <Send className="w-4 h-4 text-gold" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
