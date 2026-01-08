"use client";

import { Button } from "@/components/ui/button";
import { Plus, Smartphone, X } from "lucide-react";
import { useState } from "react";

export function TrustedDevices() {
    const [devices, setDevices] = useState([
        { id: "1", name: "iPhone 14 Pro", last_used: "Hoje, 10:00", fingerprint: "fp_12345" },
        { id: "2", name: "MacBook Pro M3", last_used: "Ontem, 18:30", fingerprint: "fp_67890" },
    ]);

    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-white">Dispositivos Confiáveis</h3>
                    <p className="text-sm text-diamond-muted">Estes dispositivos não requerem 2FA ao iniciar sessão.</p>
                </div>
                <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-onyx">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Atual
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map((device) => (
                    <div key={device.id} className="p-4 bg-onyx-100 rounded-lg border border-white/5 relative group">
                        <div className="flex items-start gap-3">
                            <Smartphone className="text-diamond-muted" />
                            <div>
                                <p className="font-medium text-white">{device.name}</p>
                                <p className="text-xs text-diamond-muted">Último uso: {device.last_used}</p>
                                <div className="mt-2 text-xs font-mono text-white/30 truncate max-w-[150px]">ID: {device.fingerprint}</div>
                            </div>
                        </div>
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-status-destructive hover:bg-status-destructive/20"
                        >
                            <X size={16} />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
