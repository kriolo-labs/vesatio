"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Contract } from "@/types/documents";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Filter, Plus, ShieldCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
const mockContracts: Contract[] = [
  {
    id: "1",
    code: "CTR-2024-001",
    title: "Prestação de Serviços - Residência Silva",
    type: "client",
    entity_id: "cl-001",
    entity_name: "Carlos Silva",
    status: "active",
    value: 1500000,
    start_date: "2024-01-01",
    end_date: "2024-06-01",
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    code: "CTR-2024-002",
    title: "Fornecimento de Madeira - EcoWoods",
    type: "supplier",
    entity_id: "sup-005",
    entity_name: "EcoWoods Lda",
    status: "active",
    value: 500000,
    start_date: "2024-01-05",
    end_date: "2024-12-31",
    created_at: "2024-01-05T14:30:00Z",
    updated_at: "2024-01-05T14:30:00Z",
  },
  {
    id: "3",
    code: "CTR-2023-098",
    title: "Contrato de Trabalho - Miguel Costa",
    type: "employee",
    entity_id: "emp-003",
    entity_name: "Miguel Costa",
    status: "active",
    value: 120000,
    start_date: "2023-11-01",
    end_date: undefined, // Indefinite
    created_at: "2023-10-25T09:00:00Z",
    updated_at: "2023-10-25T09:00:00Z",
  },
  {
    id: "4",
    code: "CTR-2023-050",
    title: "Serviço de Limpeza - CleanCorp",
    type: "supplier",
    entity_id: "sup-002",
    entity_name: "CleanCorp",
    status: "expired",
    value: 30000,
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    created_at: "2023-01-01T10:00:00Z",
    updated_at: "2023-01-01T10:00:00Z",
  },
];

export default function ContractsPage() {
  const router = useRouter();

  const columns: ColumnDef<Contract>[] = [
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-diamond-muted">{row.getValue("code")}</span>
      ),
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.getValue("title")}</span>
          <span className="text-xs text-diamond-muted">{row.original.entity_name}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="border-white/10 text-[10px] uppercase text-diamond-muted"
        >
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-white">
          {new Intl.NumberFormat("pt-PT", { style: "currency", currency: "CVE" }).format(
            row.getValue("value") as number
          )}
        </span>
      ),
    },
    {
      accessorKey: "end_date",
      header: "Até",
      cell: ({ row }) => {
        const date = row.getValue("end_date") as string;
        if (!date) return <span className="text-xs italic text-diamond-muted">Indeterminado</span>;
        return (
          <span className="font-mono text-xs text-diamond-muted">
            {new Date(date).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => router.push(`/core/documentos/contratos/${row.original.id}`)}
        >
          Detalhes
        </Button>
      ),
    },
  ];

  return (
    <CoreLayout>
      <PageHeader
        title="Gestão de Contratos"
        description="Centralização de contratos com clientes, fornecedores e RH."
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 border-white/10 text-diamond-muted hover:text-white md:flex"
          >
            <Filter size={16} /> Filtros
          </Button>
          <Button
            size="sm"
            className="btn-primary gap-2"
            onClick={() => router.push("/core/documentos/contratos/novo")}
          >
            <Plus size={16} /> Novo Contrato
          </Button>
        </div>
      </PageHeader>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Total Contratos</p>
            <p className="text-xl font-bold text-white">45</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Vigentes</p>
            <p className="text-xl font-bold text-white">38</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">A Expirar (30d)</p>
            <p className="text-xl font-bold text-white">2</p>
          </div>
        </Card>
      </div>

      <DataGrid
        columns={columns}
        data={mockContracts}
        searchKey="title"
        searchPlaceholder="Pesquisar contratos..."
      />
    </CoreLayout>
  );
}
