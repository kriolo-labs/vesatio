"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    BarChart3,
    Bot,
    ChevronLeft,
    ChevronRight,
    Factory,
    FileText,
    FolderKanban,
    LayoutDashboard,
    Package,
    Settings,
    Shield,
    ShoppingCart,
    Truck,
    Users,
    Users2,
    Wallet
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Navigation Structure
const navigationGroups = [
    {
        title: "Principal",
        items: [
            { name: "Dashboard", href: "/core/dashboard", icon: LayoutDashboard },
            { name: "CRM", href: "/core/crm", icon: Users },
            { name: "Projetos", href: "/core/projetos", icon: FolderKanban },
        ]
    },
    {
        title: "Operações",
        items: [
            { name: "Inventário", href: "/core/inventario", icon: Package },
            { name: "Compras", href: "/core/compras", icon: ShoppingCart },
            { name: "Importações", href: "/core/importacoes", icon: Truck },
            { name: "Produção", href: "/core/producao", icon: Factory },
        ]
    },
    {
        title: "Gestão",
        items: [
            { name: "Financeiro", href: "/core/financeiro", icon: Wallet },
            { name: "Recursos Humanos", href: "/core/rh", icon: Users2 },
            { name: "Documentos", href: "/core/documentos", icon: FileText },
        ]
    },
    {
        title: "Inteligência",
        items: [
             { name: "BI & Reports", href: "/core/bi", icon: BarChart3 },
             { name: "AURA AI", href: "/core/aura", icon: Bot, highlight: true },
        ]
    },
     {
        title: "Sistema",
        items: [
             { name: "Segurança", href: "/core/seguranca", icon: Shield },
             { name: "Administração", href: "/core/admin", icon: Settings },
        ]
    }
];

export function CoreSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    // Persist collapsed state if needed, for now just local state

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 h-screen bg-onyx-950 border-r border-white/5 flex flex-col z-40 shadow-2xl"
        >
            {/* Logo */}
            <div className="h-18 flex items-center px-4 py-6 border-b border-white/5 relative">
                <AnimatePresence mode="wait">
                    {!collapsed ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 w-full"
                        >
                            {/* Replaced with Text for now as image might be broken, or keep image if valid */}
                             <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center text-onyx font-serif font-bold text-xl">V</div>
                                <span className="text-xl font-serif text-white tracking-widest">VESATIO</span>
                             </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                             initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex justify-center"
                        >
                            <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center text-onyx font-serif font-bold text-xl">V</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                 <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-8 bg-onyx-800 text-diamond-muted hover:text-gold border border-white/10 rounded-full p-1 shadow-lg transition-colors z-50"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="space-y-8 px-3">
                    {navigationGroups.map((group, groupIndex) => (
                        <div key={group.title}>
                             {!collapsed && (
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-diamond-muted/40 font-semibold mb-3 px-3 animate-in fade-in duration-500">
                                    {group.title}
                                </h3>
                             )}
                             {collapsed && groupIndex !== 0 && <div className="h-px bg-white/5 my-4 mx-2" />}
                             
                             <ul className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative",
                                                    isActive
                                                        ? "bg-gold/10 text-gold shadow-sm shadow-gold/5"
                                                        : "text-diamond-muted hover:text-white hover:bg-white/5",
                                                    item.highlight && !isActive && "text-gold/70"
                                                )}
                                            >
                                                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-gold" : "text-diamond-muted group-hover:text-white", item.highlight && "animate-pulse")} />
                                                
                                                {!collapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="text-sm font-medium whitespace-nowrap"
                                                    >
                                                        {item.name}
                                                    </motion.span>
                                                )}

                                                {/* Tooltip for collapsed state */}
                                                {collapsed && (
                                                    <div className="absolute left-full ml-4 px-2 py-1 bg-onyx-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10 shadow-xl">
                                                        {item.name}
                                                    </div>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                             </ul>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Profile Footer */}
            <div className="p-4 border-t border-white/5 bg-onyx-900/50">
                <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shrink-0 shadow-lg shadow-gold/10 ring-2 ring-white/5">
                        <span className="text-onyx font-bold text-xs">AD</span>
                    </div>
                    
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Administrator</p>
                            <p className="text-xs text-diamond-muted truncate">admin@vesatio.com</p>
                        </div>
                    )}
                    
                    {!collapsed && (
                         <button className="text-diamond-muted hover:text-white transition-colors">
                            <Settings size={16} />
                         </button>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
