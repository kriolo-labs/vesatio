"use client";

import { Card } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, ArrowDown, ArrowUp, Briefcase, DollarSign, Users, Wallet } from "lucide-react";

const kpiData = [
  {
    title: "Faturação (Mês)",
    value: 12500000,
    change: 12.5,
    trend: "up",
    icon: DollarSign,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    title: "EBITDA Estimate",
    value: 4200000,
    change: 8.2,
    trend: "up",
    icon: Activity,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Projetos Ativos",
    value: "14", // String to avoid currency formatting if needed, or handle in component
    subtitle: "Valor Total: 450M CVE",
    change: -2,
    trend: "down",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Cash Position",
    value: 8500000,
    change: 5.4,
    trend: "up",
    icon: Wallet,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
    {
    title: "Novos Leads",
    value: "28",
    change: 15.3,
    trend: "up",
    icon: Users,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export function KPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => (
        <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="p-4 border-white/5 bg-onyx-900/50 hover:bg-onyx-900 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div className={cn("p-2 rounded-lg", kpi.bg)}>
                  <kpi.icon className={cn("w-5 h-5", kpi.color)} />
                </div>
                {kpi.change && (
                  <div className={cn(
                    "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                    kpi.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                  )}>
                    {kpi.trend === "up" ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                    {Math.abs(kpi.change)}%
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-diamond-muted uppercase tracking-wider font-medium">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">
                    {typeof kpi.value === 'number' ? formatCurrency(kpi.value) : kpi.value}
                </h3>
                {kpi.subtitle && (
                    <p className="text-xs text-white/40">{kpi.subtitle}</p>
                )}
              </div>
            </Card>
        </motion.div>
      ))}
    </div>
  );
}
