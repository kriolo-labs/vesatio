"use client";

import { motion } from "framer-motion";
import { Check, Clock, Circle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock phases
const phases = [
    {
        id: "1",
        name: "Fundação",
        description: "Preparação do terreno e fundações",
        progress: 100,
        status: "completed",
        tasks: [
            { id: "1", title: "Escavação", status: "completed" },
            { id: "2", title: "Armaduras", status: "completed" },
            { id: "3", title: "Betão", status: "completed" },
        ],
    },
    {
        id: "2",
        name: "Estrutura",
        description: "Paredes, lajes e cobertura",
        progress: 100,
        status: "completed",
        tasks: [
            { id: "1", title: "Paredes", status: "completed" },
            { id: "2", title: "Lajes", status: "completed" },
            { id: "3", title: "Cobertura", status: "completed" },
        ],
    },
    {
        id: "3",
        name: "Acabamentos",
        description: "Revestimentos e pintura",
        progress: 85,
        status: "in_progress",
        tasks: [
            { id: "1", title: "Reboco", status: "completed" },
            { id: "2", title: "Azulejos", status: "completed" },
            { id: "3", title: "Pintura", status: "in_progress" },
            { id: "4", title: "Pavimentos", status: "pending" },
        ],
    },
    {
        id: "4",
        name: "Smart Home",
        description: "Automação e sistemas inteligentes",
        progress: 40,
        status: "in_progress",
        tasks: [
            { id: "1", title: "Cablagem", status: "completed" },
            { id: "2", title: "Painéis solares", status: "in_progress" },
            { id: "3", title: "Sistema central", status: "pending" },
        ],
    },
    {
        id: "5",
        name: "Entrega",
        description: "Limpeza final e entrega de chaves",
        progress: 0,
        status: "pending",
        tasks: [],
    },
];

export default function ProjectTimelinePage() {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <Check className="w-4 h-4" />;
            case "in_progress":
                return <Clock className="w-4 h-4" />;
            default:
                return <Circle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-status-success text-white";
            case "in_progress":
                return "bg-gold text-onyx";
            default:
                return "bg-onyx-200 text-diamond-muted";
        }
    };

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <div>
                <h1 className="font-serif text-2xl text-diamond">O Seu Projeto</h1>
                <p className="text-gold">Villa Sal Rei</p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {phases.map((phase, index) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Connection Line */}
                        {index < phases.length - 1 && (
                            <div
                                className={cn(
                                    "absolute left-5 top-10 w-0.5 h-full -translate-x-1/2",
                                    phase.status === "completed" ? "bg-status-success" : "bg-onyx-200"
                                )}
                            />
                        )}

                        <div className="flex gap-4">
                            {/* Status Icon */}
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10",
                                    getStatusColor(phase.status)
                                )}
                            >
                                {getStatusIcon(phase.status)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 glass-panel p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-medium text-diamond">{phase.name}</h3>
                                        {phase.description && (
                                            <p className="text-sm text-diamond-muted mt-1">{phase.description}</p>
                                        )}
                                    </div>
                                    <span className="text-sm text-diamond-muted">{phase.progress}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-3 h-1.5 bg-onyx-200 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            phase.status === "completed" ? "bg-status-success" : "bg-gold-gradient"
                                        )}
                                        style={{ width: `${phase.progress}%` }}
                                    />
                                </div>

                                {/* Tasks Preview */}
                                {phase.tasks.length > 0 && phase.status === "in_progress" && (
                                    <div className="mt-4 space-y-2">
                                        {phase.tasks.slice(0, 3).map((task) => (
                                            <div key={task.id} className="flex items-center gap-2 text-sm">
                                                <div
                                                    className={cn(
                                                        "w-4 h-4 rounded-full flex items-center justify-center",
                                                        task.status === "completed"
                                                            ? "bg-status-success"
                                                            : task.status === "in_progress"
                                                                ? "bg-gold"
                                                                : "bg-onyx-200"
                                                    )}
                                                >
                                                    {task.status === "completed" && <Check className="w-2.5 h-2.5 text-white" />}
                                                </div>
                                                <span
                                                    className={cn(
                                                        task.status === "completed"
                                                            ? "text-diamond-muted line-through"
                                                            : "text-diamond"
                                                    )}
                                                >
                                                    {task.title}
                                                </span>
                                            </div>
                                        ))}
                                        {phase.tasks.length > 3 && (
                                            <p className="text-xs text-gold flex items-center gap-1">
                                                Ver mais {phase.tasks.length - 3} tarefas
                                                <ChevronRight className="w-3 h-3" />
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
