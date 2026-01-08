"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { mockPOs, mockRequisitions } from "@/types/purchasing";
import { ColumnDef } from "@tanstack/react-table";
import { Check, CheckCircle2, Clock, FileText, ShoppingCart, X } from "lucide-react";

export default function ApprovalsPage() {
    // Mock Data for Approvals
    const pendingRequisitions = mockRequisitions.filter(r => r.status === 'pending_approval');
    const pendingPOs = mockPOs.filter(p => p.status === 'draft'); // Assuming 'draft' needs approval to become 'sent'

    const reqColumns: ColumnDef<typeof mockRequisitions[0]>[] = [
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-gold font-medium text-xs">{row.getValue("code")}</span>
        },
        {
            accessorKey: "requesterName",
            header: "Requerente",
            cell: ({ row }) => <span className="text-white text-xs">{row.getValue("requesterName")}</span>
        },
         {
            accessorKey: "projectCode",
            header: "Projeto",
            cell: ({ row }) => <span className="text-diamond-muted text-xs">{row.getValue("projectCode")}</span>
        },
        {
            accessorKey: "items",
            header: "Resumo",
             cell: ({ row }) => <span className="text-diamond-muted text-xs">{row.original.items.length} itens</span>
        },
         {
            accessorKey: "date",
            header: "Data",
             cell: ({ row }) => <span className="text-diamond-muted text-xs">{new Date(row.getValue("date")).toLocaleDateString()}</span>
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full">
                        <Check size={14} />
                    </Button>
                     <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full">
                        <X size={14} />
                    </Button>
                </div>
            )
        }
    ];

     const poColumns: ColumnDef<typeof mockPOs[0]>[] = [
        {
            accessorKey: "code",
            header: "Código PO",
            cell: ({ row }) => <span className="font-mono text-gold font-medium text-xs">{row.getValue("code")}</span>
        },
        {
            accessorKey: "supplierName",
            header: "Fornecedor",
            cell: ({ row }) => <span className="text-white text-xs">{row.getValue("supplierName")}</span>
        },
         {
            accessorKey: "total",
            header: "Valor Total",
            cell: ({ row }) => <span className="text-white font-mono font-bold text-xs">{formatCurrency(row.getValue("total"))}</span>
        },
          {
            accessorKey: "date",
            header: "Data",
             cell: ({ row }) => <span className="text-diamond-muted text-xs">{new Date(row.getValue("date")).toLocaleDateString()}</span>
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full">
                        <Check size={14} />
                    </Button>
                     <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full">
                        <X size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <CoreLayout>
             <PageHeader
                title="Aprovações Pendentes"
                description="Central de aprovação de requisições e ordens de compra."
            >
                 <div className="flex items-center gap-2">
                     <Badge variant="outline" className="h-8 px-3 border-emerald-500/20 bg-emerald-500/10 text-emerald-500 gap-2">
                        <CheckCircle2 size={14} />
                        {pendingRequisitions.length + pendingPOs.length} Pendentes Total
                    </Badge>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-diamond-muted text-xs uppercase font-medium">Requisições</div>
                         <div className="text-2xl font-bold text-white mt-1">{pendingRequisitions.length}</div>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                        <ShoppingCart size={20} />
                    </div>
                </Card>
                 <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-diamond-muted text-xs uppercase font-medium">Ordens de Compra</div>
                         <div className="text-2xl font-bold text-white mt-1">{pendingPOs.length}</div>
                    </div>
                    <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                        <FileText size={20} />
                    </div>
                </Card>
                 <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-diamond-muted text-xs uppercase font-medium">Urgentes</div>
                         <div className="text-2xl font-bold text-red-500 mt-1">
                             {pendingRequisitions.filter(r => r.priority === 'urgent').length}
                         </div>
                    </div>
                    <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                        <Clock size={20} />
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="requisitions" className="space-y-6">
                <TabsList className="bg-onyx-900 border border-white/5 p-1">
                    <TabsTrigger value="requisitions" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">
                        Requisições ({pendingRequisitions.length})
                    </TabsTrigger>
                     <TabsTrigger value="pos" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">
                        Ordens de Compra ({pendingPOs.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="requisitions" className="bg-onyx-900 border border-white/5 rounded-lg p-0 overflow-hidden">
                     <DataGrid 
                        columns={reqColumns} 
                        data={pendingRequisitions} 
                        searchKey="code" 

                    />
                     {pendingRequisitions.length > 0 && (
                        <div className="p-4 border-t border-white/5 bg-onyx-950 flex justify-end gap-2">
                             <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10">Rejeitar Selecionadas</Button>
                             <Button className="bg-emerald-500 hover:bg-emerald-600 border-0 text-white">Aprovar Selecionadas</Button>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="pos" className="bg-onyx-900 border border-white/5 rounded-lg p-0 overflow-hidden">
                     <DataGrid 
                        columns={poColumns} 
                        data={pendingPOs} 
                        searchKey="code"

                    />
                     {pendingPOs.length > 0 && (
                        <div className="p-4 border-t border-white/5 bg-onyx-950 flex justify-end gap-2">
                             <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10">Rejeitar Selecionadas</Button>
                             <Button className="bg-emerald-500 hover:bg-emerald-600 border-0 text-white">Aprovar Selecionadas</Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </CoreLayout>
    );
}
