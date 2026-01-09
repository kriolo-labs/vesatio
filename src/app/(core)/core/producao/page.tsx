"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Box,
  CheckCircle,
  Clock,
  Factory,
  Settings,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductionDashboardPage() {
  const router = useRouter();

  return (
    <CoreLayout>
      <PageHeader title="Produção" description="Visão geral da fábrica e operações.">
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-diamond-muted">
            Relatórios
          </Button>
          <Button
            className="btn-primary gap-2"
            onClick={() => router.push("/core/producao/ordens/novo")}
          >
            Nova Ordem
          </Button>
        </div>
      </PageHeader>

      {/* KPI Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="space-y-4 border-white/5 bg-onyx-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <Factory size={20} />
            </div>
            <Badge
              variant="outline"
              className="border-green-500/30 bg-green-500/10 text-xs text-green-500"
            >
              +12%
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-diamond-muted">Ordens em Produção</p>
            <h3 className="mt-1 text-2xl font-bold text-white">8</h3>
            <p className="mt-1 text-xs text-diamond-muted">3 iniciadas hoje</p>
          </div>
        </Card>

        <Card className="space-y-4 border-white/5 bg-onyx-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <Clock size={20} />
            </div>
            <Badge
              variant="outline"
              className="border-red-500/30 bg-red-500/10 text-xs text-red-500"
            >
              2 Críticos
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-diamond-muted">Atrasos</p>
            <h3 className="mt-1 text-2xl font-bold text-white">2</h3>
            <p className="mt-1 text-xs text-diamond-muted">Ordens fora do prazo</p>
          </div>
        </Card>

        <Card className="space-y-4 border-white/5 bg-onyx-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <CheckCircle size={20} />
            </div>
            <Badge variant="outline" className="border-white/10 text-xs text-diamond-muted">
              98.5%
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-diamond-muted">Taxa de Qualidade</p>
            <h3 className="mt-1 text-2xl font-bold text-white">98%</h3>
            <p className="mt-1 text-xs text-diamond-muted">Últimos 7 dias</p>
          </div>
        </Card>

        <Card className="space-y-4 border-white/5 bg-onyx-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <Activity size={20} />
            </div>
            <Badge variant="outline" className="border-white/10 text-xs text-diamond-muted">
              85%
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-diamond-muted">Capacidade Fabril</p>
            <h3 className="mt-1 text-2xl font-bold text-white">High</h3>
            <Progress value={85} className="mt-2 h-1.5 bg-white/10" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Orders Panel */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-white/5 bg-onyx-900">
            <div className="flex items-center justify-between border-b border-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Ordens Ativas</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-diamond-muted hover:text-white"
                onClick={() => router.push("/core/producao/ordens")}
              >
                Ver Todas <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
            <div className="space-y-4 p-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 transition-colors hover:border-white/10"
                  onClick={() => router.push(`/core/producao/ordens/${i}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-onyx-950 rounded border border-white/10 p-2">
                      <Box size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Cozinha Residência Silva</h4>
                      <p className="flex items-center gap-2 text-xs text-diamond-muted">
                        <span>PO-2024-00{i}</span>
                        <span className="h-1 w-1 rounded-full bg-diamond-muted" />
                        <span>Em Produção</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 font-mono text-xs text-white">Prazo: 20 Jan</div>
                    <Progress value={35 + i * 10} className="h-1.5 w-24 bg-black/40" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Machine Status Shortcuts */}
          <Card className="border-white/5 bg-onyx-900">
            <div className="flex items-center justify-between border-b border-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Estado das Máquinas</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-diamond-muted hover:text-white"
                onClick={() => router.push("/core/producao/maquinas")}
              >
                Gerir <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center">
                <Settings size={24} className="text-green-500" />
                <span className="text-xs font-medium text-white">Seccionadora</span>
                <span className="text-[10px] font-bold uppercase text-green-400">Operacional</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center">
                <Settings size={24} className="text-green-500" />
                <span className="text-xs font-medium text-white">Orladora</span>
                <span className="text-[10px] font-bold uppercase text-green-400">Operacional</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-center">
                <Settings size={24} className="text-yellow-500" />
                <span className="text-xs font-medium text-white">CNC Nesting</span>
                <span className="text-[10px] font-bold uppercase text-yellow-500">Manutenção</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-white/5 bg-onyx-800 p-3 text-center opacity-60">
                <Settings size={24} className="text-diamond-muted" />
                <span className="text-xs font-medium text-white">Furadeira</span>
                <span className="text-[10px] font-bold uppercase text-diamond-muted">Inativa</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Alerts & Activity */}
        <div className="space-y-6">
          <Card className="h-full border-white/5 bg-onyx-900">
            <div className="border-b border-white/5 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <AlertTriangle size={18} className="text-orange-500" /> Alertas
              </h3>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex gap-3 rounded-lg border border-red-500/10 bg-red-500/5 p-3">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-500" />
                <div>
                  <h5 className="text-sm font-medium text-white">Falta de Material</h5>
                  <p className="mt-1 text-xs text-diamond-muted">
                    MDF Carvalho 18mm atingiu estoque mínimo.
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-auto justify-start p-0 text-xs text-red-400 hover:bg-transparent hover:text-red-300"
                  >
                    Requisitar Compra
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 rounded-lg border border-yellow-500/10 bg-yellow-500/5 p-3">
                <Settings size={16} className="mt-0.5 shrink-0 text-yellow-500" />
                <div>
                  <h5 className="text-sm font-medium text-white">Manutenção Preventiva</h5>
                  <p className="mt-1 text-xs text-diamond-muted">
                    CNC Nesting agendada para amanhã.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-diamond-muted">
                  <Users size={14} /> Operadores Ativos
                </h4>
                <div className="space-y-3">
                  {["Carlos Silva", "Ana Santos", "Miguel Costa"].map((name, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-white">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {name}
                      </span>
                      <span className="text-xs text-diamond-muted">PC-{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
