"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { mockSubcontractors, Subcontractor, SubcontractorStatus } from "@/types/subcontractor";
import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, HardHat, MoreVertical, Plus, Search, Shield, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SubcontractorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSubcontractors = mockSubcontractors.filter((sub) => {
    const matchesSearch =
      sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = specialtyFilter === "all" || sub.specialty === specialtyFilter;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  // KPI Calculations
  const totalActive = mockSubcontractors.filter((s) => s.status === "active").length;
  const avgRating = (
    mockSubcontractors.reduce((acc, curr) => acc + curr.rating, 0) / mockSubcontractors.length
  ).toFixed(1);

  const getStatusColor = (status: SubcontractorStatus) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "inactive":
        return "bg-white/10 text-diamond-muted border-white/10";
      case "blacklisted":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  const getStatusLabel = (status: SubcontractorStatus) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "blacklisted":
        return "Bloqueado";
    }
  };

  const columns: ColumnDef<Subcontractor>[] = [
    {
      accessorKey: "companyName",
      header: "Empresa / Contacto",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-diamond">{row.original.companyName}</div>
          <div className="text-xs text-diamond-muted">{row.original.contactPerson}</div>
        </div>
      ),
    },
    {
      accessorKey: "specialty",
      header: "Especialidade",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="rounded border border-white/5 bg-white/5 p-1 text-xs capitalize text-diamond">
            {row.original.specialty}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Avaliação",
      cell: ({ row }) => (
        <div className="flex items-center text-gold">
          <Star size={14} className="mr-1 fill-gold" />
          <span>{row.original.rating}</span>
        </div>
      ),
    },
    {
      accessorKey: "insuranceValid",
      header: "Seguro",
      cell: ({ row }) =>
        row.original.insuranceValid ? (
          <Badge
            variant="outline"
            className="h-5 border-emerald-500/20 bg-emerald-500/10 px-1 text-[10px] text-emerald-500"
          >
            <Shield size={10} className="mr-1" /> Válido
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="h-5 border-rose-500/20 bg-rose-500/10 px-1 text-[10px] text-rose-500"
          >
            <AlertTriangle size={10} className="mr-1" /> Expirado
          </Badge>
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
              <DropdownMenuItem>
                <Link
                  href={`/core/rh/subcontratados/${row.original.id}`}
                  className="flex w-full items-center"
                >
                  Ver Ficha
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subcontratados"
        description="Gestão de fornecedores de serviços e avaliação de desempenho."
      >
        <Button className="border-0 bg-gold-gradient font-medium text-onyx">
          <Plus className="mr-2 h-4 w-4" /> Novo Subcontratado
        </Button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-white/5 bg-onyx-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-diamond-muted">
              Subcontratados Ativos
            </CardTitle>
            <HardHat size={16} className="text-gold opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="font-serif text-2xl text-white">{totalActive}</div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-onyx-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-diamond-muted">
              Avaliação Média Global
            </CardTitle>
            <Star size={16} className="text-gold opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="font-serif text-2xl text-white">{avgRating}</div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-onyx-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-diamond-muted">
              Alertas de Seguro
            </CardTitle>
            <AlertTriangle size={16} className="text-rose-500 opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="font-serif text-2xl text-rose-500">
              {mockSubcontractors.filter((s) => !s.insuranceValid && s.status === "active").length}
            </div>
            <p className="mt-1 text-xs text-rose-500/70">Seguros expirados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & List */}
      <div className="flex flex-col items-center gap-4 rounded-lg border border-white/5 bg-onyx-900/50 p-4 sm:flex-row">
        <div className="relative w-full max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-diamond-muted" />
          <Input
            placeholder="Pesquisar por empresa ou especialidade..."
            className="border-white/10 bg-onyx-900 pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger className="w-[180px] border-white/10 bg-onyx-900">
            <SelectValue placeholder="Especialidade" />
          </SelectTrigger>
          <SelectContent className="border-white/5 bg-onyx-900 text-diamond">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Eletricista">Eletricista</SelectItem>
            <SelectItem value="Canalizador">Canalizador</SelectItem>
            <SelectItem value="Serralharia">Serralharia</SelectItem>
            <SelectItem value="Pintor">Pintor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] border-white/10 bg-onyx-900">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="border-white/5 bg-onyx-900 text-diamond">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
            <SelectItem value="blacklisted">Bloqueado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataGrid columns={columns} data={filteredSubcontractors} />
    </div>
  );
}
