-- 20260107_storage_init.sql
-- VESATIO STORAGE INIT
-- Author: BackendAgent
-- Description: Storage buckets and RLS policies

BEGIN;

-- 1. CREATE BUCKETS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES 
('avatars', 'avatars', true, 5242880, ARRAY['image/jpg', 'image/jpeg', 'image/png', 'image/webp']),
('projects', 'projects', false, 52428800, NULL),
('products', 'products', true, 10485760, ARRAY['image/jpg', 'image/jpeg', 'image/png', 'image/webp']),
('documents', 'documents', false, 26214400, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
('imports', 'imports', false, 52428800, ARRAY['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
('exports', 'exports', false, 52428800, NULL)
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. STORAGE POLICIES

-- Avatars: Public Read, Auth Upload (Own folder or global?)
-- Simplified: Auth users can upload, Everyone can read
DROP POLICY IF EXISTS "Public Access Avatars" ON storage.objects;
CREATE POLICY "Public Access Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
DROP POLICY IF EXISTS "Auth Upload Avatars" ON storage.objects;
CREATE POLICY "Auth Upload Avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Auth Update Own Avatar" ON storage.objects;
CREATE POLICY "Auth Update Own Avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- Products: Public Read, Admin/Worker Upload
DROP POLICY IF EXISTS "Public Read Products" ON storage.objects;
CREATE POLICY "Public Read Products" ON storage.objects FOR SELECT USING (bucket_id = 'products');
DROP POLICY IF EXISTS "Staff Upload Products" ON storage.objects;
CREATE POLICY "Staff Upload Products" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'products' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'architect', 'worker'))
);

-- Projects: Auth Read (with RLS check on project ideally, ensuring user has access to project) - SIMPLIFIED for now
-- Staff: Full Access
DROP POLICY IF EXISTS "Staff Full Access Projects" ON storage.objects;
CREATE POLICY "Staff Full Access Projects" ON storage.objects FOR ALL USING (
  bucket_id = 'projects' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'architect', 'worker'))
);
-- Client: Read Own Project Files (Complex policy, simplified to Auth Read for now, real RLS needs folder structure matching project ID)
DROP POLICY IF EXISTS "Client Read Projects" ON storage.objects;
CREATE POLICY "Client Read Projects" ON storage.objects FOR SELECT USING (
  bucket_id = 'projects' AND auth.role() = 'authenticated'
);

-- Documents: Similar to Projects
DROP POLICY IF EXISTS "Staff Full Access Documents" ON storage.objects;
CREATE POLICY "Staff Full Access Documents" ON storage.objects FOR ALL USING (
  bucket_id = 'documents' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'architect', 'worker'))
);
DROP POLICY IF EXISTS "Client Read Documents" ON storage.objects;
CREATE POLICY "Client Read Documents" ON storage.objects FOR SELECT USING (
  bucket_id = 'documents' AND auth.role() = 'authenticated'
);

-- Imports/Exports: Admin Only
DROP POLICY IF EXISTS "Admin Full Access Imports" ON storage.objects;
CREATE POLICY "Admin Full Access Imports" ON storage.objects FOR ALL USING (
  bucket_id = 'imports' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
DROP POLICY IF EXISTS "Admin Full Access Exports" ON storage.objects;
CREATE POLICY "Admin Full Access Exports" ON storage.objects FOR ALL USING (
  bucket_id = 'exports' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

COMMIT;
