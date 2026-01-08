import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Admin Client (Service Role)
 * 
 * ⚠️ WARNING: This client has FULL ACCESS to the database!
 * - Bypasses Row Level Security (RLS)
 * - Should NEVER be exposed to the browser
 * - Use ONLY in Server Actions and Edge Functions
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase admin environment variables. " +
      "Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
