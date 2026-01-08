"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Return a mock client if environment variables are not set
    if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase environment variables not configured");
        return {
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                getUser: async () => ({ data: { user: null }, error: null }),
                signInWithPassword: async () => ({ data: null, error: new Error("Supabase not configured") }),
                signUp: async () => ({ data: null, error: new Error("Supabase not configured") }),
                signOut: async () => { },
                resetPasswordForEmail: async () => ({ error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            },
            from: () => ({
                select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
                insert: async () => ({ data: null, error: null }),
            }),
        } as unknown as ReturnType<typeof createBrowserClient>;
    }

    return createBrowserClient(supabaseUrl, supabaseKey);
}
