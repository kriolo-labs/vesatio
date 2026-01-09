"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, Plus, Zap } from "lucide-react";

export default function AutomationsPage() {
  return (
    <CoreLayout>
      <PageHeader
        title="Motor de Automação"
        description="Configure regras e reações automáticas do ecossistema AURA."
      >
        <Button className="text-onyx-950 gap-2 bg-gold hover:bg-gold/90">
          <Plus size={16} /> Nova Regra
        </Button>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Stats */}
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
          <div>
            <p className="text-xs uppercase text-diamond-muted">Regras Ativas</p>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
          <Zap className="text-gold opacity-50" size={24} />
        </Card>
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
          <div>
            <p className="text-xs uppercase text-diamond-muted">Execuções Hoje</p>
            <p className="text-2xl font-bold text-white">1,240</p>
          </div>
          <Clock className="text-blue-400 opacity-50" size={24} />
        </Card>
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
          <div>
            <p className="text-xs uppercase text-diamond-muted">Taxa de Erro</p>
            <p className="text-2xl font-bold text-green-500">0.1%</p>
          </div>
          <AlertTriangle className="text-green-500 opacity-50" size={24} />
        </Card>
      </div>

      <Tabs defaultValue="rules" className="mt-8">
        <TabsList className="border border-white/5 bg-onyx-900">
          <TabsTrigger value="rules">Regras Ativas</TabsTrigger>
          <TabsTrigger value="history">Histórico de Execução</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-4 space-y-4">
          {[
            {
              name: "Alerta de Stock Crítico",
              trigger: "Evento: Stock Baixo",
              action: "Criar Requisição Compra",
              status: "active",
            },
            {
              name: "Inatividade Prolongada",
              trigger: "Agendado: Diário 20:00",
              action: "Notificar Admin",
              status: "active",
            },
            {
              name: "Boas-vindas Novo Cliente",
              trigger: "Evento: Cliente Criado",
              action: "Email Boas-vindas (AURA)",
              status: "paused",
            },
          ].map((rule, i) => (
            <Card
              key={i}
              className="flex cursor-pointer items-center justify-between border-white/5 bg-onyx-900 p-4 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-2 w-2 rounded-full ${rule.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
                />
                <div>
                  <p className="font-medium text-white">{rule.name}</p>
                  <div className="mt-1 flex gap-2 text-xs text-diamond-muted">
                    <Badge variant="outline" className="border-white/10">
                      {rule.trigger}
                    </Badge>
                    <span>➜</span>
                    <Badge variant="outline" className="border-white/10">
                      {rule.action}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-diamond-muted">
                Editar
              </Button>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="border-white/5 bg-onyx-900">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase text-diamond-muted">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Regra</th>
                  <th className="px-4 py-3">Resultado</th>
                  <th className="px-4 py-3">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">Hoje, 10:42</td>
                  <td className="px-4 py-3">Alerta de Stock Crítico</td>
                  <td className="px-4 py-3 text-green-400">Sucesso</td>
                  <td className="px-4 py-3 text-xs text-diamond-muted">
                    Email enviado para compras@vesatio.com
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">Ontem, 20:00</td>
                  <td className="px-4 py-3">Inatividade Prolongada</td>
                  <td className="px-4 py-3 text-green-400">Sucesso</td>
                  <td className="px-4 py-3 text-xs text-diamond-muted">Sem alertas gerados</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </TabsContent>
      </Tabs>
    </CoreLayout>
  );
}
