"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Machine } from "@/types/production";
import { ColumnDef } from "@tanstack/react-table";
import { Activity, Monitor, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
const mockMachines: Machine[] = [
  {
    id: "1",
    name: "Seccionadora Vertical",
    type: "Corte",
    brand: "Homag",
    model: "S-200",
    serial_number: "SH-2023-001",
    status: "operational",
    next_maintenance_date: "2024-02-15",
    location: "Setor A",
  },
  {
    id: "2",
    name: "Orladora Unilateral",
    type: "Acabamento",
    brand: "SCM",
    model: "K-560",
    serial_number: "SCM-22-998",
    status: "operational",
    next_maintenance_date: "2024-01-20",
    location: "Setor B",
  },
  {
    id: "3",
    name: "CNC Nesting",
    type: "Usinagem",
    brand: "Biesse",
    model: "Rover K",
    serial_number: "BSS-99-112",
    status: "maintenance",
    next_maintenance_date: "2024-01-08",
    location: "Setor A",
  },
  {
    id: "4",
    name: "Furadeira Múltipla",
    type: "Furação",
    brand: "Vitap",
    model: "Alfa 21",
    serial_number: "VT-21-005",
    status: "inactive",
    location: "Armazém",
  },
];

export default function MachinesPage() {
  const router = useRouter();

  const columns: ColumnDef<Machine>[] = [
    {
      accessorKey: "name",
      header: "Equipamento",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.getValue("name")}</span>
          <span className="text-xs text-diamond-muted">
            {row.original.brand} {row.original.model}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <span className="text-xs text-diamond-muted">{row.getValue("type")}</span>,
    },
    {
      accessorKey: "location",
      header: "Localização",
      cell: ({ row }) => (
        <span className="text-xs text-diamond-muted">{row.getValue("location") || "-"}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "next_maintenance_date",
      header: "Próx. Manutenção",
      cell: ({ row }) => {
        const date = row.getValue("next_maintenance_date") as string;
        if (!date) return <span className="text-xs text-diamond-muted">-</span>;

        const isLate = new Date(date) < new Date();
        return (
          <span
            className={`font-mono text-xs ${isLate ? "font-bold text-red-400" : "text-diamond-muted"}`}
          >
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
          onClick={() => {}} // TODO: Implement details page
        >
          Gerir
        </Button>
      ),
    },
  ];

  const totalMachines = mockMachines.length;
  const operationalCount = mockMachines.filter((m) => m.status === "operational").length;
  const maintenanceCount = mockMachines.filter((m) => m.status === "maintenance").length;

  return (
    <CoreLayout>
      <PageHeader title="Gestão de Máquinas" description="Controlo de equipamentos e manutenção.">
        <Button size="sm" className="btn-primary gap-2">
          <Plus size={16} />
          Nova Máquina
        </Button>
      </PageHeader>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <Monitor size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Total Equipamentos</p>
            <p className="text-xl font-bold text-white">{totalMachines}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Operacionais</p>
            <p className="text-xl font-bold text-white">{operationalCount}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
            <Settings size={20} />
          </div>
          <div>
            <p className="text-xs uppercase text-diamond-muted">Em Manutenção</p>
            <p className="text-xl font-bold text-white">{maintenanceCount}</p>
          </div>
        </Card>
      </div>

      <DataGrid
        columns={columns}
        data={mockMachines}
        searchKey="name"
        searchPlaceholder="Pesquisar máquinas..."
      />
    </CoreLayout>
  );
}
