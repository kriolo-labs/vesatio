import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & { icon?: React.ReactNode }>(
    ({ className, type, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-diamond-muted mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "input-field",
                            icon ? "pl-10" : "",
                            error && "border-status-error focus:border-status-error focus:ring-status-error/20",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted pointer-events-none">
                            {icon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1 text-sm text-status-error">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
