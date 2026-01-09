"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login - would call Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/my-vesatio";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onyx p-6">
      {/* Background Effect */}
      <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-gold/5 via-transparent to-transparent" />

      {/* Logo */}
      <div className="z-10 mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient">
          <span className="font-serif text-xl font-bold text-onyx">V</span>
        </div>
        <div>
          <span className="block font-serif text-2xl text-white">My Vesatio</span>
          <span className="text-xs text-diamond-muted">Portal do Cliente</span>
        </div>
      </div>

      {/* Login Card */}
      <Card className="z-10 w-full max-w-md border-white/10 bg-onyx-900/80 p-8 backdrop-blur-xl">
        <h1 className="mb-2 text-xl font-bold text-white">Bem-vindo de volta</h1>
        <p className="mb-6 text-sm text-diamond-muted">
          Introduza os seus dados para aceder ao portal.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-diamond-muted">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="border-white/10 bg-white/5 text-white placeholder:text-diamond-muted"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-diamond-muted">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-diamond-muted"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-diamond-muted hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="cursor-pointer text-sm text-diamond-muted">
                Lembrar-me
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-gold hover:underline">
              Esqueceu a password?
            </Link>
          </div>

          <Button
            type="submit"
            className="text-onyx-950 w-full bg-gold font-medium hover:bg-gold/90"
            disabled={isLoading}
          >
            {isLoading ? "A entrar..." : "Entrar"}
          </Button>
        </form>

        {/* Biometric Option (Visual Only) */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 py-3 text-diamond-muted transition-colors hover:border-gold/50 hover:text-white">
            <Fingerprint size={20} />
            <span className="text-sm">Entrar com Biometria</span>
          </button>
        </div>
      </Card>

      {/* First Access Link */}
      <p className="z-10 mt-6 text-sm text-diamond-muted">
        Primeira vez?{" "}
        <Link href="/my-vesatio/primeiro-acesso" className="text-gold hover:underline">
          Ative a sua conta
        </Link>
      </p>
    </div>
  );
}
