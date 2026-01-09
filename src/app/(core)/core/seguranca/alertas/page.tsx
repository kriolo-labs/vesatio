"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SecurityAlert } from "@/types/security";
import { AlertOctagon, CheckCircle, Eye, ShieldAlert, UserX } from "lucide-react";
import { useState } from "react";

// Mock Data
const mockAlerts: SecurityAlert[] = [
  {
    id: "1",
    timestamp: "2024-01-09T11:45:00Z",
    alert_type: "Tentativa de Login Invulgar",
    description: "Múltiplas tentativas de login falhadas (5x) do IP 185.20.1.10 (Rússia).",
    severity: "critical",
    status: "active",
    affected_user_id: "admin",
  },
  {
    id: "2",
    timestamp: "2024-01-09T10:15:00Z",
    alert_type: "Acesso Fora de Horário",
    description: "Utilizador 'operador_corte' acedeu ao módulo Financeiro às 23:45.",
    severity: "high",
    status: "investigating",
    affected_user_id: "operador_corte",
  },
  {
    id: "3",
    timestamp: "2024-01-08T15:30:00Z",
    alert_type: "Exportação em Massa",
    description: "Exportação de lista completa de clientes (5000 registos).",
    severity: "medium",
    status: "resolved",
    affected_user_id: "gerente_vendas",
    resolved_by: "admin_security",
    resolved_at: "2024-01-08T16:00:00Z",
    resolution_notes: "Ação autorizada para campanha de marketing.",
  },
];

export default function SecurityAlertsPage() {
  const [filterStatus, setFilterStatus] = useState("all");

  const getSeverityStyles = (severity: string) => {
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

  return (
    <CoreLayout>
      <PageHeader
        title="Alertas de Segurança"
        description="Gestão de incidentes e ameaças detetadas pelo sistema."
      >
        <div></div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6">
        <div className="mb-2 flex gap-4">
          <Card className="flex flex-1 items-center justify-between border-red-500/20 bg-red-500/10 p-4">
            <div>
              <span className="text-sm font-bold uppercase text-red-200">Ameaças Ativas</span>
              <div className="font-serif text-3xl text-red-500">1</div>
            </div>
            <ShieldAlert size={32} className="text-red-500" />
          </Card>
          <Card className="flex flex-1 items-center justify-between border-orange-500/20 bg-orange-500/10 p-4">
            <div>
              <span className="text-sm font-bold uppercase text-orange-200">Em Investigação</span>
              <div className="font-serif text-3xl text-orange-500">1</div>
            </div>
            <Eye size={32} className="text-orange-500" />
          </Card>
          <Card className="flex flex-1 items-center justify-between border-green-500/20 bg-green-500/10 p-4">
            <div>
              <span className="text-sm font-bold uppercase text-green-200">Resolvidos (Hoje)</span>
              <div className="font-serif text-3xl text-green-500">0</div>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Incidentes Recentes</h3>

          {mockAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`flex flex-col gap-6 border bg-onyx-900 p-6 transition-all md:flex-row ${alert.severity === "critical" ? "border-red-500/30" : "border-white/5"}`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded ${getSeverityStyles(alert.severity)}`}
              >
                <AlertOctagon size={24} />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-medium text-white">{alert.alert_type}</h4>
                    <Badge
                      variant="outline"
                      className={`border bg-transparent text-[10px] uppercase ${getSeverityStyles(alert.severity)}`}
                    >
                      {alert.severity}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      {alert.status}
                    </Badge>
                  </div>
                  <span className="font-mono text-sm text-diamond-muted">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>

                <p className="mt-2 text-diamond-muted">{alert.description}</p>

                {alert.affected_user_id && (
                  <div className="mt-3 flex w-fit items-center gap-2 rounded bg-white/5 px-3 py-1 text-sm text-diamond-muted">
                    <UserX size={14} />
                    Utilizador afetado: <span className="text-white">{alert.affected_user_id}</span>
                  </div>
                )}

                {alert.resolution_notes && (
                  <div className="mt-3 rounded border border-green-500/20 bg-green-500/10 p-3 text-sm">
                    <span className="mr-2 font-bold text-green-500">Resolução:</span>
                    <span className="text-green-100 opacity-80">{alert.resolution_notes}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2 border-l border-white/5 pl-6">
                {alert.status === "active" && (
                  <>
                    <Button size="sm" className="btn-primary w-full md:w-auto">
                      Investigar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 md:w-auto"
                    >
                      Bloquear User
                    </Button>
                  </>
                )}
                {alert.status === "investigating" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-green-500/20 text-green-500 hover:bg-green-500/10 hover:text-green-400 md:w-auto"
                  >
                    Resolver
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CoreLayout>
  );
}
