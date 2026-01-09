"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Role } from "@/types/admin";
import { Copy, Edit, Lock, Plus, Shield, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrador",
    description: "Acesso total a todos os módulos e configurações do sistema.",
    is_system: true,
    permissions_count: 148,
    users_count: 2,
    created_at: "2023-01-01",
  },
  {
    id: "2",
    name: "Gerente",
    description: "Gestão de projetos, produção e equipas. Acesso limitado a configurações.",
    is_system: true,
    permissions_count: 85,
    users_count: 5,
    created_at: "2023-01-01",
  },
  {
    id: "3",
    name: "Staff",
    description: "Acesso operacional básico a tarefas e registos de tempo.",
    is_system: true,
    permissions_count: 25,
    users_count: 18,
    created_at: "2023-01-01",
  },
  {
    id: "4",
    name: "Auditor Externo",
    description: "Acesso apenas de leitura a relatórios financeiros e de produção.",
    is_system: false,
    permissions_count: 12,
    users_count: 1,
    created_at: "2024-01-05",
  },
];

export default function RolesPage() {
  const router = useRouter();

  return (
    <CoreLayout>
      <PageHeader
        title="Perfis de Acesso (Roles)"
        description="Defina quem pode fazer o quê no sistema."
      >
        <div className="flex gap-2">
          <Button className="btn-primary gap-2">
            <Plus size={16} /> Novo Role
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockRoles.map((role) => (
          <Card
            key={role.id}
            className="group flex flex-col justify-between border-white/5 bg-onyx-900 p-6 transition-colors hover:border-white/10"
          >
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-white/5 p-3 text-white transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                  <Shield size={24} />
                </div>
                {role.is_system && (
                  <Badge
                    variant="secondary"
                    className="bg-white/5 text-diamond-muted hover:bg-white/10"
                  >
                    Sistema
                  </Badge>
                )}
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">{role.name}</h3>
              <p className="mb-6 min-h-[40px] text-sm text-diamond-muted">{role.description}</p>

              <div className="mb-6 flex items-center gap-4 text-xs text-diamond-muted">
                <div className="flex items-center gap-1">
                  <Lock size={14} /> {role.permissions_count} Permissões
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} /> {role.users_count} Membros
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 pl-0 text-white hover:text-gold"
                onClick={() => router.push(`/core/admin/roles/${role.id}`)}
              >
                <Edit size={14} /> Configurar
              </Button>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-diamond-muted hover:text-white"
                  title="Duplicar"
                >
                  <Copy size={14} />
                </Button>
                {!role.is_system && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-diamond-muted hover:text-red-500"
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {/* Card to Add New */}
        <button className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/5 p-6 text-diamond-muted transition-all hover:border-white/20 hover:bg-white/5 hover:text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
            <Plus size={24} />
          </div>
          <span className="font-medium">Criar Perfil Personalizado</span>
        </button>
      </div>
    </CoreLayout>
  );
}
