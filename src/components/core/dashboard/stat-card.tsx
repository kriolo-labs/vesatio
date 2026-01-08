"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: LucideIcon;
    variant?: "default" | "gold" | "success" | "warning" | "error";
}

export function StatCard({
    title,
    value,
    change,
    changeLabel,
    icon: Icon,
    variant = "default",
}: StatCardProps) {
    const variants = {
        default: "glass-panel",
        gold: "glass-panel-gold",
        success: "glass-panel border-status-success/30",
        warning: "glass-panel border-status-warning/30",
        error: "glass-panel border-status-error/30",
    };

    const iconBg = {
        default: "bg-onyx-200 text-diamond",
        gold: "bg-gold/20 text-gold",
        success: "bg-status-success/20 text-status-success",
        warning: "bg-status-warning/20 text-status-warning",
        error: "bg-status-error/20 text-status-error",
    };

    const getTrendIcon = () => {
        if (!change) return <Minus className="w-3 h-3" />;
        return change > 0 ? (
            <TrendingUp className="w-3 h-3" />
        ) : (
            <TrendingDown className="w-3 h-3" />
        );
    };

    const getTrendColor = () => {
        if (!change || change === 0) return "text-diamond-muted";
        return change > 0 ? "text-status-success" : "text-status-error";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("p-6", variants[variant])}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-diamond-muted mb-1">{title}</p>
                    <p className="text-2xl font-serif text-diamond">{value}</p>

                    {(change !== undefined || changeLabel) && (
                        <div className={cn("flex items-center gap-1 mt-2 text-xs", getTrendColor())}>
                            {getTrendIcon()}
                            <span>
                                {change !== undefined && `${change > 0 ? "+" : ""}${change}%`}
                                {changeLabel && ` ${changeLabel}`}
                            </span>
                        </div>
                    )}
                </div>

                <div className={cn("p-3 rounded-lg", iconBg[variant])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </motion.div>
    );
}
