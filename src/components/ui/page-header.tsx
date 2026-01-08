"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode; // For actions/buttons
    backUrl?: string;
    className?: string;
}

export function PageHeader({ title, description, children, backUrl, className }: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
            <div className="space-y-1">
                {backUrl && (
                     <Link 
                        href={backUrl} 
                        className="inline-flex items-center gap-1 text-xs text-diamond-muted hover:text-gold transition-colors mb-2"
                     >
                        <ArrowLeft size={12} />
                        Voltar
                     </Link>
                )}
                <h1 className="text-2xl font-serif font-bold text-white tracking-tight">{title}</h1>
                {description && (
                    <p className="text-sm text-diamond-muted max-w-2xl">{description}</p>
                )}
            </div>
            
            {children && (
                <div className="flex items-center gap-3 shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}
