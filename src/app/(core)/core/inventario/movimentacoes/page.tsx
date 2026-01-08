"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { mockMovements, MovementType, StockMovement } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Download, Filter, Plus, RefreshCw } from "lucide-react";

export default function StockMovementsPage() {
    
    const columns: ColumnDef<StockMovement>[] = [
       {
            accessorKey: "date",
            header: "Data",
            cell: ({ row }) => <span className="text-xs text-diamond-muted font-mono">{new Date(row.getValue("date")).toLocaleString()}</span>,
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => {
                const type = row.getValue("type") as MovementType;
                const config = {
                    in: { label: "Entrada", icon: ArrowDownLeft, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    out: { label: "Saída", icon: ArrowUpRight, color: "text-red-500 bg-red-500/10 border-red-500/20" },
                    transfer: { label: "Transf.", icon: ArrowRight, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    adjustment: { label: "Ajuste", icon: RefreshCw, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
                }[type];
                
                const Icon = config.icon;
                
                return (
                    <Badge variant="outline" className={cn("gap-1 text-[10px] items-center pl-1 pr-2 uppercase", config.color)}>
                        <Icon size={12} /> {config.label}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "productName",
            header: "Produto",
            cell: ({ row }) => (
                <div>
                     <span className="font-medium text-white">{row.getValue("productName")}</span>
                     <div className="text-[10px] font-mono text-gold">{row.original.sku}</div>
                </div>
            ),
        },
        {
            accessorKey: "quantity",
            header: "Qtd.",
            cell: ({ row }) => {
                 const type = row.original.type;
                 const isPositive = type === 'in' || (type === 'adjustment' && row.original.quantity > 0);
                 const color = isPositive ? "text-emerald-500" : (type === 'transfer' ? "text-blue-500" : "text-red-500");
                 const sign = isPositive ? "+" : (type === 'transfer' ? "" : "-");
                 
                 return <span className={cn("font-bold font-mono", color)}>{sign}{Math.abs(row.original.quantity)}</span>
            },
        },
        {
            accessorKey: "fromWarehouseName",
            header: "Origem / Destino",
             cell: ({ row }) => (
                <div className="flex flex-col text-xs">
                    {row.original.fromWarehouseName && (
                        <span className="text-diamond-muted">De: <span className="text-white">{row.original.fromWarehouseName}</span></span>
                    )}
                    {row.original.toWarehouseName && (
                         <span className="text-diamond-muted">Para: <span className="text-white">{row.original.toWarehouseName}</span></span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "reference",
            header: "Referência",
            cell: ({ row }) => <span className="text-xs text-diamond-muted">{row.getValue("reference") || "-"}</span>,
        },
         {
            accessorKey: "performedBy",
            header: "Utilizador",
            cell: ({ row }) => <span className="text-xs text-white">{row.getValue("performedBy")}</span>,
        },
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Movimentações de Stock"
                description="Histórico completo de entradas, saídas e transferências."
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
                        Nova Movimentação
                    </Button>
                </div>
            </PageHeader>

            <DataGrid 
                columns={columns} 
                data={mockMovements}
                searchKey="productName"
                searchPlaceholder="Pesquisar por produto, referência..." 
            />
        </CoreLayout>
    );
}
