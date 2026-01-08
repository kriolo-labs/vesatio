"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { mockRequisitions, Requisition, RequisitionPriority, RequisitionStatus } from "@/types/purchasing";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, CheckCircle2, Clock, FileText, Filter, Plus, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RequisitionsPage() {
    const router = useRouter();

    const columns: ColumnDef<Requisition>[] = [
       {
            accessorKey: "code",
            header: "Referência",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-mono text-gold text-xs">{row.getValue("code")}</span>
                    <span className="text-[10px] text-diamond-muted">{new Date(row.original.date).toLocaleDateString()}</span>
                </div>
            )
        },
        {
            accessorKey: "requestedBy",
            header: "Solicitante",
             cell: ({ row }) => (
               <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white/10 rounded-full">
                        <AvatarFallback className="rounded-full bg-onyx-800 text-[10px] text-diamond-muted">
                            {row.original.requestedBy.name.substring(0, 1)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-xs text-white">{row.original.requestedBy.name}</span>
                        <span className="text-[10px] text-diamond-muted">{row.original.requestedBy.department}</span>
                    </div>
               </div>
            ),
        },
        {
            accessorKey: "projectName",
            header: "Projeto / Dept.",
            cell: ({ row }) => <span className="text-xs text-white">{row.getValue("projectName") || row.original.department || "-"}</span>,
        },
        {
            accessorKey: "items",
            header: "Itens",
            cell: ({ row }) => <span className="text-xs text-diamond-muted">{row.original.items.length} itens</span>,
        },
        {
            accessorKey: "priority",
            header: "Prioridade",
            cell: ({ row }) => {
                const priority = row.getValue("priority") as RequisitionPriority;
                const config = {
                    normal: { label: "Normal", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    urgent: { label: "Urgente", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
                    critical: { label: "Crítica", color: "text-red-500 bg-red-500/10 border-red-500/20" },
                }[priority];
                
                return (
                     <Badge variant="outline" className={cn("text-[10px] px-1.5 uppercase", config.color)}>
                        {config.label}
                    </Badge>
                )
            },
        },
         {
            accessorKey: "totalEstimated",
            header: "Valor Est.",
            cell: ({ row }) => <span className="text-xs font-mono text-diamond-muted">{formatCurrency(row.original.totalEstimated)}</span>,
        },
        {
            accessorKey: "status",
             header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as RequisitionStatus;
                const config = {
                    draft: { label: "Rascunho", icon: FileText, color: "text-diamond-muted bg-white/5 border-white/10" },
                    pending_approval: { label: "Pendente", icon: Clock, color: "text-gold bg-gold/10 border-gold/20" },
                    approved: { label: "Aprovada", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    rejected: { label: "Rejeitada", icon: XCircle, color: "text-red-500 bg-red-500/10 border-red-500/20" },
                    converted: { label: "Convertida (PO)", icon: ArrowRight, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                }[status];
                
                const Icon = config.icon;
                
                return (
                     <Badge variant="outline" className={cn("text-[10px] items-center gap-1 pl-1 pr-2 uppercase", config.color)}>
                        <Icon size={10} /> {config.label}
                    </Badge>
                )
            },
        },
         {
             id: "actions",
             header: "",
             cell: ({ row }) => (
                 <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-diamond-muted hover:text-white">
                     <ArrowRight size={14} />
                 </Button>
             )
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Requisições de Compra"
                description="Solicitações internas de material e serviços."
            >
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    
                    <Button size="sm" className="btn-primary gap-2" onClick={() => router.push('/core/compras/requisicoes/nova')}>
                        <Plus size={16} />
                        Criar Requisição
                    </Button>
                </div>
            </PageHeader>
            
            <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium cursor-pointer whitespace-nowrap">
                    <Clock size={12}/> Pendentes de Aprovação (3)
                </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-onyx-900 border border-white/5 text-diamond-muted hover:text-white text-xs font-medium cursor-pointer whitespace-nowrap transition-colors">
                    <CheckCircle2 size={12}/> Minhas Aprovadas
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-onyx-900 border border-white/5 text-diamond-muted hover:text-white text-xs font-medium cursor-pointer whitespace-nowrap transition-colors">
                    Urgent / Críticas
                </div>
            </div>

            <DataGrid 
                columns={columns} 
                data={mockRequisitions}
                searchKey="code"
                searchPlaceholder="Pesquisar por código, projeto..." 
            />
        </CoreLayout>
    );
}
