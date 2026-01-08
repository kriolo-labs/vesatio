"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { mockCurrentPayroll, Payslip } from "@/types/payroll";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Download, Printer, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PayrollProcessingPage() {
  const [step, setStep] = useState(1); // 1: Review, 2: Approve
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  const handleApprove = () => {
    setStep(2);
  };

  const columns: ColumnDef<Payslip>[] = [
    {
      accessorKey: "employeeName",
      header: "Colaborador",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-diamond">{row.original.employeeName}</div>
          <div className="text-xs text-diamond-muted">{row.original.role}</div>
        </div>
      ),
    },
    {
      accessorKey: "baseSalary",
      header: "Base",
      cell: ({ row }) => (
        <span className="text-diamond-muted">{formatCurrency(row.original.baseSalary)}</span>
      ),
    },
    {
      accessorKey: "grossSalary",
      header: "Bruto",
      cell: ({ row }) => (
        <span className="font-medium text-diamond">{formatCurrency(row.original.grossSalary)}</span>
      ),
    },
    {
      accessorKey: "netSalary",
      header: "Líquido",
      cell: ({ row }) => (
        <span className="font-bold text-emerald-500">{formatCurrency(row.original.netSalary)}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-gold hover:bg-gold/5 hover:text-gold"
          onClick={() => setSelectedPayslip(row.original)}
        >
          Ver Recibo
        </Button>
      ),
    },
  ];

  if (step === 2) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="font-serif text-2xl text-white">Processamento Concluído</h2>
        <p className="max-w-md text-diamond-muted">
          O processamento salarial de Janeiro 2024 foi aprovado com sucesso. As ordens de pagamento
          foram enviadas para o módulo Financeiro.
        </p>
        <div className="flex gap-4">
          <Link
            href="/core/rh/salarios"
            className={cn(buttonVariants({ variant: "outline" }), "border-white/10 text-diamond")}
          >
            Voltar à Lista
          </Link>
          <Button className="bg-gold text-onyx hover:bg-gold/90">
            <Download className="mr-2 h-4 w-4" /> Exportar ficheiro SEPA
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Novo Processamento: Jan 2024"
        description="Revise os valores antes de aprovar."
        backUrl="/core/rh/salarios"
      >
        <div className="flex items-center gap-2 text-sm text-diamond-muted">
          <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
            Rascunho
          </Badge>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-white/5 bg-onyx-900">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recibos de Vencimento</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-diamond-muted" />
                <Input placeholder="Pesquisar..." className="h-9 border-white/10 bg-white/5 pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataGrid columns={columns} data={mockCurrentPayroll.payslips} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-white/5 bg-onyx-900">
            <CardHeader>
              <CardTitle>Resumo do Processamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Total Bruto</span>
                <span className="text-diamond">
                  {formatCurrency(mockCurrentPayroll.totalGross)}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Segurança Social (TSU)</span>
                <span className="text-diamond">
                  {formatCurrency(mockCurrentPayroll.totalGross * 0.2375)}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Retenção IRS</span>
                <span className="text-rose-500">
                  -{formatCurrency(mockCurrentPayroll.totalGross * 0.15)}
                </span>
              </div>
              <div className="flex justify-between py-2 pt-4">
                <span className="font-medium text-white">Total a Pagar</span>
                <span className="text-xl font-bold text-gold">
                  {formatCurrency(mockCurrentPayroll.totalNet)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gold text-onyx hover:bg-gold/90" onClick={handleApprove}>
                Aprovar e Processar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Payslip Detail Dialog */}
      <Dialog open={!!selectedPayslip} onOpenChange={(open) => !open && setSelectedPayslip(null)}>
        <DialogContent className="max-w-2xl border-white/10 bg-onyx-900 text-diamond">
          {selectedPayslip && (
            <>
              <DialogHeader className="border-b border-white/5 pb-4">
                <DialogTitle className="flex items-center justify-between text-white">
                  <span>Recibo de Vencimento</span>
                  <span className="text-sm font-normal text-diamond-muted">Jan 2024</span>
                </DialogTitle>
                <DialogDescription className="mt-2 flex items-start justify-between">
                  <div>
                    <p className="font-bold text-diamond">{selectedPayslip.employeeName}</p>
                    <p className="text-xs">
                      {selectedPayslip.role} • {selectedPayslip.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-diamond">{selectedPayslip.employeeId}</p>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Earnings */}
                <div className="space-y-2">
                  <h4 className="border-b border-white/5 pb-1 text-xs font-bold uppercase tracking-wider text-diamond-muted">
                    Abonos
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span>Vencimento Base</span>
                    <span>{formatCurrency(selectedPayslip.baseSalary)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subsídio Alimentação</span>
                    <span>{formatCurrency(selectedPayslip.allowances)}</span>
                  </div>
                  {selectedPayslip.bonuses > 0 && (
                    <div className="flex justify-between text-sm text-emerald-500">
                      <span>Prémios / Bónus</span>
                      <span>{formatCurrency(selectedPayslip.bonuses)}</span>
                    </div>
                  )}
                  <div className="mt-2 flex justify-between border-t border-white/5 pt-2 font-medium">
                    <span>Total Ilíquido</span>
                    <span>{formatCurrency(selectedPayslip.grossSalary)}</span>
                  </div>
                </div>

                {/* Deductions */}
                <div className="space-y-2">
                  <h4 className="border-b border-white/5 pb-1 text-xs font-bold uppercase tracking-wider text-diamond-muted">
                    Descontos
                  </h4>
                  <div className="flex justify-between text-sm text-rose-500/80">
                    <span>Segurança Social (11%)</span>
                    <span>-{formatCurrency(selectedPayslip.socialSecurity)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-rose-500/80">
                    <span>Retenção IRS</span>
                    <span>-{formatCurrency(selectedPayslip.irs)}</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="border-t border-white/5 pt-4">
                <div className="flex w-full items-center justify-between">
                  <div className="text-left">
                    <span className="block text-xs text-diamond-muted">
                      Valor Líquido a Receber
                    </span>
                    <span className="font-serif text-2xl text-gold">
                      {formatCurrency(selectedPayslip.netSalary)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/10 text-diamond hover:bg-white/5"
                  >
                    <Printer className="mr-2 h-4 w-4" /> Imprimir
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
