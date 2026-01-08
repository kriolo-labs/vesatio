"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

type UserRole =
    | "super_admin"
    | "admin"
    | "project_manager"
    | "financial"
    | "procurement"
    | "production"
    | "technician"
    | "client";

interface Profile {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
    role: UserRole;
    permissions: Record<string, boolean>;
    is_active: boolean;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: Error | null }>;
    hasPermission: (permission: string) => boolean;
    hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                setUser(session.user);
                await fetchProfile(session.user.id);
            }
            setIsLoading(false);
        };

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event: string, session: { user?: User } | null) => {
            if (event === "SIGNED_IN" && session?.user) {
                setUser(session.user);
                await fetchProfile(session.user.id);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (!error && data) {
            setProfile(data as Profile);
        }
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        return { error: error as Error | null };
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        });

        if (!error && data.user) {
            await supabase.from("profiles").insert({
                id: data.user.id,
                full_name: fullName,
                email,
                role: "client",
            });
        }

        return { error: error as Error | null };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/definir-senha`,
        });
        return { error: error as Error | null };
    };

    const hasPermission = (permission: string): boolean => {
        if (!profile) return false;
        if (profile.role === "super_admin") return true;
        return profile.permissions?.[permission] === true;
    };

    const hasRole = (...roles: UserRole[]): boolean => {
        if (!profile) return false;
        if (profile.role === "super_admin") return true;
        return roles.includes(profile.role);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                isLoading,
                signIn,
                signUp,
                signOut,
                resetPassword,
                hasPermission,
                hasRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
