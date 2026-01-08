"use client";

import { AuraChat } from "@/components/core/aura/aura-chat";

export default function AuraPage() {
    return (
        <div className="h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-serif text-2xl text-diamond">AURA</h1>
                    <p className="text-diamond-muted">
                        Assistente de Inteligência Artificial
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
                    <span className="text-sm text-status-success">Online</span>
                </div>
            </div>

            <div className="h-[calc(100%-4rem)] glass-panel overflow-hidden">
                <AuraChat />
            </div>
        </div>
    );
}
