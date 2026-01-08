"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { mockWarehouses, WarehouseType } from "@/types/inventory";
import { Box, Home, MapPin, MoreHorizontal, Plus, Settings, Truck } from "lucide-react";

export default function WarehousesPage() {
    
    const getTypeConfig = (type: WarehouseType) => {
        switch (type) {
            case 'main': return { label: "Principal", icon: Home, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
            case 'project_site': return { label: "Obra", icon: Settings, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
            case 'transit': return { label: "Em Trânsito", icon: Truck, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" };
            default: return { label: "Outro", icon: Box, color: "text-diamond-muted bg-white/5 border-white/10" };
        }
    }

    return (
        <CoreLayout>
            <PageHeader
                title="Armazéns e Locais"
                description="Gestão de locais de stock físicos e virtuais."
            >
                <div className="flex gap-2">
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Novo Armazém
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWarehouses.map((warehouse) => {
                    const typeConfig = getTypeConfig(warehouse.type);
                    const TypeIcon = typeConfig.icon;
                    return (
                        <Card key={warehouse.id} className="bg-onyx-900 border-white/5 p-6 hover:border-gold/30 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-onyx-950 flex items-center justify-center border border-white/5">
                                        <TypeIcon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-gold transition-colors">{warehouse.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-mono text-diamond-muted">{warehouse.code}</span>
                                            <Badge variant="outline" className={cn("text-[9px] h-4 px-1 border-0", typeConfig.color)}>
                                                {typeConfig.label}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted hover:text-white">
                                    <MoreHorizontal size={16} />
                                </Button>
                            </div>

                            <div className="space-y-4 mb-4">
                                <div className="flex items-start gap-2 text-xs text-diamond-muted">
                                    <MapPin size={14} className="mt-0.5 shrink-0" />
                                    {warehouse.address}
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-diamond-muted">Responsável:</span>
                                    <span className="text-white">{warehouse.manager}</span>
                                </div>
                            </div>
                            
                            {warehouse.utilization && (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-diamond-muted">
                                        <span>Ocupação</span>
                                        <span>{warehouse.utilization}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-onyx-950 rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full rounded-full", warehouse.utilization > 80 ? "bg-red-500" : "bg-emerald-500")} 
                                            style={{ width: `${warehouse.utilization}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                             <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                                <Button variant="outline" size="sm" className="w-full text-xs h-8 border-white/10 text-diamond-muted hover:text-white">
                                    Inventário
                                </Button>
                                <Button variant="outline" size="sm" className="w-full text-xs h-8 border-white/10 text-diamond-muted hover:text-white">
                                    Movimentos
                                </Button>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </CoreLayout>
    );
}
