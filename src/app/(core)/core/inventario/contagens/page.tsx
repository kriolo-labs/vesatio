"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { cn, formatCurrency } from "@/lib/utils";
import { CountStatus, CountType, InventoryCount, mockCounts } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Calendar, CheckCircle2, ClipboardCheck, Clock, FileBarChart, Filter, Plus } from "lucide-react";

export default function InventoryCountsPage() {
    
    const columns: ColumnDef<InventoryCount>[] = [
       {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-xs text-gold">{row.getValue("code")}</span>,
        },
        {
            accessorKey: "warehouseName",
            header: "Armazém",
            cell: ({ row }) => <span className="text-sm text-white">{row.getValue("warehouseName")}</span>,
        },
         {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => {
                const type = row.getValue("type") as CountType;
                const labels = { full: "Completa", partial: "Parcial", cyclic: "Cíclica" };
                return <span className="text-xs text-diamond-muted">{labels[type]}</span>
            },
        },
        {
            accessorKey: "status",
             header: "Estado",
            cell: ({ row }) => {
                const status = row.getValue("status") as CountStatus;
                const config = {
                    planned: { label: "Planeada", icon: Calendar, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    in_progress: { label: "Em Curso", icon: Clock, color: "text-gold bg-gold/10 border-gold/20" },
                    review: { label: "Revisão", icon: AlertTriangle, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
                    completed: { label: "Concluída", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
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
            accessorKey: "progress",
            header: "Progresso",
            cell: ({ row }) => {
                const percent = Math.round((row.original.countedItems / row.original.totalItems) * 100);
                return (
                    <div className="w-24">
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-white">{percent}%</span>
                            <span className="text-diamond-muted">{row.original.countedItems}/{row.original.totalItems}</span>
                        </div>
                        <div className="h-1 bg-onyx-900 rounded-full overflow-hidden">
                            <div className="h-full bg-gold rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "plannedDate",
            header: "Planeado",
            cell: ({ row }) => <span className="text-xs text-diamond-muted font-mono">{new Date(row.getValue("plannedDate")).toLocaleDateString()}</span>,
        },
        {
             id: "actions",
             header: "",
             cell: ({ row }) => (
                 <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-diamond-muted hover:text-white">
                     <FileBarChart size={14} />
                 </Button>
             )
        }

    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Contagens e Auditorias"
                description="Gestão de inventários físicos, cíclicos e reconciliações."
            >
                <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Nova Contagem
                    </Button>
                </div>
            </PageHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-diamond-muted">Precisão de Stock (Global)</p>
                        <p className="text-2xl font-bold text-emerald-500 mt-1">98.5%</p>
                    </div>
                    <div className="p-2 bg-emerald-500/10 rounded text-emerald-500">
                        <ClipboardCheck size={24} />
                    </div>
                </Card>
                 <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-diamond-muted">Último Ajuste (Valor)</p>
                        <p className="text-2xl font-bold text-red-500 mt-1">{formatCurrency(-1250)}</p>
                    </div>
                     <div className="p-2 bg-red-500/10 rounded text-red-500">
                        <AlertTriangle size={24} />
                    </div>
                </Card>
                 <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-diamond-muted">Próximo Inventário Geral</p>
                        <p className="text-base font-bold text-white mt-1">30 Junho 2024</p>
                    </div>
                     <div className="p-2 bg-blue-500/10 rounded text-blue-500">
                        <Calendar size={24} />
                    </div>
                </Card>
            </div>

            <DataGrid 
                columns={columns} 
                data={mockCounts}
                searchKey="code"
                searchPlaceholder="Pesquisar contagem..." 
            />
        </CoreLayout>
    );
}
