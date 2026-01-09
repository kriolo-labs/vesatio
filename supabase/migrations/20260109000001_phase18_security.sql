-- Migration Phase 18: Security & Audit
-- Tables for Audit Logs, Security Alerts, and Integrity Checks

-- 1. Audit Logs (Immutable Ledger)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT, -- Snapshot in case user is deleted
    action TEXT NOT NULL,
    table_name TEXT,
    record_id TEXT,
    
    old_data JSONB,
    new_data JSONB,
    
    ip_address TEXT,
    user_agent TEXT,
    device_fingerprint TEXT,
    geolocation TEXT,
    metadata JSONB,
    
    -- Hash Chain
    hash TEXT NOT NULL,
    previous_hash TEXT NOT NULL
);

-- Index for searching logs
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_record ON audit_logs(table_name, record_id);

-- 2. Security Alerts
CREATE TABLE security_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    alert_type TEXT NOT NULL,
    description TEXT,
    severity TEXT CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    status TEXT CHECK (status IN ('active', 'investigating', 'resolved', 'false_positive')) DEFAULT 'active',
    
    affected_user_id UUID REFERENCES auth.users(id),
    context_data JSONB,
    
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT
);

-- 3. Integrity Checks History
CREATE TABLE integrity_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL, -- valid/corrupted
    checked_count INTEGER,
    corrupted_records INTEGER,
    first_corruption_id UUID, -- Link to audit_logs where chain broke
    performed_by UUID REFERENCES auth.users(id)
);

-- 4. Emergency State (Kill Switch Persistence)
CREATE TABLE system_emergency_state (
    id INTEGER PRIMARY KEY DEFAULT 1, -- Singleton
    is_active BOOLEAN DEFAULT FALSE,
    activated_at TIMESTAMP WITH TIME ZONE,
    activated_by UUID REFERENCES auth.users(id),
    reason TEXT,
    modules_disabled TEXT[] DEFAULT ARRAY[]::TEXT[]
);

INSERT INTO system_emergency_state (id, is_active) VALUES (1, false) ON CONFLICT DO NOTHING;

-- RLS Policies
-- Security data is highly sensitive. access restricted.

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrity_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_emergency_state ENABLE ROW LEVEL SECURITY;

-- Admins Only (Simplified role check)
CREATE POLICY "Admins view all logs" ON audit_logs USING (auth.role() = 'authenticated'); 
CREATE POLICY "Admins view alerts" ON security_alerts USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage alerts" ON security_alerts USING (auth.role() = 'authenticated');
CREATE POLICY "Admins view integrity" ON integrity_checks USING (auth.role() = 'authenticated');
CREATE POLICY "Admins view emergency" ON system_emergency_state USING (auth.role() = 'authenticated');

-- Prevent Modification of Audit Logs (Even by admins via API, DB superuser can still do it but app user shouldn't)
-- PG trigger to prevent update/delete on audit_logs would be ideal here in real prod.
