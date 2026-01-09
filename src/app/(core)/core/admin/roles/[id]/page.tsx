"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock Permissions Data
const modules = [
  {
    name: "Projetos",
    permissions: [
      { code: "projects.view", name: "Ver Projetos" },
      { code: "projects.create", name: "Criar Projetos" },
      { code: "projects.edit", name: "Editar Projetos" },
      { code: "projects.delete", name: "Eliminar Projetos" },
      { code: "projects.approve", name: "Aprovar Fases" },
    ],
  },
  {
    name: "Produção",
    permissions: [
      { code: "production.view", name: "Ver Ordens" },
      { code: "production.create", name: "Criar Ordens" },
      { code: "production.quality", name: "Gerir Qualidade" },
      { code: "production.machines", name: "Gerir Máquinas" },
    ],
  },
  {
    name: "Financeiro",
    permissions: [
      { code: "finance.view", name: "Ver Dashboard" },
      { code: "finance.invoices", name: "Gerir Faturas" },
      { code: "finance.expenses", name: "Gerir Despesas" },
      { code: "finance.approve", name: "Aprovar Pagamentos" },
    ],
  },
  {
    name: "Administração",
    permissions: [
      { code: "admin.users", name: "Gerir Utilizadores" },
      { code: "admin.settings", name: "Configurações Globais" },
      { code: "admin.audit", name: "Ver Logs de Auditoria" },
    ],
  },
];

export default function RoleConfigPage() {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id as string;

  // Mock State for checked permissions
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "projects.view",
    "production.view",
  ]);
  const [roleName, setRoleName] = useState(roleId === "1" ? "Administrador" : "Custom Role");

  const togglePermission = (code: string) => {
    if (selectedPermissions.includes(code)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== code));
    } else {
      setSelectedPermissions([...selectedPermissions, code]);
    }
  };

  const toggleAllInModule = (modulePermissions: any[], shouldSelect: boolean) => {
    const codes = modulePermissions.map((p) => p.code);
    if (shouldSelect) {
      const newSet = new Set([...selectedPermissions, ...codes]);
      setSelectedPermissions(Array.from(newSet));
    } else {
      setSelectedPermissions(selectedPermissions.filter((p) => !codes.includes(p)));
    }
  };

  return (
    <CoreLayout>
      <PageHeader
        title={`Configurar Permissões: ${roleName}`}
        description="Defina granularmente o que este perfil pode fazer."
      >
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 text-diamond-muted hover:text-white"
          >
            <ArrowLeft size={16} /> Voltar
          </Button>
          <Button className="btn-primary gap-2">
            <Save size={16} /> Salvar Alterações
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Card className="space-y-4 border-white/5 bg-onyx-900 p-6">
            <h3 className="font-semibold text-white">Detalhes do Perfil</h3>
            <div className="space-y-2">
              <Label>Nome do Role</Label>
              <Input value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input placeholder="Descrição breve..." className="text-sm" />
            </div>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-3">
          {modules.map((module) => {
            const allSelected = module.permissions.every((p) =>
              selectedPermissions.includes(p.code)
            );
            const someSelected = module.permissions.some((p) =>
              selectedPermissions.includes(p.code)
            );

            return (
              <Card key={module.name} className="overflow-hidden border-white/5 bg-onyx-900">
                <div className="flex items-center justify-between bg-white/5 p-4">
                  <h3 className="font-semibold text-white">{module.name}</h3>
                  <div className="flex gap-2 text-xs">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAllInModule(module.permissions, true)}
                      className="h-auto py-1 text-gold"
                    >
                      Selecionar Tudo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAllInModule(module.permissions, false)}
                      className="h-auto py-1 text-diamond-muted"
                    >
                      Limpar
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                  {module.permissions.map((perm) => (
                    <div
                      key={perm.code}
                      className="flex cursor-pointer items-center space-x-3 rounded border border-transparent p-3 transition-colors hover:border-white/5 hover:bg-white/5"
                      onClick={() => togglePermission(perm.code)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.code)}
                        onChange={() => {}} // Handled by div click
                        className="pointer-events-none h-4 w-4 rounded border-gray-300 accent-gold"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{perm.name}</p>
                        <p className="mt-0.5 font-mono text-xs text-diamond-muted">{perm.code}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </CoreLayout>
  );
}
