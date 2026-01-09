import { auraClient } from "../client";

export class ImageAnalyzer {
  async inspectConstructionSite(imageBase64: string): Promise<string> {
    const prompt = `
            Atue como um Supervisor de Obra experiente (AURA Supervisor).
            Analise esta imagem da obra e identifique:
            1. Progresso visível (fases de construção).
            2. Possíveis problemas de segurança (EPIs em falta, riscos).
            3. Qualidade da execução (acabamentos, alinhamentos).
            
            Seja técnico e direto.
        `;

    const response = await auraClient.generateVision(prompt, imageBase64, "image/jpeg");
    return response.text;
  }

  async readInvoice(imageBase64: string): Promise<any> {
    const prompt = `
            Você é um assistente financeiro. Extraia os dados desta fatura para JSON:
            - fornecedor
            - numero_fatura
            - data
            - total
            - itens (lista)
            
            Retorne APENAS o JSON.
        `;

    const response = await auraClient.generateVision(prompt, imageBase64, "image/jpeg");
    try {
      // Basic extraction logic
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      return jsonMatch
        ? JSON.parse(jsonMatch[0])
        : { error: "Could not parse JSON", raw: response.text };
    } catch (e) {
      console.error("Failed to parse invoice JSON", e);
      return { raw: response.text };
    }
  }
}

export const imageAnalyzer = new ImageAnalyzer();
