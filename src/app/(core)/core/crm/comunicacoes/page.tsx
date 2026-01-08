"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { Archive, FileText, Inbox, Paperclip, Plus, Search, Send, Star, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock Data
const folders = [
    { id: 'inbox', label: 'Entrada', icon: Inbox, count: 4 },
    { id: 'starred', label: 'Favoritos', icon: Star, count: 0 },
    { id: 'sent', label: 'Enviados', icon: Send, count: 0 },
    { id: 'templates', label: 'Templates', icon: FileText, count: 12 },
    { id: 'trash', label: 'Lixo', icon: Trash2, count: 0 },
];

const mockThreads = [
    {
        id: 1,
        sender: "Sofia Martinez",
        subject: "Dúvida sobre Orçamento #4092",
        preview: "Olá, gostaria de saber se é possível alterar o acabamento da cozinha para...",
        time: "10:30",
        unread: true,
        channel: "email",
        avatar: "SM"
    },
    {
        id: 2,
        sender: "Tech Solutions",
        subject: "Confirmação de Reunião",
        preview: "Confirmamos a reunião para apresentação do projeto Smart Office na próxima...",
        time: "Ontem",
        unread: false,
        channel: "email",
        avatar: "TS"
    },
    {
        id: 3,
        sender: "+238 991 22 33",
        subject: "Mensagem via WhatsApp",
        preview: "Boa tarde! Vocês trabalham com domótica Control4?",
        time: "Ontem",
        unread: true,
        channel: "whatsapp",
        avatar: ""
    },
    {
        id: 4,
        sender: "Roberto Dias (Interno)",
        subject: "Lead #LD-2024-002 - Follow up",
        preview: "Fiz o contacto inicial hoje. Cliente parece muito interessado, mas precisa de...",
        time: "15 Mai",
        unread: false,
        channel: "internal",
        avatar: "RD"
    }
];

export default function CommunicationsPage() {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const [selectedThread, setSelectedThread] = useState<number | null>(1);

    const activeThread = mockThreads.find(t => t.id === selectedThread);

    return (
        <CoreLayout>
            <div className="h-[calc(100vh-100px)] flex flex-col">
                <PageHeader
                    title="Centro de Comunicações"
                    description="Gestão unificada de Email, WhatsApp e Notas Internas."
                >
                    <Button size="sm" className="btn-primary gap-2">
                        <Plus size={16} />
                        Nova Mensagem
                    </Button>
                </PageHeader>

                <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                    
                    {/* Folder Sidebar */}
                    <div className="col-span-2 flex flex-col gap-2">
                         <div className="bg-onyx-900 rounded-lg p-2 border border-white/5 h-full">
                            {folders.map(folder => (
                                <button
                                    key={folder.id}
                                    onClick={() => setSelectedFolder(folder.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors mb-1",
                                        selectedFolder === folder.id 
                                            ? "bg-white/10 text-white font-medium" 
                                            : "text-diamond-muted hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <folder.icon size={16} />
                                        {folder.label}
                                    </div>
                                    {folder.count > 0 && (
                                        <span className="text-xs bg-onyx-950 px-1.5 py-0.5 rounded-full border border-white/5">
                                            {folder.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                         </div>
                    </div>

                    {/* Thread List */}
                    <div className="col-span-4 flex flex-col min-h-0">
                         <div className="bg-onyx-900 rounded-lg border border-white/5 h-full flex flex-col">
                            <div className="p-4 border-b border-white/5 space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-diamond-muted" />
                                    <Input 
                                        placeholder="Pesquisar..." 
                                        className="pl-9 bg-onyx-950 border-white/10 h-9" 
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                {mockThreads.map(thread => (
                                    <div 
                                        key={thread.id}
                                        onClick={() => setSelectedThread(thread.id)}
                                        className={cn(
                                            "p-3 rounded-lg cursor-pointer border transition-all hover:bg-white/5",
                                            selectedThread === thread.id 
                                                ? "bg-white/5 border-gold/30" 
                                                : "bg-transparent border-transparent"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-2">
                                                {thread.unread && <div className="w-1.5 h-1.5 rounded-full bg-gold" />}
                                                <span className={cn("text-sm text-white", thread.unread ? "font-bold" : "font-medium")}>
                                                    {thread.sender}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-diamond-muted whitespace-nowrap">{thread.time}</span>
                                        </div>
                                        <div className="text-xs text-white/80 mb-1 truncate font-medium">
                                            {thread.subject}
                                        </div>
                                        <div className="text-xs text-diamond-muted truncate">
                                            {thread.preview}
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-white/5 text-white/60 border-white/5">
                                                {thread.channel}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>

                    {/* Message View (Detail) */}
                    <div className="col-span-6 flex flex-col min-h-0">
                        {activeThread ? (
                             <Card className="h-full bg-onyx-900 border-white/5 flex flex-col">
                                {/* Header */}
                                <div className="p-4 border-b border-white/5 flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-white/10">
                                            <AvatarFallback className="bg-gold/10 text-gold">{activeThread?.avatar || "?"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-sm font-bold text-white">{activeThread.subject}</h3>
                                            <p className="text-xs text-diamond-muted">de <span className="text-white">{activeThread.sender}</span> para <span className="text-white">Mim</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted"><Star size={16} /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted"><Archive size={16} /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted"><Trash2 size={16} /></Button>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="flex-1 p-6 overflow-y-auto text-sm text-white/80 leading-relaxed">
                                    <p className="mb-4">Boa tarde,</p>
                                    <p className="mb-4">
                                        Espero que este email o encontre bem.
                                    </p>
                                    <p className="mb-4">
                                        {activeThread.preview} Estou a considerar mudar para o acabamento 'Matte Black' em vez do 'Glossy' que tínhamos discutido inicialmente.
                                        
                                        Poderiam enviar-me uma atualização do orçamento considerando esta alteração? E se possível, uma amostra visual?
                                    </p>
                                    <p className="mb-8">
                                        Aguardo o vosso feedback.
                                    </p>
                                    <p>
                                        Melhores cumprimentos,<br/>
                                        {activeThread.sender}
                                    </p>
                                </div>

                                {/* Reply Area */}
                                <div className="p-4 bg-onyx-950/50 border-t border-white/5">
                                    <div className="bg-onyx-900 border border-white/10 rounded-lg p-3">
                                        <Input className="border-0 bg-transparent p-0 h-auto placeholder:text-white/20 mb-2 focus-visible:ring-0" placeholder="Escreva a sua resposta..." />
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex gap-2 text-diamond-muted">
                                                <Button variant="ghost" size="icon" className="h-6 w-6"><Paperclip size={14}/></Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6"><SmileIcon size={14}/></Button>
                                            </div>
                                            <Button size="sm" className="btn-primary h-8 gap-2">
                                                Enviar <Send size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                             </Card>
                        ) : (
                            <div className="h-full flex items-center justify-center text-diamond-muted bg-onyx-900 border border-white/5 rounded-lg">
                                Selecione uma mensagem para ler
                            </div>
                        )}
                    </div>
                
                </div>
            </div>
        </CoreLayout>
    );
}

function SmileIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    )
}
