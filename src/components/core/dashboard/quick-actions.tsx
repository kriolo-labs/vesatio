"use client";

import { Card } from "@/components/ui/card";
import { MessageSquare, PackagePlus, Plus, UserPlus } from "lucide-react";

export function QuickActions() {
    return (
        <Card className="p-4 border-white/5 bg-gradient-to-br from-onyx-900 to-onyx-950">
             <h3 className="font-semibold text-diamond text-sm mb-4">Ações Rápidas</h3>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                 <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-onyx-800/50 border border-white/5 hover:border-gold/30 hover:bg-onyx-800 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2 group-hover:scale-110 transition-transform">
                        <Plus size={20} />
                    </div>
                    <span className="text-xs font-medium text-diamond-muted group-hover:text-white">Novo Orçamento</span>
                 </button>

                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-onyx-800/50 border border-white/5 hover:border-emerald-500/30 hover:bg-onyx-800 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2 group-hover:scale-110 transition-transform">
                        <UserPlus size={20} />
                    </div>
                    <span className="text-xs font-medium text-diamond-muted group-hover:text-white">Novo Lead</span>
                 </button>

                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-onyx-800/50 border border-white/5 hover:border-blue-500/30 hover:bg-onyx-800 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                        <PackagePlus size={20} />
                    </div>
                    <span className="text-xs font-medium text-diamond-muted group-hover:text-white">Encomenda</span>
                 </button>

                  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-onyx-800/50 border border-white/5 hover:border-purple-500/30 hover:bg-onyx-800 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2 group-hover:scale-110 transition-transform">
                        <MessageSquare size={20} />
                    </div>
                    <span className="text-xs font-medium text-diamond-muted group-hover:text-white">AURA Chat</span>
                 </button>
             </div>
        </Card>
    );
}
