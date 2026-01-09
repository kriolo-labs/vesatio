"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProductionOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data (Temporary until Supabase hook is ready)
const mockOrders: ProductionOrder[] = [
  {
    id: "1",
    code: "PO-2024-001",
    project_id: "proj-001",
    description: "Cozinha Planejada - Residência Silva",
    priority: "high",
    status: "in_progress",
    start_date_planned: "2024-01-10",
    end_date_planned: "2024-01-20",
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z",
    items: [],
  },
  {
    id: "2",
    code: "PO-2024-002",
    project_id: "proj-002",
    description: "Armários Escritório Central",
    priority: "medium",
    status: "planned",
    start_date_planned: "2024-01-15",
    end_date_planned: "2024-01-25",
    created_at: "2024-01-06T14:30:00Z",
    updated_at: "2024-01-06T14:30:00Z",
    items: [],
  },
  {
    id: "3",
    code: "PO-2024-003",
    project_id: "proj-003",
    description: "Portas Internas - Edifício Horizon",
    priority: "urgent",
    status: "draft",
    created_at: "2024-01-08T09:00:00Z",
    updated_at: "2024-01-08T09:00:00Z",
    items: [],
  },
];

export default function ProductionOrdersPage() {
  const router = useRouter();

  const columns: ColumnDef<ProductionOrder>[] = [
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-diamond-muted">{row.getValue("code")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descrição / Projeto",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.getValue("description")}</span>
          <span className="text-xs text-diamond-muted">{row.original.project_id}</span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string;
        let color = "text-diamond-muted";
        if (priority === "urgent") color = "text-red-500 font-bold";
        if (priority === "high") color = "text-orange-500";
        if (priority === "medium") color = "text-yellow-500";

        return <span className={`text-xs uppercase ${color}`}>{priority}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "end_date_planned",
      header: "Prazo",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-diamond-muted">
          {row.original.end_date_planned
            ? new Date(row.original.end_date_planned).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => router.push(`/core/producao/ordens/${row.original.id}`)}
        >
          Detalhes
        </Button>
      ),
    },
  ];

  return (
    <CoreLayout>
      <PageHeader
        title="Ordens de Produção"
        description="Gestão e acompanhamento da produção na fábrica."
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 border-white/10 text-diamond-muted hover:text-white md:flex"
          >
            <Filter size={16} />
            Filtros
          </Button>
          <Button
            size="sm"
            className="btn-primary gap-2"
            onClick={() => router.push("/core/producao/ordens/novo")}
          >
            <Plus size={16} />
            Nova Ordem
          </Button>
        </div>
      </PageHeader>

      <DataGrid
        columns={columns}
        data={mockOrders}
        searchKey="description"
        searchPlaceholder="Pesquisar ordens..."
      />
    </CoreLayout>
  );
}
