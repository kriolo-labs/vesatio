"use client";

import { CriticalAlerts } from "@/components/core/dashboard/critical-alerts";
import { GodModeMap } from "@/components/core/dashboard/god-mode-map";
import { KPIGrid } from "@/components/core/dashboard/kpi-grid";
import { QuickActions } from "@/components/core/dashboard/quick-actions";
import { RecentActivity } from "@/components/core/dashboard/recent-activity";
import { TrafficLights } from "@/components/core/dashboard/traffic-lights";
import { CoreLayout } from "@/components/layout/core-layout";

export default function DashboardPage() {
    return (
        <CoreLayout>
            <div className="space-y-6 animate-in fade-in duration-700">
                {/* 1. Top Section: KPIs */}
                <section>
                    <h2 className="text-lg font-serif text-white mb-4">Visão Geral</h2>
                    <KPIGrid />
                </section>

                {/* 2. Operational Health: Traffic Lights */}
                <section>
                    <TrafficLights />
                </section>

                {/* 3. Main Split: Map + Side Widgets */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-auto xl:h-[500px]">
                    {/* Left: Map (Takes 2 columns) */}
                    <div className="xl:col-span-2 space-y-6 flex flex-col">
                        <GodModeMap />
                        <QuickActions />
                    </div>

                    {/* Right: Alerts & Activity (Takes 1 column) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 h-full">
                        <CriticalAlerts />
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </CoreLayout>
    );
}
