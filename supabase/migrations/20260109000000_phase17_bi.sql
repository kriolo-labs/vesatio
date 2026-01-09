-- Migration Phase 17: Business Intelligence
-- Tables for Dashboards, KPIs, Reports, and Alerts

-- 1. Dashboards
CREATE TABLE bi_dashboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id), -- Specific to a user or null for system defaults if needed
    is_default BOOLEAN DEFAULT FALSE,
    layout_config JSONB DEFAULT '[]', -- Stores widget positions and types
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. KPIs
CREATE TABLE bi_kpis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('financial', 'operational', 'commercial', 'hr', 'quality')),
    unit TEXT,
    formula TEXT,
    direction TEXT CHECK (direction IN ('higher_is_better', 'lower_is_better')) DEFAULT 'higher_is_better',
    
    threshold_warning NUMERIC,
    threshold_critical NUMERIC,
    
    owner_id UUID REFERENCES auth.users(id),
    update_frequency TEXT DEFAULT 'daily',
    
    -- Cached values
    current_value NUMERIC DEFAULT 0,
    previous_value NUMERIC,
    target_value NUMERIC,
    
    last_updated TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Reports
CREATE TABLE bi_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    type TEXT CHECK (type IN ('table', 'chart', 'mixed')),
    config JSONB NOT NULL, -- The query configuration
    is_public BOOLEAN DEFAULT FALSE,
    owner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Alerts
CREATE TABLE bi_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    condition_rule TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    channels TEXT[] DEFAULT ARRAY['app'],
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bi_alert_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id UUID REFERENCES bi_alerts(id),
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    value_at_trigger NUMERIC,
    status TEXT CHECK (status IN ('new', 'acknowledged', 'resolved')) DEFAULT 'new',
    acknowledged_by UUID REFERENCES auth.users(id),
    acknowledged_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policies (Simplified for prototype)
ALTER TABLE bi_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE bi_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE bi_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bi_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bi_alert_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all KPIs" ON bi_kpis FOR SELECT USING (true);
CREATE POLICY "Admins manage KPIs" ON bi_kpis USING (auth.role() = 'authenticated'); -- Simplified

CREATE POLICY "Users view public reports or own" ON bi_reports 
    FOR SELECT USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "Users view own dashboards" ON bi_dashboards 
    FOR ALL USING (user_id = auth.uid());

-- Triggers for updated_at
CREATE TRIGGER update_bi_dashboards_modtime
    BEFORE UPDATE ON bi_dashboards
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_bi_reports_modtime
    BEFORE UPDATE ON bi_reports
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
