"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Clock, CreditCard, Download, FileText } from "lucide-react";
import { useState } from "react";

const financialSummary = {
  totalContract: 15000000,
  totalPaid: 12500000,
  executionPercent: 92,
  nextPayment: { date: "2026-01-25", amount: 1250000, milestone: "Conclusão de Acabamentos" },
};

const payments = [
  { id: "p1", date: "2025-12-20", amount: 3000000, method: "Transferência", receipt: true },
  { id: "p2", date: "2025-10-15", amount: 2500000, method: "Transferência", receipt: true },
  { id: "p3", date: "2025-08-01", amount: 3500000, method: "Cheque", receipt: true },
  { id: "p4", date: "2025-06-01", amount: 3500000, method: "Transferência", receipt: true },
];

const invoices = [
  { id: "ft1", number: "FT 2025/089", date: "2025-12-20", amount: 3000000, status: "paid" },
  { id: "ft2", number: "FT 2025/067", date: "2025-10-15", amount: 2500000, status: "paid" },
  { id: "ft3", number: "FT 2026/001", date: "2026-01-10", amount: 1250000, status: "pending" },
];

const upcomingPayments = [
  {
    id: "up1",
    milestone: "Conclusão de Acabamentos",
    amount: 1250000,
    date: "2026-01-25",
    condition: "Após conclusão da fase",
  },
  {
    id: "up2",
    milestone: "Instalação Smart Home",
    amount: 1000000,
    date: "2026-02-15",
    condition: "Após início da fase",
  },
];

export default function FinanceiroPage() {
  const [showReportDialog, setShowReportDialog] = useState(false);

  return (
    <div className="space-y-6 p-4 pb-24">
      <h1 className="font-serif text-xl text-diamond">Financeiro</h1>

      {/* Summary */}
      <Card className="border-white/5 bg-onyx-900 p-5">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-diamond-muted">Valor do Contrato</p>
            <p className="text-lg font-bold text-diamond">
              {formatCurrency(financialSummary.totalContract)}
            </p>
          </div>
          <div>
            <p className="text-xs text-diamond-muted">Total Pago</p>
            <p className="text-lg font-bold text-green-400">
              {formatCurrency(financialSummary.totalPaid)}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-diamond-muted">Execução</span>
            <span className="text-diamond">{financialSummary.executionPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-onyx-700">
            <div
              className="h-full bg-gold-gradient"
              style={{ width: `${financialSummary.executionPercent}%` }}
            />
          </div>
        </div>
        <Card className="border-gold/20 bg-gold/10 p-3">
          <p className="mb-1 text-xs text-gold">Próximo Pagamento</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-diamond">
                {formatCurrency(financialSummary.nextPayment.amount)}
              </p>
              <p className="text-[10px] text-diamond-muted">
                {financialSummary.nextPayment.milestone}
              </p>
            </div>
            <span className="text-xs text-diamond-muted">
              {new Date(financialSummary.nextPayment.date).toLocaleDateString("pt-PT")}
            </span>
          </div>
        </Card>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="payments">
        <TabsList className="w-full border border-white/5 bg-onyx-900">
          <TabsTrigger value="payments" className="flex-1">
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex-1">
            Faturas
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1">
            Pendentes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="mt-4 space-y-3">
          {payments.map((p) => (
            <Card
              key={p.id}
              className="flex items-center justify-between border-white/5 bg-onyx-900 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-diamond">{formatCurrency(p.amount)}</p>
                  <p className="text-[10px] text-diamond-muted">
                    {new Date(p.date).toLocaleDateString("pt-PT")} • {p.method}
                  </p>
                </div>
              </div>
              {p.receipt && (
                <Button variant="ghost" size="icon" className="text-diamond-muted">
                  <Download size={16} />
                </Button>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="invoices" className="mt-4 space-y-3">
          {invoices.map((inv) => (
            <Card
              key={inv.id}
              className="flex items-center justify-between border-white/5 bg-onyx-900 p-4"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-diamond-muted" />
                <div>
                  <p className="font-medium text-diamond">{inv.number}</p>
                  <p className="text-[10px] text-diamond-muted">{formatCurrency(inv.amount)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${inv.status === "paid" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}
                >
                  {inv.status === "paid" ? "Paga" : "Pendente"}
                </span>
                <Button variant="ghost" size="icon" className="text-diamond-muted">
                  <Download size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcomingPayments.map((up) => (
            <Card key={up.id} className="border-white/5 bg-onyx-900 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-diamond">{up.milestone}</p>
                <span className="font-bold text-gold">{formatCurrency(up.amount)}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-diamond-muted">
                <Clock size={10} /> {new Date(up.date).toLocaleDateString("pt-PT")} • {up.condition}
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Bank Info */}
      <Card className="border-white/5 bg-onyx-900 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <CreditCard size={14} className="text-gold" /> Dados para Transferência
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-diamond-muted">Banco</span>
            <span className="text-diamond">Banco BAI Cabo Verde</span>
          </div>
          <div className="flex justify-between">
            <span className="text-diamond-muted">IBAN</span>
            <span className="font-mono text-diamond">CV64 0006 0001 2345 6789 0123 4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-diamond-muted">Titular</span>
            <span className="text-diamond">Vesatio Lda</span>
          </div>
        </div>
      </Card>

      {/* Report Issue */}
      <Button
        variant="outline"
        className="w-full gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
        onClick={() => setShowReportDialog(true)}
      >
        <AlertTriangle size={16} /> Reportar Divergência
      </Button>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="border-white/10 bg-onyx-900">
          <DialogHeader>
            <DialogTitle className="text-diamond">Reportar Divergência</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-diamond-muted">Descrição do Problema</Label>
              <Input
                className="border-white/10 bg-white/5 text-diamond"
                placeholder="Descreva a situação..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-diamond-muted">Valor Esperado</Label>
                <Input className="border-white/10 bg-white/5 text-diamond" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label className="text-diamond-muted">Valor Mostrado</Label>
                <Input className="border-white/10 bg-white/5 text-diamond" placeholder="0,00" />
              </div>
            </div>
            <Button className="text-onyx-950 w-full bg-gold">Enviar Relatório</Button>
            <p className="text-center text-[10px] text-diamond-muted">
              Este relatório será enviado diretamente à direção.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
