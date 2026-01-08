import { FinancialHeatmap } from '@/components/dashboard/FinancialHeatmap';
import GodModeMap from '@/components/dashboard/GodModeMap';
import InventoryCommand from '@/components/dashboard/InventoryCommand';
import OmniChat from '@/components/dashboard/OmniChat';

export default function AdminDashboard() {
    return (
        <div className="space-y-6 pb-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-white uppercase tracking-widest">Observation Deck</h1>
                    <p className="text-stone-500 text-xs uppercase tracking-[0.2em] mt-2">Global Operations Overview</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">System Operational</span>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">

                {/* Row 1: God Mode Map (Major Focus) & Inventory Command */}
                <div className="col-span-12 lg:col-span-8 h-[500px]">
                    <GodModeMap />
                </div>
                <div className="col-span-12 lg:col-span-4 h-[500px]">
                    <InventoryCommand />
                </div>

                {/* Row 2: Omni Chat & Financials */}
                <div className="col-span-12 lg:col-span-6 h-[400px]">
                    <OmniChat />
                </div>
                <div className="col-span-12 lg:col-span-6 h-[400px]">
                    <div className="h-full glass-panel p-6 flex flex-col">
                        <h3 className="text-white font-serif text-lg mb-4">Financial Health</h3>
                        <div className="flex-1 min-h-0">
                            <FinancialHeatmap />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
