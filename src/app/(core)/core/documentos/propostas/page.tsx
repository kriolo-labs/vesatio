"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Proposal } from "@/types/documents";
import {
  Calendar,
  Eye,
  FileText,
  Grid,
  List as ListIcon,
  MoreVertical,
  Plus,
  Search,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock Data
const mockProposals: Proposal[] = [
  {
    id: "1",
    code: "PROP-2024-001",
    title: "Reforma Completa Cozinha",
    client_name: "Teresa Mendes",
    status: "sent",
    value: 850000,
    valid_until: "2024-02-01",
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
  {
    id: "2",
    code: "PROP-2024-002",
    title: "Design de Interiores - Sala de Estar",
    client_name: "João Santos",
    status: "draft",
    value: 120000,
    valid_until: "2024-02-15",
    created_at: "2024-01-08T09:00:00Z",
    updated_at: "2024-01-08T09:00:00Z",
  },
  {
    id: "3",
    code: "PROP-2023-150",
    title: "Marcenaria Personalizada",
    client_name: "Empresa XPTO",
    status: "accepted",
    value: 2500000,
    valid_until: "2023-12-31",
    created_at: "2023-12-10T14:30:00Z",
    updated_at: "2023-12-10T14:30:00Z",
  },
];

export default function ProposalsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProposals = mockProposals.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CoreLayout>
      <PageHeader
        title="Gestão de Propostas"
        description="Crie, envie e acompanhe propostas comerciais."
      >
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-white/5 bg-onyx-900 p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 ${viewMode === "grid" ? "bg-white/10 text-white" : "text-diamond-muted"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 ${viewMode === "list" ? "bg-white/10 text-white" : "text-diamond-muted"}`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon size={16} />
            </Button>
          </div>
          <Button size="sm" className="btn-primary gap-2">
            <Plus size={16} /> Nova Proposta
          </Button>
        </div>
      </PageHeader>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
            size={16}
          />
          <Input
            placeholder="Pesquisar por cliente, título ou código..."
            className="border-white/5 bg-onyx-900 pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProposals.map((proposal) => (
            <Card
              key={proposal.id}
              className="group border-white/5 bg-onyx-900 transition-all duration-300 hover:border-gold/30"
            >
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between">
                  <div className="bg-onyx-950 flex h-10 w-10 items-center justify-center rounded-full border border-white/5 text-gold">
                    <FileText size={20} />
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase border-${proposal.status === "accepted" ? "green" : proposal.status === "sent" ? "blue" : "gray"}-500/30 text-${proposal.status === "accepted" ? "green" : proposal.status === "sent" ? "blue" : "gray"}-500`}
                    >
                      {proposal.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-diamond-muted">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="line-clamp-1 font-medium text-white" title={proposal.title}>
                    {proposal.title}
                  </h4>
                  <p className="mt-1 text-xs text-diamond-muted">{proposal.client_name}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="font-mono text-xs font-bold text-white">
                    {new Intl.NumberFormat("pt-PT", { style: "currency", currency: "CVE" }).format(
                      proposal.value || 0
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-diamond-muted">
                    <Calendar size={12} />
                    {new Date(proposal.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 bg-white/5 px-5 py-3">
                <Button size="sm" variant="ghost" className="h-8 w-full gap-2 text-xs">
                  <Eye size={14} /> Preview
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-full gap-2 text-xs text-blue-400 hover:text-blue-300"
                >
                  <Send size={14} /> Enviar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-onyx-900 p-4 transition-colors hover:bg-onyx-800"
            >
              <div className="flex items-center gap-4">
                <div className="bg-onyx-950 flex h-10 w-10 items-center justify-center rounded text-diamond-muted">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{proposal.title}</p>
                  <p className="text-xs text-diamond-muted">
                    {proposal.code} • {proposal.client_name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="mb-1 text-xs text-diamond-muted">Valor</p>
                  <p className="text-sm font-bold text-white">
                    {new Intl.NumberFormat("pt-PT", { style: "currency", currency: "CVE" }).format(
                      proposal.value || 0
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-xs text-diamond-muted">Status</p>
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase border-${proposal.status === "accepted" ? "green" : proposal.status === "sent" ? "blue" : "gray"}-500/30 text-${proposal.status === "accepted" ? "green" : proposal.status === "sent" ? "blue" : "gray"}-500`}
                  >
                    {proposal.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="text-diamond-muted">
                  <Eye size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CoreLayout>
  );
}
