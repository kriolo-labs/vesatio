"use client";

import { useEffect, useState } from "react";
import { Camera, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LiveCamButton() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // Active 10:00 - 10:20 AM
            const active = hours === 10 && minutes >= 0 && minutes <= 20;
            setIsActive(active);
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every min
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={!isActive}
            className={`w-full relative h-[120px] rounded-2xl overflow-hidden group ${isActive ? 'cursor-pointer' : 'cursor-default opacity-80'
                }`}
        >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                {isActive ? (
                    <>
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                        />
                        <span className="font-serif text-white text-lg tracking-wider">LIVE SITE VIEW</span>
                        <span className="text-[10px] text-green-400 uppercase tracking-widest border border-green-500/30 px-2 py-0.5 rounded-full bg-green-500/10">
                            Broadcasting
                        </span>
                    </>
                ) : (
                    <>
                        <Lock className="w-6 h-6 text-white/40 mb-1" />
                        <span className="font-serif text-white/60 text-lg tracking-wider">LIVE CAM OFFLINE</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">
                            Available 10:00 - 10:20 AM
                        </span>
                    </>
                )}
            </div>
        </motion.button>
    );
}
