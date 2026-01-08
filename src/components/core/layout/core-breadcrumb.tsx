"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function CoreBreadcrumb() {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean).slice(1); // Remove 'core' prefix if desired, or keep it depending on structure. Assuming /core/dashboard
    
    // Mapping for better readable names if needed
    const nameMap: Record<string, string> = {
        dashboard: "Dashboard",
        crm: "CRM",
        projetos: "Projetos",
        inventario: "Inventário",
        compras: "Compras",
        financeiro: "Financeiro",
        rh: "Recursos Humanos",
        bi: "Business Intelligence",
        aura: "AURA AI",
        leads: "Leads",
        pipeline: "Pipeline",
        admin: "Administração"
    };

    return (
        <nav className="flex items-center text-sm text-diamond-muted">
             <Link href="/core/dashboard" className="hover:text-gold transition-colors flex items-center">
                <Home size={14} />
             </Link>
             {paths.length > 0 && <ChevronRight size={14} className="mx-2 text-white/20" />}
             
             {paths.map((path, index) => {
                 const isLast = index === paths.length - 1;
                 const href = `/core/${paths.slice(0, index + 1).join('/')}`;
                 const name = nameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);

                 return (
                     <React.Fragment key={path}>
                        {isLast ? (
                            <span className="font-medium text-white">{name}</span>
                        ) : (
                            <Link href={href} className="hover:text-gold transition-colors">
                                {name}
                            </Link>
                        )}
                        {!isLast && <ChevronRight size={14} className="mx-2 text-white/20" />}
                     </React.Fragment>
                 )
             })}
        </nav>
    )
}
