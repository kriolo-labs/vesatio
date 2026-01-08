"use client";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";

// Schema Validation
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Password é obrigatória"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  const supabase = createClient();

  // Load Fingerprint
  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setFingerprint(visitorId);
    };
    setFp();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    
    // Simulate slight delay for UX (Shake animation prevention on instant fail)
    // await new Promise(resolve => setTimeout(resolve, 500)); 

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      // Success
      toast({
        title: "Bem-vindo de volta",
        description: "Login efetuado com sucesso.",
        variant: "success",
      });
      
      router.push("/core/dashboard"); // Default redirect, logic can be enhanced for role-based
    } catch (error: any) {
        // Shake logic could be here (UI feedback)
        toast({
            title: "Erro de autenticação",
            description: error.message || "Credenciais inválidas.",
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-8 space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-serif text-gold">Login</h2>
        <p className="text-diamond-muted text-sm">
          Aceda à sua conta Vesatio
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <Input 
                label="Email" 
                {...register("email")}
                placeholder="nome@vesatio.com"
                error={errors.email?.message}
                autoComplete="email"
                className="bg-onyx/50"
            />
        </div>
        
        <div className="space-y-2">
            <div className="relative">
                <Input 
                    label="Password" 
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    autoComplete="current-password"
                    className="bg-onyx/50 pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-diamond-muted hover:text-gold transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            <div className="flex justify-end">
                <Link href="/auth/forgot-password" className="text-xs text-gold hover:underline">
                    Esqueceu a password?
                </Link>
            </div>
        </div>

        <Button 
            type="submit" 
            className="w-full btn-primary"
            disabled={isLoading}
            isLoading={isLoading}
        >
            {!isLoading && "Entrar"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
      
      {/* Footer / Privacy */}
      <div className="text-center text-xs text-diamond-muted mt-6">
        <p>Acesso restrito a pessoal autorizado.</p>
        <p className="mt-1">
            Browser ID: {fingerprint ? <span className="font-mono text-xs opacity-50">{fingerprint.substring(0,8)}</span> : "Loading..."}
        </p>
      </div>
    </motion.div>
  );
}
