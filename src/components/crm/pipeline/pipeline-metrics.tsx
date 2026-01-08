"use client";

import { Card } from "@/components/ui/card";
import { ArrowDown, DollarSign, TrendingUp, Users } from "lucide-react";

export function PipelineMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-onyx-900 border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-diamond-muted">Total em Pipeline</p>
                        <h3 className="text-2xl font-bold text-white mt-1">128.5M <span className="text-sm font-normal text-white/50">CVE</span></h3>
                    </div>
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <DollarSign className="text-emerald-500" size={18} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-emerald-500">
                    <TrendingUp size={12} className="mr-1" />
                    <span>+12% vs mês anterior</span>
                </div>
            </Card>

             <Card className="p-4 bg-onyx-900 border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-diamond-muted">Taxa de Conversão</p>
                        <h3 className="text-2xl font-bold text-white mt-1">3.2%</h3>
                    </div>
                     <div className="p-2 bg-gold/10 rounded-lg">
                        <TrendingUp className="text-gold" size={18} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-emerald-500">
                    <TrendingUp size={12} className="mr-1" />
                    <span>+0.5% vs ano passado</span>
                </div>
            </Card>
            
            <Card className="p-4 bg-onyx-900 border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-diamond-muted">Total Leads Ativos</p>
                        <h3 className="text-2xl font-bold text-white mt-1">142</h3>
                    </div>
                     <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Users className="text-blue-500" size={18} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-rose-500">
                    <ArrowDown size={12} className="mr-1" />
                    <span>-5 novos esta semana</span>
                </div>
            </Card>

            <Card className="p-4 bg-onyx-900 border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-diamond-muted">Tempo Médio Ciclo</p>
                        <h3 className="text-2xl font-bold text-white mt-1">45 <span className="text-sm font-normal text-white/50">dias</span></h3>
                    </div>
                     <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Users className="text-purple-500" size={18} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-emerald-500">
                    <TrendingUp size={12} className="mr-1" />
                    <span>-2 dias (melhoria)</span>
                </div>
            </Card>
        </div>
    );
}
