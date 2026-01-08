-- 20260106_vesatio_init.sql
-- VESATIO OS INITIALIZATION
-- Author: BackendAgent
-- Description: Core Schema + RLS for Roles (Admin, Architect, Worker, Client)

BEGIN;

-- 1. EXTENSIONS & TYPES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE app_role AS ENUM ('admin', 'architect', 'worker', 'client');
CREATE TYPE user_tier AS ENUM ('base', 'premium', 'signature');
CREATE TYPE project_status AS ENUM ('planning', 'execution', 'paused', 'delivered');
CREATE TYPE gallery_type AS ENUM ('render', 'real_photo');
CREATE TYPE qc_status AS ENUM ('pending', 'fixed', 'verified');

-- 2. PROFILES (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role app_role NOT NULL DEFAULT 'client',
  tier user_tier NOT NULL DEFAULT 'base',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  status project_status DEFAULT 'planning',
  financial_progress_percent NUMERIC(5, 2) DEFAULT 0.00,
  start_date DATE,
  estimated_end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INVENTORY GLOBAL
CREATE TABLE public.inventory_global (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  material_name TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity_warehouse NUMERIC(10, 2) DEFAULT 0,
  quantity_site_leftovers NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECT GALLERY
CREATE TABLE public.project_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  type gallery_type NOT NULL,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. QUALITY LOGS (AURA Supervisor)
CREATE TABLE public.quality_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  ai_analysis_result JSONB, -- Stores { status: "FAIL", defects: [] }
  status qc_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PARAMETRIC LOGIC (Construction Rules)
CREATE TABLE public.parametric_logic (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material TEXT UNIQUE NOT NULL,
  coverage_per_liter NUMERIC(10, 2), -- e.g., 10 m2/L
  waste_factor NUMERIC(4, 2) DEFAULT 1.10, -- 10%
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- HELPER: Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'architect')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- HELPER: Check if user is worker
CREATE OR REPLACE FUNCTION public.is_worker()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'worker'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_global ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parametric_logic ENABLE ROW LEVEL SECURITY;


-- 1. PROFILES POLICIES
-- Users can see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
-- Admins can see all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
-- Users can update own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- 2. PROJECTS POLICIES
-- Admin: Full Access
CREATE POLICY "Admins full access projects" ON public.projects FOR ALL USING (public.is_admin());

-- Client: View ONLY own projects
CREATE POLICY "Clients view own projects" ON public.projects FOR SELECT USING (auth.uid() = client_id);

-- Worker: View ALL projects (Restriction on financial column handled via View or API)
CREATE POLICY "Workers view all projects" ON public.projects FOR SELECT USING (public.is_worker());


-- 3. INVENTORY POLICIES
-- Admin/Worker: View
CREATE POLICY "Staff view inventory" ON public.inventory_global FOR SELECT USING (public.is_admin() OR public.is_worker());
-- Admin: Modify
CREATE POLICY "Admins modify inventory" ON public.inventory_global FOR ALL USING (public.is_admin());


-- 4. GALLERY & QUALITY POLICIES
-- Admin/Worker: Full Access
CREATE POLICY "Staff full access gallery" ON public.project_gallery FOR ALL USING (public.is_admin() OR public.is_worker());
CREATE POLICY "Staff full access logs" ON public.quality_logs FOR ALL USING (public.is_admin() OR public.is_worker());

-- Client: View own project gallery
CREATE POLICY "Clients view own project gallery" ON public.project_gallery FOR SELECT USING (
  exists (select 1 from public.projects where id = project_gallery.project_id and client_id = auth.uid())
);


-- 5. PARAMETRIC POLICIES
-- Read-only for everyone (Reference data)
CREATE POLICY "Everyone read rules" ON public.parametric_logic FOR SELECT TO authenticated USING (true);
-- Admin modify
CREATE POLICY "Admin modify rules" ON public.parametric_logic FOR ALL USING (public.is_admin());


COMMIT;
