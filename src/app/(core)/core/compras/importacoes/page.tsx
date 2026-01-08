"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { ImportStatus, mockImports } from "@/types/imports";
import { ColumnDef } from "@tanstack/react-table";
import { Anchor, ArrowRight, Download, Filter, Package, Plane, Plus, Ship, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function getStatusColor(status: ImportStatus) {
    switch (status) {
        case "draft": return "text-diamond-muted border-diamond-muted/20 bg-diamond-muted/10";
        case "payment_pending": return "text-orange-500 border-orange-500/20 bg-orange-500/10";
        case "production": return "text-blue-500 border-blue-500/20 bg-blue-500/10";
        case "ready_to_ship": return "text-indigo-500 border-indigo-500/20 bg-indigo-500/10";
        case "shipped": return "text-purple-500 border-purple-500/20 bg-purple-500/10";
        case "in_transit": return "text-blue-400 border-blue-400/20 bg-blue-400/10";
        case "arrived": return "text-teal-500 border-teal-500/20 bg-teal-500/10";
        case "customs_clearance": return "text-orange-400 border-orange-400/20 bg-orange-400/10";
        case "released": return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
        case "delivered": return "text-emerald-600 border-emerald-600/20 bg-emerald-600/10";
        case "cancelled": return "text-red-500 border-red-500/20 bg-red-500/10";
        default: return "text-diamond-muted";
    }
}

function getStatusLabel(status: ImportStatus) {
    switch (status) {
        case "draft": return "Rascunho";
        case "payment_pending": return "Pagamento Pendente";
        case "production": return "Em Produção";
        case "ready_to_ship": return "Pronto p/ Embarque";
        case "shipped": return "Embarcado";
        case "in_transit": return "Em Trânsito";
        case "arrived": return "Chegou ao Destino";
        case "customs_clearance": return "Despacho Aduaneiro";
        case "released": return "Liberado";
        case "delivered": return "Entregue";
        case "cancelled": return "Cancelado";
        default: return status;
    }
}

function getTransportIcon(type: string) {
    switch (type) {
        case "sea": return <Ship size={14} />;
        case "air": return <Plane size={14} />;
        case "road": return <Truck size={14} />;
        default: return <Package size={14} />;
    }
}

export default function ImportsListPage() {
    const router = useRouter();

    const columns: ColumnDef<typeof mockImports[0]>[] = [
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-gold font-medium text-xs">{row.getValue("code")}</span>
        },
        {
            accessorKey: "supplierName",
            header: "Fornecedor",
            cell: ({ row }) => <span className="text-white text-xs">{row.getValue("supplierName")}</span>
        },
        {
            accessorKey: "originCountry",
            header: "Origem",
             cell: ({ row }) => (
                <div className="flex items-center gap-2 text-diamond-muted text-xs">
                    {row.original.originCountry} <ArrowRight size={10} /> {row.original.destinationPort}
                </div>
            )
        },
        {
            accessorKey: "transportType",
            header: "Via",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs text-white">
                    {getTransportIcon(row.getValue("transportType"))}
                    <span className="capitalize">{row.getValue("transportType")}</span>
                </div>
            )
        },
        {
            accessorKey: "eta",
            header: "ETA",
             cell: ({ row }) => <span className="text-white text-xs font-mono">{new Date(row.getValue("eta")).toLocaleDateString()}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant="outline" className={cn("text-[10px] h-5", getStatusColor(row.getValue("status")))}>
                    {getStatusLabel(row.getValue("status"))}
                </Badge>
            )
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 hover:bg-white/5"
                    onClick={() => router.push(`/core/compras/importacoes/${row.original.id}`)}
                >
                    <ArrowRight size={14} className="text-diamond-muted" />
                </Button>
            )
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Processos de Importação"
                description="Listagem e gestão de importações internacionais."
            >
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-white/10 text-diamond-muted hover:text-white">
                        <Filter size={16} /> Filtros
                    </Button>
                     <Button variant="outline" className="gap-2 border-white/10 text-diamond-muted hover:text-white">
                        <Download size={16} /> Exportar
                    </Button>
                    <Link href="/core/compras/importacoes/nova">
                        <Button className="btn-primary gap-2">
                            <Plus size={16} /> Nova Importação
                        </Button>
                    </Link>
                </div>
            </PageHeader>

            {/* KPIs */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                            <Ship size={20} />
                        </div>
                        <Badge variant="outline" className="border-blue-500/20 text-blue-500 text-[10px]">2 Chegando</Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">3</div>
                        <div className="text-xs text-diamond-muted">Em Trânsito</div>
                    </div>
                </Card>

                 <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                         <div className="p-2 rounded bg-emerald-500/10 text-emerald-500">
                            <Anchor size={20} />
                        </div>
                    </div>
                    <div>
                         <div className="text-2xl font-bold text-white font-mono">1</div>
                        <div className="text-xs text-diamond-muted">Despacho Aduaneiro</div>
                    </div>
                </Card>

                 <Card className="p-4 bg-onyx-900 border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded bg-orange-500/10 text-orange-500">
                            <Filter size={20} /> {/* Used as 'Pending' icon equivalent */}
                        </div>
                         <Badge variant="outline" className="border-orange-500/20 text-orange-500 text-[10px]">+2 dias</Badge>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white font-mono">1</div>
                        <div className="text-xs text-diamond-muted">Atrasados</div>
                    </div>
                </Card>
            </div>

            <DataGrid 
                columns={columns} 
                data={mockImports} 
                searchKey="code"
            />
        </CoreLayout>
    );
}
