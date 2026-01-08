"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { PublicFooter } from "./public-footer";
import { PublicHeader } from "./public-header";

import { CustomCursor } from "@/components/ui/custom-cursor";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-onyx text-diamond-muted selection:bg-gold selection:text-onyx flex flex-col">
      <CustomCursor />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      <PublicHeader />
      
      <main className="flex-grow pt-0">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
