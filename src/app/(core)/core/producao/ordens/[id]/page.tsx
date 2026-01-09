"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductionOrder } from "@/types/production";
import {
  AlertTriangle,
  ArrowLeft,
  Box,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  PenTool,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Extended Mock Data for Details
const mockOrder: ProductionOrder = {
  id: "1",
  code: "PO-2024-001",
  project_id: "Resident Silva - Kitchen",
  description: "Cozinha Planejada Completa",
  priority: "high",
  status: "in_progress",
  start_date_planned: "2024-01-10",
  end_date_planned: "2024-01-20",
  start_date_actual: "2024-01-11",
  created_at: "2024-01-05T10:00:00Z",
  updated_at: "2024-01-08T10:00:00Z",
  items: [
    {
      id: "item-1",
      order_id: "1",
      description: "Balcão Inferior Pia",
      quantity: 1,
      status: "in_production",
      specifications: "MDF Branco Tx, Puxador Perfil Alumínio",
      bom: [
        {
          id: "bom-1",
          production_item_id: "item-1",
          product_id: "prod-mdf-white",
          product_name: "Chapa MDF Branco Tx 18mm",
          quantity: 2,
          unit: "un",
          status: "consumed",
        },
        {
          id: "bom-2",
          production_item_id: "item-1",
          product_id: "prod-hinge",
          product_name: "Dobradiça 35mm",
          quantity: 8,
          unit: "un",
          status: "available",
        },
      ],
    },
    {
      id: "item-2",
      order_id: "1",
      description: "Armário Aéreo",
      quantity: 2,
      status: "pending",
      specifications: "MDF Carvalho Hanover",
      bom: [
        {
          id: "bom-3",
          production_item_id: "item-2",
          product_id: "prod-mdf-oak",
          product_name: "Chapa MDF Carvalho 18mm",
          quantity: 3,
          unit: "un",
          status: "requisitioned",
        },
      ],
    },
  ],
};

export default function ProductionOrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Calculate Progress
  const totalItems = mockOrder.items?.length || 0;
  const completedItems = mockOrder.items?.filter((i) => i.status === "completed").length || 0;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  // Mock progress for demo as items are not 'completed' yet
  const displayProgress = 35;

  return (
    <CoreLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2 gap-2 pl-0 text-diamond-muted hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} />
              Voltar para Ordens
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{mockOrder.description}</h1>
              <StatusBadge status={mockOrder.status} />
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-diamond-muted">
              <span className="rounded bg-white/5 px-2 py-0.5 font-mono">{mockOrder.code}</span>
              <span className="flex items-center gap-1">
                <Box size={14} /> {mockOrder.project_id}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Prazo:{" "}
                {new Date(mockOrder.end_date_planned!).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 text-diamond-muted">
              Relatório
            </Button>
            <Button className="btn-primary">Editar Ordem</Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="border-white/5 bg-onyx-900 p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-diamond-muted">Progresso Geral</span>
            <span className="font-mono text-white">{displayProgress}%</span>
          </div>
          <Progress value={displayProgress} className="h-2 bg-white/10" />
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="border border-white/5 bg-onyx-900 p-1">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="items">Itens ({mockOrder.items?.length})</TabsTrigger>
            <TabsTrigger value="materials">Materiais (BOM)</TabsTrigger>
            <TabsTrigger value="logs">Apontamentos</TabsTrigger>
            <TabsTrigger value="quality">Qualidade</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="space-y-2 border-white/5 bg-onyx-900 p-4">
                <span className="text-xs uppercase text-diamond-muted">Prioridade</span>
                <div className="text-lg font-bold uppercase text-orange-500">
                  {mockOrder.priority}
                </div>
              </Card>
              <Card className="space-y-2 border-white/5 bg-onyx-900 p-4">
                <span className="text-xs uppercase text-diamond-muted">Início Real</span>
                <div className="text-lg font-bold text-white">
                  {mockOrder.start_date_actual
                    ? new Date(mockOrder.start_date_actual).toLocaleDateString()
                    : "-"}
                </div>
              </Card>
              <Card className="space-y-2 border-white/5 bg-onyx-900 p-4">
                <span className="text-xs uppercase text-diamond-muted">Tempo Decorrido</span>
                <div className="text-lg font-bold text-white">2 dias</div>
              </Card>
              <Card className="space-y-2 border-white/5 bg-onyx-900 p-4">
                <span className="text-xs uppercase text-diamond-muted">Status Materiais</span>
                <div className="text-lg font-bold text-green-400">80% Disponível</div>
              </Card>
            </div>

            <Card className="border-white/5 bg-onyx-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Timeline de Produção</h3>
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10 text-diamond-muted">
                [Timeline Chart Placeholder]
              </div>
            </Card>
          </TabsContent>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-4">
            {mockOrder.items?.map((item) => (
              <Card key={item.id} className="overflow-hidden border-white/5 bg-onyx-900">
                <div
                  className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-white/5"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-2 rounded-full ${item.status === "completed" ? "bg-green-500" : item.status === "in_production" ? "bg-blue-500" : "bg-onyx-700"}`}
                    />
                    <div>
                      <h4 className="font-medium text-white">{item.description}</h4>
                      <p className="text-xs text-diamond-muted">{item.specifications}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-xs uppercase text-diamond-muted">Qtd</span>
                      <span className="font-mono text-white">{item.quantity}</span>
                    </div>
                    <Badge
                      variant={item.status === "in_production" ? "default" : "secondary"}
                      className="text-[10px] uppercase"
                    >
                      {item.status.replace("_", " ")}
                    </Badge>
                    {expandedItem === item.id ? (
                      <ChevronUp size={16} className="text-diamond-muted" />
                    ) : (
                      <ChevronDown size={16} className="text-diamond-muted" />
                    )}
                  </div>
                </div>

                {expandedItem === item.id && (
                  <div className="space-y-4 border-t border-white/5 bg-black/20 p-4">
                    <div>
                      <h5 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-gold">
                        <PenTool size={12} /> Materiais (BOM)
                      </h5>
                      <div className="space-y-2">
                        {item.bom?.map((bom) => (
                          <div
                            key={bom.id}
                            className="flex justify-between border-b border-white/5 py-1 text-sm last:border-0"
                          >
                            <span className="text-diamond-muted">{bom.product_name}</span>
                            <div className="flex gap-4">
                              <span className="font-mono text-white">
                                {bom.quantity} {bom.unit}
                              </span>
                              <span
                                className={`text-[10px] uppercase ${bom.status === "consumed" ? "text-green-500" : "text-blue-400"}`}
                              >
                                {bom.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm" className="h-7 border-white/10 text-xs">
                        Ver Desenho
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 border-0 bg-white/10 text-xs text-white hover:bg-white/20"
                      >
                        Apontar Produção
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card className="border-white/5 bg-onyx-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Lista de Materiais Consolidada
              </h3>
              <div className="space-y-2">
                {mockOrder.items
                  ?.flatMap((i) => i.bom || [])
                  .map((bom, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2 w-2 rounded-full ${bom.status === "available" ? "bg-green-500" : "bg-yellow-500"}`}
                        />
                        <span className="text-sm text-white">{bom.product_name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-diamond-muted">
                          {bom.quantity} {bom.unit}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-white/10 text-[10px] text-diamond-muted"
                        >
                          {bom.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Card className="border-white/5 bg-onyx-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Histórico de Apontamentos</h3>
                <Button size="sm" variant="outline" className="gap-2">
                  <Clock size={16} /> Novo Apontamento
                </Button>
              </div>

              <div className="relative ml-3 space-y-6 border-l border-white/10 pb-2 pl-6">
                <div className="relative">
                  <div className="absolute -left-[29px] h-3 w-3 rounded-full bg-green-500 ring-4 ring-onyx-900" />
                  <span className="mb-1 block text-xs text-diamond-muted">Hoje, 10:30</span>
                  <p className="text-sm text-white">
                    Carlos Silva iniciou <span className="text-gold">Balcão Inferior Pia</span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] h-3 w-3 rounded-full bg-blue-500 ring-4 ring-onyx-900" />
                  <span className="mb-1 block text-xs text-diamond-muted">Ontem, 16:45</span>
                  <p className="text-sm text-white">
                    Materiais requisitados para <span className="text-gold">Armário Aéreo</span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] h-3 w-3 rounded-full bg-onyx-600 ring-4 ring-onyx-900" />
                  <span className="mb-1 block text-xs text-diamond-muted">05 Jan, 10:00</span>
                  <p className="text-sm text-white">
                    Ordem criada por <span className="text-gold">Admin</span>
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="flex cursor-pointer flex-col items-center justify-center space-y-2 border-white/5 bg-onyx-900 p-4 py-8 text-center transition-colors hover:border-gold/30">
                <CheckCircle size={32} className="text-green-500" />
                <h4 className="font-medium text-white">Nova Inspeção</h4>
                <p className="text-xs text-diamond-muted">Registar verificação de qualidade</p>
              </Card>

              <Card className="flex cursor-pointer flex-col items-center justify-center space-y-2 border-white/5 bg-onyx-900 p-4 py-8 text-center transition-colors hover:border-red-500/30">
                <AlertTriangle size={32} className="text-red-500" />
                <h4 className="font-medium text-white">Reportar Problema</h4>
                <p className="text-xs text-diamond-muted">Abrir não-conformidade</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CoreLayout>
  );
}
