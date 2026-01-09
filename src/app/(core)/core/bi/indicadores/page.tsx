"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/utils";
import { KPI, MetricCategory } from "@/types/bi";
import { ArrowRight, BarChart3, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

// Mock Data
const mockKPIs: KPI[] = [
  {
    id: "1",
    code: "FIN-001",
    name: "Receita Recorrente Mensal (MRR)",
    category: "financial",
    unit: "CVE",
    current_value: 4500000,
    previous_value: 4200000,
    target_value: 5000000,
    status: "good",
    direction: "higher_is_better",
    last_updated: "2024-01-09T08:00:00Z",
    update_frequency: "monthly",
  },
  {
    id: "2",
    code: "OPS-005",
    name: "Taxa de Ocupação da Fábrica",
    category: "operational",
    unit: "%",
    current_value: 85,
    previous_value: 92,
    target_value: 90,
    status: "warning",
    direction: "higher_is_better",
    last_updated: "2024-01-09T10:00:00Z",
    update_frequency: "daily",
  },
  {
    id: "3",
    code: "COM-012",
    name: "Taxa de Conversão de Propostas",
    category: "commercial",
    unit: "%",
    current_value: 32,
    previous_value: 28,
    target_value: 30,
    status: "good",
    direction: "higher_is_better",
    last_updated: "2024-01-08T18:00:00Z",
    update_frequency: "weekly",
  },
  {
    id: "4",
    code: "QLY-003",
    name: "Índice de Retrabalho",
    category: "quality",
    unit: "%",
    current_value: 5.2,
    previous_value: 2.1,
    target_value: 2.0,
    status: "critical",
    direction: "lower_is_better",
    last_updated: "2024-01-09T09:30:00Z",
    update_frequency: "daily",
  },
];

export default function KPIsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MetricCategory | "all">("all");

  const categories: MetricCategory[] = ["financial", "operational", "commercial", "hr", "quality"];

  const filteredKPIs = mockKPIs.filter((kpi) => {
    const matchesSearch =
      kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || kpi.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "warning":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "CVE") return formatCurrency(value);
    if (unit === "%") return `${value}%`;
    return `${value} ${unit}`;
  };

  const calculateChange = (current: number, previous?: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Catálogo de Indicadores"
        description="Monitorização centralizada de KPIs (Key Performance Indicators)."
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-white/10 text-diamond-muted hover:text-white"
          >
            <BarChart3 size={16} /> Dashboard
          </Button>
          <Button size="sm" className="btn-primary gap-2">
            <Plus size={16} /> Novo KPI
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 rounded-full border px-4 ${selectedCategory === "all" ? "text-onyx-950 border-gold bg-gold font-bold" : "border-white/10 bg-transparent text-diamond-muted hover:text-white"}`}
            onClick={() => setSelectedCategory("all")}
          >
            Todos
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              className={`h-8 rounded-full border px-4 capitalize ${selectedCategory === cat ? "text-onyx-950 border-gold bg-gold font-bold" : "border-white/10 bg-transparent text-diamond-muted hover:text-white"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-diamond-muted"
            size={14}
          />
          <Input
            placeholder="Pesquisar KPI..."
            className="h-9 border-white/5 bg-onyx-900 pl-9 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredKPIs.map((kpi) => {
          const change = calculateChange(kpi.current_value, kpi.previous_value);
          const isPositive = change >= 0;

          // Should be green if higher is better and change is positive, OR lower is better and change is negative
          const isGoodTrend =
            (kpi.direction === "higher_is_better" && isPositive) ||
            (kpi.direction === "lower_is_better" && !isPositive);

          return (
            <Card
              key={kpi.id}
              className="group border-white/5 bg-onyx-900 p-5 transition-all duration-300 hover:border-gold/30"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`rounded border px-2 py-1 text-[10px] font-bold uppercase ${getStatusColor(kpi.status)}`}
                >
                  {kpi.status === "good"
                    ? "Meta Atingida"
                    : kpi.status === "warning"
                      ? "Atenção"
                      : "Crítico"}
                </div>
                <Badge
                  variant="outline"
                  className="border-white/10 text-[10px] uppercase text-diamond-muted"
                >
                  {kpi.category}
                </Badge>
              </div>

              <div className="mb-6">
                <h3
                  className="mb-1 line-clamp-2 min-h-[40px] font-medium text-white"
                  title={kpi.name}
                >
                  {kpi.name}
                </h3>
                <p className="font-mono text-xs text-diamond-muted">{kpi.code}</p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="font-serif text-2xl font-medium text-white">
                    {formatValue(kpi.current_value, kpi.unit)}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`flex items-center gap-0.5 text-xs ${isGoodTrend ? "text-green-500" : "text-red-500"}`}
                    >
                      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(change).toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-diamond-muted">vs mês anterior</span>
                  </div>
                </div>
              </div>

              {kpi.target_value && (
                <div className="mt-4 border-t border-white/5 pt-4">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-diamond-muted">Progresso da Meta</span>
                    <span className="font-medium text-white">
                      {formatValue(kpi.target_value, kpi.unit)}
                    </span>
                  </div>
                  <div className="bg-onyx-950 h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className={`h-full rounded-full ${kpi.status === "good" ? "bg-green-500" : kpi.status === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{
                        width: `${Math.min((kpi.current_value / kpi.target_value) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 opacity-50 transition-opacity group-hover:opacity-100">
                <span className="text-[10px] text-diamond-muted">
                  Atualizado: {new Date(kpi.last_updated).toLocaleDateString()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-diamond-muted hover:text-white"
                >
                  <ArrowRight size={14} />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </CoreLayout>
  );
}
