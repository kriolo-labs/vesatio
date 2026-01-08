"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPin, Maximize2 } from "lucide-react";

// Mock Data for "God Mode" Map Concept
// In a real implementation, this would use Mapbox or Google Maps API
const activeProjects = [
    { id: 1, name: "Villa Atlântico", location: "Praia, Santiago", status: "ontrack", coords: { x: 30, y: 40 } },
    { id: 2, name: "Residência Mindelo", location: "Mindelo, São Vicente", status: "delayed", coords: { x: 20, y: 20 } },
    { id: 3, name: "Hotel Sal", location: "Santa Maria, Sal", status: "attention", coords: { x: 70, y: 30 } },
    { id: 4, name: "Complexo Boa Vista", location: "Sal Rei, Boa Vista", status: "completed", coords: { x: 65, y: 45 } },
];

const statusStyles = {
    ontrack: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    delayed: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse",
    attention: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    completed: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
};

export function GodModeMap() {
  return (
    <Card className="h-[400px] relative overflow-hidden bg-onyx-900 border-white/5 group">
        
        {/* Header Overlay */}
        <div className="absolute top-4 left-4 z-10 flex items-center justify-between w-[calc(100%-2rem)] pointer-events-none">
            <div className="bg-onyx-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-auto">
                <MapPin className="w-3 h-3 text-gold" />
                <span className="text-xs font-semibold text-diamond">Live Operations Map</span>
                <Badge variant="outline" className="text-[10px] h-4 border-emerald-500/30 text-emerald-500 bg-emerald-500/5">
                    Realtime
                </Badge>
            </div>
             <button className="bg-onyx-950/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 hover:bg-white/5 pointer-events-auto transition-colors text-diamond-muted hover:text-white">
                <Maximize2 size={14} />
            </button>
        </div>

        {/* Map Placeholder Image (Stylized Dark Map) */}
        {/* Using a gradient background to simulate map for now if image missing, or placeholder */}
        <div className="absolute inset-0 bg-onyx-950">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Cape Verde Stylized Outline (Conceptual) - replacing with simple placement relative to container */}
             <div className="absolute inset-0 opacity-20 bg-[url('/images/cape-verde-map-dark.png')] bg-no-repeat bg-center bg-contain" />
             
             {/* Fallback pattern if image fails */}
            <div className="absolute inset-0 bg-gradient-to-tr from-onyx-950 via-transparent to-onyx-900/50" />
        </div>

        {/* Interactive Pins */}
        {activeProjects.map((project) => (
            <div
                key={project.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                style={{ top: `${project.coords.y}%`, left: `${project.coords.x}%` }}
            >
                <div className="relative">
                     {/* Pulse Effect */}
                    <div className={cn("absolute inset-0 rounded-full opacity-50 animate-ping", statusStyles[project.status as keyof typeof statusStyles])} />
                    
                    {/* Pin Dot */}
                    <div className={cn("relative w-3 h-3 rounded-full border-2 border-onyx-950", statusStyles[project.status as keyof typeof statusStyles])} />
                
                    {/* Tooltip Card */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-48 bg-onyx-900/95 backdrop-blur-xl border border-white/10 rounded-lg p-3 shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none scale-95 group-hover/pin:scale-100 origin-left z-20">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-white">{project.name}</h4>
                            <div className={cn("w-1.5 h-1.5 rounded-full", statusStyles[project.status as keyof typeof statusStyles].split(" ")[0])} />
                        </div>
                        <p className="text-[10px] text-diamond-muted mb-2 flex items-center gap-1">
                            <MapPin size={10} /> {project.location}
                        </p>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gold w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        ))}

        {/* List Overlay (Bottom Right) */}
        <div className="absolute bottom-4 right-4 w-64 bg-onyx-950/80 backdrop-blur-md border border-white/10 rounded-lg p-3 z-10 hidden md:block">
            <h5 className="text-xs font-semibold text-diamond-muted mb-2 uppercase tracking-wider">Status Overview</h5>
            <div className="space-y-2">
                 <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> On Track</span>
                    <span className="font-mono text-white/50">8</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Attention</span>
                    <span className="font-mono text-white/50">3</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-white"><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Delayed</span>
                    <span className="font-mono text-white/50">1</span>
                 </div>
            </div>
        </div>

    </Card>
  );
}
