"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Search,
    Plus,
    Calendar,
    User,
    Package,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

// Mock movements data
const mockMovements = [
    {
        id: "1",
        type: "entry",
        product: "Mármore Calacatta",
        sku: "MAR-CAL-001",
        quantity: 25,
        unit: "m²",
        from: "Fornecedor Itália",
        to: "Armazém Praia",
        user: "João Silva",
        date: "2026-01-07T10:30:00",
        note: "Reposição de stock",
    },
    {
        id: "2",
        type: "exit",
        product: "Madeira Ipê",
        sku: "MAD-IPE-001",
        quantity: 15,
        unit: "m",
        from: "Armazém Praia",
        to: "Projecto Villa Sal Rei",
        user: "Maria Costa",
        date: "2026-01-06T14:00:00",
        note: "Aplicação em deck exterior",
    },
    {
        id: "3",
        type: "transfer",
        product: "Cimento Portland",
        sku: "CIM-POR-001",
        quantity: 100,
        unit: "kg",
        from: "Armazém Praia",
        to: "Armazém Mindelo",
        user: "Pedro Santos",
        date: "2026-01-05T09:00:00",
        note: "Transferência inter-ilhas",
    },
    {
        id: "4",
        type: "entry",
        product: "Tinta Premium Venetian",
        sku: "TIN-VEN-001",
        quantity: 50,
        unit: "L",
        from: "Fornecedor Portugal",
        to: "Armazém Mindelo",
        user: "João Silva",
        date: "2026-01-04T16:30:00",
        note: "Nova encomenda",
    },
    {
        id: "5",
        type: "exit",
        product: "Azulejo Português",
        sku: "AZU-POR-001",
        quantity: 30,
        unit: "m²",
        from: "Armazém Praia",
        to: "Projecto Penthouse Mindelo",
        user: "Ana Fonseca",
        date: "2026-01-03T11:00:00",
        note: "Casa de banho principal",
    },
];

const typeConfig = {
    entry: { label: "Entrada", color: "text-status-success", bgColor: "bg-status-success/20", icon: ArrowDownRight },
    exit: { label: "Saída", color: "text-status-error", bgColor: "bg-status-error/20", icon: ArrowUpRight },
    transfer: { label: "Transferência", color: "text-gold", bgColor: "bg-gold/20", icon: RefreshCw },
};

export default function MovementsPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    const [showNewModal, setShowNewModal] = useState(false);

    const filteredMovements = mockMovements.filter((movement) => {
        const matchesSearch =
            movement.product.toLowerCase().includes(search.toLowerCase()) ||
            movement.sku.toLowerCase().includes(search.toLowerCase());
        const matchesType = !typeFilter || movement.type === typeFilter;
        return matchesSearch && matchesType;
    });

    // Stats
    const entryCount = mockMovements.filter((m) => m.type === "entry").length;
    const exitCount = mockMovements.filter((m) => m.type === "exit").length;
    const transferCount = mockMovements.filter((m) => m.type === "transfer").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/core/inventario"
                        className="p-2 hover:bg-onyx-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-diamond-muted" />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl text-diamond">Movimentos</h1>
                        <p className="text-diamond-muted">Histórico de entradas, saídas e transferências</p>
                    </div>
                </div>
                <Button onClick={() => setShowNewModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Movimento
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <button
                    onClick={() => setTypeFilter(typeFilter === "entry" ? null : "entry")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        typeFilter === "entry" && "ring-2 ring-status-success"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-status-success/20 rounded-lg">
                            <ArrowDownRight className="w-5 h-5 text-status-success" />
                        </div>
                        <div>
                            <p className="text-2xl font-serif text-diamond">{entryCount}</p>
                            <p className="text-sm text-diamond-muted">Entradas</p>
                        </div>
                    </div>
                </button>
                <button
                    onClick={() => setTypeFilter(typeFilter === "exit" ? null : "exit")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        typeFilter === "exit" && "ring-2 ring-status-error"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-status-error/20 rounded-lg">
                            <ArrowUpRight className="w-5 h-5 text-status-error" />
                        </div>
                        <div>
                            <p className="text-2xl font-serif text-diamond">{exitCount}</p>
                            <p className="text-sm text-diamond-muted">Saídas</p>
                        </div>
                    </div>
                </button>
                <button
                    onClick={() => setTypeFilter(typeFilter === "transfer" ? null : "transfer")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        typeFilter === "transfer" && "ring-2 ring-gold"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold/20 rounded-lg">
                            <RefreshCw className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <p className="text-2xl font-serif text-diamond">{transferCount}</p>
                            <p className="text-sm text-diamond-muted">Transferências</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por produto ou SKU..."
                    className="input-field pl-10"
                />
            </div>

            {/* Movements List */}
            <div className="space-y-4">
                {filteredMovements.map((movement, index) => {
                    const config = typeConfig[movement.type as keyof typeof typeConfig];
                    const Icon = config.icon;

                    return (
                        <motion.div
                            key={movement.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-panel p-4"
                        >
                            <div className="flex items-start gap-4">
                                {/* Type Icon */}
                                <div className={cn("p-3 rounded-lg shrink-0", config.bgColor)}>
                                    <Icon className={cn("w-5 h-5", config.color)} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div>
                                            <h4 className="font-medium text-diamond">{movement.product}</h4>
                                            <p className="text-xs text-diamond-muted font-mono">{movement.sku}</p>
                                        </div>
                                        <span className={cn("text-lg font-serif", config.color)}>
                                            {movement.type === "entry" ? "+" : movement.type === "exit" ? "-" : ""}
                                            {movement.quantity} {movement.unit}
                                        </span>
                                    </div>

                                    {/* Flow */}
                                    <div className="flex items-center gap-2 text-sm text-diamond-muted mb-2">
                                        <MapPin className="w-3 h-3" />
                                        <span>{movement.from}</span>
                                        <span>→</span>
                                        <span>{movement.to}</span>
                                    </div>

                                    {/* Note */}
                                    {movement.note && (
                                        <p className="text-sm text-diamond-muted italic">"{movement.note}"</p>
                                    )}

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 mt-3 text-xs text-diamond-muted">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {movement.user}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(movement.date)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
