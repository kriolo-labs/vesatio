"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { mockTools, Tool, ToolCondition, ToolStatus } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, ArrowRight, CheckCircle2, Filter, Hammer, Plus, Wrench } from "lucide-react";

export default function ToolsPage() {
    
    const columns: ColumnDef<Tool>[] = [
       {
            accessorKey: "image",
            header: "",
             cell: ({ row }) => (
               <Avatar className="w-10 h-10 rounded border border-white/10">
                   <AvatarImage src={row.original.image} />
                   <AvatarFallback className="rounded bg-onyx-800 text-diamond-muted"><Hammer size={16}/></AvatarFallback>
               </Avatar>
            ),
        },
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-xs text-gold">{row.getValue("code")}</span>,
        },
         {
            accessorKey: "name",
            header: "Equipamento",
            cell: ({ row }) => (
                <div className="flex flex-col">
                     <span className="font-medium text-white">{row.getValue("name")}</span>
                     <span className="text-xs text-diamond-muted">
                        {row.original.brand} • {row.original.model}
                     </span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as ToolStatus;
                const config = {
                    available: { label: "Disponível", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    in_use: { label: "Em Uso", icon: Wrench, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    maintenance: { label: "Manutenção", icon: Wrench, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
                    lost: { label: "Perdido", icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/20" },
                }[status];
                
                const Icon = config.icon;
                
                return (
                     <Badge variant="outline" className={cn("gap-1 text-[10px] items-center pl-1 pr-2 uppercase", config.color)}>
                        <Icon size={12} /> {config.label}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "currentAssignee",
            header: "Detentor / Local",
            cell: ({ row }) => {
                 if (row.original.status !== 'in_use') return <span className="text-xs text-diamond-muted">-</span>;

                 return (
                    <div className="flex flex-col text-xs">
                        <span className="text-white font-medium">{row.original.currentAssignee?.name}</span>
                        <span className="text-diamond-muted">{row.original.currentProject?.name}</span>
                    </div>
                )
            },
        },
         {
            accessorKey: "condition",
            header: "Condição",
             cell: ({ row }) => {
                const cond = row.getValue("condition") as ToolCondition;
                const colors: Record<string, string> = {
                    new: "text-emerald-500",
                    good: "text-blue-500",
                    fair: "text-yellow-500",
                    poor: "text-orange-500",
                    broken: "text-red-500"
                };
                return <span className={cn("text-xs font-medium uppercase", colors[cond])}>{cond}</span>
            }
        },
        {
             id: "actions",
             header: "",
             cell: ({ row }) => {
                 if (row.original.status === 'available') {
                     return <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 gap-1"><ArrowRight size={10}/> Check-out</Button>
                 }
                 if (row.original.status === 'in_use') {
                      return <Button variant="ghost" size="sm" className="h-6 text-[10px] text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 gap-1"><CheckCircle2 size={10}/> Check-in</Button>
                 }
                 return null;
             }
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Gestão de Ferramentas"
                description="Controle de equipamentos, check-in e check-out."
            >
                <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Nova Ferramenta
                    </Button>
                </div>
            </PageHeader>

            <DataGrid 
                columns={columns} 
                data={mockTools}
                searchKey="name"
                searchPlaceholder="Pesquisar ferramenta..." 
            />
        </CoreLayout>
    );
}
