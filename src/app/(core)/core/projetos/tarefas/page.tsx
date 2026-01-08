"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { mockTasks, Task } from "@/types/task";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ColumnDef } from "@tanstack/react-table";
import { CheckSquare, Clock, Filter, Plus } from "lucide-react";
import { useState } from "react";

export default function TasksPage() {
    const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
    const [tasks, setTasks] = useState(mockTasks);

    // List View Columns
    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: "code",
            header: "Código",
            cell: ({ row }) => <span className="font-mono text-xs text-diamond-muted">{row.getValue("code")}</span>,
        },
        {
            accessorKey: "title",
            header: "Tarefa",
            cell: ({ row }) => (
                <div>
                     <span className="font-medium text-white">{row.getValue("title")}</span>
                     <div className="text-xs text-diamond-muted">
                        {row.original.projectName} • {row.original.phase}
                     </div>
                </div>
            ),
        },
        {
            accessorKey: "assignedTo",
            header: "Atribuído",
            cell: ({ row }) => (
                 <div className="flex -space-x-2">
                     {(row.getValue("assignedTo") as any[]).map((assignee: any, i:number) => (
                        <Avatar key={i} className="w-6 h-6 border border-white/10">
                            <AvatarFallback className="text-[9px] bg-onyx-800 text-gold">
                                {assignee.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                     ))}
                </div>
            ),
        },
        {
            accessorKey: "priority",
            header: "Prioridade",
            cell: ({ row }) => {
                const p = row.getValue("priority") as string;
                const colors: Record<string, string> = {
                    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
                    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
                    critical: "bg-rose-500/10 text-rose-500 border-rose-500/20",
                };
                return <Badge variant="outline" className={cn("text-[10px] uppercase", colors[p])}>{p}</Badge>
            }
        },
        {
            accessorKey: "status",
             header: "Estado",
            cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        },
        {
            accessorKey: "dueDate",
            header: "Prazo",
             cell: ({ row }) => (
                <span className="text-xs text-diamond-muted">
                    {new Date(row.getValue("dueDate")).toLocaleDateString()}
                </span>
            ),
        },
    ];

    // Kanban Logic
    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        // Mock logic - in a real app would update backend
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTasks(items);
    };

    const groupedTasks = {
        todo: tasks.filter(t => t.status === 'todo'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        review: tasks.filter(t => t.status === 'review'),
        done: tasks.filter(t => t.status === 'done'),
    };

    const columnsConfig = [
        { id: 'todo', label: 'A Fazer', color: 'border-white/10' },
        { id: 'in_progress', label: 'Em Curso', color: 'border-blue-500/50' },
        { id: 'review', label: 'Revisão', color: 'border-gold/50' },
        { id: 'done', label: 'Concluído', color: 'border-emerald-500/50' },
    ];

    return (
        <CoreLayout>
            <PageHeader
                title="Gestão de Tarefas"
                description="Painel global de tarefas de todos os projetos."
            >
                <div className="flex items-center gap-2">
                     <div className="flex bg-onyx-900 rounded-lg p-1 border border-white/5 mr-2">
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className={`h-7 px-3 text-xs ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-diamond-muted'}`}
                            onClick={() => setViewMode('list')}
                        >
                            Lista
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className={`h-7 px-3 text-xs ${viewMode === 'kanban' ? 'bg-white/10 text-white' : 'text-diamond-muted'}`}
                            onClick={() => setViewMode('kanban')}
                        >
                            Kanban
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Filter size={16} />
                        Filtros
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Nova Tarefa
                    </Button>
                </div>
            </PageHeader>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-diamond-muted">Minhas Tarefas</p>
                        <p className="text-xl font-bold text-white">12</p>
                    </div>
                    <CheckSquare className="text-gold" size={20}/>
                </Card>
                 <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-diamond-muted">Atrasadas</p>
                        <p className="text-xl font-bold text-rose-500">3</p>
                    </div>
                    <Clock className="text-rose-500" size={20}/>
                </Card>
            </div>

            {viewMode === 'list' ? (
                <DataGrid 
                    columns={columns} 
                    data={tasks}
                    searchKey="title"
                    searchPlaceholder="Pesquisar tarefas..." 
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-280px)] overflow-x-auto pb-4">
                     <DragDropContext onDragEnd={onDragEnd}>
                        {columnsConfig.map((column) => (
                             <div key={column.id} className="flex flex-col h-full bg-onyx-900/50 rounded-lg border border-white/5">
                                 <div className={`p-3 border-b-2 ${column.color} bg-onyx-900 rounded-t-lg flex justify-between items-center sticky top-0 bg-onyx-900 z-10`}>
                                     <h3 className="font-semibold text-sm text-white">{column.label}</h3>
                                     <span className="text-xs text-diamond-muted bg-white/5 px-2 py-0.5 rounded-full">
                                         {(groupedTasks as any)[column.id].length}
                                     </span>
                                 </div>
                                 <Droppable droppableId={column.id}>
                                     {(provided) => (
                                         <div
                                             {...provided.droppableProps}
                                             ref={provided.innerRef}
                                             className="flex-1 p-2 space-y-2 overflow-y-auto custom-scrollbar"
                                         >
                                             {(groupedTasks as any)[column.id].map((task: Task, index: number) => (
                                                 <Draggable key={task.id} draggableId={task.id} index={index}>
                                                     {(provided) => (
                                                         <div
                                                             ref={provided.innerRef}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}
                                                         >
                                                             <TaskCard task={task} />
                                                         </div>
                                                     )}
                                                 </Draggable>
                                             ))}
                                             {provided.placeholder}
                                         </div>
                                     )}
                                 </Droppable>
                             </div>
                        ))}
                     </DragDropContext>
                </div>
            )}
        </CoreLayout>
    );
}

function TaskCard({ task }: { task: Task }) {
    const priorityColors: Record<string, string> = {
        low: "text-blue-500",
        medium: "text-yellow-500",
        high: "text-orange-500",
        critical: "text-rose-500",
    };

    return (
        <Card className="p-3 bg-onyx-900 border-white/5 hover:border-gold/30 cursor-pointer shadow-sm group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-diamond-muted">{task.code}</span>
                <span className={cn("w-2 h-2 rounded-full", priorityColors[task.priority])} />
            </div>
            <h4 className="text-sm font-medium text-white mb-1 leading-snug group-hover:text-gold transition-colors">{task.title}</h4>
            <div className="flex flex-wrap gap-1 mb-3">
                 <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-white/5 text-diamond-muted border-0">
                    {task.projectName}
                </Badge>
            </div>
            <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2">
                 <div className="flex -space-x-1.5">
                     {task.assignedTo.map((assignee, i) => (
                        <Avatar key={i} className="w-5 h-5 border border-onyx-900">
                            <AvatarFallback className="text-[8px] bg-onyx-800 text-gold">
                                {assignee.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                     ))}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-diamond-muted">
                    <Clock size={10} />
                    {new Date(task.dueDate!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
            </div>
        </Card>
    )
}
