import { z } from "zod";

// Definição genérica de uma Tool
export interface AuraTool<T = any> {
  name: string;
  description: string;
  schema: z.ZodType<T>;
  execute: (args: T, userId: string) => Promise<any>;
  requiresConfirmation?: boolean;
  requiredPermissions?: string[];
}

// Catálogo de Tools disponíveis (será preenchido com as implementações concretas)
export const TOOLS_CATALOG: Record<string, AuraTool> = {};

export function registerTool(tool: AuraTool) {
  TOOLS_CATALOG[tool.name] = tool;
}

export function getTool(name: string): AuraTool | undefined {
  return TOOLS_CATALOG[name];
}
