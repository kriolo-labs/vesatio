"use client";

import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] bg-onyx flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-24 w-64"
      >
        <img 
            src="/images/logo-vesatio.png" 
            alt="Loading..." 
            className="h-full w-full object-contain"
        />
        {/* Shimmer effect overlay */}
        <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent skew-x-12"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
