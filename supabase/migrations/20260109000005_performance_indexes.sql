-- Phase 27.2: Database Indexes for Performance
-- Run this migration to add indexes on frequently queried columns

-- ============================================
-- PROJECTS (obras)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_obras_status ON obras(status);
CREATE INDEX IF NOT EXISTS idx_obras_cliente_id ON obras(cliente_id);
CREATE INDEX IF NOT EXISTS idx_obras_created_at ON obras(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_obras_gestor_id ON obras(gestor_id);

-- ============================================
-- CLIENTS (clientes)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);
CREATE INDEX IF NOT EXISTS idx_clientes_status ON clientes(status);

-- ============================================
-- EMPLOYEES (colaboradores)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_colaboradores_email ON colaboradores(email);
CREATE INDEX IF NOT EXISTS idx_colaboradores_departamento ON colaboradores(departamento);
CREATE INDEX IF NOT EXISTS idx_colaboradores_ativo ON colaboradores(ativo);

-- ============================================
-- PRODUCTS (produtos)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_sku ON produtos(sku);
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON produtos USING gin(to_tsvector('portuguese', nome));

-- ============================================
-- SUPPLIERS (fornecedores)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_fornecedores_categoria ON fornecedores(categoria);
CREATE INDEX IF NOT EXISTS idx_fornecedores_ativo ON fornecedores(ativo);

-- ============================================
-- INVOICES (faturas)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_faturas_cliente_id ON faturas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_faturas_status ON faturas(status);
CREATE INDEX IF NOT EXISTS idx_faturas_data_vencimento ON faturas(data_vencimento);
CREATE INDEX IF NOT EXISTS idx_faturas_created_at ON faturas(created_at DESC);

-- ============================================
-- PAYMENTS (pagamentos)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_pagamentos_fornecedor_id ON pagamentos(fornecedor_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON pagamentos(status);
CREATE INDEX IF NOT EXISTS idx_pagamentos_data ON pagamentos(data);

-- ============================================
-- PURCHASE REQUISITIONS (requisicoes_compra)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_requisicoes_status ON requisicoes_compra(status);
CREATE INDEX IF NOT EXISTS idx_requisicoes_obra_id ON requisicoes_compra(obra_id);
CREATE INDEX IF NOT EXISTS idx_requisicoes_created_at ON requisicoes_compra(created_at DESC);

-- ============================================
-- AUDIT LOGS (audit_logs)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- ============================================
-- NOTIFICATIONS (notificacoes)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_notificacoes_user_id ON notificacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_notificacoes_lida ON notificacoes(lida);
CREATE INDEX IF NOT EXISTS idx_notificacoes_created_at ON notificacoes(created_at DESC);

-- ============================================
-- AURA MEMORIES (aura_memories)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_aura_memories_user_id ON aura_memories(user_id);
CREATE INDEX IF NOT EXISTS idx_aura_memories_type ON aura_memories(type);

-- ============================================
-- CHAT MESSAGES (mensagens_chat)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_mensagens_conversa_id ON mensagens_chat(conversa_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_created_at ON mensagens_chat(created_at DESC);

-- ============================================
-- COMPOSITE INDEXES for common queries
-- ============================================
CREATE INDEX IF NOT EXISTS idx_obras_status_cliente ON obras(status, cliente_id);
CREATE INDEX IF NOT EXISTS idx_faturas_status_cliente ON faturas(status, cliente_id);
CREATE INDEX IF NOT EXISTS idx_audit_user_date ON audit_logs(user_id, created_at DESC);

-- ============================================
-- ANALYZE tables to update statistics
-- ============================================
ANALYZE obras;
ANALYZE clientes;
ANALYZE colaboradores;
ANALYZE produtos;
ANALYZE fornecedores;
ANALYZE faturas;
ANALYZE pagamentos;
ANALYZE requisicoes_compra;
ANALYZE audit_logs;
ANALYZE notificacoes;
