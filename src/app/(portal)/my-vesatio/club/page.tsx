"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight, Copy, Gift, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    id: "b1",
    title: "Manutenção Prioritária",
    description: "Atendimento em 24h para qualquer problema técnico",
  },
  {
    id: "b2",
    title: "Desconto Parceiros",
    description: "15% de desconto em mobiliário da Natuzzi Portugal",
  },
  {
    id: "b3",
    title: "Upgrade Gratuito",
    description: "Upgrade para sistema de som premium no próximo projeto",
  },
  {
    id: "b4",
    title: "Acesso a Eventos",
    description: "Convite para vernissages e lançamentos exclusivos",
  },
];

const referrals = [
  { id: "r1", name: "Maria S.", status: "Projeto iniciado", reward: "500€ crédito" },
  { id: "r2", name: "João P.", status: "Em consulta", reward: "Pendente" },
];

const events = [
  { id: "e1", title: "Showroom Opening - Mindelo", date: "2026-02-15", rsvp: false },
  { id: "e2", title: "Workshop Smart Living", date: "2026-03-01", rsvp: true },
];

export default function ClubPage() {
  const referralCode = "CARLOS-VES2026";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
  };

  return (
    <div className="space-y-6 p-4 pb-24">
      <div>
        <h1 className="font-serif text-xl text-diamond">Vesatio Club</h1>
        <p className="text-sm text-diamond-muted">Benefícios exclusivos para clientes Vesatio.</p>
      </div>

      {/* Membership Card */}
      <Card className="border-gold/30 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold">
            <Star size={28} className="text-onyx-950" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold">Gold Member</p>
            <p className="font-serif text-lg text-diamond">Carlos Silva</p>
          </div>
        </div>
        <p className="text-xs text-diamond-muted">Membro desde Junho 2025</p>
      </Card>

      {/* Benefits */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Gift size={14} className="text-gold" /> Os Seus Benefícios
        </h2>
        <div className="space-y-3">
          {benefits.map((b) => (
            <Card key={b.id} className="border-white/5 bg-onyx-900 p-4">
              <p className="text-sm font-medium text-diamond">{b.title}</p>
              <p className="text-xs text-diamond-muted">{b.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Users size={14} className="text-gold" /> Programa de Referências
        </h2>
        <Card className="mb-4 border-white/5 bg-onyx-900 p-4">
          <p className="mb-2 text-xs text-diamond-muted">O seu código de referência:</p>
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
            <span className="font-mono font-bold text-gold">{referralCode}</span>
            <Button variant="ghost" size="icon" onClick={copyCode} className="text-diamond-muted">
              <Copy size={16} />
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-diamond-muted">
            Ganhe 500€ de crédito por cada amigo que iniciar um projeto.
          </p>
        </Card>

        {referrals.length > 0 && (
          <div className="space-y-2">
            {referrals.map((ref) => (
              <Card
                key={ref.id}
                className="flex items-center justify-between border-white/5 bg-onyx-800 p-3"
              >
                <div>
                  <p className="text-sm text-diamond">{ref.name}</p>
                  <p className="text-[10px] text-diamond-muted">{ref.status}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${ref.reward === "Pendente" ? "bg-yellow-500/10 text-yellow-400" : "bg-green-500/10 text-green-400"}`}
                >
                  {ref.reward}
                </span>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Events */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Calendar size={14} className="text-gold" /> Eventos Exclusivos
        </h2>
        <div className="space-y-3">
          {events.map((ev) => (
            <Card
              key={ev.id}
              className="flex items-center justify-between border-white/5 bg-onyx-900 p-4"
            >
              <div>
                <p className="text-sm font-medium text-diamond">{ev.title}</p>
                <p className="text-xs text-diamond-muted">
                  {new Date(ev.date).toLocaleDateString("pt-PT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Button
                variant={ev.rsvp ? "outline" : "default"}
                size="sm"
                className={ev.rsvp ? "border-green-500/30 text-green-400" : "text-onyx-950 bg-gold"}
              >
                {ev.rsvp ? "Confirmado" : "RSVP"}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings Link */}
      <Link href="/my-vesatio/definicoes">
        <Card className="flex cursor-pointer items-center justify-between border-white/5 bg-onyx-900 p-4 transition-colors hover:border-gold/30">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-diamond-muted" />
            <p className="text-diamond">Definições da Conta</p>
          </div>
          <ChevronRight size={16} className="text-diamond-muted" />
        </Card>
      </Link>
    </div>
  );
}
