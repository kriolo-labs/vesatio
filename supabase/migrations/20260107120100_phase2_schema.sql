-- 20260107_phase2_schema.sql
-- VESATIO MACRO-FASE 2: COMPLETE DATABASE SCHEMA
-- Author: BackendAgent
-- Description: Auth, CRM, Projects, Inventory, Purchases

BEGIN;

--------------------------------------------------------------------------------
-- 2.1 AUTH & USERS
--------------------------------------------------------------------------------

-- 2.1.1 ROLES
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Access Levels (Roles)
INSERT INTO public.roles (name, display_name, is_system) VALUES
('strategic_partner', 'Sócio Estratégico', true),
('managing_partner', 'Sócio Gestor', true),
('project_manager', 'Gestor de Projeto', true),
('financial', 'Financeiro', true),
('warehouse', 'Armazém', true),
('production', 'Produção', true),
('technician', 'Técnico', true),
('client', 'Cliente', true)
ON CONFLICT (name) DO NOTHING;

-- 2.1.2 USERS (Extends Profiles)
-- We extend existing 'profiles' to match 'users' requirements
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role_id UUID REFERENCES public.roles(id);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 2.1.3 SESSIONS
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_fingerprint TEXT,
  device_info JSONB,
  ip_address TEXT,
  geolocation JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- 2.1.4 TRUSTED DEVICES
CREATE TABLE IF NOT EXISTS public.user_trusted_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_fingerprint TEXT NOT NULL,
  device_name TEXT,
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.1.5 2FA
CREATE TABLE IF NOT EXISTS public.user_2fa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  method TEXT NOT NULL, -- app, sms, email
  secret TEXT,
  is_enabled BOOLEAN DEFAULT false,
  backup_codes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 2.2 CRM
--------------------------------------------------------------------------------

-- Enums
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'converted', 'lost', 'waiting_list');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE project_type_enum AS ENUM ('acabamentos', 'marcenaria', 'smart_home', 'full_service', 'consultoria', 'manutencao');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE investment_level_enum AS ENUM ('under_2m', '2m_4m', '4m_10m', '10m_20m', 'above_20m');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE timeline_enum AS ENUM ('urgent', '1_3_months', '3_6_months', '6_12_months', 'planning');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 2.2.1 LEADS
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE, -- Trigger to generate LEAD-XXXXX
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  country TEXT,
  city TEXT,
  address TEXT,
  company_name TEXT,
  project_type project_type_enum,
  investment_level investment_level_enum,
  timeline timeline_enum,
  description TEXT,
  source TEXT,
  source_details JSONB,
  assigned_to UUID REFERENCES auth.users(id),
  status lead_status DEFAULT 'new',
  score INTEGER DEFAULT 0,
  notes TEXT,
  tags TEXT[],
  attachments TEXT[],
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  lost_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- 2.2.2 INTERACTIONS
CREATE TABLE IF NOT EXISTS public.lead_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL, -- call, email, etc
  direction TEXT, -- inbound, outbound
  subject TEXT,
  content TEXT,
  outcome TEXT,
  next_action TEXT,
  next_action_date TIMESTAMPTZ,
  duration_minutes INTEGER,
  attachments TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2.3 CLIENTS
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE, -- CLI-XXXXX
  lead_id UUID REFERENCES public.leads(id),
  type TEXT DEFAULT 'individual', -- individual, company
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  secondary_phone TEXT,
  country TEXT,
  city TEXT,
  address TEXT,
  postal_code TEXT,
  nif TEXT,
  company_name TEXT,
  company_nif TEXT,
  billing_address TEXT,
  contact_person TEXT,
  contact_person_phone TEXT,
  contact_person_email TEXT,
  portal_access BOOLEAN DEFAULT false,
  portal_user_id UUID REFERENCES auth.users(id),
  preferred_language TEXT DEFAULT 'pt',
  preferred_contact_method TEXT,
  tags TEXT[],
  notes TEXT,
  credit_limit NUMERIC(15,2),
  payment_terms_days INTEGER,
  is_vip BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  satisfaction_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- 2.2.4 CLIENT CONTACTS
CREATE TABLE IF NOT EXISTS public.client_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT,
  phone TEXT,
  is_primary BOOLEAN DEFAULT false,
  is_billing_contact BOOLEAN DEFAULT false,
  is_project_contact BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 2.3 PROJECTS (Update existing + New tables)
--------------------------------------------------------------------------------

