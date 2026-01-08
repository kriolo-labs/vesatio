"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { mockCurrentPayroll, mockPayrollHistory, PayrollRun, PayrollStatus } from "@/types/payroll";
import { ColumnDef } from "@tanstack/react-table";
import { DollarSign, Download, Plus } from "lucide-react";
import Link from "next/link";

export default function PayrollPage() {
  // Current Payroll Stats
  const currentTotal = mockCurrentPayroll.totalGross;
  const currentNet = mockCurrentPayroll.totalNet;
  const currentTaxes = mockCurrentPayroll.totalTaxes;

  const getStatusColor = (status: PayrollStatus) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "approved":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "draft":
        return "bg-white/10 text-diamond-muted border-white/10";
    }
  };

  const getStatusLabel = (status: PayrollStatus) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "approved":
        return "Aprovado";
      case "processing":
        return "Em Processamento";
      case "draft":
        return "Rascunho";
    }
  };

  const runColumns: ColumnDef<PayrollRun>[] = [
    {
      accessorKey: "period",
      header: "Período",
      cell: ({ row }) => (
        <div className="font-medium text-diamond">
          {new Date(row.original.year, row.original.month - 1).toLocaleDateString("pt-PT", {
            month: "long",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "totalEmployees",
      header: "Colaboradores",
      cell: ({ row }) => <span className="text-diamond-muted">{row.original.totalEmployees}</span>,
    },
    {
      accessorKey: "totalGross",
      header: "Total Bruto",
      cell: ({ row }) => (
        <span className="text-diamond">{formatCurrency(row.original.totalGross)}</span>
      ),
    },
    {
      accessorKey: "totalNet",
      header: "Total Líquido",
      cell: ({ row }) => (
        <span className="text-diamond">{formatCurrency(row.original.totalNet)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant="outline" className={getStatusColor(row.original.status)}>
          {getStatusLabel(row.original.status)}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted">
          <Download className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Processamento Salarial"
        description="Gestão de pagamentos, TSU e impostos."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="border-0 bg-gold-gradient font-medium text-onyx">
              <Plus className="mr-2 h-4 w-4" /> Novo Processamento
            </Button>
          </DialogTrigger>
          <DialogContent className="border-white/10 bg-onyx-900 text-diamond">
            <DialogHeader>
              <DialogTitle className="text-white">Iniciar Processamento</DialogTitle>
              <DialogDescription className="text-diamond-muted">
                O processamento automático irá calcular salários base, subsídios e descontos para
                todos os colaboradores ativos.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-6 text-center">
              <div className="font-serif text-4xl text-white">Fev 2024</div>
              <p className="text-sm text-diamond-muted">Próximo período sugerido</p>
            </div>
            <DialogFooter>
              <Link
                href="/core/rh/salarios/processamento"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full bg-gold text-onyx hover:bg-gold/90"
                )}
              >
                Iniciar Assistente
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* KPIs Current Month (Projected) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden border-white/5 bg-onyx-900">
          <div className="absolute right-0 top-0 p-4 opacity-5">
            <DollarSign size={80} className="text-white" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-diamond-muted">
              Custo Total Estimado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl text-white">{formatCurrency(currentTotal)}</div>
            <p className="mt-1 text-xs text-diamond-muted">Janeiro 2024 (Rascunho)</p>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-onyx-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-diamond-muted">
              Impostos & TSU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl text-white">{formatCurrency(currentTaxes)}</div>
            <p className="mt-1 text-xs text-diamond-muted">A pagar ao Estado</p>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-onyx-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-diamond-muted">
              Líquido a Pagar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl text-emerald-500">{formatCurrency(currentNet)}</div>
            <p className="mt-1 text-xs text-diamond-muted">Transferências bancárias</p>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <Card className="border-white/5 bg-onyx-900">
        <CardHeader>
          <CardTitle>Histórico de Processamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataGrid columns={runColumns} data={[mockCurrentPayroll, ...mockPayrollHistory]} />
        </CardContent>
      </Card>
    </div>
  );
}
