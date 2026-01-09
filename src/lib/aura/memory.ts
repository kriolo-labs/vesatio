import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

// Initialize APIs
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

// Initialize Supabase Client for Vector operations (using Service Role if needed for bypassing RLS in background, but standard client here)
// Em produção, usaríamos o supabase client do contexto, mas para utilitários standalone precisamos instanciar
// Assumindo que o componente que chama passará o cliente supabase ou usaremos env vars

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Memory {
  id?: string;
  content: string;
  metadata?: Record<string, any>;
  created_at?: string;
  similarity?: number;
}

export class AuraMemory {
  async generateEmbedding(text: string): Promise<number[]> {
    if (!API_KEY) return Array(768).fill(0); // Fallback mock se sem chave (Google Embeddings são 768 dims normalmente)

    try {
      const result = await embeddingModel.embedContent(text);
      const embedding = result.embedding;
      return embedding.values;
    } catch (error) {
      console.error("Embedding generation failed:", error);
      return Array(768).fill(0);
    }
  }

  // Adicionar memória de longo prazo
  async addMemory(userId: string, content: string, metadata: any = {}) {
    const embedding = await this.generateEmbedding(content);

    const { error } = await supabase.from("aura_memories").insert({
      user_id: userId,
      content,
      metadata,
      embedding: embedding,
    });

    if (error) {
      console.error("Failed to add memory:", error);
      throw error;
    }
  }

  // Buscar memórias relevantes
  async searchMemories(userId: string, query: string, limit: number = 5): Promise<Memory[]> {
    const embedding = await this.generateEmbedding(query);

    const { data, error } = await supabase.rpc("match_memories", {
      query_embedding: embedding,
      match_threshold: 0.7, // 70% similaridade
      match_count: limit,
      p_user_id: userId,
    });

    if (error) {
      // Fallback se a função RPC não existir ou falhar (ex: pgvector não configurado)
      console.warn("Vector search failed, falling back to basic text search:", error);
      const { data: textData, error: textError } = await supabase
        .from("aura_memories")
        .select("*")
        .eq("user_id", userId)
        .ilike("content", `%${query}%`)
        .limit(limit);

      if (textError) throw textError;
      return textData || [];
    }

    return data || [];
  }
}

export const auraMemory = new AuraMemory();
