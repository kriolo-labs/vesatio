import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ghost, LucideIcon, Plus } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: LucideIcon;
    className?: string;
}

export function EmptyState({ title, description, actionLabel, onAction, icon: Icon = Ghost, className }: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-lg bg-onyx-900/30", className)}>
            <div className="w-16 h-16 bg-onyx-800 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-diamond-muted" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-diamond-muted max-w-sm mb-6">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction} variant="outline" className="gap-2">
                    <Plus size={16} />
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
