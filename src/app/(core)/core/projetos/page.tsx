"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockProjects, Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, LayoutGrid, List, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectsHubPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-xs text-diamond-muted">{row.getValue("code")}</span>,
        },
        {
            accessorKey: "name",
            header: "Projeto",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-white">{row.getValue("name")}</span>
                    <span className="text-xs text-diamond-muted">Cliente: {row.original.client?.name || `Client #${row.original.clientId}`}</span>
                </div>
            ),
        },
         {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        },
        {
            accessorKey: "progress",
            header: "Progresso",
            cell: ({ row }) => {
                const progress = row.getValue("progress") as number;
                return (
                     <div className="w-[120px] space-y-1">
                        <div className="flex justify-between text-[10px] text-diamond-muted">
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-emerald-500 rounded-full" 
                                style={{ width: `${progress}%` }} 
                            />
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "budget",
            header: "Budget",
             cell: ({ row }) => (
                <span className="text-white font-mono text-xs">
                    {(row.getValue("budget") as number).toLocaleString()} CVE
                </span>
            ),
        },
        {
            accessorKey: "manager",
            header: "Gestor",
            cell: ({ row }) => (
                 <div className="flex items-center gap-2">
                     <Avatar className="w-6 h-6 border border-white/10">
                        <AvatarFallback className="text-[9px] bg-onyx-800 text-gold">
                            {row.original.manager?.name?.substring(0, 2).toUpperCase() || "PM"}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-diamond-muted">{row.original.manager?.name}</span>
                </div>
            ),
        },
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Hub de Projetos"
                description="Gestão centralizada de obras e orçamentos."
            >
                <div className="flex items-center gap-2">
                     <div className="flex bg-onyx-900 rounded-lg p-1 border border-white/5 mr-2">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-7 w-7 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-diamond-muted'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={16} />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-7 w-7 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-diamond-muted'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid size={16} />
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Novo Projeto
                    </Button>
                </div>
            </PageHeader>

            {viewMode === 'list' ? (
                <DataGrid 
                    columns={columns} 
                    data={mockProjects}
                    searchKey="name"
                    searchPlaceholder="Pesquisar projetos..." 
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </CoreLayout>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Card className="group overflow-hidden bg-onyx-900 border-white/5 hover:border-gold/30 transition-all cursor-pointer flex flex-col h-full">
            <div className="h-32 bg-onyx-950 relative">
                {/* Placeholder Image or Real Image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/5 font-bold text-4xl">
                    VESATIO
                </div>
                <div className="absolute top-3 right-3">
                    <StatusBadge status={project.status} />
                </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-[10px] text-gold uppercase tracking-wider font-semibold mb-1">{project.code}</p>
                        <h3 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-gold transition-colors">
                            {project.name}
                        </h3>
                         <p className="text-xs text-diamond-muted truncate">
                            {project.client?.name || `Client #${project.clientId}`}
                        </p>
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                     <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-diamond-muted">Progresso</span>
                            <span className="text-white font-mono">{project.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gold rounded-full transition-all duration-500" 
                                style={{ width: `${project.progress}%` }} 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div>
                            <p className="text-[10px] text-diamond-muted uppercase">Budget</p>
                            <p className="text-sm font-semibold text-white font-mono">
                                {(project.budget / 1000000).toFixed(1)}M
                            </p>
                        </div>
                        <div className="flex justify-end items-center">
                             <Avatar className="w-8 h-8 border border-white/10 ring-2 ring-onyx-900">
                                <AvatarFallback className="text-xs bg-onyx-800 text-gold">
                                    {project.manager?.name?.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
