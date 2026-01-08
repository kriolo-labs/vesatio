import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatusBadgeProps {
  status: string; // The raw status value (e.g., 'pending', 'approved')
  label?: string; // Optional custom label, defaults to status capitalized
  size?: "sm" | "md";
  className?: string;
  icon?: LucideIcon;
}

// Map common statuses to colors
const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"; className?: string }> = {
  active: { variant: "success", className: "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20" },
  completed: { variant: "success", className: "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-blue-500/20" },
  paid: { variant: "success", className: "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20" },
  
  pending: { variant: "warning", className: "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20" },
  waiting: { variant: "warning", className: "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20" },
  processing: { variant: "warning", className: "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20" },
  
  cancelled: { variant: "destructive", className: "bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border-rose-500/20" },
  rejected: { variant: "destructive", className: "bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border-rose-500/20" },
  error: { variant: "destructive", className: "bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border-rose-500/20" },
  
  draft: { variant: "secondary", className: "bg-onyx-100 text-diamond-muted border-white/10" },
  archived: { variant: "secondary", className: "bg-onyx-100 text-diamond-muted border-white/10" },
  
  info: { variant: "info", className: "bg-sky-500/15 text-sky-500 hover:bg-sky-500/25 border-sky-500/20" },
};

export function StatusBadge({ status, label, size = "sm", className, icon: Icon }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const config = statusMap[normalizedStatus] || { variant: "outline", className: "text-diamond-muted border-white/10" };
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-normal border",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className
      )}
    >
      {Icon && <Icon size={size === "sm" ? 10 : 12} className="mr-1.5" />}
      {displayLabel}
    </Badge>
  );
}
