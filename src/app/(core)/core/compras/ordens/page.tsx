"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { mockPOs, POStatus, PurchaseOrder } from "@/types/purchasing";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, BoxSelect, CheckCircle2, FileEdit, Filter, Plus, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PurchaseOrdersPage() {
    const router = useRouter();

    const columns: ColumnDef<PurchaseOrder>[] = [
       {
            accessorKey: "code",
            header: "PO #",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-mono text-gold font-medium text-xs">{row.getValue("code")}</span>
                    <span className="text-[10px] text-diamond-muted">{new Date(row.original.date).toLocaleDateString()}</span>
                </div>
            )
        },
        {
            accessorKey: "supplierName",
            header: "Fornecedor",
             cell: ({ row }) => (
               <div className="flex flex-col">
                    <span className="text-white text-xs font-medium">{row.getValue("supplierName")}</span>
               </div>
            ),
        },
        {
            accessorKey: "items",
            header: "Itens",
            cell: ({ row }) => <span className="text-xs text-diamond-muted">{row.original.items.length} itens</span>,
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => <span className="text-xs font-mono font-bold text-white">{formatCurrency(row.original.total)}</span>,
        },
        {
            accessorKey: "status",
             header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as POStatus;
                const config = {
                    draft: { label: "Rascunho", icon: FileEdit, color: "text-diamond-muted bg-white/5 border-white/10" },
                    sent: { label: "Enviada", icon: CheckCircle2, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    partial_received: { label: "Parcial", icon: BoxSelect, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
                    closed: { label: "Recebido", icon: Truck, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    cancelled: { label: "Cancelada", icon: Filter, color: "text-red-500 bg-red-500/10 border-red-500/20" },
                }[status];
                
                const Icon = config?.icon || Filter;
                
                return (
                     <Badge variant="outline" className={cn("text-[10px] items-center gap-1 pl-1 pr-2 uppercase", config?.color)}>
                        <Icon size={10} /> {config?.label}
                    </Badge>
                )
            },
        },
         {
             id: "actions",
             header: "",
             cell: ({ row }) => (
                 <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-diamond-muted hover:text-white" onClick={() => router.push(`/core/compras/ordens/${row.original.id}`)}>
                     <ArrowRight size={14} />
                 </Button>
             )
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Ordens de Compra (PO)"
                description="Gestão de encomendas a fornecedores."
            >
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    
                    <Button size="sm" className="btn-primary gap-2" onClick={() => router.push('/core/compras/ordens/nova')}>
                        <Plus size={16} />
                        Nova Ordem
                    </Button>
                </div>
            </PageHeader>
            
            <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-onyx-900 border border-white/5 text-diamond-muted hover:text-white text-xs font-medium cursor-pointer whitespace-nowrap transition-colors">
                    Rascunhos (2)
                </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium cursor-pointer whitespace-nowrap">
                   Enviadas / Aguardando Entrega (5)
                </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-onyx-900 border border-white/5 text-diamond-muted hover:text-white text-xs font-medium cursor-pointer whitespace-nowrap transition-colors">
                    Atrasadas (1)
                </div>
            </div>

            <DataGrid 
                columns={columns} 
                data={mockPOs}
                searchKey="code"
                searchPlaceholder="Pesquisar PO..." 
            />
        </CoreLayout>
    );
}
