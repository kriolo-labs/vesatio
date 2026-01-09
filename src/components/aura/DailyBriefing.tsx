"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateDailyBriefing, type DailyBriefing } from "@/lib/aura/insights/engine";
import {
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Minus,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export function DailyBriefingDialog() {
  const [open, setOpen] = useState(false);
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);

  useEffect(() => {
    // Check if briefing was already shown today
    const lastShown = localStorage.getItem("aura_briefing_date");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      // Use timeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setBriefing(generateDailyBriefing());
        setTimeout(() => setOpen(true), 1500);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("aura_briefing_date", new Date().toDateString());
  };

  if (!briefing) return null;

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") return <TrendingUp size={14} className="text-green-400" />;
    if (trend === "down") return <TrendingDown size={14} className="text-red-400" />;
    return <Minus size={14} className="text-diamond-muted" />;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-white/10 bg-onyx-900 sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl text-white">
                <span className="text-gold">☀️</span> Bom dia!
              </DialogTitle>
              <DialogDescription className="capitalize text-diamond-muted">
                {briefing.date}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-diamond-muted"
            >
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="flex items-center gap-3 border-white/5 bg-onyx-800 p-3">
              <CheckCircle size={20} className="text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{briefing.tasksToday}</p>
                <p className="text-xs text-diamond-muted">Tarefas Hoje</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 border-white/5 bg-onyx-800 p-3">
              <AlertTriangle size={20} className="text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{briefing.criticalAlerts}</p>
                <p className="text-xs text-diamond-muted">Alertas Críticos</p>
              </div>
            </Card>
          </div>

          {/* KPIs */}
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase text-diamond-muted">KPIs</h4>
            <div className="space-y-2">
              {briefing.kpis.map((kpi, i) => (
                <div key={i} className="flex items-center justify-between rounded bg-white/5 p-2">
                  <span className="text-sm text-white">{kpi.label}</span>
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    {kpi.value} <TrendIcon trend={kpi.trend} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-diamond-muted">
              <Lightbulb size={12} className="text-gold" /> Sugestões AURA
            </h4>
            <ul className="space-y-1">
              {briefing.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-1 text-gold">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleClose} className="text-onyx-950 bg-gold hover:bg-gold/90">
            Começar o Dia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
