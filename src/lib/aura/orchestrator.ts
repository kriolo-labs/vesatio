import { auraClient } from "./client";
import "./tools/complex-flows"; // Register complex flows
import { getTool, TOOLS_CATALOG } from "./tools/definitions";
import "./tools/read-tools";
import "./tools/write-tools";

export interface ChatMessage {
  role: "user" | "model" | "system";
  content: string;
  actionRequest?: {
    toolName: string;
    args: any;
    status: "pending" | "approved" | "rejected" | "executed";
    result?: any;
  };
}

export class AuraOrchestrator {
  async processMessage(
    userId: string,
    message: string,
    history: ChatMessage[]
  ): Promise<ChatMessage> {
    // 1. Construir prompt com catálogo de ferramentas disponíveis
    const toolsDesc = Object.values(TOOLS_CATALOG)
      .map(
        (t) => `- ${t.name}: ${t.description} (Args: ${JSON.stringify(t.schema)})` // Nota: Schema stringification simplificada aqui
      )
      .join("\n");

    const systemPrompt = `
            Você é o AURA, o assistente inteligente do sistema Vesatio.
            
            FERRAMENTAS DISPONÍVEIS:
            ${toolsDesc}
            
            INSTRUÇÕES:
            1. Se o utilizador pedir algo que requer uma ferramenta, responda APENAS com um bloco JSON no formato:
               {"tool": "nome_da_tool", "args": { ...argumentos... }}
            2. Se for uma conversa normal, responda em texto natural, profissional e útil.
            3. Analise o histórico para contexto.
        `;

    // 2. Chamar o modelo
    // Na prática, enviaríamos o histórico completo. Aqui enviamos apenas a última msg + system para simplificar.
    const response = await auraClient.generateText(`${systemPrompt}\n\nUser: ${message}`);
    const text = response.text.trim();

    // 3. Tentar parsear JSON para detetar chamada de ferramenta
    try {
      // Tenta encontrar um bloco JSON na resposta
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const toolCall = JSON.parse(jsonMatch[0]);

        if (toolCall.tool && getTool(toolCall.tool)) {
          const tool = getTool(toolCall.tool)!;

          // Se a ferramenta requer confirmação, retornamos um pedido de ação
          if (tool.requiresConfirmation) {
            return {
              role: "model",
              content: `Entendido. Preciso da tua confirmação para executar esta ação: ${tool.name}.`,
              actionRequest: {
                toolName: tool.name,
                args: toolCall.args,
                status: "pending",
              },
            };
          } else {
            // Executar imediatamente se for leitura segura
            const result = await tool.execute(toolCall.args, userId);
            return {
              role: "model",
              content: `Aqui está: ${JSON.stringify(result, null, 2)}`, // O modelo idealmente formataria isso melhor numa segunda passagem
            };
          }
        }
      }
    } catch (e) {
      // Falha no parse, assume que é texto normal
      console.log("Not a JSON tool call");
    }

    return { role: "model", content: text };
  }

  async executeAction(userId: string, toolName: string, args: any) {
    const tool = getTool(toolName);
    if (!tool) throw new Error("Tool not found");
    return await tool.execute(args, userId);
  }
}

export const auraOrchestrator = new AuraOrchestrator();
