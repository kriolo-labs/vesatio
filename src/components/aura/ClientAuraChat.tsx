"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, HelpCircle, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "aura";
  content: string;
  faqSuggestions?: string[];
}

// FAQ Database (Mock)
const FAQ_DATA = [
  {
    q: "Quanto tempo demora a minha obra?",
    a: "O tempo médio depende do tipo de projeto. Pode ver o cronograma detalhado na secção 'Progresso' do seu portal.",
  },
  {
    q: "Como posso acompanhar o progresso?",
    a: "Aceda à secção 'Progresso' no seu portal para ver fotos atualizadas e a percentagem de conclusão de cada fase.",
  },
  {
    q: "Posso alterar materiais após aprovação?",
    a: "Alterações são possíveis, mas podem implicar custos adicionais. Contacte o seu gestor de projeto para discutir.",
  },
  {
    q: "Quando é o próximo pagamento?",
    a: "Pode consultar o calendário de pagamentos na secção 'Financeiro' do seu portal.",
  },
];

export function ClientAuraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "aura",
      content:
        "Olá! Sou a AURA, a sua assistente virtual Vesatio. Como posso ajudar com o seu projeto?",
    },
  ]);
  const [input, setInput] = useState("");

  const findFaqMatches = (query: string): string[] => {
    const q = query.toLowerCase();
    return FAQ_DATA.filter(
      (faq) => faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
    )
      .map((faq) => faq.q)
      .slice(0, 3);
  };

  const getFaqAnswer = (question: string): string | null => {
    const match = FAQ_DATA.find((faq) => faq.q === question);
    return match ? match.a : null;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Check FAQ
    const faqMatches = findFaqMatches(input);

    setTimeout(() => {
      if (faqMatches.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "aura",
            content:
              "Encontrei algumas perguntas relacionadas. Selecione uma ou reformule a sua questão:",
            faqSuggestions: faqMatches,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "aura",
            content:
              "Obrigado pela sua pergunta. Um membro da equipa Vesatio irá responder-lhe em breve. Precisa de algo mais urgente?",
          },
        ]);
      }
    }, 500);

    setInput("");
  };

  const handleFaqClick = (question: string) => {
    const answer = getFaqAnswer(question);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "aura", content: answer || "Desculpe, não encontrei a resposta." },
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
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-onyx-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-onyx-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="text-onyx-950 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Assistente AURA</p>
                <p className="text-xs text-diamond-muted">Portal do Cliente</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-diamond-muted hover:text-white"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 border-b border-white/10 p-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-white/10 text-xs text-diamond-muted hover:text-white"
            >
              <HelpCircle size={12} /> FAQs
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-white/10 text-xs text-diamond-muted hover:text-white"
            >
              <Calendar size={12} /> Agendar Reunião
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${msg.role === "user" ? "text-onyx-950 bg-gold" : "bg-white/5 text-white"}`}
                  >
                    {msg.content}
                    {msg.faqSuggestions && (
                      <div className="mt-2 space-y-1">
                        {msg.faqSuggestions.map((faq, j) => (
                          <button
                            key={j}
                            onClick={() => handleFaqClick(faq)}
                            className="block w-full rounded bg-white/10 p-2 text-left text-xs transition-colors hover:bg-white/20"
                          >
                            {faq}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escreva a sua pergunta..."
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
