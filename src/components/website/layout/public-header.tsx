"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/servicos" },
    { name: "Portfolio", href: "/collection" },
    { name: "Filosofia", href: "/philosophy" },
    { name: "Admissão", href: "/admissao" },
    { name: "Contacto", href: "/contacto" },
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

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-onyx/90 backdrop-blur-xl border-b border-white/5"
                        : "bg-transparent"
                )}
            >
                <nav className="container-wide">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                                <span className="font-serif text-onyx font-bold text-lg">V</span>
                            </div>
                            <span className="font-serif text-xl text-diamond hidden sm:block">
                                VESATIO
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors",
                                        pathname === item.href
                                            ? "text-gold"
                                            : "text-diamond-muted hover:text-diamond"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Entrar
                                </Button>
                            </Link>
                            <Link href="/admissao">
                                <Button size="sm">Solicitar Admissão</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-diamond-muted hover:text-diamond"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-onyx/95 backdrop-blur-xl"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="relative pt-24 px-6 pb-8">
                            <nav className="space-y-4">
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "block py-3 text-lg font-medium transition-colors",
                                                pathname === item.href
                                                    ? "text-gold"
                                                    : "text-diamond-muted hover:text-diamond"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">
                                        Entrar
                                    </Button>
                                </Link>
                                <Link href="/admissao" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full">Solicitar Admissão</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
