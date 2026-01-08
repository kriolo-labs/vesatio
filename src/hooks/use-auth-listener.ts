"use client";

import { createClient } from "@/lib/supabase/client";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect } from "react";

export function useAuthListener() {
    const supabase = createClient();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
            if (event === "SIGNED_IN" && session) {
                // Here we can trigger server-side logic via API route to log session
                // fingerprint, IP, etc.
                await fetch("/api/auth/log-session", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        event,
                        session_id: session.access_token, // Or handle server-side
                    }),
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);
}
