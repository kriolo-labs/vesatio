// Performance Monitoring - Web Vitals & Custom Metrics
"use client";

import { useEffect } from "react";

interface WebVitalsMetric {
  name: "LCP" | "FID" | "CLS" | "FCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

// Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(
  name: keyof typeof THRESHOLDS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

// Report metric to analytics
function reportMetric(metric: WebVitalsMetric) {
  // Send to analytics endpoint
  if (process.env.NODE_ENV === "production") {
    // Would send to monitoring service (e.g., Vercel Analytics, Sentry)
    console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);

    // Example: Send to custom endpoint
    // fetch("/api/metrics", {
    //     method: "POST",
    //     body: JSON.stringify(metric),
    // });
  }
}

// Hook to track Web Vitals
export function useWebVitals() {
  useEffect(() => {
    // Dynamic import web-vitals to avoid SSR issues
    import("web-vitals").then(({ onLCP, onFID, onCLS, onFCP, onTTFB, onINP }) => {
      onLCP((metric) => {
        reportMetric({
          ...metric,
          rating: getRating("LCP", metric.value),
        } as WebVitalsMetric);
      });

      onFID((metric) => {
        reportMetric({
          ...metric,
          rating: getRating("FID", metric.value),
        } as WebVitalsMetric);
      });

      onCLS((metric) => {
        reportMetric({
          ...metric,
          rating: getRating("CLS", metric.value),
        } as WebVitalsMetric);
      });

      onFCP((metric) => {
        reportMetric({
          ...metric,
          rating: getRating("FCP", metric.value),
        } as WebVitalsMetric);
      });

      onTTFB((metric) => {
        reportMetric({
          ...metric,
          rating: getRating("TTFB", metric.value),
        } as WebVitalsMetric);
      });

      onINP((metric) => {
        reportMetric({
          ...metric,
          rating: getRating("INP", metric.value),
        } as WebVitalsMetric);
      });
    });
  }, []);
}

// Performance Observer for custom metrics
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    // Long Tasks Observer
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);
        }
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ["longtask"] });
    } catch (_e) {
      // longtask not supported
    }

    // Resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        if (resource.duration > 1000) {
          console.warn(
            `[Performance] Slow resource: ${resource.name} (${resource.duration.toFixed(0)}ms)`
          );
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ["resource"] });
    } catch (_e) {
      // Not supported
    }

    return () => {
      longTaskObserver.disconnect();
      resourceObserver.disconnect();
    };
  }, []);
}

// Component to add analytics script
export function PerformanceMonitor() {
  useWebVitals();
  usePerformanceObserver();
  return null;
}

// Memory usage tracking
export function getMemoryUsage(): { usedJSHeapSize: number; jsHeapSizeLimit: number } | null {
  if (typeof window !== "undefined" && "memory" in performance) {
    const memory = (
      performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }
    ).memory;
    if (memory) {
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
  }
  return null;
}
