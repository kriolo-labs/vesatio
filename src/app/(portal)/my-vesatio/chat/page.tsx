"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, ChevronRight, MapPin, Paperclip, Send, User, Video, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Message {
  id: string;
  sender: "client" | "team" | "aura";
  text: string;
  time: string;
}

const messages: Message[] = [
  {
    id: "m1",
    sender: "team",
    text: "Bom dia! O mármore da cozinha já foi instalado. Veja as fotos na galeria.",
    time: "09:30",
  },
  {
    id: "m2",
    sender: "client",
    text: "Excelente! Ficou muito bonito. Quando começa a pintura?",
    time: "10:15",
  },
  {
    id: "m3",
    sender: "team",
    text: "A pintura interior começa amanhã. Deve estar concluída em 5 dias úteis.",
    time: "10:18",
  },
];

const meetingTypes = [
  {
    id: "t1",
    icon: <MapPin size={18} />,
    label: "Visita à Obra",
    description: "Visitar o local da obra",
  },
  {
    id: "t2",
    icon: <User size={18} />,
    label: "Reunião Presencial",
    description: "No escritório Vesatio",
  },
  {
    id: "t3",
    icon: <Video size={18} />,
    label: "Videochamada",
    description: "Via Zoom ou Google Meet",
  },
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: `m${Date.now()}`,
        sender: "client",
        text: input,
        time: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {/* Header Tabs */}
      <div className="flex border-b border-white/10 bg-onyx">
        <button className="flex-1 border-b-2 border-gold py-3 text-center text-sm text-gold">
          Equipa
        </button>
        <Link href="/my-vesatio" className="flex-1 py-3 text-center text-sm text-diamond-muted">
          AURA
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 p-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-white/10 text-diamond-muted"
          onClick={() => setShowMeetingDialog(true)}
        >
          <Calendar size={14} /> Agendar Reunião
        </Button>
        <Link href="/my-vesatio/notificacoes">
          <Button variant="outline" size="sm" className="gap-2 border-white/10 text-diamond-muted">
            Notificações
          </Button>
        </Link>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 pb-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.sender === "client"
                    ? "text-onyx-950 bg-gold"
                    : msg.sender === "aura"
                      ? "border border-purple-500/30 bg-purple-500/20 text-purple-200"
                      : "bg-onyx-800 text-diamond"
                }`}
              >
                {msg.sender === "team" && (
                  <p className="mb-1 text-[10px] font-medium text-gold">Gestor de Projeto</p>
                )}
                {msg.sender === "aura" && (
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-medium text-purple-300">
                    <Zap size={10} /> AURA
                  </p>
                )}
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`mt-1 text-[10px] ${msg.sender === "client" ? "text-onyx-800" : "text-diamond-muted"}`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-white/10 bg-onyx p-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 text-diamond-muted">
            <Paperclip size={18} />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escreva uma mensagem..."
            className="flex-1 border-white/10 bg-white/5 text-diamond placeholder:text-diamond-muted"
          />
          <Button onClick={handleSend} size="icon" className="text-onyx-950 shrink-0 bg-gold">
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Meeting Dialog */}
      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
        <DialogContent className="border-white/10 bg-onyx-900">
          <DialogHeader>
            <DialogTitle className="text-diamond">Agendar Reunião</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm text-diamond-muted">Selecione o tipo de reunião:</p>
          <div className="space-y-3">
            {meetingTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer p-4 transition-colors ${
                  selectedMeetingType === type.id
                    ? "border-gold/30 bg-gold/10"
                    : "border-white/5 bg-onyx-800 hover:border-gold/20"
                }`}
                onClick={() => setSelectedMeetingType(type.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gold">{type.icon}</div>
                    <div>
                      <p className="font-medium text-diamond">{type.label}</p>
                      <p className="text-xs text-diamond-muted">{type.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-diamond-muted" />
                </div>
              </Card>
            ))}
          </div>
          <Button className="text-onyx-950 mt-4 w-full bg-gold" disabled={!selectedMeetingType}>
            Continuar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
