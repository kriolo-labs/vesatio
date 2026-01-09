"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuditLog, LogAction } from "@/types/security";
import { Download, FileJson, Search, User } from "lucide-react";
import { useState } from "react";

// Mock Data
const mockLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-01-09T10:30:15Z",
    user_email: "admin@vesatio.com",
    action: "login",
    ip_address: "192.168.1.100",
    hash: "h1",
    previous_hash: "h0",
  },
  {
    id: "2",
    timestamp: "2024-01-09T10:35:22Z",
    user_email: "admin@vesatio.com",
    action: "create",
    table_name: "projects",
    record_id: "prj_001",
    metadata: { title: "Projeto Residencial Alpha" },
    hash: "h2",
    previous_hash: "h1",
  },
  {
    id: "3",
    timestamp: "2024-01-09T11:00:05Z",
    user_email: "operator@vesatio.com",
    action: "update",
    table_name: "production_orders",
    record_id: "po_299",
    old_data: { status: "planned" },
    new_data: { status: "in_progress" },
    hash: "h3",
    previous_hash: "h2",
  },
  {
    id: "4",
    timestamp: "2024-01-09T11:15:00Z",
    user_email: "unknown",
    action: "access_denied",
    ip_address: "10.0.0.55",
    hash: "h4",
    previous_hash: "h3",
  },
];

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");

  const getActionBadge = (action: LogAction) => {
    switch (action) {
      case "create":
        return <Badge className="border-green-500/20 bg-green-500/10 text-green-500">Criar</Badge>;
      case "update":
        return <Badge className="border-blue-500/20 bg-blue-500/10 text-blue-500">Editar</Badge>;
      case "delete":
        return <Badge className="border-red-500/20 bg-red-500/10 text-red-500">Eliminar</Badge>;
      case "login":
        return <Badge className="border-gold/20 bg-gold/10 text-gold">Login</Badge>;
      case "access_denied":
        return (
          <Badge className="border-red-700/20 bg-red-700/10 text-red-700">Acesso Negado</Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-white/10 text-diamond-muted">
            {action}
          </Badge>
        );
    }
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Auditoria Centralizada"
        description="Registo imutável de todas as ações no sistema."
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-white/10 text-diamond-muted hover:text-white"
          >
            <Download size={16} /> Exportar CSV
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
            size={14}
          />
          <Input
            placeholder="Pesquisar por utilizador, ID ou IP..."
            className="h-9 border-white/5 bg-onyx-900 pl-9 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger className="h-9 border-white/5 bg-onyx-900">
              <SelectValue placeholder="Ação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Ações</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="create">Criação</SelectItem>
              <SelectItem value="update">Edição</SelectItem>
              <SelectItem value="delete">Eliminação</SelectItem>
              <SelectItem value="access_denied">Acesso Negado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="h-9 border-white/5 bg-onyx-900">
              <SelectValue placeholder="Módulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Módulos</SelectItem>
              <SelectItem value="bi">BI</SelectItem>
              <SelectItem value="producao">Produção</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="h-9 border-white/5 bg-onyx-900">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Logs Table */}
      <Card className="overflow-hidden border-white/5 bg-onyx-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs font-semibold uppercase text-diamond-muted">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Utilizador</th>
                <th className="px-6 py-3">Ação</th>
                <th className="px-6 py-3">Contexto</th>
                <th className="px-6 py-3 text-right">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLogs.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-mono text-diamond-muted">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                        <User size={12} className="text-diamond-muted" />
                      </div>
                      <span className="text-white">{log.user_email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getActionBadge(log.action)}</td>
                  <td className="px-6 py-4 text-diamond-muted">
                    {log.table_name && (
                      <span className="mr-2 rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs">
                        {log.table_name}
                      </span>
                    )}
                    {log.ip_address && <span className="text-xs">{log.ip_address}</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-2 border border-transparent text-diamond-muted hover:border-white/10 hover:text-white"
                        >
                          <FileJson size={14} /> Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-onyx-950 max-w-2xl border-white/10 text-white">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Registo de Auditoria</DialogTitle>
                          <DialogDescription className="text-diamond-muted">
                            ID: <span className="font-mono text-gold">{log.id}</span>
                          </DialogDescription>
                        </DialogHeader>

                        <div className="my-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="block text-xs uppercase text-diamond-muted">
                                Utilizador
                              </span>
                              <span className="font-medium text-white">{log.user_email}</span>
                            </div>
                            <div>
                              <span className="block text-xs uppercase text-diamond-muted">
                                IP Address
                              </span>
                              <span className="font-mono text-white">{log.ip_address}</span>
                            </div>
                          </div>

                          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/50">
                            <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
                              <span className="text-xs font-bold uppercase text-diamond-muted">
                                Alterações de Dados (Diff)
                              </span>
                              <Badge variant="outline" className="border-white/10 text-[10px]">
                                JSON
                              </Badge>
                            </div>
                            <div className="overflow-x-auto p-4 font-mono text-xs">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <div className="mb-2 font-bold text-red-400 opacity-70">
                                    - ANTES
                                  </div>
                                  <pre className="text-red-300 opacity-80">
                                    {JSON.stringify(
                                      {
                                        status: "draft",
                                        budget: 15000,
                                      },
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                                <div className="space-y-1 border-l border-white/10 pl-4">
                                  <div className="mb-2 font-bold text-green-400 opacity-70">
                                    + DEPOIS
                                  </div>
                                  <pre className="text-green-300 opacity-80">
                                    {JSON.stringify(
                                      {
                                        status: "active",
                                        budget: 22500,
                                      },
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center border-t border-white/5 p-4">
          <Button variant="ghost" size="sm" className="text-diamond-muted">
            Carregar mais
          </Button>
        </div>
      </Card>
    </CoreLayout>
  );
}
