import { z } from "zod";
import { registerTool } from "./definitions";

// Tool: Process Stock Document (21.1.3)
registerTool({
  name: "process_stock_document",
  description: "Processa um documento (Excel/PDF) para atualização de stock em massa.",
  schema: z.object({
    fileName: z.string().describe("Nome do ficheiro recebido"),
    fileContentBase64: z
      .string()
      .optional()
      .describe("Conteúdo do ficheiro se disponível diretamnete"), // In real flow, logic handles file pointer
  }),
  requiresConfirmation: true,
  execute: async (data, userId) => {
    // Mock parsing logic logic since we don't have the file object here easily in this text tool interface
    // In a real app, the orchestrator handles the file upload state and passes a reference.

    return {
      success: true,
      processed_items: 15,
      actions: [
        { item: "Cimento", qty: "+50", status: "Updated" },
        { item: "Tijolo", qty: "+1000", status: "Updated" },
      ],
      message: "Stock atualizado com base no documento.",
    };
  },
});

// Flow: Create Invoice Logic
// Este fluxo é interessante porque o AURA pode recolher info em passos.
// Demo: A ferramenta pede todos os dados de uma vez, e o LLM é responsável por perguntar ao user até ter tudo.

registerTool({
  name: "create_invoice_flow",
  description: "Inicia o processo de criação de fatura. Use quando o utilizador quer faturar algo.",
  schema: z.object({
    client_name: z.string().describe("Nome do cliente"),
    project_code: z.string().optional().describe("Código do projeto (ex: VST-123)"),
    items: z
      .array(
        z.object({
          description: z.string(),
          amount: z.number(),
          quantity: z.number(),
        })
      )
      .optional()
      .describe("Itens a faturar. Se não fornecidos, o sistema pedirá confirmação."),
  }),
  requiresConfirmation: true,
  execute: async (data, userId) => {
    // Aqui simularíamos a validação.
    // Se faltar info crítica (ex: items), poderiamos retornar um status especial pedindo mais info.
    // Nesta implementação simplificada, assumimos que o LLM já reuniu info suficiente ou o tool falha.

    if (!data.items || data.items.length === 0) {
      return {
        status: "needs_info",
        message: "Preciso de saber quais os itens a faturar. Pode fornecer a descrição e valores?",
      };
    }

    return {
      success: true,
      invoice_id: "FT 2024/" + Math.floor(Math.random() * 999),
      total: data.items.reduce((acc: number, item: any) => acc + item.amount * item.quantity, 0),
      status: "draft",
    };
  },
});

registerTool({
  name: "register_employee_flow",
  description: "Regista um novo funcionário no sistema RH.",
  schema: z.object({
    full_name: z.string(),
    role: z.string(),
    salary: z.number().optional(),
    start_date: z.string().optional(),
  }),
  requiresConfirmation: true,
  execute: async (data, userId) => {
    return {
      success: true,
      employee_id: "EMP-" + Math.floor(Math.random() * 1000),
      message: `Funcionário ${data.full_name} registado como ${data.role}.`,
    };
  },
});
