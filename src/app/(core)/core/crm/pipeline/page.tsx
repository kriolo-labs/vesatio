"use client";

import { PipelineFunnel } from "@/components/crm/pipeline/pipeline-funnel";
import { PipelineMetrics } from "@/components/crm/pipeline/pipeline-metrics";
import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Download, Filter } from "lucide-react";

export default function PipelinePage() {
    return (
        <CoreLayout>
            <PageHeader
                title="Pipeline & Funil"
                description="Análise e monitoramento do ciclo de vendas."
            >
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white">
                        <Filter size={16} />
                        Filtros
                    </Button>
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white">
                        <Download size={16} />
                        Relatório
                    </Button>
                </div>
            </PageHeader>

            <div className="space-y-6">
                <PipelineMetrics />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PipelineFunnel />
                    
                    {/* Placeholder for another chart or meaningful data */}
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <h3 className="text-lg font-semibold text-white mb-6">Origem das Leads</h3>
                        <div className="flex items-center justify-center h-[250px] text-diamond-muted italic border border-dashed border-white/10 rounded-lg">
                            Gráfico de Distribuição por Canal (Website, Referência, Ads)
                        </div>
                    </Card>
                </div>

                <Card className="p-6 bg-onyx-900 border-white/5">
                     <h3 className="text-lg font-semibold text-white mb-4">Metas de Vendas (Q2 2024)</h3>
                     <div className="space-y-4">
                        {[
                            { label: "Volume de Vendas (CVE)", current: 45000000, target: 60000000 },
                            { label: "Leads Convertidas", current: 15, target: 25 },
                            { label: "Novos Clientes", current: 8, target: 12 },
                        ].map((goal, i) => {
                            const percent = Math.min((goal.current / goal.target) * 100, 100);
                            return (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white font-medium">{goal.label}</span>
                                        <span className="text-diamond-muted">{percent.toFixed(0)}% ({goal.current.toLocaleString()} / {goal.target.toLocaleString()})</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all duration-1000 ${percent >= 100 ? 'bg-emerald-500' : 'bg-gold'}`} style={{ width: `${percent}%` }} />
                                    </div>
                                </div>
                            )
                        })}
                     </div>
                </Card>
            </div>
        </CoreLayout>
    );
}