-- Update existing projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS code TEXT UNIQUE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS type project_type_enum;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS priority TEXT; -- low, medium, high, urgent
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS location_country TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS location_city TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS location_coordinates POINT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS manager_id UUID REFERENCES auth.users(id);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS team_ids UUID[];
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS start_date_planned DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS end_date_planned DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS start_date_actual DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS end_date_actual DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget_original NUMERIC(15,2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget_current NUMERIC(15,2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget_spent NUMERIC(15,2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS margin_target_percent NUMERIC(5,2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS margin_actual_percent NUMERIC(5,2);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS progress_percent NUMERIC(5,2) DEFAULT 0;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS is_smart_home BOOLEAN DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS smart_home_features JSONB;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS contract_signed_at TIMESTAMPTZ;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS warranty_end_date DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 2.3.2 PHASES
CREATE TABLE IF NOT EXISTS public.project_phases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  "order" INTEGER,
  status TEXT DEFAULT 'pending',
  planned_start DATE,
  planned_end DATE,
  actual_start DATE,
  actual_end DATE,
  progress_percent NUMERIC(5,2) DEFAULT 0,
  dependencies UUID[],
  checklist JSONB,
  budget_allocated NUMERIC(15,2),
  budget_spent NUMERIC(15,2),
  notes TEXT,
  completed_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3.3 TASKS
CREATE TABLE IF NOT EXISTS public.project_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES public.project_phases(id),
  parent_task_id UUID REFERENCES public.project_tasks(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT,
  assigned_to UUID REFERENCES auth.users(id), -- Simple single assign for now
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),
  estimated_hours NUMERIC(5,2),
  actual_hours NUMERIC(5,2),
  checklist JSONB,
  attachments TEXT[],
  comments_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3.5 MILESTONES
CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  requires_client_approval BOOLEAN DEFAULT false,
  client_approved_at TIMESTAMPTZ,
  payment_trigger BOOLEAN DEFAULT false,
  payment_amount NUMERIC(15,2),
  payment_percent NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3.9 GALLERY (Extends existing project_gallery)
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS phase_id UUID REFERENCES public.project_phases(id);
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS taken_at TIMESTAMPTZ;
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS taken_by UUID REFERENCES auth.users(id);
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS is_client_visible BOOLEAN DEFAULT true;
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.project_gallery ADD COLUMN IF NOT EXISTS "order" INTEGER;

--------------------------------------------------------------------------------
-- 2.4 INVENTORY
--------------------------------------------------------------------------------

-- 2.4.1 CATEGORIES
CREATE TABLE IF NOT EXISTS public.product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES public.product_categories(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  image_url TEXT,
  "order" INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4.2 PRODUCTS (Replacing/Extending inventory_global or create new)
-- Since inventory_global was simple, we create proper 'products' table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  barcode TEXT,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.product_categories(id),
  type TEXT DEFAULT 'material',
  unit_of_measure TEXT,
  unit_price NUMERIC(15,2),
  cost_price NUMERIC(15,2),
  stock_quantity NUMERIC(15,2) DEFAULT 0,
  min_stock_level NUMERIC(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4.4 WAREHOUSES
CREATE TABLE IF NOT EXISTS public.warehouses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'main',
  address TEXT,
  manager_id UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4.7 MOVEMENTS
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id),
  warehouse_from_id UUID REFERENCES public.warehouses(id),
  warehouse_to_id UUID REFERENCES public.warehouses(id),
  movement_type TEXT NOT NULL, -- in, out, transfer
  quantity NUMERIC(15,2) NOT NULL,
  unit_cost NUMERIC(15,2),
  notes TEXT,
  performed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 2.5 PURCHASES
--------------------------------------------------------------------------------

-- 2.5.1 SUPPLIERS
CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE, -- FOR-XXXXX
  name TEXT NOT NULL,
  nif TEXT,
  contact_email TEXT,
  phone TEXT,
  rating INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5.4 REQUISITIONS
CREATE TABLE IF NOT EXISTS public.purchase_requisitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id),
  requested_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft',
  total_estimated NUMERIC(15,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5.6 PURCHASE ORDERS
CREATE TABLE IF NOT EXISTS public.purchase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE, -- PO-XXXXX
  requisition_id UUID REFERENCES public.purchase_requisitions(id),
  supplier_id UUID REFERENCES public.suppliers(id),
  status TEXT DEFAULT 'draft',
  total NUMERIC(15,2),
  currency TEXT DEFAULT 'CVE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5.7 PO ITEMS
CREATE TABLE IF NOT EXISTS public.purchase_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase_order_id UUID REFERENCES public.purchase_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  description TEXT,
  quantity_ordered NUMERIC(15,2),
  unit_price NUMERIC(15,2),
  total_price NUMERIC(15,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5.11 IMPORTS
CREATE TABLE IF NOT EXISTS public.imports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE, -- IMP-XXXXX
  purchase_order_id UUID REFERENCES public.purchase_orders(id),
  status TEXT DEFAULT 'proforma_received',
  transporter TEXT,
  estimated_arrival DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMIT;
