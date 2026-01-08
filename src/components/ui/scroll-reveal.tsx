"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  animation?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  viewport?: UseInViewOptions;
}

export function ScrollReveal({
  children,
  width = "fit-content",
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.5,
  viewport = { once: true, margin: "-100px" },
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  const variants = {
    hidden: {
        opacity: 0,
        y: animation === "fade-up" ? 50 : 0,
        x: animation === "slide-left" ? -50 : animation === "slide-right" ? 50 : 0,
        scale: animation === "scale-up" ? 0.8 : 1,
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        scale: 1 
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: "easeOut" }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
