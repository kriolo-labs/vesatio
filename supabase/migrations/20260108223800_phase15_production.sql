-- Phase 15: Production Module Schema

-- Enable UUID extension if not enabled (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 15.1 Production Orders
CREATE TYPE production_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE production_status AS ENUM ('draft', 'planned', 'in_progress', 'completed', 'cancelled', 'on_hold');

CREATE TABLE production_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE, -- Auto-generated code (e.g., PO-2024-001)
    project_id UUID REFERENCES projects(id), -- Assuming a projects table exists
    description TEXT,
    priority production_priority DEFAULT 'medium',
    status production_status DEFAULT 'draft',
    start_date_planned DATE,
    end_date_planned DATE,
    start_date_actual DATE,
    end_date_actual DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Production Items
CREATE TYPE item_status AS ENUM ('pending', 'in_production', 'completed', 'problem');

CREATE TABLE production_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES production_orders(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC NOT NULL DEFAULT 1,
    specifications JSONB, -- Flexible specs
    drawing_url TEXT,
    status item_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOM (Bill of Materials) per Item
CREATE TABLE production_bom (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_item_id UUID REFERENCES production_items(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id), -- Assuming products table exists
    product_name TEXT, -- Denormalized for display/history
    quantity NUMERIC NOT NULL,
    unit TEXT,
    status TEXT DEFAULT 'available', -- available, requisitioned, consumed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work Logs (Apontamentos)
CREATE TABLE production_work_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_item_id UUID REFERENCES production_items(id) ON DELETE CASCADE,
    operator_id UUID REFERENCES auth.users(id),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active', -- active, completed
    notes TEXT,
    quantity_produced NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15.2 Cutting Plans
CREATE TABLE cutting_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT,
    material_id UUID, -- Reference to inventory/product
    material_name TEXT,
    material_dimensions TEXT,
    status TEXT DEFAULT 'draft',
    waste_percentage NUMERIC,
    total_sheets INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cutting_plan_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES cutting_plans(id) ON DELETE CASCADE,
    description TEXT,
    length NUMERIC,
    width NUMERIC,
    quantity INTEGER,
    grain_direction TEXT, -- length, width, none
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15.4 Machine Management
CREATE TYPE machine_status AS ENUM ('operational', 'maintenance', 'broken', 'inactive');

CREATE TABLE machines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT,
    brand TEXT,
    model TEXT,
    serial_number TEXT,
    purchase_date DATE,
    status machine_status DEFAULT 'operational',
    next_maintenance_date DATE,
    location TEXT,
    specifications JSONB,
    manual_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE machine_maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    machine_id UUID REFERENCES machines(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    type TEXT NOT NULL, -- preventive, corrective
    description TEXT,
    cost NUMERIC,
    technician_name TEXT,
    parts_replaced TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15.3 Quality Control
CREATE TYPE inspection_result AS ENUM ('approved', 'rejected', 'approved_with_notes');

CREATE TABLE quality_inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES production_orders(id),
    item_id UUID REFERENCES production_items(id),
    type TEXT NOT NULL, -- material, process, final
    inspector_id UUID REFERENCES auth.users(id),
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    result inspection_result NOT NULL,
    checklist_data JSONB,
    notes TEXT,
    photos TEXT[], -- Array of URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE non_conformity_severity AS ENUM ('critical', 'major', 'minor');
CREATE TYPE non_conformity_status AS ENUM ('open', 'investigating', 'verification', 'closed');

CREATE TABLE non_conformities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inspection_id UUID REFERENCES quality_inspections(id),
    order_id UUID REFERENCES production_orders(id),
    description TEXT NOT NULL,
    severity non_conformity_severity DEFAULT 'minor',
    status non_conformity_status DEFAULT 'open',
    root_cause TEXT,
    corrective_action TEXT,
    responsible_id UUID REFERENCES auth.users(id),
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Basic)
ALTER TABLE production_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_bom ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_work_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cutting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE cutting_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE non_conformities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users" ON production_orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON production_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON production_bom FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON production_work_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON cutting_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON cutting_plan_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON machines FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON machine_maintenance_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON quality_inspections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON non_conformities FOR ALL USING (auth.role() = 'authenticated');
