"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/components/ui/use-toast";
import { IntegrityCheckResult } from "@/types/security";
import { Database, FileText, Link, Lock, Play, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";

export default function IntegrityCheckPage() {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<IntegrityCheckResult | null>({
    id: "1",
    checked_at: "2024-01-08T09:00:00Z",
    status: "valid",
    checked_count: 14502,
    corrupted_records: 0,
    performed_by: "system_job",
  });

  const runCheck = () => {
    setIsChecking(true);
    // Simulate check duration
    setTimeout(() => {
      setIsChecking(false);
      const isSuccess = Math.random() > 0.2; // 80% chance of success for demo

      if (isSuccess) {
        setLastCheck({
          id: Math.random().toString(),
          checked_at: new Date().toISOString(),
          status: "valid",
          checked_count: 14650,
          corrupted_records: 0,
          performed_by: "current_user",
        });
        toast({ title: "Verificação concluída", description: "O sistema está íntegro." });
      } else {
        setLastCheck({
          id: Math.random().toString(),
          checked_at: new Date().toISOString(),
          status: "corrupted",
          checked_count: 14650,
          corrupted_records: 1,
          first_corruption_id: "log_9921",
          performed_by: "current_user",
        });
        toast({
          title: "ATENÇÃO: Corrupção detetada",
          description: "Verifique o relatório imediatamente.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Integridade do Sistema"
        description="Verificação de inviolabilidade dos logs de auditoria (Hash Chain)."
      >
        <div></div>
      </PageHeader>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Main Action Card */}
        <Card className="flex flex-col items-center justify-center space-y-6 border-white/5 bg-onyx-900 p-8 text-center">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all ${isChecking ? "animate-pulse border-gold/50 bg-gold/10" : lastCheck?.status === "valid" ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
          >
            {isChecking ? (
              <Database size={40} className="animate-bounce text-gold" />
            ) : lastCheck?.status === "valid" ? (
              <ShieldCheck size={40} className="text-green-500" />
            ) : (
              <Lock size={40} className="text-red-500" />
            )}
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-white">
              {isChecking
                ? "Verificando Integridade..."
                : lastCheck?.status === "valid"
                  ? "Sistema Íntegro"
                  : "Corrupção Detetada"}
            </h2>
            <p className="mx-auto max-w-md text-diamond-muted">
              {isChecking
                ? "O sistema está a recalcular os hashes criptográficos de todos os logs para garantir que nenhum dado foi alterado manualmente."
                : "A verificação confirma se a cadeia de hashes dos logs de auditoria permanece intacta."}
            </p>
          </div>

          <Button
            size="lg"
            className={`btn-primary w-48 shadow-lg shadow-gold/10 ${isChecking ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={runCheck}
            disabled={isChecking}
          >
            {isChecking ? (
              "Aguarde..."
            ) : (
              <>
                <Play className="mr-2" size={18} /> Iniciar Verificação
              </>
            )}
          </Button>
        </Card>

        {/* Stats & Details */}
        <div className="space-y-6">
          <Card className="border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Última Verificação
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 py-3">
                <span className="text-diamond-muted">Data/Hora</span>
                <span className="font-mono text-white">
                  {lastCheck ? new Date(lastCheck.checked_at).toLocaleString() : "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-3">
                <span className="text-diamond-muted">Total de Registos</span>
                <span className="font-mono text-white">
                  {lastCheck?.checked_count.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-3">
                <span className="text-diamond-muted">Status</span>
                <span
                  className={`font-bold ${lastCheck?.status === "valid" ? "text-green-500" : "text-red-500"}`}
                >
                  {lastCheck?.status === "valid" ? "VÁLIDO" : "CORROMPIDO"}
                </span>
              </div>
              {lastCheck?.status === "corrupted" && (
                <div className="mt-2 rounded border border-red-500/20 bg-red-500/10 p-3">
                  <div className="flex items-start gap-2 text-red-400">
                    <XCircle size={16} className="mt-0.5" />
                    <div className="text-sm">
                      <p className="mb-1 font-bold">Quebra de integridade detetada</p>
                      <p>
                        Hash inválido no registo ID:{" "}
                        <code className="rounded bg-red-950 px-1">
                          {lastCheck.first_corruption_id}
                        </code>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Mecanismo de Defesa
            </h3>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col items-center rounded border border-white/5 bg-white/5 p-3 text-center">
                <Link size={24} className="mb-2 text-gold" />
                <span className="text-xs font-bold text-white">Hash Chaining</span>
                <span className="mt-1 text-[10px] text-diamond-muted">
                  Logs encadeados criptograficamente
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center rounded border border-white/5 bg-white/5 p-3 text-center">
                <Lock size={24} className="mb-2 text-gold" />
                <span className="text-xs font-bold text-white">Imutabilidade</span>
                <span className="mt-1 text-[10px] text-diamond-muted">
                  Registos 'Append-only' na base de dados
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center rounded border border-white/5 bg-white/5 p-3 text-center">
                <FileText size={24} className="mb-2 text-gold" />
                <span className="text-xs font-bold text-white">Snapshot</span>
                <span className="mt-1 text-[10px] text-diamond-muted">
                  Cópia do estado anterior e posterior
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
