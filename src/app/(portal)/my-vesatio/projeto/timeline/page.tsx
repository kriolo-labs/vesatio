"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Camera,
  CheckCircle,
  ChevronLeft,
  Circle,
  CreditCard,
  Loader2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Phase {
  id: string;
  name: string;
  status: "completed" | "in_progress" | "pending";
  startDate: string;
  endDate: string | null;
  description: string;
  photos: string[];
  paymentMilestone?: { amount: number; status: string };
}

const phases: Phase[] = [
  {
    id: "1",
    name: "Fundações",
    status: "completed",
    startDate: "2025-06-01",
    endDate: "2025-07-15",
    description: "Escavação e betonagem das fundações da estrutura principal.",
    photos: ["/placeholder.jpg"],
    paymentMilestone: { amount: 2000000, status: "paid" },
  },
  {
    id: "2",
    name: "Estrutura",
    status: "completed",
    startDate: "2025-07-16",
    endDate: "2025-09-30",
    description: "Construção da estrutura em betão armado e lajes.",
    photos: ["/placeholder.jpg"],
  },
  {
    id: "3",
    name: "Cobertura",
    status: "completed",
    startDate: "2025-10-01",
    endDate: "2025-11-15",
    description: "Instalação do telhado e impermeabilização.",
    photos: [],
  },
  {
    id: "4",
    name: "Instalações",
    status: "completed",
    startDate: "2025-11-16",
    endDate: "2025-12-20",
    description: "Instalações elétricas, canalizações e pré-instalação de domótica.",
    photos: [],
    paymentMilestone: { amount: 3000000, status: "paid" },
  },
  {
    id: "5",
    name: "Acabamentos",
    status: "in_progress",
    startDate: "2025-12-21",
    endDate: null,
    description: "Revestimentos, pintura, carpintaria e detalhes finais.",
    photos: ["/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "6",
    name: "Smart Home",
    status: "pending",
    startDate: "2026-02-01",
    endDate: null,
    description: "Instalação e configuração de sistemas inteligentes.",
    photos: [],
    paymentMilestone: { amount: 2500000, status: "pending" },
  },
  {
    id: "7",
    name: "Entrega",
    status: "pending",
    startDate: "2026-03-15",
    endDate: null,
    description: "Inspeção final, documentação e entrega das chaves.",
    photos: [],
  },
];

const updates = [
  { id: "u1", text: "Instalação de mármore na cozinha concluída", date: "Há 2 dias" },
  { id: "u2", text: "Pintura do piso 1 iniciada", date: "Há 4 dias" },
  { id: "u3", text: "Fase de Instalações concluída", date: "20 Dez 2025" },
];

export default function TimelinePage() {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  const getStatusIcon = (status: Phase["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "in_progress":
        return <Loader2 className="h-5 w-5 animate-spin text-gold" />;
      case "pending":
        return <Circle className="h-5 w-5 text-diamond-muted" />;
    }
  };

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/my-vesatio/projeto">
          <Button variant="ghost" size="icon" className="text-diamond-muted">
            <ChevronLeft size={20} />
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-diamond">Timeline do Projeto</h1>
      </div>

      {/* Timeline */}
      <div className="relative ml-4 space-y-6 border-l-2 border-white/10">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8"
          >
            {/* Status Dot */}
            <div
              className={`absolute -left-[13px] top-1 rounded-full p-1 ${phase.status === "in_progress" ? "bg-gold/20" : phase.status === "completed" ? "bg-green-500/20" : "bg-onyx-800"}`}
            >
              {getStatusIcon(phase.status)}
            </div>

            {/* Phase Card */}
            <Card
              className={`cursor-pointer border-white/5 bg-onyx-900 p-4 transition-colors hover:border-gold/30 ${phase.status === "in_progress" ? "border-gold/20" : ""}`}
              onClick={() => setSelectedPhase(phase)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-diamond">{phase.name}</h3>
                  <p className="mt-1 text-xs text-diamond-muted">
                    {new Date(phase.startDate).toLocaleDateString("pt-PT", {
                      month: "short",
                      year: "numeric",
                    })}
                    {phase.endDate &&
                      ` - ${new Date(phase.endDate).toLocaleDateString("pt-PT", { month: "short", year: "numeric" })}`}
                  </p>
                </div>
                {phase.paymentMilestone && (
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${phase.paymentMilestone.status === "paid" ? "bg-green-500/10 text-green-400" : "bg-gold/10 text-gold"}`}
                  >
                    <CreditCard size={10} /> {(phase.paymentMilestone.amount / 1000000).toFixed(1)}M
                  </span>
                )}
              </div>
              {phase.photos.length > 0 && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-diamond-muted">
                  <Camera size={10} /> {phase.photos.length} fotos
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Updates Feed */}
      <div className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-diamond">
          <Calendar size={14} className="text-gold" /> Atualizações Recentes
        </h2>
        <div className="space-y-3">
          {updates.map((update) => (
            <div key={update.id} className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
              <div>
                <p className="text-sm text-diamond">{update.text}</p>
                <p className="text-[10px] text-diamond-muted">{update.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Detail Modal */}
      <AnimatePresence>
        {selectedPhase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-onyx/95 p-4"
            onClick={() => setSelectedPhase(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="w-full max-w-lg rounded-t-2xl border-t border-white/10 bg-onyx-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedPhase.status)}
                  <h2 className="font-serif text-lg text-diamond">{selectedPhase.name}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedPhase(null)}>
                  <X size={18} className="text-diamond-muted" />
                </Button>
              </div>
              <p className="mb-4 text-sm text-diamond-muted">{selectedPhase.description}</p>

              {selectedPhase.photos.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {selectedPhase.photos.map((_, i) => (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-lg bg-white/5"
                    >
                      <Camera size={20} className="text-diamond-muted" />
                    </div>
                  ))}
                </div>
              )}

              {selectedPhase.paymentMilestone && (
                <Card className="border-white/5 bg-white/5 p-3">
                  <p className="mb-1 text-xs text-diamond-muted">Marco de Pagamento</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-diamond">
                      {(selectedPhase.paymentMilestone.amount / 1000000).toFixed(1)}M CVE
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${selectedPhase.paymentMilestone.status === "paid" ? "bg-green-500/10 text-green-400" : "bg-gold/10 text-gold"}`}
                    >
                      {selectedPhase.paymentMilestone.status === "paid" ? "Pago" : "Pendente"}
                    </span>
                  </div>
                </Card>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
