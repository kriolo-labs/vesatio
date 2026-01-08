"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { mockImports } from "@/types/imports";
import {
    AlertTriangle,
    Globe,
    Plane, Ship
} from "lucide-react";

// Mock coordinates for map visualization (would use actual lat/lng in real implementation)
const shipments = [
    { id: "imp1", lat: 38.7, lng: -9.1, status: "in_transit", type: "sea", origin: "Leixões", destination: "Praia", progress: 45 },
    { id: "imp2", lat: 53.5, lng: 10.0, status: "production", type: "air", origin: "Hamburg", destination: "Praia", progress: 10 },
];

export default function TrackingPage() {
    return (
        <CoreLayout>
            <PageHeader
                title="Tracking de Importações"
                description="Monitorização em tempo real das cargas internacionais."
            >
                <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white">
                    <Globe size={16} className="mr-2" /> Visão Global
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Global Map Placeholder */}
                <Card className="lg:col-span-2 p-0 bg-onyx-950 border-white/5 min-h-[500px] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/map-dark.png')] bg-cover bg-center opacity-30" />
                    
                    {/* Simulated Map Markers */}
                    {shipments.map((shipment) => (
                        <div 
                            key={shipment.id}
                            className="absolute bg-emerald-500 rounded-full w-4 h-4 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse cursor-pointer border-2 border-white"
                            style={{ 
                                top: `${50 - (shipment.lat - 20) * 1.5}%`, 
                                left: `${50 + (shipment.lng) * 1.5}%` 
                            }}
                        >
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-onyx-900 border border-white/10 px-2 py-1 rounded text-xs whitespace-nowrap text-white">
                                {shipment.origin} -&gt; {shipment.destination}
                            </div>
                        </div>
                    ))}

                    <div className="relative z-10 text-center space-y-2">
                        <Globe size={48} className="mx-auto text-diamond-muted opacity-50 mb-2" />
                        <h3 className="text-white font-semibold">Mapa de Operações Globais</h3>
                        <p className="text-sm text-diamond-muted">Visualização em tempo real (Mock)</p>
                    </div>
                </Card>

                {/* Alerts and Lists */}
                <div className="space-y-6">
                    <Card className="p-4 bg-onyx-900 border-white/5 bg-gradient-to-br from-red-500/5 to-transparent">
                        <h3 className="text-sm font-semibold text-red-500 mb-4 flex items-center gap-2">
                            <AlertTriangle size={16} /> Alertas Críticos
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded bg-onyx-950/50 border border-red-500/10 flex gap-3">
                                <div className="mt-1 min-w-[4px] h-full rounded-full bg-red-500/50" />
                                <div>
                                    <div className="text-sm text-white font-medium">Documentação em Atraso</div>
                                    <div className="text-xs text-diamond-muted">IMP-2024-001: Bill of Lading ainda não validado.</div>
                                </div>
                            </div>
                             <div className="p-3 rounded bg-onyx-950/50 border border-red-500/10 flex gap-3">
                                <div className="mt-1 min-w-[4px] h-full rounded-full bg-orange-500/50" />
                                <div>
                                    <div className="text-sm text-white font-medium">Atraso na Chegada</div>
                                    <div className="text-xs text-diamond-muted">IMP-2024-005: ETA revisto para +3 dias.</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 bg-onyx-900 border-white/5 space-y-4">
                        <h3 className="text-sm font-semibold text-white mb-2">Próximas Chegadas</h3>
                        {mockImports.filter(i => ['in_transit', 'arrived'].includes(i.status)).map(imp => (
                             <div key={imp.id} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded bg-onyx-950 flex items-center justify-center border border-white/5 text-diamond-muted">
                                    {imp.transportType === 'sea' ? <Ship size={18}/> : <Plane size={18}/>}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-white">{imp.code}</span>
                                        <span className="text-xs text-emerald-500 font-mono">{imp.eta}</span>
                                    </div>
                                    <div className="text-xs text-diamond-muted truncate w-[180px]">
                                        {imp.supplierName} • {imp.originPort}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </CoreLayout>
    );
}
