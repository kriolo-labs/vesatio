"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ISLANDS = [
    { name: 'Santiago', top: '70%', left: '75%', size: 40 },
    { name: 'Sal', top: '30%', left: '80%', size: 25 },
    { name: 'São Vicente', top: '35%', left: '20%', size: 30 },
    { name: 'Boavista', top: '45%', left: '85%', size: 35 },
    { name: 'Fogo', top: '75%', left: '60%', size: 30 },
];

const PROJECTS = [
    { id: 1, island: 'Santiago', name: 'Villa Praia', status: 'OK', top: '72%', left: '76%' },
    { id: 2, island: 'Sal', name: 'Resort Santa Maria', status: 'ISSUE', top: '32%', left: '82%' },
    { id: 3, island: 'São Vicente', name: 'Mindelo Marina', status: 'OK', top: '36%', left: '22%' },
];

export default function GodModeMap() {
    const [hoveredProject, setHoveredProject] = useState<any>(null);

    return (
        <div className="glass-panel w-full h-full min-h-[400px] relative overflow-hidden bg-[#0a0a0a]">
            {/* Title */}
            <div className="absolute top-4 left-6 z-10">
                <h2 className="text-white font-serif text-xl tracking-wider">GOD MODE</h2>
                <p className="text-white/40 text-xs uppercase tracking-widest">Live Operations Map • Cabo Verde</p>
            </div>

            {/* Map Container */}
            <div className="absolute inset-0 opacity-40">
                {/* Abstract Map Representation - Using simplified circles for islands in a relative grid */}
                {ISLANDS.map(island => (
                    <div
                        key={island.name}
                        className="absolute border border-white/5 rounded-full bg-white/5"
                        style={{
                            top: island.top,
                            left: island.left,
                            width: island.size * 2,
                            height: island.size * 2,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}
            </div>

            {/* Project Markers */}
            {PROJECTS.map((proj) => (
                <motion.div
                    key={proj.id}
                    className="absolute cursor-pointer"
                    style={{ top: proj.top, left: proj.left }}
                    onMouseEnter={() => setHoveredProject(proj)}
                    onMouseLeave={() => setHoveredProject(null)}
                >
                    {/* Pulse Effect */}
                    <div className={`relative w-4 h-4 rounded-full flex items-center justify-center ${proj.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${proj.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                </motion.div>
            ))}

            {/* Tooltip Card */}
            {hoveredProject && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 right-6 bg-onyx border border-white/10 p-4 rounded-lg shadow-xl z-20 w-64"
                >
                    <h3 className="text-white font-serif">{hoveredProject.name}</h3>
                    <p className="text-white/50 text-xs mb-2">{hoveredProject.island}</p>

                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${hoveredProject.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`text-xs font-semibold ${hoveredProject.status === 'OK' ? 'text-green-500' : 'text-red-500'}`}>
                            {hoveredProject.status === 'OK' ? 'ON SCHEDULE' : 'CRITICAL ISSUE DETECTED'}
                        </span>
                    </div>

                    {hoveredProject.status === 'ISSUE' && (
                        <p className="text-[10px] text-white/60 bg-red-500/10 p-2 rounded">
                            AURA Alert: Structural anomaly detected in sector 4.
                        </p>
                    )}
                </motion.div>
            )}

        </div>
    );
}
