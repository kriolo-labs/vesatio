"use client";

import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  Image as ImageIcon,
  Ship,
  Video,
  VideoOff,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock data
const project = {
  code: "VES-2026-001",
  name: "Villa Sal Rei",
  progress: 92,
  currentPhase: "Acabamentos",
  estimatedEnd: "2026-03-15",
  daysLeft: 65,
  status: "on_track", // on_track | attention | delayed
  budget: 15000000,
  paid: 12500000,
  nextPayment: { date: "2026-01-25", amount: 1250000 },
  liveCamEnabled: true,
  liveCamUrl: "https://example.com/live",
};

// Milestone and notifications data available for future use
// const nextMilestone = { name: "Conclusão de Pintura Interior", date: "2026-01-20", status: "in_progress" };
// const notifications = [...];

const updates = [
  { id: "1", type: "photo", date: "2026-01-07", status: "approved" },
  { id: "2", type: "photo", date: "2026-01-06", status: "pending" },
  { id: "3", type: "photo", date: "2026-01-05", status: "approved" },
  { id: "4", type: "photo", date: "2026-01-04", status: "approved" },
];

// Calculate greeting based on time of day
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

// Check if within live hours (10:00-10:20)
function checkIsLive(): boolean {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return hours === 10 && minutes < 20 && project.liveCamEnabled;
}

export default function MyVesatioPage() {
  const greeting = getGreeting();
  const [isLive, setIsLive] = useState(checkIsLive);
  const [showLive, setShowLive] = useState(false);

  useEffect(() => {
    // Update live status periodically
    const interval = setInterval(() => {
      setIsLive(checkIsLive());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-4">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-diamond-muted">{greeting},</p>
          <h1 className="font-serif text-2xl text-diamond">Carlos</h1>
        </div>
        <button className="relative p-2 text-diamond-muted hover:text-diamond">
          <Bell className="h-6 w-6" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-gold" />
        </button>
      </div>

      {/* Stories/Updates */}
      {updates.length > 0 && (
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {updates.map((update, index) => (
            <motion.button
              key={update.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="h-16 w-16 shrink-0 rounded-full bg-gold-gradient p-0.5"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-onyx-100">
                <ImageIcon className="h-6 w-6 text-diamond-muted" />
              </div>
            </motion.button>
          ))}
          <button className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-onyx-200">
            <span className="text-sm text-diamond-muted">+</span>
          </button>
        </div>
      )}

      {/* Main Project Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-gold p-6"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="font-mono text-xs text-gold">{project.code}</span>
            <h2 className="font-serif text-xl text-diamond">{project.name}</h2>
          </div>

          {/* Live Cam Button */}
          <button
            onClick={() => isLive && setShowLive(true)}
            disabled={!isLive}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
              isLive ? "animate-pulse bg-status-error text-white" : "bg-onyx-200 text-diamond-muted"
            }`}
          >
            {isLive ? (
              <>
                <Video className="h-4 w-4" />
                <span className="text-xs font-medium">AO VIVO</span>
              </>
            ) : (
              <>
                <VideoOff className="h-4 w-4" />
                <span className="text-xs">10:00</span>
              </>
            )}
          </button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-diamond-muted">Progresso</span>
            <span className="font-medium text-diamond">{project.progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-onyx-200">
            <div
              className="h-full rounded-full bg-gold-gradient transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-onyx-100 p-4">
            <p className="mb-1 text-xs text-diamond-muted">Fase Atual</p>
            <p className="text-sm font-medium text-diamond">{project.currentPhase}</p>
          </div>
          <div className="rounded-lg bg-onyx-100 p-4">
            <p className="mb-1 text-xs text-diamond-muted">Previsão</p>
            <p className="text-sm font-medium text-diamond">
              {new Date(project.estimatedEnd).toLocaleDateString("pt-PT", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Financial Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-diamond">Situação Financeira</h3>
          <Link href="/my-vesatio/financeiro" className="flex items-center gap-1 text-xs text-gold">
            Ver detalhes
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-diamond-muted">Total do Projeto</span>
            <span className="font-medium text-diamond">{formatCurrency(project.budget)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-diamond-muted">Pago</span>
            <span className="font-medium text-status-success">{formatCurrency(project.paid)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-onyx-200">
            <div
              className="h-full bg-gold-gradient"
              style={{ width: `${(project.paid / project.budget) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-diamond-muted">Saldo</span>
            <span className="font-medium text-gold">
              {formatCurrency(project.budget - project.paid)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Import Tracking Visibility (Phase 12.4) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-panel p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-medium text-diamond">
            <Ship className="h-4 w-4 text-gold" /> Tracking de Importações
          </h3>
          <span className="font-mono text-[10px] uppercase text-diamond-muted">1 em trânsito</span>
        </div>
        <div className="space-y-3 rounded-lg bg-onyx-100 p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-diamond">Acabamentos Premium (Itália)</span>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">
              Em Trânsito
            </span>
          </div>
          <div className="relative h-1 rounded-full bg-onyx-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gold"
              style={{ width: "65%" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-diamond-muted">
            <span>Saída: 12 Dez</span>
            <span>Chegada Prevista: 18 Jan</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/my-vesatio/projeto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel flex items-center gap-3 p-4"
          >
            <div className="rounded-lg bg-gold/10 p-2">
              <Clock className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-diamond">Timeline</p>
              <p className="text-xs text-diamond-muted">Ver fases</p>
            </div>
          </motion.div>
        </Link>
        <Link href="/my-vesatio/vault">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel flex items-center gap-3 p-4"
          >
            <div className="rounded-lg bg-gold/10 p-2">
              <CheckCircle className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-diamond">Documentos</p>
              <p className="text-xs text-diamond-muted">12 ficheiros</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Live Stream Modal */}
      {showLive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-onyx/95 p-4"
          onClick={() => setShowLive(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-onyx-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <Video className="mx-auto mb-4 h-12 w-12 text-gold" />
                <p className="text-diamond">Transmissão ao vivo</p>
                <p className="text-sm text-diamond-muted">10:00 - 10:20</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
