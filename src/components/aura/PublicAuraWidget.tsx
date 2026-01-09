"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, X } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "aura";
  content: string;
  isLeadCapture?: boolean;
}

export function PublicAuraWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "aura",
      content:
        "Olá! Bem-vindo à Vesatio. Somos especialistas em marcenaria de luxo, acabamentos premium e smart homes. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [captureStep, setCaptureStep] = useState<"idle" | "name" | "email" | "phone" | "done">(
    "idle"
  );

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Lead Capture Flow
    if (captureStep === "name") {
      setLeadData((prev) => ({ ...prev, name: input }));
      setCaptureStep("email");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "aura",
            content: `Prazer, ${input}! Qual é o seu email para lhe enviarmos mais informações?`,
          },
        ]);
      }, 300);
    } else if (captureStep === "email") {
      setLeadData((prev) => ({ ...prev, email: input }));
      setCaptureStep("phone");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "aura", content: "Perfeito. E um número de telefone para contacto (opcional)?" },
        ]);
      }, 300);
    } else if (captureStep === "phone") {
      setLeadData((prev) => ({ ...prev, phone: input }));
      setCaptureStep("done");
      setLeadCaptured(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "aura",
            content:
              "Obrigado! A nossa equipa entrará em contacto consigo em breve. Tem mais alguma pergunta sobre os nossos serviços?",
          },
        ]);
      }, 300);
    } else {
      // Normal Q&A (Mocked response based on keywords)
      setTimeout(() => {
        let response = "Obrigado pelo seu interesse! ";
        const q = input.toLowerCase();

        if (q.includes("preço") || q.includes("custo") || q.includes("orçamento")) {
          response +=
            "Os nossos projetos são personalizados, por isso o valor varia. Podemos agendar uma consultoria gratuita para discutir as suas ideias?";
          if (!leadCaptured) {
            response += " Gostaria de deixar os seus dados para agendarmos?";
            setCaptureStep("name");
            setMessages((prev) => [
              ...prev,
              { role: "aura", content: response },
              { role: "aura", content: "Qual é o seu nome?" },
            ]);
            setInput("");
            return;
          }
        } else if (q.includes("smart home") || q.includes("domótica")) {
          response +=
            "A nossa divisão de Smart Living integra automação, iluminação inteligente e sistemas de som em espaços de luxo. Quer saber mais?";
        } else if (q.includes("cozinha") || q.includes("armário") || q.includes("móvel")) {
          response +=
            "Criamos móveis por medida com madeiras nobres e acabamentos de excelência. Cada peça é única!";
        } else {
          response +=
            "Os nossos serviços incluem marcenaria de luxo, acabamentos premium (estuques, pinturas decorativas) e integração smart home. Em que área está mais interessado?";
        }

        setMessages((prev) => [...prev, { role: "aura", content: response }]);
      }, 500);
    }

    setInput("");
  };

  const startLeadCapture = () => {
    setCaptureStep("name");
    setMessages((prev) => [
      ...prev,
      { role: "aura", content: "Ótimo! Para podermos contactá-lo, por favor diga-me o seu nome." },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`text-onyx-950 fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg transition-transform hover:scale-110 ${isOpen ? "hidden" : ""}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[450px] w-[340px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-onyx-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-gold to-gold/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="bg-onyx-950 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-gold">
                V
              </div>
              <div>
                <p className="text-onyx-950 text-sm font-medium">Vesatio</p>
                <p className="text-xs text-onyx-800">Assistente Virtual</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:text-onyx-950 text-onyx-800 hover:bg-white/20"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="bg-onyx-950 flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${msg.role === "user" ? "text-onyx-950 bg-gold" : "border border-white/5 bg-onyx-800 text-white"}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* CTA */}
          {!leadCaptured && captureStep === "idle" && (
            <div className="border-t border-white/10 bg-onyx-900 p-3">
              <Button
                onClick={startLeadCapture}
                className="text-onyx-950 w-full gap-2 bg-gold hover:bg-gold/90"
              >
                <User size={16} /> Agendar Consultoria Gratuita
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 bg-onyx-900 p-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={
                  captureStep !== "idle" && captureStep !== "done"
                    ? "Escreva aqui..."
                    : "Pergunte-nos algo..."
                }
                className="flex-1 border-white/10 bg-white/5 text-white placeholder:text-diamond-muted"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="text-onyx-950 bg-gold hover:bg-gold/90"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
