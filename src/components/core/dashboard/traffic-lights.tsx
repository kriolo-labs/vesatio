"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Banknote, CheckCircle2, Clock, ShieldAlert, Users } from "lucide-react";

// Traffic Light Logic:
// Green: Good / On Track
// Yellow: Warning / Minor Deviation
// Red: Critical / Action Required

const lights = [
  {
    id: "finance",
    label: "Caixa vs Banco",
    status: "green", // green, yellow, red
    value: "Conciliado",
    icon: Banknote,
    detail: "Diferença: 0 CVE",
  },
  {
    id: "efficiency",
    label: "Eficiência MP",
    status: "yellow",
    value: "92%",
    icon: CheckCircle2,
    detail: "Desvio: 8% (Meta <5%)",
  },
  {
    id: "deadline",
    label: "Prazos Entrega",
    status: "green",
    value: "On Track",
    icon: Clock,
    detail: "Nenhum atraso crítico",
  },
  {
    id: "labor",
    label: "Custo M.O.",
    status: "red",
    value: "+12% Budget",
    icon: Users,
    detail: "Overtime Projecto #127",
  },
  {
    id: "integrity",
    label: "Integridade",
    status: "green",
    value: "Seguro",
    icon: ShieldAlert,
    detail: "Sistema Operacional",
  },
];

const statusColors = {
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    indicator: "bg-emerald-500",
  },
  yellow: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/20",
    indicator: "bg-amber-500",
  },
  red: {
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    border: "border-rose-500/20",
    indicator: "bg-rose-500",
  },
};

export function TrafficLights() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {lights.map((light, index) => {
        const colors = statusColors[light.status as keyof typeof statusColors];
        return (
          <motion.div
            key={light.id}
             initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
          >
              <Card className={cn(
                  "p-3 border transition-all hover:bg-onyx-800 cursor-pointer relative overflow-hidden group h-full",
                  colors.border,
                  "bg-onyx-900/40"
              )}>
                  {/* Status Indicator Glow */}
                  <div className={cn("absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:opacity-20 transition-opacity", colors.indicator)} />

                  <div className="flex items-center justify-between mb-2">
                       <light.icon className={cn("w-4 h-4", colors.text)} />
                       <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]", colors.indicator, colors.text)} />
                  </div>
                  
                  <h4 className="text-sm font-medium text-diamond mb-0.5">{light.label}</h4>
                  <p className={cn("text-lg font-bold", colors.text)}>{light.value}</p>
                  <p className="text-[10px] text-diamond-muted mt-1 truncate">{light.detail}</p>
              </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
