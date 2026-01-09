-- Phase 16: Document Management Schema

-- 16.1 Contracts
CREATE TYPE contract_type AS ENUM ('client', 'supplier', 'employee', 'partnership', 'other');
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'expired', 'cancelled', 'renewing');

CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    type contract_type NOT NULL,
    entity_id UUID, -- Polymorphic reference conceptually, or specific if strict
    entity_name TEXT,
    status contract_status DEFAULT 'draft',
    value NUMERIC,
    currency TEXT DEFAULT 'CVE',
    start_date DATE,
    end_date DATE,
    signed_date DATE,
    description TEXT,
    file_url TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contract_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16.2 Proposals
CREATE TYPE proposal_status AS ENUM ('draft', 'sent', 'viewed', 'accepted', 'rejected');

CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    client_id UUID, -- References clients table
    client_name TEXT,
    status proposal_status DEFAULT 'draft',
    value NUMERIC,
    valid_until DATE,
    content JSONB, -- For rich text editor content
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16.3 Archive (General Documents)
CREATE TYPE file_type AS ENUM ('folder', 'file');

CREATE TABLE archive_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES archive_items(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type file_type NOT NULL,
    size BIGINT DEFAULT 0,
    mime_type TEXT,
    url TEXT,
    owner_id UUID REFERENCES auth.users(id),
    tags TEXT[],
    path_tokens TEXT[], -- Materialized path or breadcrumbs for search
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16.4 Templates
CREATE TYPE template_category AS ENUM ('contract', 'proposal', 'report', 'email', 'other');

CREATE TABLE document_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category template_category DEFAULT 'other',
    content TEXT, -- HTML or Markdown content
    variables TEXT[], -- Array of variable names
    base_file_url TEXT, -- If template is based on a file (Word/PDF)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE archive_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;

-- Simplified Policies (Allow All Authenticated for MVP)
CREATE POLICY "Enable all access for authenticated users" ON contracts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON contract_versions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON proposals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON archive_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON document_templates FOR ALL USING (auth.role() = 'authenticated');
