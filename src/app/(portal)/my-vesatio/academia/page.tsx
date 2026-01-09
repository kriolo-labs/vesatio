"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Headphones,
  HelpCircle,
  Lightbulb,
  Mic,
  Play,
  Shield,
  Thermometer,
  Volume2,
} from "lucide-react";
import { useState } from "react";

const tutorials = [
  {
    id: "t1",
    title: "Iluminação",
    icon: <Lightbulb size={20} />,
    videos: 4,
    description: "Controle de luzes e cenas",
  },
  {
    id: "t2",
    title: "Climatização",
    icon: <Thermometer size={20} />,
    videos: 3,
    description: "Ar condicionado e aquecimento",
  },
  {
    id: "t3",
    title: "Som Ambiente",
    icon: <Volume2 size={20} />,
    videos: 2,
    description: "Sistema de som multiroom",
  },
  {
    id: "t4",
    title: "Segurança",
    icon: <Shield size={20} />,
    videos: 5,
    description: "Alarme, câmaras e fechaduras",
  },
];

const voiceCommands = [
  {
    id: "v1",
    command: "Alexa, boa noite",
    action: "Desliga todas as luzes, fecha cortinas, ativa alarme",
  },
  {
    id: "v2",
    command: "Alexa, bom dia",
    action: "Abre cortinas, liga luzes da cozinha, inicia playlist matinal",
  },
  {
    id: "v3",
    command: "Alexa, modo cinema",
    action: "Escurece sala, liga TV e soundbar, ajusta iluminação ambiente",
  },
  {
    id: "v4",
    command: "Alexa, estou a sair",
    action: "Desliga tudo, ativa alarme, verifica portas",
  },
  {
    id: "v5",
    command: "OK Google, temperatura ideal",
    action: "Ajusta climatização para 22°C em toda a casa",
  },
];

const faqs = [
  {
    id: "f1",
    q: "As luzes não respondem ao comando de voz",
    a: "Verifique se o hub central está ligado e se o dispositivo Alexa/Google está na mesma rede Wi-Fi.",
  },
  {
    id: "f2",
    q: "O ar condicionado não liga automaticamente",
    a: "Confirme que o modo de agendamento está ativo na app de climatização. Pode ser necessário recalibrar os sensores de temperatura.",
  },
  {
    id: "f3",
    q: "Como adiciono um novo dispositivo?",
    a: "Contacte o suporte técnico Vesatio. Novas integrações requerem configuração profissional.",
  },
];

export default function AcademiaPage() {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-4 pb-24">
      <div>
        <h1 className="font-serif text-xl text-diamond">Smart Home Academy</h1>
        <p className="text-sm text-diamond-muted">
          Aprenda a tirar o máximo da sua casa inteligente.
        </p>
      </div>

      <Tabs defaultValue="tutorials">
        <TabsList className="w-full border border-white/5 bg-onyx-900">
          <TabsTrigger value="tutorials" className="flex-1">
            Tutoriais
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex-1">
            Comandos
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex-1">
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="mt-4 space-y-3">
          {tutorials.map((tut) => (
            <Card
              key={tut.id}
              className="cursor-pointer border-white/5 bg-onyx-900 p-4 transition-colors hover:border-gold/30"
              onClick={() => setSelectedTutorial(tut.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    {tut.icon}
                  </div>
                  <div>
                    <p className="font-medium text-diamond">{tut.title}</p>
                    <p className="text-xs text-diamond-muted">
                      {tut.videos} vídeos • {tut.description}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-diamond-muted" />
              </div>
            </Card>
          ))}

          {selectedTutorial && (
            <Card className="border-gold/20 bg-gold/10 p-4">
              <div className="mb-3 flex items-center gap-3">
                <Play size={20} className="text-gold" />
                <p className="font-medium text-diamond">
                  Vídeos de {tutorials.find((t) => t.id === selectedTutorial)?.title}
                </p>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start text-diamond-muted hover:text-diamond"
                  >
                    <Play size={14} className="mr-2" /> Vídeo {i}: Configuração básica
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="voice" className="mt-4 space-y-3">
          <div className="mb-4 flex items-center gap-2">
            <Mic size={16} className="text-gold" />
            <p className="text-sm text-diamond">Comandos de voz configurados na sua casa</p>
          </div>
          {voiceCommands.map((vc) => (
            <Card key={vc.id} className="border-white/5 bg-onyx-900 p-4">
              <p className="mb-1 font-mono text-sm font-medium text-diamond">
                &quot;{vc.command}&quot;
              </p>
              <p className="text-xs text-diamond-muted">→ {vc.action}</p>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="faq" className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.id} className="border-white/5 bg-onyx-900 p-4">
              <div className="flex items-start gap-3">
                <HelpCircle size={16} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="mb-2 text-sm font-medium text-diamond">{faq.q}</p>
                  <p className="text-xs text-diamond-muted">{faq.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Support */}
      <Card className="border-white/5 bg-onyx-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Headphones size={20} className="text-gold" />
            <div>
              <p className="font-medium text-diamond">Suporte Técnico</p>
              <p className="text-xs text-diamond-muted">Problemas com a casa inteligente?</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-gold/30 text-gold">
            Contactar
          </Button>
        </div>
      </Card>
    </div>
  );
}
