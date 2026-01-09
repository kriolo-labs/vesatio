"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contract } from "@/types/documents";
import {
  ArrowLeft,
  Calendar,
  Download,
  Edit,
  ExternalLink,
  FileText,
  History,
  Shield,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Mock Data (in a real app, fetch by ID)
const mockContract: Contract = {
  id: "1",
  code: "CTR-2024-001",
  title: "Prestação de Serviços - Residência Silva",
  type: "client",
  entity_id: "cl-001",
  entity_name: "Carlos Silva",
  status: "active",
  value: 1500000,
  currency: "CVE",
  start_date: "2024-01-01",
  end_date: "2024-06-01",
  signed_date: "2023-12-28",
  description:
    "Contrato referente à execução de mobiliário planeado (cozinha, roupeiros, sala) conforme orçamento ORC-2023-550. Inclui transporte e montagem.",
  created_at: "2024-01-01T10:00:00Z",
  updated_at: "2024-01-01T10:00:00Z",
  versions: [
    {
      id: "v1",
      contract_id: "1",
      version_number: 1,
      file_url: "/docs/ctr-2024-001-v1.pdf",
      created_at: "2023-12-28T10:00:00Z",
      notes: "Versão inicial assinada.",
    },
  ],
};

export default function ContractDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // In real implementation: const { data: contract } = useContract(id);
  const contract = mockContract;

  if (!contract) return <div>Carregando...</div>;

  return (
    <CoreLayout>
      <PageHeader title={contract.title} description={contract.code}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-diamond-muted hover:text-white"
            onClick={() => router.push("/core/documentos/contratos")}
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 border-white/10 text-diamond-muted hover:text-white"
          >
            <Edit size={16} /> Editar
          </Button>
          <Button size="sm" className="btn-primary gap-2">
            <Download size={16} /> Download PDF
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-white">Informações do Contrato</h3>
                <p className="text-xs text-diamond-muted">Dados gerais e vigência</p>
              </div>
              <StatusBadge status={contract.status} />
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              <div>
                <p className="mb-1 text-xs uppercase text-diamond-muted">Entidade</p>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-onyx-800 text-xs font-bold text-white">
                    {contract.entity_name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-white">{contract.entity_name}</span>
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-diamond-muted">Tipo</p>
                <Badge
                  variant="outline"
                  className="border-white/10 text-[10px] uppercase text-diamond-muted"
                >
                  {contract.type}
                </Badge>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-diamond-muted">Valor Total</p>
                <span className="font-mono text-sm font-bold text-white">
                  {new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: contract.currency,
                  }).format(contract.value || 0)}
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs uppercase text-diamond-muted">Data Início</p>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Calendar size={14} className="text-diamond-muted" />
                  {new Date(contract.start_date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-diamond-muted">Data Fim</p>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Calendar size={14} className="text-diamond-muted" />
                  {contract.end_date
                    ? new Date(contract.end_date).toLocaleDateString()
                    : "Indeterminado"}
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-diamond-muted">Assinado em</p>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Shield size={14} className="text-green-500" />
                  {contract.signed_date ? new Date(contract.signed_date).toLocaleDateString() : "-"}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <p className="mb-2 text-xs uppercase text-diamond-muted">Descrição / Objeto</p>
              <p className="text-sm leading-relaxed text-white">{contract.description}</p>
            </div>
          </Card>

          <Tabs defaultValue="versions" className="w-full">
            <TabsList className="border border-white/5 bg-onyx-900 p-1">
              <TabsTrigger value="versions" className="gap-2">
                <History size={14} /> Histórico de Versões
              </TabsTrigger>
              <TabsTrigger value="related" className="gap-2">
                <FileText size={14} /> Documentos Relacionados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="versions" className="mt-4">
              <Card className="border-white/5 bg-onyx-900">
                <div className="space-y-4 p-4">
                  {contract.versions?.map((version) => (
                    <div
                      key={version.id}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-onyx-950 flex h-8 w-8 items-center justify-center rounded text-diamond-muted">
                          <FileText size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            Versão {version.version_number}.0
                          </p>
                          <p className="text-xs text-diamond-muted">
                            {new Date(version.created_at).toLocaleDateString()} • {version.notes}
                          </p>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download size={14} className="text-diamond-muted" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="mt-4">
              <div className="flex flex-col items-center justify-center py-8 text-diamond-muted">
                <p className="text-sm">Nenhum documento relacionado encontrado.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          <Card className="border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="group w-full justify-start border-white/10 text-diamond-muted hover:text-white"
              >
                <ExternalLink size={14} className="mr-2 group-hover:text-gold" /> Ver Entidade
              </Button>
              <Button
                variant="outline"
                className="group w-full justify-start border-white/10 text-diamond-muted hover:text-white"
              >
                <History size={14} className="mr-2 group-hover:text-gold" /> Ver Logs de Alteração
              </Button>
            </div>

            <div className="mt-6 border-t border-white/5 pt-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Estado
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-diamond-muted">Dias restantes</span>
                  <span className="font-mono text-white">145 dias</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-diamond-muted">Renovação</span>
                  <span className="text-yellow-500">Manual</span>
                </div>
              </div>
              <Button className="mt-4 w-full border-0 bg-red-500/10 text-red-500 hover:bg-red-500/20">
                Encerrar Contrato
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
