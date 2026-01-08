"use client";

import { Card } from "@/components/ui/card";

const activities = [
    {
        id: 1,
        user: { name: "Maria Santos", initials: "MS", avatar: "" },
        action: "criou um novo orçamento",
        target: "Residência Silva",
        time: "10m atrás",
        icon: "📝"
    },
    {
        id: 2,
        user: { name: "João Pereira", initials: "JP", avatar: "" },
        action: "aprovou a fatura",
        target: "#INV-2024-001",
        time: "32m atrás",
        icon: "✅"
    },
    {
        id: 3,
        user: { name: "Sistema", initials: "SYS", avatar: "" },
        action: "atualizou stock de",
        target: "Cimento Cinza (500kg)",
        time: "1h atrás",
        icon: "📦"
    },
     {
        id: 4,
        user: { name: "Ana Costa", initials: "AC", avatar: "" },
        action: "adicionou nota em",
        target: "Client Meeting",
        time: "2h atrás",
        icon: "💬"
    },
];

export function RecentActivity() {
    return (
        <Card className="flex flex-col h-full border-white/5 bg-onyx-900/50">
             <div className="p-4 border-b border-white/5">
                <h3 className="font-semibold text-diamond text-sm">Atividade Recente</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                    {activities.map((item) => (
                         <div key={item.id} className="relative pl-10">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-onyx-800 border border-white/10 flex items-center justify-center z-10">
                                <span className="text-xs">{item.icon}</span>
                            </div>
                            
                            <div className="text-sm">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="font-semibold text-white">{item.user.name}</span>
                                    <span className="text-xs text-white/40">{item.time}</span>
                                </div>
                                <p className="text-diamond-muted text-xs">
                                    {item.action} <span className="text-gold/80">{item.target}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
