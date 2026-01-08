import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function formatCurrency(value: number, currency = "CVE"): string {
    return new Intl.NumberFormat("pt-CV", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    }).format(value);
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        ...options,
    }).format(d);
}

export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}
