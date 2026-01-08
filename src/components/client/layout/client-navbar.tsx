"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, FileText, CreditCard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/my-vesatio", icon: Home, label: "Início" },
    { href: "/my-vesatio/projeto", icon: FolderOpen, label: "Projeto" },
    { href: "/my-vesatio/vault", icon: FileText, label: "Cofre" },
    { href: "/my-vesatio/financeiro", icon: CreditCard, label: "Pagamentos" },
    { href: "/my-vesatio/chat", icon: MessageCircle, label: "Chat" },
];

export function ClientNavbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-onyx-50 border-t border-white/5 safe-area-bottom z-50">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                                isActive ? "text-gold" : "text-diamond-muted"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
