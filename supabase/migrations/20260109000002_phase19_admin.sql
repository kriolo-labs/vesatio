-- Migration Phase 19: Administration
-- Tables for Roles, Permissions, System Settings, Integrations

-- 1. Roles & Permissions (RBAC)
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE permissions (
    code TEXT PRIMARY KEY, -- e.g. 'projects.create'
    module TEXT NOT NULL,
    description TEXT
);

CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_code TEXT REFERENCES permissions(code) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_code)
);

-- Link users (profiles) to roles (if moving away from simple string role in profiles)
-- For now, we keep 'role' in profiles as a string or FK to roles.id if we want strict RBAC.
-- Let's stick to the existing profiles.role enum for simplicity in this migration, 
-- but in a real scenario we'd alter profiles to reference roles.id.

-- 2. System Settings (Key-Value Store or Single Row)
CREATE TABLE system_settings (
    id INTEGER PRIMARY KEY DEFAULT 1, -- Singleton
    company_info JSONB DEFAULT '{}',
    finance_config JSONB DEFAULT '{}',
    notification_config JSONB DEFAULT '{}',
    security_config JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

INSERT INTO system_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- 3. Integrations
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service TEXT NOT NULL,
    name TEXT,
    status TEXT CHECK (status IN ('active', 'inactive', 'error')) DEFAULT 'inactive',
    config JSONB, -- Encrypted API keys should go here
    last_sync TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. API Keys (Access Tokens for external scripts)
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL, -- Never store raw key
    key_prefix TEXT NOT NULL,
    scopes TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    last_used_at TIMESTAMP WITH TIME ZONE
);

-- 5. Webhooks
CREATE TABLE webhooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    events TEXT[], -- ['project.created', 'invoice.paid']
    secret TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

-- Simplified policies: only authenticated (admins)
CREATE POLICY "Admins manage roles" ON roles USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage permissions" ON permissions USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage role_permissions" ON role_permissions USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage system_settings" ON system_settings USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage integrations" ON integrations USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage api_keys" ON api_keys USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage webhooks" ON webhooks USING (auth.role() = 'authenticated');

-- Initial Seed for Roles
INSERT INTO roles (name, description, is_system) VALUES 
('Admin', 'Super administrator with full access', true),
('Manager', 'Department manager', true),
('Staff', 'Regular employee', true),
('Client', 'External client access', true)
ON CONFLICT (name) DO NOTHING;
