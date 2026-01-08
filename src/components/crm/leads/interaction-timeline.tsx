"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageSquare, Phone, Video } from "lucide-react";

export interface Interaction {
    id: string;
    type: "email" | "call" | "meeting" | "note" | "whatsapp";
    summary: string;
    description?: string;
    date: string;
    user: {
        name: string;
        avatar?: string;
    };
    outcome?: string;
}

// Mock interactions
const mockInteractions: Interaction[] = [
    {
        id: "1",
        type: "call",
        summary: "Chamada inicial de qualificação",
        description: "Cliente interessado em renovação total da cozinha. Budget confirmado > 2M CVE.",
        date: "2024-05-15T10:00:00Z",
        user: { name: "Ana Pereira" },
        outcome: "Positivo"
    },
    {
        id: "2",
        type: "email",
        summary: "Envio de apresentação",
        description: "Enviado portfólio de cozinhas e lista de acabamentos.",
        date: "2024-05-15T11:30:00Z",
        user: { name: "Ana Pereira" },
    },
     {
        id: "3",
        type: "meeting",
        summary: "Reunião de Briefing",
        description: "Reunião presencial no showroom. Cliente gostou da linha Minimal.",
        date: "2024-05-18T14:30:00Z",
        user: { name: "Roberto Dias" },
        outcome: "Aguardando plantas"
    },
];

const icons = {
    email: Mail,
    call: Phone,
    meeting: Video,
    note: MessageSquare,
    whatsapp: MessageSquare,
};

export function InteractionTimeline() {
    return (
        <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
            {mockInteractions.map((interaction) => {
                const Icon = icons[interaction.type] || MessageSquare;
                return (
                    <div key={interaction.id} className="relative pl-14 group">
                         <div className="absolute left-2.5 top-0 w-8 h-8 rounded-full bg-onyx-800 border border-white/10 flex items-center justify-center z-10 group-hover:border-gold/30 transition-colors">
                            <Icon size={14} className="text-diamond-muted group-hover:text-gold" />
                        </div>
                        
                        <div className="bg-onyx-800/30 rounded-lg p-3 border border-white/5 hover:bg-onyx-800/50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-semibold text-white">{interaction.summary}</span>
                                <span className="text-xs text-white/40">
                                    {new Date(interaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            
                            {interaction.description && (
                                <p className="text-sm text-diamond-muted mb-2">{interaction.description}</p>
                            )}
                            
                            <div className="flex items-center gap-2 mt-2">
                                <Avatar className="w-5 h-5">
                                    <AvatarFallback className="text-[8px]">{interaction.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-white/50">{interaction.user.name}</span>
                                
                                {interaction.outcome && (
                                    <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-diamond-muted ml-auto border border-white/5">
                                        Outcome: {interaction.outcome}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
