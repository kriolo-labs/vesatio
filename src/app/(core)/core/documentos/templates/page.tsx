"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { DocumentTemplate } from "@/types/documents";
import { Copy, Edit, FileText, Plus } from "lucide-react";

// Mock Data
const mockTemplates: DocumentTemplate[] = [
  {
    id: "1",
    name: "Contrato de Prestação de Serviços (Padrão)",
    category: "contract",
    variables: ["cliente_nome", "projeto_escopo", "valor_total", "data_inicio"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Proposta Comercial - Interiores",
    category: "proposal",
    variables: ["cliente_nome", "lista_ambientes", "cronograma_estimado"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Ata de Reunião de Obra",
    category: "report",
    variables: ["projeto_nome", "data_reuniao", "participantes", "pontos_discutidos"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Email de Boas-vindas Cliente",
    category: "email",
    variables: ["cliente_primeiro_nome", "link_portal"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export default function TemplatesPage() {
  return (
    <CoreLayout>
      <PageHeader
        title="Modelos de Documentos"
        description="Gestão de templates padronizados para contratos e propostas."
      >
        <Button size="sm" className="btn-primary gap-2">
          <Plus size={16} /> Novo Modelo
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.map((template) => (
          <Card
            key={template.id}
            className="group flex flex-col justify-between border-white/5 bg-onyx-900 transition-all hover:border-gold/30"
          >
            <div className="space-y-4 p-6">
              <div className="flex items-start justify-between">
                <div className="bg-onyx-950 flex h-10 w-10 items-center justify-center rounded border border-white/5 text-diamond-muted transition-colors group-hover:text-gold">
                  <FileText size={20} />
                </div>
                <Badge
                  variant="outline"
                  className="border-white/10 text-[10px] uppercase text-diamond-muted"
                >
                  {template.category}
                </Badge>
              </div>

              <div>
                <h4 className="text-lg font-medium leading-tight text-white">{template.name}</h4>
              </div>

              <div className="bg-onyx-950 rounded border border-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase text-diamond-muted">
                  Variáveis Disponíveis
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.variables?.map((v) => (
                    <span
                      key={v}
                      className="rounded border border-white/5 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-diamond-muted"
                    >
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-white/5 bg-white/5 p-4">
              <Button size="sm" variant="ghost" className="h-8 flex-1 gap-2 text-xs">
                <Edit size={14} /> Editar
              </Button>
              <Button size="sm" variant="ghost" className="h-8 flex-1 gap-2 text-xs">
                <Copy size={14} /> Duplicar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </CoreLayout>
  );
}
