"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus } from "lucide-react";
import { useState } from "react";

// Mock Events
const mockEvents = [
    {
        id: 1,
        title: "Reunião Cliente - Villa Atlântico",
        type: "meeting",
        time: "10:00 - 11:30",
        date: new Date(),
        location: "Showroom Vesatio",
        attendees: ["Sofia Martinez", "Ana Pereira"],
        status: "confirmed"
    },
    {
        id: 2,
        title: "Follow-up Orçamento Smart Home",
        type: "call",
        time: "14:00 - 14:15",
        date: new Date(),
        location: "Telefone",
        attendees: ["James Bond"],
        status: "pending"
    },
    {
        id: 3,
        title: "Visita Técnica Obra Hotel",
        type: "site_visit",
        time: "16:00 - 17:30",
        date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
        location: "Hotel Santa Maria",
        attendees: ["Carlos Silva", "Eng. Roberto"],
        status: "confirmed"
    }
];

// Helper to get days in month (Simplified for demo, usually use date-fns)
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export default function AgendaPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <CoreLayout>
            <PageHeader
                title="Agenda & Follow-ups"
                description="Gestão de reuniões, visitas e tarefas de acompanhamento."
            >
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2 text-diamond-muted border-white/10 hover:text-white">
                        Sincronizar Google Calendar
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Novo Evento
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
                
                {/* Left Column: Calendar UI (Custom implementation for granular control/style) */}
                <Card className="lg:col-span-2 bg-onyx-900 border-white/5 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white capitalize">{monthNames[month]} {year}</h2>
                        <div className="flex gap-1">
                            <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 border-white/10 hover:text-white"><ChevronLeft size={16}/></Button>
                            <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())} className="h-8 px-4 text-xs border-white/10 hover:text-white">Hoje</Button>
                            <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 border-white/10 hover:text-white"><ChevronRight size={16}/></Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                            <div key={day} className="text-sm font-medium text-diamond-muted py-2">{day}</div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
                        {days.map((day, index) => {
                            if (day === null) return <div key={`empty-${index}`} className="bg-transparent" />;
                            
                            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                            const isSelected = day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
                            
                            // Mock finding events for this day
                            const hasEvent = [15, 16, 20].includes(day as number); // Random days have dots

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(new Date(year, month, day as number))}
                                    className={cn(
                                        "relative flex flex-col items-start justify-start p-2 rounded-lg border transition-all hover:bg-white/5",
                                        isSelected 
                                            ? "bg-white/10 border-gold/50 shadow-inner" 
                                            : "bg-onyx-950/50 border-white/5",
                                        isToday && "ring-1 ring-emerald-500/50"
                                    )}
                                >
                                    <span className={cn(
                                        "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                        isToday ? "bg-emerald-500 text-white" : "text-white/80"
                                    )}>
                                        {day}
                                    </span>
                                    
                                    {hasEvent && (
                                        <div className="mt-auto flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Right Column: Daily Agenda */}
                <div className="flex flex-col gap-6">
                    <Card className="flex-1 bg-onyx-900 border-white/5 p-0 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-white/5 bg-onyx-950/30">
                            <h3 className="font-semibold text-white">Agenda de Hoje</h3>
                            <p className="text-xs text-diamond-muted">{selectedDate.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                             {/* Time indicator line */}
                            <div className="relative pl-4 border-l border-white/10 space-y-6">
                                {mockEvents.map(event => (
                                    <div key={event.id} className="relative">
                                        <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-onyx-800 border-2 border-gold" />
                                        <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold text-gold flex items-center gap-1">
                                                    <Clock size={12} /> {event.time}
                                                </span>
                                                <Badge  className={cn(
                                                    "text-[9px] h-4 px-1.5 border-0 hover:bg-opacity-80",
                                                    event.type === 'meeting' ? "bg-purple-500/20 text-purple-400" :
                                                    event.type === 'call' ? "bg-blue-500/20 text-blue-400" :
                                                    "bg-emerald-500/20 text-emerald-400"
                                                )}>
                                                    {event.type}
                                                </Badge>
                                            </div>
                                            <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-gold transition-colors">{event.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-diamond-muted mb-3">
                                                <MapPin size={12} />
                                                <span>{event.location}</span>
                                            </div>
                                            
                                            <div className="flex -space-x-2">
                                                {event.attendees.map((attendee, i) => (
                                                    <Avatar key={i} className="w-6 h-6 border border-onyx-900">
                                                        <AvatarFallback className="text-[8px] bg-white/20 text-white">{attendee.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                             {/* Empty state if needed */}
                             {/* <div className="text-center py-10 text-diamond-muted text-sm">Sem eventos para este dia.</div> */}
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-gold/20 via-onyx-900 to-onyx-900 border-gold/30 p-4">
                        <div className="flex items-start gap-3">
                             <div className="p-2 bg-gold/20 rounded-lg text-gold mt-1">
                                 <Clock size={18} />
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-white">Próximo Follow-up</h4>
                                 <p className="text-xs text-diamond-muted mt-1 mb-2">Ligar para <span className="text-white">Carlos Silva</span> sobre proposta.</p>
                                 <Button size="sm" variant="outline" className="h-7 text-xs border-gold/30 text-gold hover:bg-gold hover:text-onyx-950 w-full">
                                     Iniciar Chamada
                                 </Button>
                             </div>
                        </div>
                    </Card>
                </div>
            </div>
        </CoreLayout>
    );
}
