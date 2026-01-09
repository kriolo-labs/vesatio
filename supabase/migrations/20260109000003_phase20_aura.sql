-- Enable pgvector extension for long-term memory
CREATE EXTENSION IF NOT EXISTS vector;

-- AURA Memories (Long-term Memory)
CREATE TABLE IF NOT EXISTS aura_memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB,
    embedding VECTOR(1536), -- Compatible with OpenAI text-embedding-ada-002
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    context_type TEXT -- 'project', 'user_preference', 'system_knowledge'
);

-- Index for faster similarity search
CREATE INDEX IF NOT EXISTS aura_memories_embedding_idx ON aura_memories USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- AURA Actions Log (Audit trail for AI actions)
CREATE TABLE IF NOT EXISTS aura_actions_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    tool_name TEXT NOT NULL,
    input_data JSONB,
    output_data JSONB,
    status TEXT CHECK (status IN ('success', 'failed', 'pending_approval', 'cancelled')),
    error_message TEXT,
    performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE aura_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE aura_actions_log ENABLE ROW LEVEL SECURITY;

-- Memories: Users can read/write their own memories, Admins can read all (context permitting)
CREATE POLICY "Users can manage their own memories" ON aura_memories
    FOR ALL USING (auth.uid() = user_id);

-- Logs: Admins can view all, Users can view their own
CREATE POLICY "Admins view all logs" ON aura_actions_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('admin', 'manager')
        )
    );

CREATE POLICY "Users view own logs" ON aura_actions_log
    FOR SELECT USING (performed_by = auth.uid());

CREATE POLICY "System inserts logs" ON aura_actions_log
    FOR INSERT WITH CHECK (true); -- Allow insert from authenticated users (the system acts on their behalf)
