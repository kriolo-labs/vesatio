import { auraClient } from "../client";
import { auraOrchestrator } from "../orchestrator";
import { imageAnalyzer } from "../processors/image-analyzer"; // Reusing the analyzer logic

// 20.1.2 Módulos AURA - Enhanced for Phase 21

/**
 * AURA Supervisor: Visão computacional para inspeção de obras
 */
export class AuraSupervisor {
  async inspectSite(imageBase64: string): Promise<string> {
    return await imageAnalyzer.inspectConstructionSite(imageBase64);
  }

  async verifySafetyCompliance(imageBase64: string): Promise<string> {
    const prompt = `Analise esta imagem focando APENAS em conformidade de segurança (EPIs, sinalização, riscos de queda). Liste violações.`;
    const result = await auraClient.generateVision(prompt, imageBase64);
    return result.text;
  }

  // New 21.2.3: Structured Report & Checklist
  async generateProgressReport(imageBase64: string, phaseContext: string): Promise<any> {
    const prompt = `
            Contexto: Obra na fase de ${phaseContext}.
            Analise a imagem e gere um JSON com:
            - completion_percentage (0-100 estimado)
            - completed_items (lista de elementos visíveis finalizados)
            - pending_items (lista de elementos visíveis por fazer)
            - quality_score (1-10)
            - defects (lista de defeitos visuais se houver)
        `;
    const result = await auraClient.generateVision(prompt, imageBase64);
    try {
      const jsonPart = result.text.match(/\{[\s\S]*\}/);
      return jsonPart ? JSON.parse(jsonPart[0]) : { raw: result.text };
    } catch (e) {
      return { error: "Failed to parse report", raw: result.text };
    }
  }

  // New 21.2.4: Checklist Automática
  async generateNextPhaseChecklist(currentPhaseData: any): Promise<string[]> {
    const prompt = `Com base neste relatório de progresso: ${JSON.stringify(currentPhaseData)}, gere uma checklist técnica de 5 a 10 itens para a próxima fase da obra. Retorne apenas JSON array de strings.`;
    const result = await auraClient.generateText(prompt);
    try {
      const jsonPart = result.text.match(/\[[\s\S]*\]/);
      return jsonPart ? JSON.parse(jsonPart[0]) : [];
    } catch (e) {
      return ["Verificar planeamento (Erro ao gerar checklist)"];
    }
  }
}

/**
 * AURA Analyst: Análise de dados, detecção de anomalias, comparação de preços
 */
export class AuraAnalyst {
  // Enhanced 21.3.1
  async compareQuotes(quotesText: string[]): Promise<string> {
    const combinedText = quotesText.join("\n--- NEXT QUOTE ---\n");
    const prompt = `Analise estas ${quotesText.length} cotações extraídas de PDFs. 
        Crie uma tabela comparativa JSON com colunas: Item, Preço Fornecedor A, Preço Fornecedor B, Diferença %.
        Recomende a melhor opção global.`;
    const result = await auraClient.generateText(prompt);
    return result.text;
  }

  async detectAnomalies(dataPoints: any[]): Promise<string> {
    const prompt = `Analise estes dados operacionais: ${JSON.stringify(dataPoints)}. Identifique outliers ou padrões anómalos que indiquem problemas.`;
    const result = await auraClient.generateText(prompt);
    return result.text;
  }

  // New 21.3.2 Security Behavior Analysis
  async detectSecurityAnomalies(loginLogs: any[]): Promise<string> {
    const prompt = `Analise estes logs de acesso: ${JSON.stringify(loginLogs)}. Procure por padrões suspeitos como logins fora de horas (22h-06h), IPs estrangeiros ou falhas repetidas.`;
    const result = await auraClient.generateText(prompt);
    return result.text;
  }

  // New 21.3.3 Efficiency Analysis
  async analyzeProjectEfficiency(projectId: string): Promise<any> {
    // Mock data fetch
    const mockData = {
      budget: 100000,
      spent: 60000,
      progress: 0.45,
      materials_waste: 0.15,
    };

    const prompt = `Analise a eficiência deste projeto: ${JSON.stringify(mockData)}. 
        O projeto gastou 60% do budget mas só tem 45% de progresso. O desperdício de material é 15%.
        Gere um relatório curto de 3 pontos com ações corretivas.`;

    const result = await auraClient.generateText(prompt);
    return { report: result.text, metrics: mockData };
  }

  // New 21.3.4 Market Price Research
  async marketPriceResearch(productName: string): Promise<any> {
    // In a real agent, this would use a Search Tool (SerpApi). Here we use the Model's knowledge.
    const prompt = `Estime o preço médio de mercado atual para '${productName}' em Cabo Verde ou Portugal. Forneça um intervalo de preços e 2 potenciais fornecedores conhecidos.`;
    const result = await auraClient.generateText(prompt);
    return { analysis: result.text };
  }
}

/**
 * AURA Concierge: Chatbot para utilizadores e clientes
 */
export class AuraConcierge {
  async handleConversation(userId: string, message: string, history: any[]): Promise<any> {
    // Concierge uses the Orchestrator to decide actions but adds a polite persona layer
    const response = await auraOrchestrator.processMessage(userId, message, history);
    return response;
  }

  // New 21.4.3 Text Generation (Emails, Reports)
  async draftEmail(topic: string, recipient: string, tone: string = "formal"): Promise<string> {
    const prompt = `Draft a ${tone} email to ${recipient} about: ${topic}. Sign as 'Vesatio Team'.`;
    const result = await auraClient.generateText(prompt);
    return result.text;
  }
}

export const auraSupervisor = new AuraSupervisor();
export const auraAnalyst = new AuraAnalyst();
export const auraConcierge = new AuraConcierge();
