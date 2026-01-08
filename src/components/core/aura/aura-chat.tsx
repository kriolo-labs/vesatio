"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Paperclip,
    Bot,
    User,
    Loader2,
    CheckCircle,
    XCircle,
    AlertCircle,
    FileSpreadsheet,
    Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    action?: {
        type: string;
        status: "pending" | "confirmed" | "executed" | "cancelled";
        data?: Record<string, unknown>;
    };
}

interface AuraChatProps {
    onActionConfirm?: (action: unknown) => void;
    onActionCancel?: () => void;
}

export function AuraChat({ onActionConfirm, onActionCancel }: AuraChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Olá! Sou a AURA, a sua assistente de inteligência artificial. Como posso ajudá-lo hoje?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pendingAction, setPendingAction] = useState<Message["action"] | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/aura/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, history: messages }),
            });

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message,
                timestamp: new Date(),
                action: data.action,
            };

            setMessages((prev) => [...prev, assistantMessage]);

            if (data.action) {
                setPendingAction(data.action);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Desculpe, ocorreu um erro. Por favor, tente novamente.",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmAction = async () => {
        if (!pendingAction) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/aura/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: pendingAction }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: data.success
                        ? `✅ Ação executada com sucesso: ${data.message}`
                        : `❌ Erro ao executar: ${data.error}`,
                    timestamp: new Date(),
                },
            ]);

            setPendingAction(null);
            onActionConfirm?.(pendingAction);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "❌ Erro ao executar a ação. Por favor, tente novamente.",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelAction = () => {
        setPendingAction(null);
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                role: "assistant",
                content: "Ação cancelada. Como mais posso ajudá-lo?",
                timestamp: new Date(),
            },
        ]);
        onActionCancel?.();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: `📎 Ficheiro enviado: ${file.name}`,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        // Simulate file processing
        setTimeout(() => {
            const mockAction = {
                type: "import_products",
                status: "pending" as const,
                data: {
                    fileName: file.name,
                    itemCount: 15,
                    preview: [
                        { name: "Mármore Calacatta", quantity: 50, unit: "m²" },
                        { name: "Madeira Ipê", quantity: 100, unit: "m" },
                        { name: "Cimento Portland", quantity: 500, unit: "kg" },
                    ],
                },
            };

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: `Analisei o ficheiro "${file.name}" e encontrei **15 produtos** para importar. Aqui está uma pré-visualização:\n\n| Produto | Quantidade | Unidade |\n|---------|------------|--------|\n| Mármore Calacatta | 50 | m² |\n| Madeira Ipê | 100 | m |\n| Cimento Portland | 500 | kg |\n\nDeseja confirmar a importação?`,
                    timestamp: new Date(),
                    action: mockAction,
                },
            ]);

            setPendingAction(mockAction);
            setIsLoading(false);
        }, 2000);

        e.target.value = "";
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "flex gap-3",
                                message.role === "user" ? "flex-row-reverse" : ""
                            )}
                        >
                            {/* Avatar */}
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    message.role === "assistant"
                                        ? "bg-gold-gradient"
                                        : "bg-onyx-200"
                                )}
                            >
                                {message.role === "assistant" ? (
                                    <Bot className="w-4 h-4 text-onyx" />
                                ) : (
                                    <User className="w-4 h-4 text-diamond" />
                                )}
                            </div>

                            {/* Content */}
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-xl p-4",
                                    message.role === "assistant"
                                        ? "glass-panel"
                                        : "bg-gold/20"
                                )}
                            >
                                <p className="text-sm text-diamond whitespace-pre-wrap">
                                    {message.content}
                                </p>
                                <span className="text-xs text-diamond-muted mt-2 block">
                                    {message.timestamp.toLocaleTimeString("pt-PT", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
                            <Bot className="w-4 h-4 text-onyx" />
                        </div>
                        <div className="glass-panel p-4">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gold rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Action Confirmation */}
            <AnimatePresence>
                {pendingAction && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mx-4 mb-4 glass-panel-gold p-4"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <AlertCircle className="w-5 h-5 text-gold" />
                            <span className="font-medium text-diamond">Confirmação Necessária</span>
                        </div>
                        <p className="text-sm text-diamond-muted mb-4">
                            Deseja executar esta ação? Esta operação pode modificar dados no sistema.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleConfirmAction}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Confirmar
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleCancelAction}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancelar
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
                <div className="flex gap-3">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 text-diamond-muted hover:text-diamond hover:bg-onyx-100 rounded-lg transition-colors"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.csv,.pdf"
                        onChange={handleFileUpload}
                    />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Escreva uma mensagem..."
                        className="flex-1 px-4 py-3 bg-onyx-100 border border-onyx-200 rounded-lg text-diamond placeholder:text-diamond-muted focus:outline-none focus:border-gold/50"
                    />
                    <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
                <p className="text-xs text-diamond-muted mt-2 text-center">
                    AURA pode executar ações como criar facturas, registar funcionários ou importar dados
                </p>
            </div>
        </div>
    );
}
