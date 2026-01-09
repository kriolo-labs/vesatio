import { z } from "zod";
import { automationEngine } from "../automation/engine";
import { registerTool } from "./definitions";

// Tool: Criar Lead
registerTool({
  name: "criar_lead",
  description: "Cria um novo lead (oportunidade de negócio) no CRM.",
  schema: z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string().optional(),
    interesse: z.string().describe("Descrição do que o cliente procura"),
  }),
  requiresConfirmation: true, // Requer aprovação humana
  execute: async (data, userId) => {
    console.log(`[AURA ACTION] User ${userId} creating lead:`, data);

    // Simulação de escrita
    const leadId = "LEAD-" + Math.floor(Math.random() * 1000);

    // Trigger Automation Event
    // Fire and forget - don't block tool execution
    automationEngine
      .processEvent("lead.created", { ...data, id: leadId, created_by: userId })
      .catch(console.error);

    return { success: true, id: leadId, message: "Lead criado com sucesso." };
  },
});

// Tool: Enviar Email (Mock)
registerTool({
  name: "enviar_email",
  description: "Envia um email para um destinatário.",
  schema: z.object({
    para: z.string().email(),
    assunto: z.string(),
    corpo: z.string(),
  }),
  requiresConfirmation: true,
  execute: async (data) => {
    console.log(`[AURA ACTION] Sending email to ${data.para}`);
    return { success: true, message: "Email enviado." };
  },
});
