"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Calendar,
  Camera,
  ChevronLeft,
  Clock,
  Image as ImageIcon,
  Play,
  Video,
  VideoOff,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const availableSlots = [
  { id: "s1", date: "2026-01-10", time: "10:00", available: true },
  { id: "s2", date: "2026-01-10", time: "14:00", available: false },
  { id: "s3", date: "2026-01-11", time: "10:00", available: true },
  { id: "s4", date: "2026-01-11", time: "14:00", available: true },
];

const recordings = [
  { id: "r1", date: "2026-01-08", duration: "15:00", thumbnail: "/placeholder.jpg" },
  { id: "r2", date: "2026-01-07", duration: "12:30", thumbnail: "/placeholder.jpg" },
  { id: "r3", date: "2026-01-06", duration: "18:00", thumbnail: "/placeholder.jpg" },
];

const highlights = [
  { id: "h1", title: "Instalação Cozinha", date: "2026-01-05", duration: "2:30" },
  { id: "h2", title: "Pintura Sala", date: "2026-01-03", duration: "3:15" },
];

export default function LiveCamPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isLive] = useState(false);
  const hasCam = true; // toggle for no-cam scenario

  if (!hasCam) {
    return (
      <div className="p-4 pb-24">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/my-vesatio/projeto">
            <Button variant="ghost" size="icon" className="text-diamond-muted">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="font-serif text-xl text-diamond">Live Cam</h1>
        </div>
        <Card className="border-white/5 bg-onyx-900 p-8 text-center">
          <VideoOff size={48} className="mx-auto mb-4 text-diamond-muted" />
          <h2 className="mb-2 font-medium text-diamond">Câmera Não Disponível</h2>
          <p className="mb-4 text-sm text-diamond-muted">
            Este projeto não possui câmera instalada. Veja as fotos mais recentes na galeria.
          </p>
          <Link href="/my-vesatio/projeto/galeria">
            <Button className="text-onyx-950 bg-gold">Ver Galeria</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <div className="flex items-center gap-3">
        <Link href="/my-vesatio/projeto">
          <Button variant="ghost" size="icon" className="text-diamond-muted">
            <ChevronLeft size={20} />
          </Button>
        </Link>
        <h1 className="font-serif text-xl text-diamond">Live Cam</h1>
      </div>

      {/* Live Preview / Booking Card */}
      <Card className="overflow-hidden border-white/5 bg-onyx-900">
        <div className="relative flex aspect-video items-center justify-center bg-onyx-800">
          {isLive ? (
            <>
              <div className="absolute left-4 top-4 flex animate-pulse items-center gap-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
                <span className="h-2 w-2 rounded-full bg-white" /> AO VIVO
              </div>
              <div className="absolute right-4 top-4 rounded bg-black/50 px-2 py-1 text-xs text-white">
                <Clock size={12} className="mr-1 inline" /> 12:34 restantes
              </div>
              <Video size={48} className="text-diamond-muted" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 right-4 bg-white/10 text-white"
              >
                <Camera size={18} />
              </Button>
            </>
          ) : (
            <div className="text-center">
              <VideoOff size={48} className="mx-auto mb-2 text-diamond-muted" />
              <p className="mb-2 text-sm text-diamond-muted">Transmissão offline</p>
              <p className="text-xs text-diamond-muted">Próximo horário: 10:00 - 10:20</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="mb-3 text-xs text-diamond-muted">
            Acesso exclusivo de 20 minutos por sessão. Reserve o seu horário.
          </p>
          <Button
            className="text-onyx-950 w-full gap-2 bg-gold"
            onClick={() => setShowBooking(true)}
          >
            <Calendar size={16} /> Agendar Visualização
          </Button>
        </div>
      </Card>

      {/* Recordings */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Play size={14} className="text-gold" /> Gravações Recentes
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recordings.map((rec) => (
            <Card
              key={rec.id}
              className="w-40 shrink-0 cursor-pointer overflow-hidden border-white/5 bg-onyx-900 transition-colors hover:border-gold/30"
            >
              <div className="relative flex aspect-video items-center justify-center bg-onyx-800">
                <Play size={24} className="text-diamond-muted" />
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1 text-[10px] text-white">
                  {rec.duration}
                </span>
              </div>
              <div className="p-2">
                <p className="text-xs text-diamond-muted">
                  {new Date(rec.date).toLocaleDateString("pt-PT")}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <ImageIcon size={14} className="text-gold" /> Highlights da Equipa
        </h2>
        <div className="space-y-3">
          {highlights.map((hl) => (
            <Card
              key={hl.id}
              className="flex cursor-pointer items-center justify-between border-white/5 bg-onyx-900 p-3 transition-colors hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-onyx-800">
                  <Play size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm text-diamond">{hl.title}</p>
                  <p className="text-[10px] text-diamond-muted">
                    {new Date(hl.date).toLocaleDateString("pt-PT")} • {hl.duration}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="border-white/10 bg-onyx-900">
          <DialogHeader>
            <DialogTitle className="text-diamond">Agendar Visualização</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm text-diamond-muted">Selecione um horário disponível:</p>
          <div className="space-y-2">
            {availableSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedSlot === slot.id ? "default" : "outline"}
                className={`w-full justify-between ${selectedSlot === slot.id ? "text-onyx-950 bg-gold" : "border-white/10 text-diamond"} ${!slot.available ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => slot.available && setSelectedSlot(slot.id)}
                disabled={!slot.available}
              >
                <span>
                  {new Date(slot.date).toLocaleDateString("pt-PT", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span>
                  {slot.time} - {parseInt(slot.time) + ":20"}
                </span>
              </Button>
            ))}
          </div>
          <Button className="text-onyx-950 mt-4 w-full bg-gold" disabled={!selectedSlot}>
            Confirmar Agendamento
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
