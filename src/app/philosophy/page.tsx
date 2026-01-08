"use client";

import { motion } from "framer-motion";

export default function PhilosophyPage() {
    return (
        <div className="min-h-screen bg-onyx flex items-center justify-center p-8 overflow-hidden relative">

            {/* Background Texture Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-start rounded-full opacity-[0.03] blur-[120px]" />

            <div className="max-w-4xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                >
                    <h2 className="text-gold text-xs uppercase tracking-[0.5em] mb-8">The Manifesto</h2>

                    <h1 className="font-serif text-3xl md:text-5xl leading-relaxed text-diamond-white mb-12">
                        <span className="opacity-50">True luxury is not about excess.</span><br />
                        <span className="opacity-80">It is about the</span> <span className="text-gradient-gold italic">absence of friction.</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-20 border-t border-white/5 pt-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-serif text-gold text-lg mb-4">The Architect</h3>
                        <p className="text-white/60 font-sans text-sm leading-7">
                            We build homes that breathe. Structures that think.
                            Our spaces are designed not just to be inhabited, but to serve.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="font-serif text-gold text-lg mb-4">The System</h3>
                        <p className="text-white/60 font-sans text-sm leading-7">
                            Powered by Vesatio OS, every stone and sensor is connected.
                            From the foundation to the cloud, total control is yours.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
