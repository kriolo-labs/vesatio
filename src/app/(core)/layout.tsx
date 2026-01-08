"use client";

import { useState } from "react";
import { CoreSidebar } from "@/components/core/layout/core-sidebar";
import { CoreHeader } from "@/components/core/layout/core-header";
import { cn } from "@/lib/utils";

export default function CoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-onyx">
            <CoreSidebar />
            <CoreHeader sidebarCollapsed={sidebarCollapsed} />

            <main
                className={cn(
                    "pt-16 min-h-screen transition-all duration-300",
                    sidebarCollapsed ? "pl-20" : "pl-[260px]"
                )}
            >
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
