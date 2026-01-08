"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Client, mockClients } from "@/types/crm";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientsPage() {
    const router = useRouter();

    const columns: ColumnDef<Client>[] = [
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-xs text-diamond-muted">{row.getValue("code")}</span>,
        },
        {
            accessorKey: "name",
            header: "Nome / Empresa",
            cell: ({ row }) => {
                const isCompany = row.original.type === 'company';
                return (
                    <div className="flex items-center gap-3">
                         <Avatar className="w-8 h-8 border border-white/10">
                            <AvatarFallback className="text-xs bg-onyx-800 text-gold">
                                {row.original.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-white flex items-center gap-2">
                                {isCompany ? row.original.companyName : row.original.name}
                                {row.original.vip && (
                                    <Badge variant="outline" className="text-[9px] h-4 px-1 border-gold/30 text-gold bg-gold/5">VIP</Badge>
                                )}
                            </div>
                            <div className="text-xs text-diamond-muted">{row.original.email}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "country",
            header: "País",
        },
         {
            accessorKey: "activeProjects",
            header: "Projetos Ativos",
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("activeProjects") === 0 ? (
                        <span className="text-diamond-muted">-</span>
                    ) : (
                         <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/5">
                            {row.getValue("activeProjects")}
                        </Badge>
                    )}
                </div>
            )
        },
        {
            accessorKey: "totalSpent",
            header: "Total Faturado",
             cell: ({ row }) => (
                <span className="text-white font-mono text-xs">
                    {(row.getValue("totalSpent") as number).toLocaleString()} CVE
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        },
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Gestão de Clientes"
                description="Base de dados centralizada de clientes e entidades."
            >
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Download size={16} />
                        Exportar
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Novo Cliente
                    </Button>
                </div>
            </PageHeader>

            <DataGrid 
                columns={columns} 
                data={mockClients}
                searchKey="name"
                searchPlaceholder="Pesquisar por nome, email ou NIF..."
                addLabel="Novo Cliente"
                onAdd={() => {}} 
            />
        </CoreLayout>
    );
}
