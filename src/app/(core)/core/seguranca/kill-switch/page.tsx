"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertOctagon,
  AlertTriangle,
  Fingerprint,
  Lock,
  Power,
  ShieldAlert,
  Unlock,
} from "lucide-react";
import { useState } from "react";

export default function KillSwitchPage() {
  const { toast } = useToast();
  const [isSystemLocked, setIsSystemLocked] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  const handleInitialClick = () => {
    setIsConfirming(true);
  };

  const handleExecKillSwitch = () => {
    if (!password || !twoFACode) {
      toast({
        title: "Autenticação Falhada",
        description: "Credenciais incompletas.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSystemLocked(!isSystemLocked);
      setIsConfirming(false);
      setPassword("");
      setTwoFACode("");

      if (!isSystemLocked) {
        toast({
          title: "SISTEMA BLOQUEADO",
          description:
            "O modo de emergência foi ativado. Todos os acessos externos foram revogados.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sistema Desbloqueado",
          description: "O modo normal foi restaurado.",
          className: "bg-green-500 text-white",
        });
      }
    }, 1000);
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Controlo de Emergência (Kill Switch)"
        description="Use apenas em situações críticas de segurança. Esta ação requer autorização de nível máximo."
      >
        <div></div>
      </PageHeader>

      <div className="mx-auto mt-8 max-w-4xl">
        <Card
          className={`border-2 p-8 transition-all ${isSystemLocked ? "border-red-500 bg-red-950/30" : "border-white/10 bg-onyx-900"}`}
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <div
              className={`mb-6 flex h-32 w-32 items-center justify-center rounded-full border-8 transition-all ${isSystemLocked ? "border-red-500 bg-red-500/20 text-red-500" : "border-white/10 bg-white/5 text-diamond-muted"}`}
            >
              <Power size={64} />
            </div>

            <h2
              className={`mb-2 font-serif text-3xl font-bold ${isSystemLocked ? "text-red-500" : "text-white"}`}
            >
              {isSystemLocked ? "SISTEMA BLOQUEADO" : "SISTEMA OPERACIONAL"}
            </h2>
            <p className="max-w-lg text-diamond-muted">
              {isSystemLocked
                ? "O acesso está restrito exclusivamente ao Administrador de Segurança. Todos os outros logins estão suspensos. APIs públicas desativadas."
                : "O sistema está a funcionar normalmente. Ativar o Kill Switch bloqueará imediatamente todos os utilizadores e interfaces externas."}
            </p>
          </div>

          {!isConfirming ? (
            <div className="flex justify-center">
              <Button
                size="lg"
                className={`h-16 gap-3 px-8 text-lg font-bold uppercase tracking-wider shadow-xl ${isSystemLocked ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white shadow-red-900/20 hover:bg-red-700"}`}
                onClick={handleInitialClick}
              >
                {isSystemLocked ? (
                  <>
                    {" "}
                    <Unlock size={24} /> Desbloquear Sistema{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Lock size={24} /> Bloquear Tudo (Kill Switch){" "}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Card className="bg-onyx-950 mx-auto max-w-md border-red-500/30 p-6 duration-200 animate-in zoom-in-95">
              <div className="mb-4 flex items-center gap-3 border-b border-red-500/20 pb-4 text-red-500">
                <AlertTriangle size={24} />
                <span className="font-bold uppercase tracking-wide">
                  {isSystemLocked ? "Confirmar Desbloqueio" : "Confirmar Bloqueio Total"}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Password de Administrador</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="border-red-500/20 bg-onyx-900 focus:border-red-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Código 2FA (Authy/Google)</Label>
                  <div className="relative">
                    <Fingerprint
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
                      size={16}
                    />
                    <Input
                      placeholder="000 000"
                      className="border-red-500/20 bg-onyx-900 pl-9 font-mono tracking-widest focus:border-red-500"
                      value={twoFACode}
                      onChange={(e) => setTwoFACode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" className="flex-1" onClick={() => setIsConfirming(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className={`flex-1 font-bold ${isSystemLocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                    onClick={handleExecKillSwitch}
                  >
                    {isSystemLocked ? "Restaurar Acesso" : "EXECUTAR BLOQUEIO"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/5 pt-8 text-center text-xs text-diamond-muted opacity-60 md:grid-cols-3">
            <div>
              <ShieldAlert size={20} className="mx-auto mb-2" />
              <p>Esta ação será registada no log de auditoria permanente com severidade CRÍTICA.</p>
            </div>
            <div>
              <AlertOctagon size={20} className="mx-auto mb-2" />
              <p>Todas as sessões ativas serão terminadas forçosamente.</p>
            </div>
            <div>
              <Lock size={20} className="mx-auto mb-2" />
              <p>Integrações de API externas falharão imediatamente com código 503.</p>
            </div>
          </div>
        </Card>
      </div>
    </CoreLayout>
  );
}
