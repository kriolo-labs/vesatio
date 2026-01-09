"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BusinessAlert } from "@/types/bi";
import { ArrowLeft, Bell, BellRing, Mail, MessageSquare, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock Rules
const mockRules: BusinessAlert[] = [
  {
    id: "1",
    name: "Margem Baixa - Projetos",
    condition_rule: "kpi:project_margin < 15%",
    severity: "critical",
    channels: ["app", "email"],
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Receita Abaixo da Meta",
    condition_rule: "kpi:revenue < kpi:target_revenue",
    severity: "high",
    channels: ["email"],
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Atraso na Produção",
    condition_rule: "order:delay > 2 days",
    severity: "medium",
    channels: ["app"],
    is_active: false,
    created_at: "2024-01-01T00:00:00Z",
  },
];

export default function AlertsConfigPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [rules, setRules] = useState<BusinessAlert[]>(mockRules);

  // New Rule State
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSeverity, setNewSeverity] = useState("medium");
  const [newCondition, setNewCondition] = useState("");

  const handleCreate = () => {
    if (!newName || !newCondition) return;

    const newRule: BusinessAlert = {
      id: Math.random().toString(),
      name: newName,
      condition_rule: newCondition,
      severity: newSeverity as any,
      channels: ["app"],
      is_active: true,
      created_at: new Date().toISOString(),
    };

    setRules([...rules, newRule]);
    setIsCreating(false);
    setNewName("");
    setNewCondition("");
    toast({ title: "Regra criada com sucesso" });
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
    toast({ title: "Regra removida" });
  };

  const toggleActive = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, is_active: !r.is_active } : r)));
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Configuração de Alertas de Negócio"
        description="Defina regras automáticas para monitorização e notificações."
      >
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-diamond-muted hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Button size="sm" className="btn-primary gap-2" onClick={() => setIsCreating(true)}>
            <Plus size={16} /> Nova Regra
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Create New Form */}
          {isCreating && (
            <Card className="border border-gold/30 bg-onyx-900 p-6 animate-in slide-in-from-top-4">
              <h3 className="mb-4 font-medium text-white">Nova Regra de Alerta</h3>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Regra</Label>
                  <Input
                    placeholder="Ex: Alerta de Liquidez"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label>Severidade</Label>
                  <Select value={newSeverity} onValueChange={setNewSeverity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Condição (Pseudocódigo)</Label>
                  <Input
                    placeholder="Ex: kpi:lucro < 1000"
                    className="font-mono"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                  />
                  <p className="text-xs text-diamond-muted">
                    Use o formato <code>entidade:campo operador valor</code>
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                  Cancelar
                </Button>
                <Button size="sm" className="btn-primary" onClick={handleCreate}>
                  Salvar Regra
                </Button>
              </div>
            </Card>
          )}

          {/* Rules List */}
          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`flex flex-col items-start justify-between gap-4 rounded-lg border bg-onyx-900 p-5 transition-all md:flex-row md:items-center ${rule.is_active ? "border-white/5" : "bg-onyx-950 border-white/5 opacity-60"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded ${rule.is_active ? "bg-gold/10 text-gold" : "bg-white/5 text-diamond-muted"}`}
                  >
                    <BellRing size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{rule.name}</h4>
                      {!rule.is_active && (
                        <Badge variant="secondary" className="text-[10px]">
                          Inativo
                        </Badge>
                      )}
                    </div>
                    <code className="mt-1 block w-fit rounded bg-white/5 px-1.5 py-0.5 text-xs text-diamond-muted">
                      {rule.condition_rule}
                    </code>
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center justify-between gap-4 md:mt-0 md:w-auto md:justify-end">
                  <div className="flex gap-1 text-diamond-muted">
                    {rule.channels.includes("app") && (
                      <span title="Notificação App">
                        <Bell size={14} />
                      </span>
                    )}
                    {rule.channels.includes("email") && (
                      <span title="Email">
                        <Mail size={14} />
                      </span>
                    )}
                    {rule.channels.includes("sms") && (
                      <span title="SMS">
                        <MessageSquare size={14} />
                      </span>
                    )}
                  </div>

                  <Badge
                    className={`border text-[10px] uppercase capitalize ${
                      rule.severity === "critical"
                        ? "border-red-500/30 text-red-500"
                        : rule.severity === "high"
                          ? "border-orange-500/30 text-orange-500"
                          : rule.severity === "medium"
                            ? "border-yellow-500/30 text-yellow-500"
                            : "border-blue-500/30 text-blue-500"
                    } bg-transparent`}
                  >
                    {rule.severity}
                  </Badge>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={
                        rule.is_active
                          ? "text-green-500 hover:text-green-400"
                          : "text-diamond-muted"
                      }
                      onClick={() => toggleActive(rule.id)}
                    >
                      {rule.is_active ? "Ativo" : "Ativar"}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-diamond-muted hover:text-red-500"
                      onClick={() => handleDelete(rule.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Como funciona
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-diamond-muted">
              O Engine de Alertas monitoriza continuamente os seus KPIs e dados operacionais. Quando
              uma condição é atendida, notificações são enviadas pelos canais configurados.
            </p>
            <div className="space-y-2 text-xs text-diamond-muted">
              <p>• Verificação a cada 5 minutos para alertas críticos</p>
              <p>• Verificação horária para alertas normais</p>
              <p>• Notificações por Email e App são padrão</p>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
