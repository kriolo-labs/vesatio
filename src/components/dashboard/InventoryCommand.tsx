"use client";

import { useState } from "react";
import { Package, ArrowRight, RefreshCw, Check } from "lucide-react";
import { motion } from "framer-motion";

const LEFTOVERS = [
    { id: 1, item: 'Paint Matte Gold', location: 'Villa Praia', qty: 12, unit: 'L' },
    { id: 2, item: 'Cement Type B', location: 'Resort Sal', qty: 45, unit: 'kg' },
    { id: 3, item: 'Copper Wire', location: 'Mindelo', qty: 300, unit: 'm' },
];

export default function InventoryCommand() {
    const [optimizing, setOptimizing] = useState(false);
    const [suggestion, setSuggestion] = useState<any>(null);

    const handleOptimize = () => {
        setOptimizing(true);
        setTimeout(() => {
            setOptimizing(false);
            setSuggestion({
                from: 'Villa Praia',
                to: 'Resort Sal',
                item: 'Paint Matte Gold',
                qty: 5,
                reason: 'Deficit at Resort Sal detected. Transfer saves €450.'
            });
        }, 1500);
    };

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-white font-serif text-lg">Inventory Command</h3>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Site Leftovers</p>
                </div>
                <Package className="text-gold/50" />
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto mb-4 scrollbar-hide">
                {LEFTOVERS.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <div>
                            <div className="text-white text-sm font-medium">{item.item}</div>
                            <div className="text-white/40 text-xs">{item.location}</div>
                        </div>
                        <div className="text-gold font-mono text-sm">
                            {item.qty} <span className="text-gold/50">{item.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {suggestion ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl"
                >
                    <div className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500 text-black flex items-center justify-center">
                            <Check size={12} />
                        </div>
                        <div>
                            <h4 className="text-green-400 text-sm font-semibold mb-1">Optimization Suggestion</h4>
                            <p className="text-white/70 text-xs leading-relaxed mb-2">
                                {suggestion.reason}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-white/50 bg-black/20 p-2 rounded">
                                <span>{suggestion.from}</span>
                                <ArrowRight size={12} />
                                <span>{suggestion.to}</span>
                                <span className="text-white ml-auto">{suggestion.qty} units</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-3 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-medium rounded transition-colors">
                        Approve Transfer
                    </button>
                </motion.div>
            ) : (
                <button
                    onClick={handleOptimize}
                    disabled={optimizing}
                    className="w-full py-4 bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/50 rounded-xl text-white text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
                >
                    {optimizing ? (
                        <>Processing AURA Logic...</>
                    ) : (
                        <><RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Optimize Logistics</>
                    )}
                </button>
            )}
        </div>
    );
}
