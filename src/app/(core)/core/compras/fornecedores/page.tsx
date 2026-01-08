"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { mockSuppliers, Supplier, SupplierStatus, SupplierType } from "@/types/purchasing";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Filter, Globe, MapPin, MoreHorizontal, Plus, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuppliersPage() {
    const router = useRouter();

    const columns: ColumnDef<Supplier>[] = [
       {
            accessorKey: "name",
            header: "Fornecedor",
             cell: ({ row }) => (
               <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-white/10 rounded-md">
                        <AvatarImage src={row.original.logo} />
                        <AvatarFallback className="rounded-md bg-onyx-800 font-bold text-diamond-muted">
                            {row.original.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium text-white">{row.getValue("name")}</div>
                        <div className="text-[10px] text-diamond-muted flex items-center gap-1">
                            {row.original.type === 'international' ? <Globe size={10} className="text-blue-400"/> : <MapPin size={10} className="text-emerald-400"/>}
                            {row.original.city}, {row.original.country}
                        </div>
                    </div>
               </div>
            ),
        },
        {
            accessorKey: "code",
            header: "Código / NIF",
            cell: ({ row }) => (
                <div className="flex flex-col text-xs">
                    <span className="font-mono text-gold">{row.original.code}</span>
                    <span className="text-diamond-muted">{row.original.taxId}</span>
                </div>
            )
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => {
                const type = row.getValue("type") as SupplierType;
                return (
                     <Badge variant="outline" className={cn("text-[10px] items-center uppercase", type === 'national' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-blue-500 border-blue-500/20 bg-blue-500/10")}>
                        {type === 'national' ? 'Nacional' : 'Internacional'}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "categories",
            header: "Categorias",
            cell: ({ row }) => (
                <div className="flex gap-1 flex-wrap">
                    {row.original.categories.slice(0, 2).map(cat => (
                         <Badge key={cat} variant="secondary" className="text-[9px] h-4 px-1 bg-white/5 border-white/10 text-diamond-muted">
                            {cat}
                        </Badge>
                    ))}
                    {row.original.categories.length > 2 && (
                         <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-white/5 border-white/10 text-diamond-muted">
                            +{row.original.categories.length - 2}
                        </Badge>
                    )}
                </div>
            )
        },
        {
            accessorKey: "rating",
            header: "Rating",
            cell: ({ row }) => (
                <div className="flex text-gold">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            size={12} 
                            className={star <= row.original.rating ? "fill-gold" : "text-onyx-700"} 
                        />
                    ))}
                </div>
            )
        },
        {
            accessorKey: "totalPurchased",
            header: "Total Compras",
            cell: ({ row }) => (
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-white">{formatCurrency(row.original.totalPurchased)}</span>
                    <span className="text-[10px] text-diamond-muted">{row.original.currency}</span>
                </div>
            )
        },
        {
            accessorKey: "status",
             header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as SupplierStatus;
                const config = {
                    active: { label: "Ativo", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    inactive: { label: "Inativo", color: "text-diamond-muted bg-white/5 border-white/10" },
                    blocked: { label: "Bloqueado", color: "text-red-500 bg-red-500/10 border-red-500/20" },
                }[status];
                
                return (
                     <Badge variant="outline" className={cn("text-[10px] items-center pl-2 pr-2 uppercase", config.color)}>
                        {config.label}
                    </Badge>
                )
            },
        },
         {
             id: "actions",
             header: "",
             cell: ({ row }) => (
                 <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-diamond-muted hover:text-white" onClick={() => router.push(`/core/compras/fornecedores/${row.original.id}`)}>
                     <MoreHorizontal size={16} />
                 </Button>
             )
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Fornecedores"
                description="Gestão da cadeia de fornecimento e parceiros."
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
                        Novo Fornecedor
                    </Button>
                </div>
            </PageHeader>

            <DataGrid 
                columns={columns} 
                data={mockSuppliers}
                searchKey="name"
                searchPlaceholder="Pesquisar por nome, NIF..." 
            />
        </CoreLayout>
    );
}
