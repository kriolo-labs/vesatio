"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function FirstAccessPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetPassword = () => {
    if (password === confirmPassword && password.length >= 8) {
      setStep(2);
    }
  };

  const handleCompleteProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onyx p-6">
      <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-gold/5 via-transparent to-transparent" />

      {/* Logo */}
      <div className="z-10 mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient">
          <span className="font-serif text-xl font-bold text-onyx">V</span>
        </div>
        <div>
          <span className="block font-serif text-2xl text-white">My Vesatio</span>
          <span className="text-xs text-diamond-muted">Primeiro Acesso</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="z-10 mb-8 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 w-8 rounded-full ${step >= s ? "bg-gold" : "bg-white/10"}`}
          />
        ))}
      </div>

      {/* Step 1: Set Password */}
      {step === 1 && (
        <Card className="z-10 w-full max-w-md border-white/10 bg-onyx-900/80 p-8 backdrop-blur-xl">
          <h1 className="mb-2 text-xl font-bold text-white">Crie a sua password</h1>
          <p className="mb-6 text-sm text-diamond-muted">
            Escolha uma password segura para aceder ao seu portal.
          </p>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-diamond-muted">Nova Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-diamond-muted"
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
            <div className="space-y-2">
              <Label className="text-diamond-muted">Confirmar Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a password"
                className="border-white/10 bg-white/5 text-white placeholder:text-diamond-muted"
              />
            </div>
            <Button
              onClick={handleSetPassword}
              className="text-onyx-950 w-full bg-gold hover:bg-gold/90"
              disabled={password.length < 8 || password !== confirmPassword}
            >
              Continuar
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Complete Profile */}
      {step === 2 && (
        <Card className="z-10 w-full max-w-md border-white/10 bg-onyx-900/80 p-8 backdrop-blur-xl">
          <h1 className="mb-2 text-xl font-bold text-white">Complete o seu perfil</h1>
          <p className="mb-6 text-sm text-diamond-muted">
            Adicione informações de contacto opcionais.
          </p>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-diamond-muted">Telefone (Opcional)</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+238 XXX XXXX"
                className="border-white/10 bg-white/5 text-white placeholder:text-diamond-muted"
              />
            </div>
            <Button
              onClick={handleCompleteProfile}
              className="text-onyx-950 w-full bg-gold hover:bg-gold/90"
              disabled={isLoading}
            >
              {isLoading ? "A guardar..." : "Concluir Ativação"}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <Card className="z-10 w-full max-w-md border-white/10 bg-onyx-900/80 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="mb-2 text-xl font-bold text-white">Conta Ativada!</h1>
          <p className="mb-6 text-sm text-diamond-muted">
            O seu portal está pronto. Bem-vindo à experiência Vesatio.
          </p>
          <Button
            onClick={() => (window.location.href = "/my-vesatio")}
            className="text-onyx-950 w-full bg-gold hover:bg-gold/90"
          >
            Aceder ao Portal
          </Button>
        </Card>
      )}
    </div>
  );
}
