"use client";

import LiveCamButton from "@/components/client/LiveCamButton";
import StoriesHeader from "@/components/client/StoriesHeader";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';

export default function ClientDashboard() {
    const financialProgress = 68; // Mocked

    return (
        <div className="min-h-screen bg-onyx pb-20">
            {/* 1. Header PWA Style */}
            <header className="pt-12 pb-2 px-6 flex justify-between items-end bg-gradient-to-b from-black/80 to-transparent">
                <div className="space-y-4">
                    <img src="/images/logo-vesatio.png" alt="Vesatio" className="h-8 object-contain object-left opacity-80" />
                    <div>
                        <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Good Morning</p>
                        <h1 className="text-2xl font-serif text-white">Mr. Convidado</h1>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold text-xs font-serif">
                    VC
                </div>
            </header>

            {/* 2. Stories */}
            <StoriesHeader />

            <div className="px-5 space-y-6 mt-4">

                {/* 3. Financial Progress Card */}
                <div className="glass-panel p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-white text-sm uppercase tracking-wider font-light mb-1">Project Funding</h3>
                            <p className="text-2xl font-mono text-gold">{financialProgress}%</p>
                        </div>
                        <ArrowUpRight className="text-white/20" />
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-600 via-gold to-yellow-200"
                            style={{ width: `${financialProgress}%` }}
                        />
                    </div>
                    <p className="text-xs text-white/30 mt-4 leading-relaxed">
                        Next Milestone: <span className="text-white/60">Roof Structure (80%)</span>
                    </p>
                </div>

                {/* 4. Live Cam */}
                <LiveCamButton />

                {/* 5. Navigation Links */}
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/client/vault" className="glass-panel p-6 flex flex-col items-center justify-center gap-3 aspect-square hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                        </div>
                        <span className="text-white/60 text-xs uppercase tracking-widest">Vault</span>
                    </Link>
                    <div className="glass-panel p-6 flex flex-col items-center justify-center gap-3 aspect-square opacity-50">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                        </div>
                        <span className="text-white/30 text-xs uppercase tracking-widest">Reports</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
