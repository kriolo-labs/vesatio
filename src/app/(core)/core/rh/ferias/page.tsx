"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AbsenceType,
  mockVacationBalance,
  mockVacationRequests,
  RequestStatus,
  VacationRequest,
} from "@/types/vacation";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Palmtree, Plus, Umbrella } from "lucide-react";
import { useState } from "react";

export default function VacationPage() {
  const [balance] = useState(mockVacationBalance);
  const [requests] = useState(mockVacationRequests);

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  const getStatusLabel = (status: RequestStatus) => {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "pending":
        return "Pendente";
      case "rejected":
        return "Rejeitado";
    }
  };

  const getTypeLabel = (type: AbsenceType) => {
    switch (type) {
      case "vacation":
        return "Férias";
      case "sick_leave":
        return "Baixa Médica";
      case "parental":
        return "Licença Parental";
      case "personal":
        return "Assunto Pessoal";
      case "other":
        return "Outro";
    }
  };

  const columns: ColumnDef<VacationRequest>[] = [
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.type === "vacation" ? (
            <Palmtree size={14} className="text-gold" />
          ) : row.original.type === "sick_leave" ? (
            <Umbrella size={14} className="text-diamond-muted" />
          ) : (
            <CalendarIcon size={14} className="text-diamond-muted" />
          )}
          <span className="capitalize text-diamond">{getTypeLabel(row.original.type)}</span>
        </div>
      ),
    },
    {
      accessorKey: "period",
      header: "Período",
      cell: ({ row }) => (
        <div className="text-sm text-diamond">
          {format(new Date(row.original.startDate), "d MMM", { locale: pt })} -{" "}
          {format(new Date(row.original.endDate), "d MMM yyyy", { locale: pt })}
        </div>
      ),
    },
    {
      accessorKey: "days",
      header: "Dias",
      cell: ({ row }) => {
        const start = new Date(row.original.startDate);
        const end = new Date(row.original.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return <span className="text-diamond-muted">{days} dias</span>;
      },
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
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Férias"
        description="Planeamento de ausências e consulta de saldos."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="border-0 bg-gold-gradient font-medium text-onyx transition-opacity hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" /> Nova Solicitação
            </Button>
          </DialogTrigger>
          <DialogContent className="border-white/10 bg-onyx-900 text-diamond sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-white">Registar Ausência</DialogTitle>
              <DialogDescription className="text-diamond-muted">
                Preencha os detalhes da sua solicitação. O seu gestor será notificado para
                aprovação.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-diamond-muted">
                  Tipo
                </Label>
                <Select defaultValue="vacation">
                  <SelectTrigger className="col-span-3 border-white/10 bg-white/5">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-onyx-900 text-diamond">
                    <SelectItem value="vacation">Férias</SelectItem>
                    <SelectItem value="sick_leave">Baixa Médica</SelectItem>
                    <SelectItem value="personal">Assunto Pessoal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start" className="text-right text-diamond-muted">
                  Início
                </Label>
                <Input id="start" type="date" className="col-span-3 border-white/10 bg-white/5" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end" className="text-right text-diamond-muted">
                  Fim
                </Label>
                <Input id="end" type="date" className="col-span-3 border-white/10 bg-white/5" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right text-diamond-muted">
                  Obs.
                </Label>
                <Input
                  id="reason"
                  placeholder="Opcional"
                  className="col-span-3 border-white/10 bg-white/5"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-gold text-onyx hover:bg-gold/90">
                Submeter Pedido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="group relative overflow-hidden border-white/5 bg-onyx-900">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <Palmtree size={64} className="text-gold" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-diamond-muted">
              Dias Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-4xl text-white">
              {balance.totalDays - balance.usedDays}
            </div>
            <p className="mt-1 text-xs text-diamond-muted">de {balance.totalDays} dias totais</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-white/5 bg-onyx-900">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <CalendarIcon size={64} className="text-emerald-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-diamond-muted">
              Agendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-4xl text-emerald-500">{balance.scheduledDays}</div>
            <p className="mt-1 text-xs text-diamond-muted">Próximo: 15 Dez 2024</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-white/5 bg-onyx-900">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <Clock size={64} className="text-amber-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-diamond-muted">
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-4xl text-amber-500">{balance.pendingDays}</div>
            <p className="mt-1 text-xs text-diamond-muted">A aguardar aprovação</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* My Requests List */}
        <Card className="border-white/5 bg-onyx-900 lg:col-span-2">
          <CardHeader>
            <CardTitle>Minhas Solicitações</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataGrid columns={columns} data={requests.filter((r) => r.employeeId === "EMP-001")} />
          </CardContent>
        </Card>

        {/* Team Calendar / Upcoming Absences */}
        <Card className="border-white/5 bg-onyx-900">
          <CardHeader>
            <CardTitle>Ausências na Equipa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {requests
                .filter((r) => new Date(r.startDate) > new Date() && r.status === "approved")
                .slice(0, 5)
                .map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-onyx-800 text-xs font-medium text-gold">
                      {req.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{req.employeeName}</p>
                      <p className="flex items-center text-xs text-diamond-muted">
                        <CalendarIcon size={10} className="mr-1" />
                        {format(new Date(req.startDate), "d MMM", { locale: pt })} -{" "}
                        {format(new Date(req.endDate), "d MMM", { locale: pt })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="h-5 border-white/10 px-1 py-0 text-[10px] text-diamond-muted"
                    >
                      {getTypeLabel(req.type)}
                    </Badge>
                  </div>
                ))}
              {requests.filter((r) => new Date(r.startDate) > new Date() && r.status === "approved")
                .length === 0 && (
                <p className="py-4 text-center text-sm text-diamond-muted">
                  Nenhuma ausência prevista para breve.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
