"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { AlertSeverity } from "@/types/bi";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  MoreVertical,
  Settings,
  ShieldAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
type ActiveAlert = {
  id: string;
  alert_name: string;
  severity: AlertSeverity;
  triggered_at: string;
  message: string;
  status: "new" | "acknowledged";
};

const mockAlerts: ActiveAlert[] = [
  {
    id: "1",
    alert_name: "Margem Baixa - Projeto X",
    severity: "critical",
    triggered_at: "2024-01-09T10:30:00Z",
    message: "A margem do projeto caiu abaixo de 15%. Valor atual: 12.5%",
    status: "new",
  },
  {
    id: "2",
    alert_name: "Stock Mínimo Atingido",
    severity: "high",
    triggered_at: "2024-01-09T09:15:00Z",
    message: "Item 'MDF Carvalho' atingiu o nível de reposição (10 un).",
    status: "new",
  },
  {
    id: "3",
    alert_name: "Desvio de Prazo",
    severity: "medium",
    triggered_at: "2024-01-08T18:00:00Z",
    message: "Ordem de Produção PO-299 está 2 dias atrasada.",
    status: "acknowledged",
  },
];

export default function AlertsPage() {
  const router = useRouter();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500 border-red-500/30 bg-red-500/10";
      case "high":
        return "text-orange-500 border-orange-500/30 bg-orange-500/10";
      case "medium":
        return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10";
      default:
        return "text-blue-500 border-blue-500/30 bg-blue-500/10";
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical") return ShieldAlert;
    if (severity === "high") return AlertTriangle;
    return Bell;
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Centro de Alertas"
        description="Monitorização de incidentes e notificações de negócio."
      >
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-diamond-muted hover:text-white"
            onClick={() => router.push("/core/bi/alertas/config")}
          >
            <Settings size={16} />
            Configurar Regras
          </Button>
          <Button size="sm" className="btn-primary gap-2">
            <CheckCircle size={16} /> Marcar Todos como Lidos
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="space-y-4 md:col-span-8">
          <h3 className="mb-2 pl-1 text-sm font-semibold uppercase tracking-wider text-white">
            Alertas Ativos
          </h3>

          {mockAlerts.map((alert) => {
            const Icon = getSeverityIcon(alert.severity);
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-4 rounded-lg border border-white/5 bg-onyx-900 p-4 transition-all hover:border-white/10 ${alert.status === "new" ? "border-l-4 border-l-gold" : ""}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getSeverityColor(alert.severity)}`}
                >
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4
                      className={`font-medium ${alert.status === "new" ? "text-white" : "text-diamond-muted"}`}
                    >
                      {alert.alert_name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`border px-2 text-[10px] uppercase ${getSeverityColor(alert.severity)} bg-transparent`}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-diamond-muted">{alert.message}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-diamond-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(alert.triggered_at).toLocaleString()}
                    </span>
                    {alert.status === "new" && (
                      <Button variant="ghost" className="h-auto p-0 text-gold hover:text-white">
                        Marcar como visto
                      </Button>
                    )}
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted">
                  <MoreVertical size={14} />
                </Button>
              </div>
            );
          })}
        </div>

        <div className="space-y-6 md:col-span-4">
          <Card className="border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Resumo de Saúde
            </h3>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded border border-red-500/20 bg-red-500/10 p-3 text-center">
                <span className="block text-2xl font-bold text-red-500">1</span>
                <span className="text-xs uppercase text-diamond-muted">Críticos</span>
              </div>
              <div className="rounded border border-orange-500/20 bg-orange-500/10 p-3 text-center">
                <span className="block text-2xl font-bold text-orange-500">2</span>
                <span className="text-xs uppercase text-diamond-muted">Altos</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-diamond-muted">Tempo médio de resposta</span>
                <span className="text-white">2.5 horas</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-diamond-muted">Alertas hoje</span>
                <span className="text-white">5</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
