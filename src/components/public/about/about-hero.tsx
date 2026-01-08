"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
         <div className="absolute inset-0 bg-onyx/40 z-10" />
         <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent z-10" />
         <img 
            src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=2000&auto=format&fit=crop" 
            alt="Vesatio Headquarters" 
            className="w-full h-full object-cover"
         />
      </div>

      <div className="relative z-20 text-center container px-4">
        <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block font-medium"
        >
            Est. 2010
        </motion.span>
        
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
        >
            O Legado Vesatio
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-diamond-muted/80 max-w-2xl mx-auto font-light"
        >
            Uma década a redefinir a excelência em construção e design no mercado africano.
        </motion.p>
      </div>
    </section>
  );
}
