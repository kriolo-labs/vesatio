"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data, eventually fetched from Supabase
const initialNotifications = [
    { id: 1, title: "Novo lead", message: "Carlos Silva solicitou orçamento", time: "5m", unread: true, type: "info" },
    { id: 2, title: "Stock baixo", message: "Mármore Calacatta < 10 m²", time: "1h", unread: true, type: "warning" },
    { id: 3, title: "Pagamento recebido", message: "Projecto #127 - 50.000 CVE", time: "2h", unread: false, type: "success" },
    { id: 4, title: "Tarefa atrasada", message: "Instalação Caixilharia - Villa Atlântico", time: "5h", unread: false, type: "error" },
];

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter((n) => n.unread).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-diamond-muted hover:text-white hover:bg-white/5 rounded-full transition-colors relative"
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-error rounded-full ring-2 ring-onyx animate-pulse" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile closing */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-80 md:w-96 glass-panel flex flex-col shadow-2xl z-50 origin-top-right border border-white/10"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-onyx-900/50">
                                <h3 className="text-sm font-semibold text-white">Notificações</h3>
                                <div className="flex items-center gap-1">
                                    {unreadCount > 0 && (
                                        <button 
                                            onClick={markAllRead}
                                            className="p-1 hover:bg-white/5 rounded text-diamond-muted hover:text-gold transition-colors"
                                            title="Marcar todas como lidas"
                                        >
                                            <Check size={14} />
                                        </button>
                                    )}
                                     <button 
                                        onClick={clearAll}
                                        className="p-1 hover:bg-white/5 rounded text-diamond-muted hover:text-rose-500 transition-colors"
                                        title="Limpar tudo"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 max-h-[400px] overflow-y-auto p-2 space-y-1">
                                {notifications.length === 0 ? (
                                    <div className="py-8 text-center text-diamond-muted text-xs">
                                        Nenhuma notificação nova
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                "px-3 py-3 rounded-lg transition-colors cursor-pointer relative group",
                                                notification.unread ? "bg-onyx-800 hover:bg-onyx-700" : "hover:bg-white/5"
                                            )}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <p className={cn("text-sm font-medium truncate", notification.unread ? "text-white" : "text-diamond-muted")}>
                                                            {notification.title}
                                                        </p>
                                                        {notification.unread && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-diamond-muted line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <span className="text-[10px] text-white/30 mt-1 block">
                                                        {notification.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-2 border-t border-white/5 bg-onyx-900/50">
                                <Link onClick={() => setIsOpen(false)} href="/core/notifications" className="block w-full text-center py-2 text-xs font-medium text-gold hover:text-gold/80 hover:bg-gold/5 rounded transition-colors">
                                    Ver todas as notificações
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
