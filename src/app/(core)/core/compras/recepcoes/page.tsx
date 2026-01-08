"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { GoodsReceipt, mockReceipts, ReceiptStatus } from "@/types/purchasing";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, ClipboardCheck, Filter, PackageCheck, Plus, Truck, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoodsReceiptPage() {
    const router = useRouter();

    const columns: ColumnDef<GoodsReceipt>[] = [
       {
            accessorKey: "code",
            header: "Guia Entrada",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-mono text-gold font-medium text-xs">{row.getValue("code")}</span>
                    <span className="text-[10px] text-diamond-muted">{new Date(row.original.date).toLocaleDateString()}</span>
                </div>
            )
        },
        {
            accessorKey: "poCode",
            header: "Ref. PO",
             cell: ({ row }) => <span className="text-white text-xs font-mono">{row.getValue("poCode")}</span>,
        },
        {
            accessorKey: "supplierName",
            header: "Fornecedor",
            cell: ({ row }) => <span className="text-xs text-white">{row.getValue("supplierName")}</span>,
        },
        {
            accessorKey: "items",
            header: "Qtd. Itens",
            cell: ({ row }) => <span className="text-xs text-diamond-muted">{row.original.items.length} itens</span>,
        },
        {
            accessorKey: "status",
             header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as ReceiptStatus;
                const config = {
                    received: { label: "Recebido", icon: Truck, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    inspected: { label: "Inspecionado", icon: ClipboardCheck, color: "text-gold bg-gold/10 border-gold/20" },
                    stocked: { label: "Em Stock", icon: PackageCheck, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    returned_partially: { label: "Devolução Parc.", icon: XCircle, color: "text-red-500 bg-red-500/10 border-red-500/20" },
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
                 <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-diamond-muted hover:text-white" onClick={() => {}}>
                     <ArrowRight size={14} />
                 </Button>
             )
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Receção de Mercadorias"
                description="Entradas de stock e conferência de entregas."
            >
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    
                    <Button size="sm" className="btn-primary gap-2" onClick={() => router.push('/core/compras/recepcoes/nova')}>
                        <Plus size={16} />
                        Nova Receção
                    </Button>
                </div>
            </PageHeader>
            
            <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium cursor-pointer whitespace-nowrap">
                    Aguardando Inspeção (2)
                </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-onyx-900 border border-white/5 text-diamond-muted hover:text-white text-xs font-medium cursor-pointer whitespace-nowrap transition-colors">
                    Devoluções Pendentes (1)
                </div>
            </div>

            <DataGrid 
                columns={columns} 
                data={mockReceipts}
                searchKey="code"
                searchPlaceholder="Pesquisar Guia, PO..." 
            />
        </CoreLayout>
    );
}
