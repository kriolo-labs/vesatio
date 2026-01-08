"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const textScale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-black/30 z-20" />
        {/* Placeholder for Video - Real implementation would use <video> */}
        <div 
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-ken-burns"
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-30 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, y, scale: textScale }}
      >
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
        >
            <div className="h-32 w-full flex justify-center">
                 <img src="/images/logo-vesatio.png" alt="Vesatio" className="h-full object-contain drop-shadow-2xl opacity-90" />
            </div>
        </motion.div>
        
        <div className="overflow-hidden">
             <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight mb-6"
            >
                Silent <span className="text-gold italic">Wealth</span>
            </motion.h1>
        </div>
       
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-lg md:text-xl text-diamond-muted/80 max-w-2xl mx-auto tracking-wide font-light"
        >
            O luxo não precisa de ser ruidoso. Apenas sentido.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 z-30 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-light">Explore</span>
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
            <ArrowDown size={24} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
