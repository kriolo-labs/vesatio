"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Serviços", href: "/services" },
  { name: "Portfólio", href: "/portfolio" },
  { name: "Filosofia", href: "/philosophy" },
  { name: "Contactos", href: "/contact" },
];

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300",
          isScrolled
            ? "border-white/5 bg-onyx/90 py-3 shadow-lg backdrop-blur-md"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="relative z-50">
            <div className="relative h-12 w-32">
              <img
                src="/images/logo-vesatio.png"
                alt="Vesatio"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors hover:text-gold",
                  pathname === link.href ? "text-gold" : "text-white/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button className="btn-primary-gold ml-4">Solicitar Consultoria</Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="relative z-50 p-2 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-onyx md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-serif text-3xl text-white transition-colors hover:text-gold",
                      pathname === link.href ? "text-gold" : ""
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Button className="btn-primary-gold px-8 py-6 text-lg">
                  Solicitar Consultoria <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
