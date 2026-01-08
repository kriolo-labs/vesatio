"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TrafficLightProps {
    items: Array<{
        id: string;
        label: string;
        status: "green" | "yellow" | "red";
        value?: string;
    }>;
    title?: string;
}

export function TrafficLight({ items, title }: TrafficLightProps) {
    const statusColors = {
        green: "bg-status-success",
        yellow: "bg-status-warning",
        red: "bg-status-error",
    };

    const statusGlow = {
        green: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
        yellow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]",
        red: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    };

    return (
        <div className="glass-panel p-6">
            {title && (
                <h3 className="font-medium text-diamond mb-4">{title}</h3>
            )}

            <div className="space-y-3">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    "w-3 h-3 rounded-full animate-pulse",
                                    statusColors[item.status],
                                    statusGlow[item.status]
                                )}
                            />
                            <span className="text-sm text-diamond">{item.label}</span>
                        </div>
                        {item.value && (
                            <span className="text-sm text-diamond-muted">{item.value}</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
