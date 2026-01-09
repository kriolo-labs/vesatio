import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

if (!API_KEY) {
  console.warn("AURA: GEMINI_API_KEY is not set. AI features will be disabled.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export type AuraModel = "gemini-1.5-pro" | "gemini-1.5-flash";

export interface AuraResponse {
  text: string;
  metadata?: any;
}

export class AuraClient {
  private model: any;

  constructor(modelName: AuraModel = "gemini-1.5-flash") {
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  async generateText(prompt: string, systemInstruction?: string): Promise<AuraResponse> {
    try {
      // Note: System instructions are supported in newer Gemini models via systemInstruction prop
      // For simplicity in this wrapper, we prepend if needed or use the model config provided by the SDK
      const model = systemInstruction
        ? genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction })
        : this.model;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error) {
      console.error("AURA Error:", error);
      throw new Error("Failed to generate content from AURA.");
    }
  }

  async generateVision(
    prompt: string,
    imageBase64: string,
    mimeType: string = "image/jpeg"
  ): Promise<AuraResponse> {
    try {
      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      };

      const result = await this.model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error) {
      console.error("AURA Vision Error:", error);
      throw new Error("Failed to analyze image with AURA.");
    }
  }
}

export const auraClient = new AuraClient();
