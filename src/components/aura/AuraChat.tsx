"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Assumindo utils existente
import { BrainCircuit, Check, ExternalLink, Loader2, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Mock de interfaces para simular o backend
interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  actionRequest?: {
    toolName: string;
    args: any;
    status: "pending" | "executed" | "rejected";
    result?: any;
  };
}

export function AuraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "Olá! Eu sou o AURA. Como posso ajudar com o Vesatio hoje?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulação de resposta do backend (Orquestrador)
    setTimeout(() => {
      let responseMsg: Message;

      // Simulação simples de inteligência baseada em keywords
      const lowerInput = userMsg.content.toLowerCase();

      if (lowerInput.includes("criar lead") || lowerInput.includes("novo cliente")) {
        responseMsg = {
          id: (Date.now() + 1).toString(),
          role: "model",
          content:
            "Posso ajudar com isso. Preparei os dados para criar o Lead. Por favor confirma:",
          actionRequest: {
            toolName: "criar_lead",
            args: { nome: "Novo Cliente Exemplo", interesse: "Projeto Residencial" },
            status: "pending",
          },
        };
      } else if (lowerInput.includes("saldo")) {
        responseMsg = {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: "Consultei o saldo bancário atual:",
          actionRequest: {
            toolName: "obter_saldo_bancario",
            args: {},
            status: "executed",
            result: "Saldo Total: 2.500.000 ECV",
          },
        };
      } else {
        responseMsg = {
          id: (Date.now() + 1).toString(),
          role: "model",
          content:
            "Entendido. A minha ligação ao cérebro (Gemini) está pronta para ser ativada na integração final. Por enquanto, opero em modo de demonstração local.",
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const confirmAction = (msgId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.actionRequest) {
          return {
            ...msg,
            actionRequest: {
              ...msg.actionRequest,
              status: "executed",
              result: "Ação executada com sucesso (ID: 12345)",
            },
          };
        }
        return msg;
      })
    );
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          className="text-onyx-950 fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gold shadow-2xl duration-300 animate-in fade-in zoom-in hover:bg-gold/90"
          onClick={() => setIsOpen(true)}
        >
          <BrainCircuit size={28} />
        </Button>
      )}

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-[600px] w-96 origin-bottom-right flex-col rounded-xl border border-white/10 bg-onyx-900 shadow-2xl transition-all duration-300 ease-in-out",
          isOpen ? "scale-100 opacity-100" : "pointer-events-none translate-y-10 scale-90 opacity-0"
        )}
      >
        {/* Header */}
        <div className="bg-onyx-950 flex items-center justify-between rounded-t-xl border-b border-white/5 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-gold" size={18} />
            <div>
              <h3 className="text-sm font-bold text-white">AURA AI</h3>
              <p className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Online
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-diamond-muted hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex max-w-[85%] flex-col gap-1",
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg p-3 text-sm",
                    msg.role === "user"
                      ? "text-onyx-950 rounded-br-none bg-gold"
                      : "rounded-bl-none bg-white/10 text-white"
                  )}
                >
                  {msg.content}
                </div>

                {/* Widget: Action Confirmation */}
                {msg.actionRequest && msg.role === "model" && (
                  <Card className="bg-onyx-950 mt-2 w-full space-y-3 border-white/10 p-3">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2 font-mono text-xs text-diamond-muted">
                      <ExternalLink size={10} />
                      FULL_FUNCTION_CALL: {msg.actionRequest.toolName}
                    </div>
                    <div className="overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs text-green-400">
                      {JSON.stringify(msg.actionRequest.args, null, 2)}
                    </div>

                    {msg.actionRequest.status === "pending" && (
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          className="h-8 w-full bg-green-600 text-xs hover:bg-green-700"
                          onClick={() => confirmAction(msg.id)}
                        >
                          Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-full border-white/10 text-xs hover:bg-white/5"
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                    {msg.actionRequest.status === "executed" && (
                      <div className="flex items-center gap-2 pt-1 text-xs font-bold text-green-400">
                        <Check size={14} /> Executado: {JSON.stringify(msg.actionRequest.result)}
                      </div>
                    )}
                  </Card>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto flex items-center gap-2 rounded-lg rounded-bl-none bg-white/5 px-3 py-2 text-xs text-diamond-muted">
                <Loader2 size={12} className="animate-spin" /> AURA is thinking...
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="bg-onyx-950 rounded-b-xl border-t border-white/5 p-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo ou peça uma ação..."
              className="border-white/10 bg-onyx-900 focus-visible:ring-gold/50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="shrink-0 bg-white/10 text-white hover:bg-white/20"
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
