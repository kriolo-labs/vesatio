"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { AdminUser, UserStatus } from "@/types/admin";
import { Check, Mail, MoreVertical, Plus, Search, Shield, User, UserX } from "lucide-react";
import { useState } from "react";

// Mock Data
const mockUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@vesatio.com",
    name: "Administrador Sistema",
    role: "admin",
    department: "IT",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
    last_login: "2024-01-09T12:00:00Z",
  },
  {
    id: "2",
    email: "joao.silva@vesatio.com",
    name: "João Silva",
    role: "manager",
    department: "Produção",
    status: "active",
    created_at: "2023-02-15T00:00:00Z",
    last_login: "2024-01-09T08:30:00Z",
  },
  {
    id: "3",
    email: "ana.costa@vesatio.com",
    name: "Ana Costa",
    role: "staff",
    department: "Financeiro",
    status: "inactive",
    created_at: "2023-06-10T00:00:00Z",
    last_login: "2023-12-20T17:00:00Z",
  },
  {
    id: "4",
    email: "carlos.cliente@gmail.com",
    name: "Carlos Cliente",
    role: "client",
    status: "active",
    created_at: "2023-11-05T00:00:00Z",
    last_login: "2024-01-08T14:20:00Z",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return <Badge className="border-green-500/20 bg-green-500/10 text-green-500">Ativo</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspenso</Badge>;
      case "invited":
        return (
          <Badge variant="outline" className="border-gold/30 text-gold">
            Convidado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-500"
          >
            <Shield size={10} className="mr-1" /> Admin
          </Badge>
        );
      case "manager":
        return (
          <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
            Gerente
          </Badge>
        );
      case "client":
        return (
          <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500">
            Cliente
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-white/10 text-diamond-muted">
            Staff
          </Badge>
        );
    }
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Gestão de Utilizadores"
        description="Administração de contas, permissões e acesso ao sistema."
      >
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-primary gap-2">
                <Plus size={16} /> Novo Utilizador
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-onyx-950 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Criar Novo Utilizador</DialogTitle>
                <DialogDescription className="text-diamond-muted">
                  Preencha os dados básicos. Um email de convite será enviado.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input placeholder="Ex: Maria Santos" className="border-white/10 bg-onyx-900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      placeholder="email@vesatio.com"
                      className="border-white/10 bg-onyx-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Função (Role)</Label>
                    <Select>
                      <SelectTrigger className="border-white/10 bg-onyx-900">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="manager">Gerente</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Departamento</Label>
                    <Select>
                      <SelectTrigger className="border-white/10 bg-onyx-900">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                        <SelectItem value="producao">Produção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="btn-primary w-full">
                  Enviar Convite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full gap-4 md:w-auto">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
              size={14}
            />
            <Input
              placeholder="Pesquisar utilizadores..."
              className="h-9 border-white/5 bg-onyx-900 pl-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="h-9 w-[150px] border-white/5 bg-onyx-900">
              <SelectValue placeholder="Função" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Funções</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="manager">Gerente</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="client">Cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden border-white/5 bg-onyx-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs font-semibold uppercase text-diamond-muted">
              <tr>
                <th className="px-6 py-3">Utilizador</th>
                <th className="px-6 py-3">Função</th>
                <th className="px-6 py-3">Departamento</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Último Acesso</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="bg-onyx-800 text-xs">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-diamond-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 text-diamond-muted">{user.department || "-"}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 font-mono text-xs text-diamond-muted">
                    {user.last_login ? new Date(user.last_login).toLocaleString() : "Nunca"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-diamond-muted hover:text-white"
                        >
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 border-white/10 bg-onyx-900 text-white"
                      >
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                          <User size={14} className="mr-2" /> Editar Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                          <Mail size={14} className="mr-2" /> Resetar Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        {user.status === "active" ? (
                          <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10">
                            <UserX size={14} className="mr-2" /> Desativar Conta
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="cursor-pointer text-green-400 hover:bg-green-500/10 hover:text-green-300 focus:bg-green-500/10">
                            <Check size={14} className="mr-2" /> Reativar Conta
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </CoreLayout>
  );
}
