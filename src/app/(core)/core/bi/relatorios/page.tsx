"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { ReportConfig } from "@/types/bi";
import {
  BarChart3,
  Calendar,
  FileSpreadsheet,
  FileText,
  Filter,
  MoreVertical,
  PieChart,
  Plus,
  Search,
  Table,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock Data
const mockReports: ReportConfig[] = [
  {
    id: "1",
    name: "Vendas por Região - 2023",
    description: "Análise detalhada de vendas agrupada por região geográfica.",
    category: "Comercial",
    type: "mixed",
    config: { source_table: "sales", fields: ["region", "amount"] },
    is_public: true,
    owner_id: "user1",
    created_at: "2024-01-05T10:00:00Z",
  },
  {
    id: "2",
    name: "Desempenho de Produção Mensal",
    description: "Relatório operacional de eficiência da fábrica.",
    category: "Operacional",
    type: "chart",
    config: { source_table: "production", fields: ["efficiency", "month"] },
    is_public: true,
    owner_id: "user1",
    created_at: "2024-01-08T15:30:00Z",
  },
  {
    id: "3",
    name: "Lista de Colaboradores Ativos",
    description: "Exportação para folha de pagamento.",
    category: "RH",
    type: "table",
    config: { source_table: "employees", fields: ["name", "role", "salary"] },
    is_public: false,
    owner_id: "user1",
    created_at: "2023-12-20T09:00:00Z",
  },
];

export default function ReportsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = mockReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "table":
        return Table;
      case "chart":
        return BarChart3;
      case "mixed":
        return PieChart;
      default:
        return FileText;
    }
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Relatórios Personalizados"
        description="Crie, visualize e exporte relatórios baseados nos dados do sistema."
      >
        <Button
          size="sm"
          className="btn-primary gap-2"
          onClick={() => router.push("/core/bi/relatorios/novo")}
        >
          <Plus size={16} /> Novo Relatório
        </Button>
      </PageHeader>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
            size={14}
          />
          <Input
            placeholder="Pesquisar relatórios..."
            className="h-9 border-white/5 bg-onyx-900 pl-9 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-white/10 text-diamond-muted hover:text-white"
        >
          <Filter size={14} /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => {
          const Icon = getIcon(report.type);
          return (
            <Card
              key={report.id}
              className="group cursor-pointer border-white/5 bg-onyx-900 p-5 transition-all hover:border-gold/30"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-onyx-950 flex h-10 w-10 items-center justify-center rounded border border-white/5 text-gold">
                  <Icon size={20} />
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="border-white/10 text-[10px] uppercase text-diamond-muted"
                  >
                    {report.category}
                  </Badge>
                  <Button variant="ghost" size="icon" className="-mr-2 h-6 w-6 text-diamond-muted">
                    <MoreVertical size={14} />
                  </Button>
                </div>
              </div>

              <h3 className="mb-2 font-medium text-white transition-colors group-hover:text-gold">
                {report.name}
              </h3>
              <p className="mb-4 line-clamp-2 h-8 text-xs text-diamond-muted">
                {report.description}
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-diamond-muted">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(report.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs hover:bg-white/5 hover:text-white"
                  >
                    <FileSpreadsheet size={12} className="mr-1" /> Exportar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs hover:bg-white/5 hover:text-white"
                  >
                    Executar
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Create New Card Placeholder */}
        <button
          onClick={() => router.push("/core/bi/relatorios/novo")}
          className="group flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-white/5 p-5 text-diamond-muted transition-all hover:border-gold/30 hover:bg-gold/5 hover:text-gold"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-gold/10">
            <Plus size={24} />
          </div>
          <span className="text-sm font-medium">Criar Novo Relatório</span>
        </button>
      </div>
    </CoreLayout>
  );
}
