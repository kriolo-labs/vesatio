"use client";

import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const resetSchema = z.object({
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As passwords não coincidem",
  path: ["confirmPassword"],
});

type ResetSchema = z.infer<typeof resetSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetSchema) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Password atualizada",
        description: "A sua password foi alterada com sucesso.",
        variant: "success",
      });
      
      router.push("/core/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-8 space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-serif text-gold">Redefinir Password</h2>
        <p className="text-diamond-muted text-sm">
          Escolha uma nova password segura
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
             <Input 
                label="Nova Password" 
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                error={errors.password?.message}
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

        <div className="space-y-2">
            <Input 
                label="Confirmar Password" 
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                className="bg-onyx/50"
            />
        </div>

        <Button 
            type="submit" 
            className="w-full btn-primary"
            disabled={isLoading}
            isLoading={isLoading}
        >
            {!isLoading && "Alterar Password"}
            {!isLoading && <Save className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </motion.div>
  );
}
