"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowRight, Clock } from "lucide-react";

const alerts = [
  {
    id: 1,
    severity: "critical", // critical, high, medium
    title: "Pagamento Vencido: Fornecedor Madeiras",
    description: "Fatura #INV-2024-001 venceu há 2 dias.",
    action: "Pagar Agora",
    time: "2d",
  },
  {
    id: 2,
    severity: "high",
    title: "Stock Crítico: Puxadores Gold",
    description: "Apenas 5 unidades em stock. Mínimo: 20.",
    action: "Requisitar",
    time: "4h",
  },
  {
    id: 3,
    severity: "medium",
    title: "Aprovação Pendente no RH",
    description: "Férias de João Mendes requerem validação.",
    action: "Rever",
    time: "6h",
  },
];

const severityConfig = {
    critical: { border: "border-l-rose-500", icon: "text-rose-500", bg: "hover:bg-rose-500/5"},
    high: { border: "border-l-amber-500", icon: "text-amber-500", bg: "hover:bg-amber-500/5"},
    medium: { border: "border-l-blue-500", icon: "text-blue-500", bg: "hover:bg-blue-500/5"},
};

export function CriticalAlerts() {
    return (
        <Card className="flex flex-col h-full border-white/5 bg-onyx-900/50">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-diamond flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-status-error" />
                    Alertas Críticos
                </h3>
                <span className="bg-status-error/10 text-status-error text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {alerts.map((alert) => {
                    const style = severityConfig[alert.severity as keyof typeof severityConfig];
                    return (
                        <div 
                            key={alert.id}
                            className={cn(
                                "group p-3 rounded bg-onyx-950/50 border border-white/5 border-l-2 transition-colors cursor-pointer",
                                style.border,
                                style.bg
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-medium text-white group-hover:text-gold transition-colors">{alert.title}</h4>
                                <span className="text-[10px] text-white/30 flex items-center gap-1 shrink-0">
                                    <Clock size={10} /> {alert.time}
                                </span>
                            </div>
                            <p className="text-xs text-diamond-muted mb-2 line-clamp-1">{alert.description}</p>
                            
                            <button className="text-[10px] uppercase font-bold tracking-wider text-diamond-muted hover:text-white flex items-center gap-1 transition-colors">
                                {alert.action} <ArrowRight size={10} />
                            </button>
                        </div>
                    );
                })}
            </div>
            
             <div className="p-3 border-t border-white/5">
                <button className="w-full py-1.5 text-xs text-center text-diamond-muted hover:text-white hover:bg-white/5 rounded transition-colors">
                    Ver todos os alertas
                </button>
            </div>
        </Card>
    );
}
