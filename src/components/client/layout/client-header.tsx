"use client";

import { Bell, User } from "lucide-react";

interface ClientHeaderProps {
    clientName?: string;
}

export function ClientHeader({ clientName = "Cliente" }: ClientHeaderProps) {
    return (
        <header className="sticky top-0 z-40 bg-onyx/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center justify-between px-4 h-14">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center">
                        <span className="font-serif text-onyx font-bold text-sm">V</span>
                    </div>
                    <span className="font-serif text-lg text-diamond">My Vesatio</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="relative p-2 text-diamond-muted hover:text-diamond transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
                    </button>
                    <button className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-onyx" />
                    </button>
                </div>
            </div>
        </header>
    );
}
