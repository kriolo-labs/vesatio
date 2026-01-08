"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Employee, EmployeeStatus, mockEmployees } from "@/types/rh";
import { ColumnDef } from "@tanstack/react-table";
import {
  Download,
  LayoutGrid,
  List as ListIcon,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EmployeesPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter employees
  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: EmployeeStatus) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "inactive":
        return "bg-white/10 text-diamond-muted border-white/10";
      case "on_leave":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "terminated":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-white/10 text-diamond-muted border-white/10";
    }
  };

  const getStatusLabel = (status: EmployeeStatus) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "on_leave":
        return "Ausente";
      case "terminated":
        return "Desligado";
      default:
        return status;
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Colaborador",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarImage src={row.original.avatarUrl} />
            <AvatarFallback className="bg-onyx-800 text-xs">
              {row.original.firstName[0]}
              {row.original.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-diamond">
              {row.original.firstName} {row.original.lastName}
            </div>
            <div className="text-xs text-diamond-muted">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Cargo / Departamento",
      cell: ({ row }) => (
        <div>
          <div className="text-sm text-diamond">{row.original.role}</div>
          <div className="text-xs capitalize text-diamond-muted">{row.original.department}</div>
        </div>
      ),
    },
    {
      accessorKey: "admissionDate",
      header: "Data Admissão",
      cell: ({ row }) => (
        <div className="text-sm text-diamond-muted">
          {new Date(row.original.admissionDate).toLocaleDateString("pt-PT")}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contacto",
      cell: ({ row }) => <div className="text-sm text-diamond-muted">{row.original.phone}</div>,
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
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-diamond-muted hover:text-white"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-white/5 bg-onyx-900 text-diamond">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  href={`/core/rh/colaboradores/${row.original.id}`}
                  className="flex w-full items-center"
                >
                  Ver Ficha
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="text-rose-500 hover:text-rose-500">
                Desativar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Colaboradores"
        description="Gestão de recursos humanos e fichas de funcionários."
      >
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Link
            href="/core/rh/colaboradores/novo"
            className={cn(buttonVariants({ variant: "default" }), "bg-gold-gradient text-onyx")}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Colaborador
          </Link>
        </div>
      </PageHeader>

      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-white/5 bg-onyx-900/50 p-4 sm:flex-row">
        <div className="flex w-full flex-1 items-center gap-2 sm:w-auto">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-diamond-muted" />
            <Input
              placeholder="Pesquisar por nome, email ou cargo..."
              className="border-white/10 bg-onyx-900 pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px] border-white/10 bg-onyx-900">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent className="border-white/5 bg-onyx-900 text-diamond">
              <SelectItem value="all">Todos os Dept.</SelectItem>
              <SelectItem value="management">Gestão</SelectItem>
              <SelectItem value="engineering">Engenharia</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="sales">Vendas</SelectItem>
              <SelectItem value="operations">Operações</SelectItem>
              <SelectItem value="rh">RH</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] border-white/10 bg-onyx-900">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="border-white/5 bg-onyx-900 text-diamond">
              <SelectItem value="all">Todos os Estados</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="on_leave">Ausente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex rounded-md border border-white/10 bg-onyx-900 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={cn(
              "h-7 w-7 p-0",
              viewMode === "list" ? "bg-white/10 text-white" : "text-diamond-muted hover:text-white"
            )}
          >
            <ListIcon size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={cn(
              "h-7 w-7 p-0",
              viewMode === "grid" ? "bg-white/10 text-white" : "text-diamond-muted hover:text-white"
            )}
          >
            <LayoutGrid size={16} />
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <DataGrid columns={columns} data={filteredEmployees} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="group border-white/5 bg-onyx-900 p-6 transition-all hover:border-gold/20"
            >
              <div className="mb-4 flex items-start justify-between">
                <Badge variant="outline" className={getStatusColor(employee.status)}>
                  {getStatusLabel(employee.status)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-2 h-6 w-6 text-diamond-muted group-hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-white/5 bg-onyx-900 text-diamond"
                  >
                    <DropdownMenuItem>
                      <Link
                        href={`/core/rh/colaboradores/${employee.id}`}
                        className="flex w-full items-center"
                      >
                        Ver Ficha
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-6 flex flex-col items-center text-center">
                <Avatar className="mb-4 h-20 w-20 border-2 border-white/10">
                  <AvatarImage src={employee.avatarUrl} />
                  <AvatarFallback className="bg-onyx-800 text-xl">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium text-white">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="mb-1 text-sm text-gold">{employee.role}</p>
                <p className="text-xs uppercase tracking-wider text-diamond-muted">
                  {employee.department}
                </p>
              </div>

              <div className="space-y-3 border-t border-white/5 pt-4 text-sm">
                <div className="flex items-center text-diamond-muted">
                  <Mail className="mr-3 h-4 w-4 text-gold/50" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center text-diamond-muted">
                  <Phone className="mr-3 h-4 w-4 text-gold/50" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center text-diamond-muted">
                  <MapPin className="mr-3 h-4 w-4 text-gold/50" />
                  <span className="truncate">{employee.address}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/core/rh/colaboradores/${employee.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full border-white/5 bg-white/5 text-diamond hover:border-gold/20 hover:bg-gold/10 hover:text-gold"
                  )}
                >
                  Ver Perfil Completo
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
