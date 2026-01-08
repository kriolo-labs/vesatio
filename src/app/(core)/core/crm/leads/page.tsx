"use client";

import { LeadForm } from "@/components/crm/leads/lead-form";
import { LeadKanban } from "@/components/crm/leads/lead-kanban";
import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Lead, mockLeads } from "@/types/crm";
import { DropResult } from "@hello-pangea/dnd";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, LayoutGrid, List as ListIcon, Plus } from "lucide-react";
import { useState } from "react";

export default function LeadsPage() {
    const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
    const [data, setData] = useState<Lead[]>(mockLeads);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleCreateLead = (formData: any) => {
        // Mock creation
        const newLead: Lead = {
            id: Math.random().toString(),
            code: "LD-NEW",
            ...formData,
            status: "new",
            score: 50,
            createdAt: new Date().toISOString(),
            investmentParams: { currency: "CVE", max: formData.investment },
            tags: ["Novo"]
        };
        setData([newLead, ...data]);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;
        const newStatus = destination.droppableId; // In our case ID is status

        // Update local state (optimistic update)
        const updatedData = data.map(item => 
            item.id === draggableId ? { ...item, status: newStatus as any } : item
        );
        setData(updatedData);

        // TODO: Call API to update backend
        console.log(`Moved ${draggableId} to ${newStatus}`);
    };

    const columns: ColumnDef<Lead>[] = [
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-xs text-diamond-muted">{row.getValue("code")}</span>,
        },
        {
            accessorKey: "name",
            header: "Nome",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium text-white">{row.getValue("name")}</div>
                    <div className="text-xs text-diamond-muted">{row.original.email}</div>
                </div>
            ),
        },
        {
            accessorKey: "projectType",
            header: "Projeto",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        },
        {
            accessorKey: "score",
            header: "Score",
            cell: ({ row }) => {
                const score = row.getValue("score") as number;
                return (
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${score > 80 ? 'bg-emerald-500' : score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                style={{ width: `${score}%` }} 
                            />
                        </div>
                        <span className="text-xs font-mono">{score}</span>
                    </div>
                );
            }
        },
         {
            accessorKey: "assignedTo",
            header: "Responsável",
            cell: ({ row }) => {
                const assigned = row.original.assignedTo;
                return assigned ? (
                     <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-[10px]">{assigned.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{assigned.name}</span>
                    </div>
                ) : <span className="text-xs text-diamond-muted">-</span>
            }
        },
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Gestão de Leads"
                description="Acompanhe o funil de vendas e oportunidades."
            >
                <div className="flex items-center gap-2">
                     <div className="bg-onyx-900 p-0.5 rounded-lg border border-white/10 flex items-center mr-2">
                        <button 
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-diamond-muted hover:text-white'}`}
                        >
                            <ListIcon size={16} />
                        </button>
                        <button 
                            onClick={() => setViewMode("kanban")}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-white/10 text-white shadow-sm' : 'text-diamond-muted hover:text-white'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    <Button size="sm" className="btn-primary gap-2" onClick={() => setIsFormOpen(true)}>
                        <Plus size={16} />
                        Novo Lead
                    </Button>
                </div>
            </PageHeader>

            {viewMode === "kanban" ? (
                <LeadKanban data={data} onDragEnd={onDragEnd} />
            ) : (
                <DataGrid 
                    columns={columns} 
                    data={data}
                    searchKey="name"
                    addLabel="Novo Lead"
                    onAdd={() => setIsFormOpen(true)} 
                />
            )}

            <LeadForm 
                open={isFormOpen} 
                onOpenChange={setIsFormOpen} 
                onSubmit={handleCreateLead} 
            />
        </CoreLayout>
    );
}
