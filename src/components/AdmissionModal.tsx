"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ArrowRight, CheckCircle } from "lucide-react";

export default function AdmissionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [budget, setBudget] = useState(3000000); // Default 3M
    const [result, setResult] = useState<"waitlist" | "priority" | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (budget < 2000000) {
            setResult("waitlist");
        } else if (budget > 4000000) {
            setResult("priority");
        } else {
            // Between 2M and 4M - Standard
            setResult("waitlist"); // Strict exclusivity for now
        }
        setStep(2);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-md bg-onyx border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl shadow-gold/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {step === 1 ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Lock className="text-gold w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-serif text-white uppercase tracking-widest">
                                        Request Admission
                                    </h2>
                                    <p className="text-stone-400 text-sm font-light">
                                        Join the exclusive digital architecture experience.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                                            Estimated Budget (CVE)
                                        </label>
                                        <input
                                            type="range"
                                            min="500000"
                                            max="10000000"
                                            step="500000"
                                            value={budget}
                                            onChange={(e) => setBudget(Number(e.target.value))}
                                            className="w-full accent-gold h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="text-right text-gold font-mono mt-1">
                                            {budget.toLocaleString()} CVE
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black font-semibold py-4 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                                >
                                    Confirm Request <ArrowRight size={16} />
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8 space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-white/5 border border-white/10"
                                >
                                    {result === 'priority' ? <CheckCircle className="text-gold w-8 h-8" /> : <Lock className="text-stone-500 w-8 h-8" />}
                                </motion.div>

                                <div>
                                    <h3 className="text-xl font-serif text-white mb-2">
                                        {result === 'priority' ? 'Priority Access Granted' : 'Added to Waitlist'}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {result === 'priority'
                                            ? "Your profile meets our strict criteria. A Senior Architect will contact you shortly via the provided email to initialize your private vault."
                                            : "Thank you for your interest. Due to high demand, we are currently at capacity. We have added you to our selective waitlist."
                                        }
                                    </p>
                                </div>

                                <button onClick={onClose} className="text-gold text-sm hover:underline">
                                    Return to Site
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
