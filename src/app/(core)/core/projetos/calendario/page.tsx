"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download, Users } from "lucide-react";
import { useState } from "react";

// Mock Project Data for Timeline
const timelineData = [
    {
        id: "1",
        name: "Villa Atlântico - Renovação Total",
        manager: "Roberto Dias",
        status: "in_progress",
        phases: [
            { name: "Demolição", start: 1, end: 5, status: "completed" },
            { name: "Construção", start: 6, end: 20, status: "in_progress" },
            { name: "Acabamentos", start: 21, end: 28, status: "pending" },
        ]
    },
    {
        id: "2",
        name: "Hotel Santa Maria - Ala Nova",
        manager: "Ana Pereira",
        status: "in_progress",
        phases: [
            { name: "Fundações", start: 3, end: 15, status: "completed" },
            { name: "Estrutura", start: 16, end: 30, status: "in_progress" },
        ]
    },
    {
        id: "3",
        name: "Apartamento T3 - Palmarejo",
        manager: "Carlos Silva",
        status: "planning",
        phases: [
            { name: "Planeamento", start: 25, end: 28, status: "in_progress" },
             { name: "Obra", start: 29, end: 31, status: "pending" },
        ]
    }
];

export default function ProjectCalendarPage() {
    const [view, setView] = useState<"month" | "timeline">("timeline");
    const [currentMonth, setCurrentMonth] = useState("Junho 2024");

    // Generate days for the timeline (June has 30 days)
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <CoreLayout>
            <PageHeader
                title="Calendário e Recursos"
                description="Visualização cronológica de projetos e alocação de equipas."
            >
                <div className="flex items-center gap-2">
                     <div className="flex bg-onyx-900 rounded-lg p-1 border border-white/5 mr-2">
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className={`h-7 px-3 text-xs ${view === 'timeline' ? 'bg-white/10 text-white' : 'text-diamond-muted'}`}
                            onClick={() => setView('timeline')}
                        >
                            Cronograma
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className={`h-7 px-3 text-xs ${view === 'month' ? 'bg-white/10 text-white' : 'text-diamond-muted'}`}
                            onClick={() => setView('month')}
                        >
                            Mensal
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white hidden md:flex">
                        <Download size={16} />
                        Exportar
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <CalendarIcon size={16} />
                        Agendar
                    </Button>
                </div>
            </PageHeader>

            {/* Timeline View */}
            <Card className="bg-onyx-900 border-white/5 p-0 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
                {/* Timeline Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-white">{currentMonth}</h2>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft size={16}/></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight size={16}/></Button>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Users size={16} className="text-diamond-muted" />
                        <span className="text-xs text-diamond-muted">Filtrar por Equipa:</span>
                        <div className="flex -space-x-2">
                            {["RD", "AP", "CS"].map((initials, i) => (
                                <Avatar key={i} className="w-6 h-6 border border-onyx-900">
                                    <AvatarFallback className="text-[9px] bg-onyx-800 text-gold">{initials}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="flex-1 overflow-auto custom-scrollbar relative">
                    <div className="min-w-[1000px]">
                        {/* Days Header */}
                        <div className="grid grid-cols-[250px_1fr] border-b border-white/5 sticky top-0 bg-onyx-900 z-10">
                            <div className="p-3 text-sm font-semibold text-white border-r border-white/5 flex items-end">
                                Projetos
                            </div>
                            <div className="grid grid-cols-30"> {/* 30 days grid */}
                                {days.map(day => (
                                    <div key={day} className={`text-center py-2 text-xs text-diamond-muted border-r border-white/5 ${day === 15 ? 'bg-gold/5' : ''}`}>
                                        {day}
                                        <div className="text-[8px] opacity-50">Seg</div> {/* Mock weekday */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects Rows */}
                        <div className="divide-y divide-white/5">
                            {timelineData.map((project) => (
                                <div key={project.id} className="grid grid-cols-[250px_1fr] hover:bg-white/5 transition-colors group">
                                    {/* Project Info Column */}
                                    <div className="p-4 border-r border-white/5 sticky left-0 bg-onyx-900 group-hover:bg-onyx-800/50 transition-colors z-20">
                                        <h3 className="text-sm font-medium text-white truncate mb-1">{project.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-diamond-muted">{project.manager}</span>
                                            <Badge variant="outline" className="text-[9px] px-1 h-4 border-white/10 text-diamond-muted">Running</Badge>
                                        </div>
                                    </div>

                                    {/* Timeline Bars Area */}
                                    <div className="relative h-20 bg-onyx-950/20">
                                        {/* Bg Grid Lines */}
                                        <div className="absolute inset-0 grid grid-cols-30 pointer-events-none">
                                            {days.map(day => (
                                                <div key={day} className={`border-r border-white/5 h-full ${day === 15 ? 'bg-gold/5' : ''}`} />
                                            ))}
                                        </div>

                                        {/* Phases Bars */}
                                        <div className="absolute inset-y-0 w-full p-2 flex flex-col justify-center gap-1">
                                            {project.phases.map((phase, i) => (
                                                <div 
                                                    key={i}
                                                    className={cn(
                                                        "h-4 rounded text-[9px] flex items-center px-2 truncate relative group/bar cursor-pointer",
                                                        phase.status === 'completed' ? "bg-emerald-500/80 text-white" :
                                                        phase.status === 'in_progress' ? "bg-gold/80 text-black font-medium" :
                                                        "bg-white/10 text-diamond-muted border border-white/10"
                                                    )}
                                                    style={{
                                                        left: `${(phase.start - 1) * (100/30)}%`,
                                                        width: `${(phase.end - phase.start + 1) * (100/30)}%`
                                                    }}
                                                >
                                                    {phase.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                             {/* Add more mockup rows to fill space */}
                             {Array.from({length: 5}).map((_, i) => (
                                <div key={`empty-${i}`} className="grid grid-cols-[250px_1fr] h-20 hover:bg-white/5 transition-colors">
                                     <div className="border-r border-white/5 bg-onyx-900 sticky left-0 z-20" />
                                     <div className="grid grid-cols-30 border-b border-white/5">
                                        {days.map(day => (
                                            <div key={day} className="border-r border-white/5" />
                                        ))}
                                     </div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>
            </Card>
        </CoreLayout>
    );
}
