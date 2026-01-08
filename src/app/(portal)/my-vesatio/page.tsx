"use client";

import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Bell,
    CheckCircle,
    ChevronRight,
    Clock,
    Image as ImageIcon,
    Ship,
    Video,
    VideoOff
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock data
const project = {
    code: "VES-2026-001",
    name: "Villa Sal Rei",
    progress: 92,
    currentPhase: "Acabamentos",
    estimatedEnd: "2026-03-15",
    budget: 15000000,
    paid: 12500000,
    liveCamEnabled: true,
    liveCamUrl: "https://example.com/live",
};

const updates = [
    { id: "1", type: "photo", date: "2026-01-07", status: "approved" },
    { id: "2", type: "photo", date: "2026-01-06", status: "pending" },
    { id: "3", type: "photo", date: "2026-01-05", status: "approved" },
    { id: "4", type: "photo", date: "2026-01-04", status: "approved" },
];

export default function MyVesatioPage() {
    const [greeting, setGreeting] = useState("");
    const [isLive, setIsLive] = useState(false);
    const [showLive, setShowLive] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Bom dia");
        else if (hour < 18) setGreeting("Boa tarde");
        else setGreeting("Boa noite");

        // Check if within live hours (10:00-10:20)
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        setIsLive(hours === 10 && minutes < 20 && project.liveCamEnabled);
    }, []);

    return (
        <div className="p-4 space-y-6">
            {/* Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-diamond-muted text-sm">{greeting},</p>
                    <h1 className="font-serif text-2xl text-diamond">Carlos</h1>
                </div>
                <button className="relative p-2 text-diamond-muted hover:text-diamond">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
                </button>
            </div>

            {/* Stories/Updates */}
            {updates.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                    {updates.map((update, index) => (
                        <motion.button
                            key={update.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="shrink-0 w-16 h-16 rounded-full p-0.5 bg-gold-gradient"
                        >
                            <div className="w-full h-full rounded-full bg-onyx-100 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-diamond-muted" />
                            </div>
                        </motion.button>
                    ))}
                    <button className="shrink-0 w-16 h-16 rounded-full border-2 border-dashed border-onyx-200 flex items-center justify-center">
                        <span className="text-sm text-diamond-muted">+</span>
                    </button>
                </div>
            )}

            {/* Main Project Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel-gold p-6"
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="text-xs text-gold font-mono">{project.code}</span>
                        <h2 className="font-serif text-xl text-diamond">{project.name}</h2>
                    </div>

                    {/* Live Cam Button */}
                    <button
                        onClick={() => isLive && setShowLive(true)}
                        disabled={!isLive}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isLive
                                ? "bg-status-error animate-pulse text-white"
                                : "bg-onyx-200 text-diamond-muted"
                            }`}
                    >
                        {isLive ? (
                            <>
                                <Video className="w-4 h-4" />
                                <span className="text-xs font-medium">AO VIVO</span>
                            </>
                        ) : (
                            <>
                                <VideoOff className="w-4 h-4" />
                                <span className="text-xs">10:00</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Progress */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-diamond-muted">Progresso</span>
                        <span className="text-diamond font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-3 bg-onyx-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold-gradient rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-onyx-100 rounded-lg p-4">
                        <p className="text-xs text-diamond-muted mb-1">Fase Atual</p>
                        <p className="text-sm font-medium text-diamond">{project.currentPhase}</p>
                    </div>
                    <div className="bg-onyx-100 rounded-lg p-4">
                        <p className="text-xs text-diamond-muted mb-1">Previsão</p>
                        <p className="text-sm font-medium text-diamond">
                            {new Date(project.estimatedEnd).toLocaleDateString("pt-PT", {
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Financial Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-diamond">Situação Financeira</h3>
                    <Link href="/my-vesatio/financeiro" className="text-xs text-gold flex items-center gap-1">
                        Ver detalhes
                        <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-diamond-muted">Total do Projeto</span>
                        <span className="font-medium text-diamond">{formatCurrency(project.budget)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-diamond-muted">Pago</span>
                        <span className="font-medium text-status-success">{formatCurrency(project.paid)}</span>
                    </div>
                    <div className="h-2 bg-onyx-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold-gradient"
                            style={{ width: `${(project.paid / project.budget) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-diamond-muted">Saldo</span>
                        <span className="font-medium text-gold">
                            {formatCurrency(project.budget - project.paid)}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Import Tracking Visibility (Phase 12.4) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass-panel p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-diamond flex items-center gap-2">
                        <Ship className="w-4 h-4 text-gold" /> Tracking de Importações
                    </h3>
                    <span className="text-[10px] text-diamond-muted uppercase font-mono">1 em trânsito</span>
                </div>
                <div className="bg-onyx-100 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-diamond font-medium">Acabamentos Premium (Itália)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Em Trânsito</span>
                    </div>
                    <div className="relative h-1 bg-onyx-200 rounded-full">
                        <div className="absolute top-0 left-0 h-full bg-gold rounded-full" style={{ width: '65%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-diamond-muted">
                        <span>Saída: 12 Dez</span>
                        <span>Chegada Prevista: 18 Jan</span>
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <Link href="/my-vesatio/projeto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel p-4 flex items-center gap-3"
                    >
                        <div className="p-2 bg-gold/10 rounded-lg">
                            <Clock className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-diamond">Timeline</p>
                            <p className="text-xs text-diamond-muted">Ver fases</p>
                        </div>
                    </motion.div>
                </Link>
                <Link href="/my-vesatio/vault">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel p-4 flex items-center gap-3"
                    >
                        <div className="p-2 bg-gold/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-diamond">Documentos</p>
                            <p className="text-xs text-diamond-muted">12 ficheiros</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* Live Stream Modal */}
            {showLive && (
                <div
                    className="fixed inset-0 z-50 bg-onyx/95 flex items-center justify-center p-4"
                    onClick={() => setShowLive(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-onyx-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                                <Video className="w-12 h-12 text-gold mx-auto mb-4" />
                                <p className="text-diamond">Transmissão ao vivo</p>
                                <p className="text-sm text-diamond-muted">10:00 - 10:20</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
