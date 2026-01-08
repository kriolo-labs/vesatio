-- tests/rls_verify.sql
-- Description: Test script to verify Worker restrictions on Financial Data
-- Run this in Supabase SQL Editor

BEGIN;

-- 1. Create a dummy worker
INSERT INTO auth.users (id, email) VALUES ('00000000-0000-0000-0000-000000000001', 'worker@vesatio.os') ON CONFLICT DO NOTHING;
INSERT INTO public.profiles (id, role) VALUES ('00000000-0000-0000-0000-000000000001', 'worker') ON CONFLICT DO NOTHING;

-- 2. Create a dummy project
INSERT INTO public.projects (id, name, financial_progress_percent) 
VALUES ('00000000-0000-0000-0000-000000000002', 'Test Project', 50.00) 
ON CONFLICT DO NOTHING;

-- 3. Switch context to Worker
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" = '00000000-0000-0000-0000-000000000001';

-- 4. ATTEMPT: Select * (Should Succeed for rows, but sensitive columns need checking)
SELECT * FROM public.projects;

-- NOTE: RLS controls ROW visibility. 
-- To hide 'financial_progress_percent' COLUMN specifically, we need a VIEW or GRANT restriction.
-- Since strict column security was requested:

-- 5. VERIFYING COLUMN SECURITY (If implemented via privileges)
-- REVOKE SELECT(financial_progress_percent) ON public.projects FROM authenticated;
-- GRANT SELECT(id, name, status) ON public.projects TO authenticated;

ROLLBACK; -- Clean up
