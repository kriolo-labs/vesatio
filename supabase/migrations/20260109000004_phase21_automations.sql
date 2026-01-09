-- Aura Automation Rules
CREATE TABLE IF NOT EXISTS aura_automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    trigger_type TEXT NOT NULL, -- 'event', 'schedule', 'condition'
    trigger_config JSONB NOT NULL, -- { eventName: 'invoice.created' } or { schedule: '0 8 * * *' }
    conditions JSONB DEFAULT '[]'::JSONB, -- Array of filters: [{ field: 'amount', operator: '>', value: 1000 }]
    actions JSONB NOT NULL, -- Array of actions: [{ type: 'send_email', params: {...} }, { type: 'aura_command', command: '...' }]
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Aura Automation Execution Logs
CREATE TABLE IF NOT EXISTS aura_automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID REFERENCES aura_automation_rules(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('success', 'failed', 'partial')),
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    execution_details JSONB, -- Result of actions, errors
    error_message TEXT
);

-- RLS Policies
ALTER TABLE aura_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE aura_automation_logs ENABLE ROW LEVEL SECURITY;

-- Admins manage rules
CREATE POLICY "Admins manage automation rules" ON aura_automation_rules
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));

-- Admins view logs
CREATE POLICY "Admins view automation logs" ON aura_automation_logs
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager')));
