"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Shield,
    User,
    Calendar,
    Clock,
    Filter,
    Download,
    Eye,
    FileText,
    LogIn,
    LogOut,
    Edit,
    Trash2,
    Plus,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

// Mock audit logs
const mockLogs = [
    {
        id: "1",
        timestamp: "2026-01-07T14:32:15",
        user: "admin@vesatio.cv",
        action: "create",
        entity: "invoice",
        entityId: "FAT-2026-003",
        details: "Criou fatura para Grupo Hoteleiro CV",
        ip: "192.168.1.100",
        risk: "low",
    },
    {
        id: "2",
        timestamp: "2026-01-07T12:15:30",
        user: "joao.silva@vesatio.cv",
        action: "update",
        entity: "project",
        entityId: "PRJ-2026-001",
        details: "Atualizou progresso do projeto Villa Sal Rei",
        ip: "192.168.1.105",
        risk: "low",
    },
    {
        id: "3",
        timestamp: "2026-01-07T10:45:00",
        user: "admin@vesatio.cv",
        action: "delete",
        entity: "product",
        entityId: "PROD-2025-089",
        details: "Eliminou produto descontinuado",
        ip: "192.168.1.100",
        risk: "high",
    },
    {
        id: "4",
        timestamp: "2026-01-07T09:30:00",
        user: "maria.costa@vesatio.cv",
        action: "login",
        entity: "session",
        entityId: null,
        details: "Login bem sucedido",
        ip: "192.168.1.120",
        risk: "low",
    },
    {
        id: "5",
        timestamp: "2026-01-06T18:00:00",
        user: "unknown",
        action: "login_failed",
        entity: "session",
        entityId: null,
        details: "Tentativa de login falhada - credenciais inválidas",
        ip: "185.234.12.45",
        risk: "high",
    },
];

const actionConfig = {
    create: { label: "Criar", icon: Plus, color: "text-status-success" },
    update: { label: "Atualizar", icon: Edit, color: "text-status-info" },
    delete: { label: "Eliminar", icon: Trash2, color: "text-status-error" },
    login: { label: "Login", icon: LogIn, color: "text-gold" },
    logout: { label: "Logout", icon: LogOut, color: "text-diamond-muted" },
    login_failed: { label: "Login Falhado", icon: AlertTriangle, color: "text-status-error" },
    view: { label: "Visualizar", icon: Eye, color: "text-diamond-muted" },
};

export default function AuditoriaPage() {
    const [search, setSearch] = useState("");
    const [riskFilter, setRiskFilter] = useState<string | null>(null);

    const filtered = mockLogs.filter((log) => {
        const matchesSearch =
            log.user.toLowerCase().includes(search.toLowerCase()) ||
            log.details.toLowerCase().includes(search.toLowerCase()) ||
            (log.entityId && log.entityId.toLowerCase().includes(search.toLowerCase()));
        const matchesRisk = !riskFilter || log.risk === riskFilter;
        return matchesSearch && matchesRisk;
    });

    const highRiskCount = mockLogs.filter((l) => l.risk === "high").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-diamond">Auditoria & Segurança</h1>
                    <p className="text-diamond-muted">Registos de atividade do sistema</p>
                </div>
                <Button variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Logs
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Total (Hoje)</p>
                    <p className="text-2xl font-serif text-diamond">{mockLogs.length}</p>
                </div>
                <button
                    onClick={() => setRiskFilter(riskFilter === "high" ? null : "high")}
                    className={cn(
                        "glass-panel p-4 text-left transition-all",
                        riskFilter === "high" && "ring-2 ring-status-error"
                    )}
                >
                    <p className="text-sm text-diamond-muted mb-1">Alto Risco</p>
                    <p className="text-2xl font-serif text-status-error">{highRiskCount}</p>
                </button>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Logins</p>
                    <p className="text-2xl font-serif text-gold">
                        {mockLogs.filter((l) => l.action === "login").length}
                    </p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Eliminações</p>
                    <p className="text-2xl font-serif text-status-warning">
                        {mockLogs.filter((l) => l.action === "delete").length}
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por utilizador, ação ou referência..."
                    className="input-field pl-10"
                />
            </div>

            {/* Logs Table */}
            <div className="glass-panel overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Timestamp</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Utilizador</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Ação</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">Detalhes</th>
                                <th className="text-left p-4 text-sm font-medium text-diamond-muted">IP</th>
                                <th className="text-center p-4 text-sm font-medium text-diamond-muted">Risco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((log, index) => {
                                const action = actionConfig[log.action as keyof typeof actionConfig] || actionConfig.view;
                                const ActionIcon = action.icon;

                                return (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className={cn(
                                            "border-b border-white/5 hover:bg-onyx-100 transition-colors",
                                            log.risk === "high" && "bg-status-error/5"
                                        )}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-diamond-muted" />
                                                <span className="text-sm text-diamond-muted">
                                                    {new Date(log.timestamp).toLocaleDateString("pt-PT")}
                                                </span>
                                                <Clock className="w-4 h-4 text-diamond-muted ml-2" />
                                                <span className="text-sm text-diamond">
                                                    {new Date(log.timestamp).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-diamond-muted" />
                                                <span className="text-sm text-diamond">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <ActionIcon className={cn("w-4 h-4", action.color)} />
                                                <span className={cn("text-sm", action.color)}>{action.label}</span>
                                                {log.entityId && (
                                                    <span className="text-xs text-gold font-mono">{log.entityId}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-diamond-muted">{log.details}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-mono text-diamond-muted">{log.ip}</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={cn(
                                                "badge",
                                                log.risk === "high"
                                                    ? "bg-status-error/20 text-status-error"
                                                    : "bg-onyx-200 text-diamond-muted"
                                            )}>
                                                {log.risk === "high" ? "Alto" : "Baixo"}
                                            </span>
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
