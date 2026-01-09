// Structured Logging Service
// Provides consistent, structured logging across the application

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  userId?: string;
  requestId?: string;
  path?: string;
  action?: string;
  duration?: number;
  [key: string]: unknown;
}

interface StructuredLog {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: LogContext;
  environment: string;
  version: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const CURRENT_LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.NODE_ENV || "development";

class Logger {
  private context: LogContext = {};

  // Create child logger with additional context
  child(context: LogContext): Logger {
    const childLogger = new Logger();
    childLogger.context = { ...this.context, ...context };
    return childLogger;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[CURRENT_LOG_LEVEL];
  }

  private formatLog(level: LogLevel, message: string, context: LogContext = {}): StructuredLog {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: { ...this.context, ...context },
      environment: ENVIRONMENT,
      version: APP_VERSION,
    };
  }

  private output(log: StructuredLog) {
    if (ENVIRONMENT === "production") {
      // In production, output JSON for log aggregation
      console.log(JSON.stringify(log));
    } else {
      // In development, use pretty printing
      const color = {
        debug: "\x1b[36m",
        info: "\x1b[32m",
        warn: "\x1b[33m",
        error: "\x1b[31m",
      }[log.level];
      const reset = "\x1b[0m";
      console.log(
        `${color}[${log.level.toUpperCase()}]${reset} ${log.message}`,
        Object.keys(log.context).length > 0 ? log.context : ""
      );
    }
  }

  debug(message: string, context?: LogContext) {
    if (this.shouldLog("debug")) {
      this.output(this.formatLog("debug", message, context));
    }
  }

  info(message: string, context?: LogContext) {
    if (this.shouldLog("info")) {
      this.output(this.formatLog("info", message, context));
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.shouldLog("warn")) {
      this.output(this.formatLog("warn", message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    if (this.shouldLog("error")) {
      const errorContext: LogContext = {
        ...context,
        ...(error instanceof Error
          ? {
              errorName: error.name,
              errorMessage: error.message,
              stack: error.stack,
            }
          : { error: String(error) }),
      };
      this.output(this.formatLog("error", message, errorContext));
    }
  }

  // Timer for measuring durations
  time(label: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.info(`${label} completed`, { duration: Math.round(duration) });
    };
  }
}

// Default logger instance
export const logger = new Logger();

// Request logger middleware helper
export function createRequestLogger(requestId: string, path: string, userId?: string) {
  return logger.child({ requestId, path, userId });
}

// Error reporting to external service
export async function reportError(error: Error, context?: LogContext) {
  logger.error("Unhandled error", error, context);

  // In production, would send to Sentry or similar
  if (ENVIRONMENT === "production") {
    // Sentry.captureException(error, { extra: context });
  }
}

// Performance tracking
export function trackPerformance(metric: string, value: number, context?: LogContext) {
  logger.info(`Performance: ${metric}`, { ...context, value });
}

// Audit logging (for security-relevant actions)
export function auditLog(action: string, userId: string, details: Record<string, unknown>) {
  logger.info(`Audit: ${action}`, { userId, action, ...details });

  // In production, would also write to audit_logs table
  // supabase.from('audit_logs').insert({ action, user_id: userId, details });
}
