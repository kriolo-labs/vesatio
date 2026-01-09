"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NonConformity, QualityInspection } from "@/types/production";
import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, CheckCircle, ClipboardCheck, Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock Data
const mockInspections: QualityInspection[] = [
  {
    id: "1",
    order_id: "PO-2024-001",
    item_id: "Balcão Inferior",
    type: "final",
    date: "2024-01-08T10:00:00Z",
    inspector_id: "Carlos Silva",
    result: "approved",
    notes: "Acabamento impecável.",
  },
  {
    id: "2",
    order_id: "PO-2024-002",
    item_id: "Lote MDF",
    type: "material",
    date: "2024-01-08T09:30:00Z",
    inspector_id: "Ana Santos",
    result: "rejected",
    notes: "Umidade excessiva detectada.",
  },
];

const mockNonConformities: NonConformity[] = [
  {
    id: "1",
    order_id: "PO-2024-002",
    description: "MDF com inchaço por umidade",
    severity: "major",
    status: "open",
    created_at: "2024-01-08T09:35:00Z",
    responsible_id: "João Fornecedor",
  },
  {
    id: "2",
    order_id: "PO-2023-998",
    description: "Risco no laccado porta frontal",
    severity: "minor",
    status: "closed",
    created_at: "2023-12-28T14:00:00Z",
    responsible_id: "Setor Pintura",
  },
];

export default function QualityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inspections");

  const inspectionColumns: ColumnDef<QualityInspection>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-diamond-muted">
          {new Date(row.getValue("date")).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "order_id",
      header: "Origem",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.original.item_id}</span>
          <span className="text-xs text-diamond-muted">{row.original.order_id}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <span className="text-xs uppercase text-diamond-muted">{row.getValue("type")}</span>
      ),
    },
    {
      accessorKey: "result",
      header: "Resultado",
      cell: ({ row }) => {
        const result = row.getValue("result") as string;
        const isApproved = result.includes("approved");
        return (
          <Badge
            variant="outline"
            className={`text-[10px] uppercase border-${isApproved ? "green" : "red"}-500/30 text-${isApproved ? "green" : "red"}-500 bg-${isApproved ? "green" : "red"}-500/10`}
          >
            {result.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "inspector_id",
      header: "Inspetor",
      cell: ({ row }) => <span className="text-xs text-white">{row.getValue("inspector_id")}</span>,
    },
  ];

  const ncColumns: ColumnDef<NonConformity>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-diamond-muted">NC-{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="line-clamp-1 font-medium text-white">{row.getValue("description")}</span>
          <span className="text-xs text-diamond-muted">Ref: {row.original.order_id}</span>
        </div>
      ),
    },
    {
      accessorKey: "severity",
      header: "Severidade",
      cell: ({ row }) => {
        const sev = row.getValue("severity") as string;
        let color = "text-yellow-500";
        if (sev === "critical") color = "text-red-500 font-bold";
        if (sev === "minor") color = "text-blue-400";
        return <span className={`text-xs uppercase ${color}`}>{sev}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className="border-0 bg-white/10 text-[10px] uppercase text-diamond-muted"
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          Gerir
        </Button>
      ),
    },
  ];

  return (
    <CoreLayout>
      <PageHeader
        title="Controle de Qualidade"
        description="Gestão de inspeções e não conformidades."
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 border-white/10 text-diamond-muted hover:text-white md:flex"
          >
            <Filter size={16} /> Filtros
          </Button>
          <Button size="sm" className="btn-primary gap-2">
            <Plus size={16} /> Registar {activeTab === "inspections" ? "Inspeção" : "NC"}
          </Button>
        </div>
      </PageHeader>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Inspeções Hoje</p>
            <p className="text-xl font-bold text-white">12</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Aprovação</p>
            <p className="text-xl font-bold text-white">92%</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">NCs Abertas</p>
            <p className="text-xl font-bold text-white">3</p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="inspections" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="border border-white/5 bg-onyx-900 p-1">
          <TabsTrigger value="inspections">Registro de Inspeções</TabsTrigger>
          <TabsTrigger value="non-conformities">Não Conformidades</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections">
          <DataGrid
            columns={inspectionColumns}
            data={mockInspections}
            searchKey="item_id"
            searchPlaceholder="Pesquisar inspeções..."
          />
        </TabsContent>

        <TabsContent value="non-conformities">
          <DataGrid
            columns={ncColumns}
            data={mockNonConformities}
            searchKey="description"
            searchPlaceholder="Pesquisar não conformidades..."
          />
        </TabsContent>
      </Tabs>
    </CoreLayout>
  );
}
