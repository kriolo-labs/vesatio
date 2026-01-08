"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn, formatCurrency } from "@/lib/utils";
import { categoryLabels, mockProducts, Product } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Filter, Package, Plus, Upload } from "lucide-react";

export default function ProductsPage() {
    
    // Status Badge Component logic specific for inventory
    const StockStatusBadge = ({ status, quantity, min }: { status: string, quantity: number, min: number }) => {
        let color = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        let label = "Em Stock";
        
        if (quantity === 0) {
             color = "bg-red-500/10 text-red-500 border-red-500/20";
             label = "Sem Stock";
        } else if (quantity <= min) {
             color = "bg-orange-500/10 text-orange-500 border-orange-500/20";
             label = "Stock Baixo";
        }

        return <Badge variant="outline" className={cn("text-[10px] uppercase font-mono", color)}>{label}</Badge>
    };

    const columns: ColumnDef<Product>[] = [
         {
            accessorKey: "image",
            header: "",
            cell: ({ row }) => (
               <Avatar className="w-10 h-10 rounded border border-white/10">
                   <AvatarImage src={row.original.image} />
                   <AvatarFallback className="rounded bg-onyx-800 text-diamond-muted"><Package size={16}/></AvatarFallback>
               </Avatar>
            ),
        },
        {
            accessorKey: "sku",
            header: "SKU",
            cell: ({ row }) => <span className="font-mono text-xs text-gold">{row.getValue("sku")}</span>,
        },
        {
            accessorKey: "name",
            header: "Produto",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-white">{row.getValue("name")}</span>
                    <span className="text-xs text-diamond-muted">
                        {categoryLabels[row.original.category]} • {row.original.subCategory}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "stockTotal",
            header: "Stock",
            cell: ({ row }) => (
                <div className="flex flex-col items-start gap-1">
                     <span className="font-mono text-sm font-bold text-white">{row.getValue("stockTotal")} <span className="text-[10px] font-normal text-diamond-muted">{row.original.unit}</span></span>
                     <StockStatusBadge status={row.original.stockStatus} quantity={row.original.stockTotal} min={row.original.stockMinimum} />
                </div>
            ),
        },
        {
            accessorKey: "averageCost",
            header: "Custo Médio",
             cell: ({ row }) => (
                <span className="text-xs text-diamond-muted font-mono">
                    {formatCurrency(row.getValue("averageCost"))}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Estado",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        },
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Catálogo de Produtos"
                description="Gestão centralizada de materiais e equipamentos."
            >
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Upload size={16} />
                        Importar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                         <Download size={16} />
                        Exportar
                    </Button>
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white md:hidden">
                        <Filter size={16} />
                    </Button>
                    
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Novo Produto
                    </Button>
                </div>
            </PageHeader>

            <DataGrid 
                columns={columns} 
                data={mockProducts}
                searchKey="name"
                searchPlaceholder="Pesquisar por nome, SKU ou categoria..." 
            />
        </CoreLayout>
    );
}
