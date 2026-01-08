"use client";

import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { SetupWizardClient } from "@/components/auth/setup-wizard-client";
import { SetupWizardStaff } from "@/components/auth/setup-wizard-staff";

export default function SetupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                router.push("/auth/login");
                return;
            }

            // Get profile to check role
            const { data: profile, error } = await supabase
                .from("profiles")
                .select("role, is_verified")
                .eq("id", user.id)
                .single();

            if (error || !profile) {
                 // Handle error (maybe retry or support)
                 setLoading(false);
                 return;
            }
            
            // If already verified/complete, redirect to dashboard? 
            // Or allow re-run? Usually blocking if not verified.
            // if (profile.is_verified) router.push("/core/dashboard");

            setRole(profile.role);
            setLoading(false);
        };
        
        checkUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-onyx text-gold">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // Determine layout content based on role
    // We reuse AuthLayout but maybe with different image or text
    
    return (
        <AuthLayout 
            imageSrc="/images/setup-bg.jpg"
            imageAlt="Setup your workspace"
        >
            <div className="w-full">
                {role === "client" ? (
                    <SetupWizardClient />
                ) : (
                    <SetupWizardStaff role={role || "worker"} />
                )}
            </div>
        </AuthLayout>
    );
}
