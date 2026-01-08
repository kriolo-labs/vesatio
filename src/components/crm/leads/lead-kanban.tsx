"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Lead, LeadStatus } from "@/types/crm";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Calendar, MoreHorizontal, User } from "lucide-react";
import { useState } from "react";

interface LeadKanbanProps {
    data: Lead[];
    onDragEnd: (result: DropResult) => void;
}

const columns: { id: LeadStatus; title: string, color: string }[] = [
    { id: "new", title: "Novo", color: "bg-blue-500" },
    { id: "contacted", title: "Contactado", color: "bg-indigo-500" },
    { id: "qualified", title: "Qualificado", color: "bg-purple-500" },
    { id: "proposal", title: "Proposta", color: "bg-gold" },
    { id: "negotiation", title: "Negociação", color: "bg-amber-500" },
];

export function LeadKanban({ data, onDragEnd }: LeadKanbanProps) {
    // Group leads by status
    const [leads, setLeads] = useState(data); // Local state for immediate feedback if parent doesn't update fast enough or for demo

    const getLeadsByStatus = (status: LeadStatus) => {
        return data.filter((lead) => lead.status === status);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-280px)] min-w-full">
                {columns.map((column) => (
                    <div key={column.id} className="min-w-[280px] w-[280px] flex flex-col bg-onyx-900/30 rounded-lg border border-white/5">
                        <div className="p-3 border-b border-white/5 flex items-center justify-between sticky top-0 bg-onyx-900 z-10 rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", column.color)} />
                                <span className="font-medium text-sm text-diamond">{column.title}</span>
                                <span className="text-xs text-diamond-muted bg-white/5 px-1.5 py-0.5 rounded-full">
                                    {getLeadsByStatus(column.id).length}
                                </span>
                            </div>
                        </div>

                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={cn(
                                        "flex-1 p-2 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10",
                                        snapshot.isDraggingOver ? "bg-white/5" : ""
                                    )}
                                >
                                    {getLeadsByStatus(column.id).map((lead, index) => (
                                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={cn(
                                                        "bg-onyx-800 p-3 rounded-md border border-white/5 hover:border-gold/30 shadow-lg group transition-all",
                                                        snapshot.isDragging ? "ring-2 ring-gold rotate-2 z-50" : ""
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xs text-diamond-muted font-mono">{lead.code}</span>
                                                        <button className="text-diamond-muted hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal size={14} />
                                                        </button>
                                                    </div>
                                                    
                                                    <h4 className="text-sm font-semibold text-white mb-1 hover:text-gold cursor-pointer transition-colors block truncate">{lead.name}</h4>
                                                    <p className="text-xs text-diamond-muted mb-3 truncate">{lead.projectType}</p>

                                                    <div className="flex items-center gap-2 mb-3">
                                                        {lead.investmentParams.max && (
                                                            <Badge variant="secondary" className="text-[10px] h-5 bg-white/5 border-white/5 text-diamond-muted font-normal">
                                                                {lead.investmentParams.max > 1000000 ? `${(lead.investmentParams.max / 1000000).toFixed(1)}M` : lead.investmentParams.max} {lead.investmentParams.currency}
                                                            </Badge>
                                                        )}
                                                        {lead.score >= 80 && (
                                                            <Badge variant="outline" className="text-[10px] h-5 border-emerald-500/30 text-emerald-500">
                                                                Hot Lead
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-diamond-muted mt-2 pt-2 border-t border-white/5">
                                                        <div className="flex items-center gap-1.5" title="Responsável">
                                                           {lead.assignedTo ? (
                                                                <Avatar className="w-5 h-5 border border-white/10">
                                                                    <AvatarFallback className="text-[8px] bg-gold/10 text-gold">{lead.assignedTo.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                                                                    <User size={10} />
                                                                </div>
                                                            )}
                                                            <span className="max-w-[80px] truncate">{lead.assignedTo?.name || "N/A"}</span>
                                                        </div>
                                                        
                                                        {lead.lastInteraction && (
                                                            <span className="flex items-center gap-1" title="Última interação">
                                                                <Calendar size={10} />
                                                                {new Date(lead.lastInteraction).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                            </span>
                                                        )}
                                                    </div>
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
            </div>
        </DragDropContext>
    );
}
