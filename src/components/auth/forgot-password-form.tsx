"use client";

import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link"; // Changed from 'next/link' just to be explicit if needed, but standard import works
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const forgotSchema = z.object({
  email: z.string().email("Email inválido"),
});

type ForgotSchema = z.infer<typeof forgotSchema>;

export function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotSchema>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotSchema) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: "Email enviado",
        description: "Verifique a sua caixa de entrada.",
        variant: "success",
      });
    } catch (error: any) {
        // We generally shouldn't reveal if email exists or not for security, 
        // but Supabase usually returns OK even if user doesn't exist (if configured).
        // If it returns error (e.g. Rate Limit), show it.
      toast({
        title: "Erro ao enviar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
      return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 text-center space-y-6"
        >
            <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-status-success" />
            </div>
            <h2 className="text-2xl font-serif text-gold">Verifique o seu Email</h2>
            <p className="text-diamond-muted">
                Enviámos um link de recuperação para o endereço fornecido. O link expira em 24 horas.
            </p>
            <div className="pt-4">
                <Link href="/auth/login" className="text-gold hover:underline text-sm">
                    Voltar ao Login
                </Link>
            </div>
        </motion.div>
      )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-8 space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-serif text-gold">Recuperar Password</h2>
        <p className="text-diamond-muted text-sm">
          Insira o seu email para receber as instruções
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

        <Button 
            type="submit" 
            className="w-full btn-primary"
            disabled={isLoading}
            isLoading={isLoading}
        >
            {!isLoading && "Enviar Link"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <Link href="/auth/login" className="text-sm text-diamond-muted hover:text-white transition-colors">
            Voltar ao Login
        </Link>
      </div>
    </motion.div>
  );
}
