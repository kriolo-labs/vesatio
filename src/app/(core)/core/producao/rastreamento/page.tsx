"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    Package,
    Truck,
    CheckCircle,
    Clock,
    QrCode,
    ChevronRight,
    Factory,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

// Mock batch tracking data
const mockBatches = [
    {
        id: "LOT-2026-001",
        product: "Mesa de Jantar Nogueira",
        project: "Villa Sal Rei",
        quantity: 1,
        status: "in_production",
        currentPhase: "Montagem Final",
        progress: 85,
        startDate: "2026-01-02",
        estimatedEnd: "2026-01-10",
        timeline: [
            { phase: "Corte de Madeira", date: "2026-01-02", completed: true },
            { phase: "Secagem", date: "2026-01-03", completed: true },
            { phase: "Lixamento", date: "2026-01-05", completed: true },
            { phase: "Acabamento", date: "2026-01-07", completed: true },
            { phase: "Montagem Final", date: "2026-01-08", completed: false },
            { phase: "Controlo Qualidade", date: null, completed: false },
            { phase: "Expedição", date: null, completed: false },
        ],
    },
    {
        id: "LOT-2026-002",
        product: "Armários MDF Lacado",
        project: "Penthouse Mindelo",
        quantity: 3,
        status: "quality_check",
        currentPhase: "Controlo Qualidade",
        progress: 95,
        startDate: "2026-01-03",
        estimatedEnd: "2026-01-12",
        timeline: [
            { phase: "Corte", date: "2026-01-03", completed: true },
            { phase: "Prensagem", date: "2026-01-04", completed: true },
            { phase: "Lacagem", date: "2026-01-06", completed: true },
            { phase: "Montagem", date: "2026-01-07", completed: true },
            { phase: "Controlo Qualidade", date: "2026-01-08", completed: false },
            { phase: "Expedição", date: null, completed: false },
        ],
    },
    {
        id: "LOT-2026-003",
        product: "Portas Maciças",
        project: "Villa Sal Rei",
        quantity: 8,
        status: "ready",
        currentPhase: "Pronto para Entrega",
        progress: 100,
        startDate: "2025-12-20",
        estimatedEnd: "2026-01-05",
        timeline: [
            { phase: "Corte", date: "2025-12-20", completed: true },
            { phase: "Tratamento", date: "2025-12-22", completed: true },
            { phase: "Acabamento", date: "2025-12-28", completed: true },
            { phase: "Montagem", date: "2026-01-02", completed: true },
            { phase: "Controlo Qualidade", date: "2026-01-04", completed: true },
            { phase: "Expedição", date: "2026-01-05", completed: true },
        ],
    },
];

const statusConfig = {
    in_production: { label: "Em Produção", color: "bg-gold/20 text-gold", icon: Factory },
    quality_check: { label: "Controlo Qualidade", color: "bg-status-info/20 text-status-info", icon: CheckCircle },
    ready: { label: "Pronto", color: "bg-status-success/20 text-status-success", icon: Package },
    shipped: { label: "Expedido", color: "bg-diamond-muted/20 text-diamond-muted", icon: Truck },
};

export default function RastreamentoPage() {
    const [search, setSearch] = useState("");
    const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

    const filtered = mockBatches.filter((batch) => {
        const matchesSearch =
            batch.id.toLowerCase().includes(search.toLowerCase()) ||
            batch.product.toLowerCase().includes(search.toLowerCase()) ||
            batch.project.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    const activeBatch = mockBatches.find((b) => b.id === selectedBatch);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-diamond">Rastreamento de Produção</h1>
                    <p className="text-diamond-muted">Acompanhamento de lotes e fases</p>
                </div>
                <Button variant="secondary">
                    <QrCode className="w-4 h-4 mr-2" />
                    Escanear Lote
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por lote, produto ou projecto..."
                    className="input-field pl-10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Batches List */}
                <div className="lg:col-span-1 space-y-4">
                    {filtered.map((batch, index) => {
                        const status = statusConfig[batch.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;

                        return (
                            <motion.button
                                key={batch.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedBatch(batch.id)}
                                className={cn(
                                    "w-full glass-panel p-4 text-left transition-all",
                                    selectedBatch === batch.id && "ring-2 ring-gold"
                                )}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-xs font-mono text-gold">{batch.id}</span>
                                    <span className={cn("badge text-xs", status.color)}>
                                        <StatusIcon className="w-3 h-3 mr-1" />
                                        {status.label}
                                    </span>
                                </div>
                                <h3 className="font-medium text-diamond">{batch.product}</h3>
                                <p className="text-sm text-diamond-muted">{batch.project}</p>

                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-diamond-muted">{batch.currentPhase}</span>
                                        <span className="text-diamond">{batch.progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-onyx-200 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full transition-all",
                                                batch.progress === 100 ? "bg-status-success" : "bg-gold-gradient"
                                            )}
                                            style={{ width: `${batch.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Timeline Detail */}
                <div className="lg:col-span-2">
                    {activeBatch ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-6"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <span className="text-sm font-mono text-gold">{activeBatch.id}</span>
                                    <h2 className="font-serif text-xl text-diamond mt-1">{activeBatch.product}</h2>
                                    <p className="text-sm text-diamond-muted">{activeBatch.project}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-diamond-muted">Quantidade</p>
                                    <p className="text-lg font-serif text-diamond">{activeBatch.quantity}x</p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-4">
                                {activeBatch.timeline.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        {/* Icon */}
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                                    step.completed
                                                        ? "bg-status-success"
                                                        : index === activeBatch.timeline.findIndex((s) => !s.completed)
                                                            ? "bg-gold"
                                                            : "bg-onyx-200"
                                                )}
                                            >
                                                {step.completed ? (
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                ) : (
                                                    <Clock className="w-4 h-4 text-onyx" />
                                                )}
                                            </div>
                                            {index < activeBatch.timeline.length - 1 && (
                                                <div
                                                    className={cn(
                                                        "w-0.5 h-12 mt-2",
                                                        step.completed ? "bg-status-success" : "bg-onyx-200"
                                                    )}
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className="flex items-center justify-between">
                                                <h4
                                                    className={cn(
                                                        "font-medium",
                                                        step.completed ? "text-diamond" : "text-diamond-muted"
                                                    )}
                                                >
                                                    {step.phase}
                                                </h4>
                                                {step.date && (
                                                    <span className="text-xs text-diamond-muted">
                                                        {formatDate(step.date)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="glass-panel p-12 text-center">
                            <MapPin className="w-12 h-12 mx-auto text-diamond-muted mb-4" />
                            <p className="text-diamond-muted">
                                Seleccione um lote para ver o rastreamento
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
