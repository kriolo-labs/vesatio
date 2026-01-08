"use client";

import { NotificationCenter } from "@/components/core/notifications/notification-center";
import { cn } from "@/lib/utils";
import { MessageSquare, Search, User } from "lucide-react";
import { useState } from "react";
import { CoreBreadcrumb } from "./core-breadcrumb";

interface CoreHeaderProps {
    sidebarCollapsed?: boolean;
}

export function CoreHeader({ sidebarCollapsed = false }: CoreHeaderProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Mock notifications
    const notifications = [
        { id: 1, title: "Novo lead", message: "Carlos Silva solicitou orçamento", time: "5m", unread: true },
        { id: 2, title: "Stock baixo", message: "Mármore Calacatta < 10 m²", time: "1h", unread: true },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
        <header
            className={cn(
                "fixed top-0 right-0 h-18 bg-onyx-950/80 backdrop-blur-xl border-b border-white/5 z-30 transition-all duration-300",
                sidebarCollapsed ? "left-20" : "left-[280px]" // Matches Sidebar width
            )}
        >
            <div className="h-full flex items-center justify-between px-8">
                
                {/* Left Area: Breadcrumbs */}
                <div className="flex-1">
                    <CoreBreadcrumb />
                </div>

                {/* Right Area: Search & Actions */}
                <div className="flex items-center gap-4">
                    
                    {/* Global Command Search Trigger */}
                    <button 
                        className="hidden md:flex items-center gap-3 px-3 py-2 bg-onyx-900 border border-white/10 rounded-md text-sm text-diamond-muted hover:border-gold/30 hover:text-white transition-all w-64 group"
                        onClick={() => setShowSearch(true)}
                    >
                        <Search size={14} className="group-hover:text-gold transition-colors" />
                        <span>Pesquisar...</span>
                        <kbd className="ml-auto text-[10px] uppercase bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-white/40">⌘K</kbd>
                    </button>



                    {/* AURA Quick Chat */}
                     <button
                        className="p-2.5 text-diamond-muted hover:text-gold hover:bg-gold/5 rounded-full transition-colors relative group"
                        title="Falar com AURA"
                    >
                        <MessageSquare size={18} />
                    </button>

                    {/* Notifications */}
                    <NotificationCenter />

                    <div className="h-6 w-px bg-white/10 mx-2" />

                    {/* Profile */}
                     <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 p-1 rounded-full transition-colors hover:bg-white/5 pr-3"
                        >
                            <div className="w-8 h-8 bg-onyx-800 rounded-full flex items-center justify-center border border-white/10">
                                <User size={14} className="text-gold" />
                            </div>
                            <span className="text-sm font-medium text-white hidden md:block">Admin</span>
                        </button>
                     </div>
                </div>
            </div>
        </header>
    );
}
