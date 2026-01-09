"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { WidgetConfig } from "@/types/bi";
import { motion } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  FolderOpen,
  Layout,
  Package,
  PieChart,
  Plus,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock Data (simulating data fetched based on widget config)
const revenueData = [
  { month: "Jul", revenue: 8500000, expenses: 5200000 },
  { month: "Ago", revenue: 9200000, expenses: 5800000 },
  { month: "Set", revenue: 7800000, expenses: 5100000 },
  { month: "Out", revenue: 11500000, expenses: 6200000 },
  { month: "Nov", revenue: 10200000, expenses: 5900000 },
  { month: "Dez", revenue: 12800000, expenses: 7100000 },
  { month: "Jan", revenue: 9500000, expenses: 5500000 },
];

const projectsByStatus = [
  { name: "Em Curso", value: 8, color: "#D4AF37" },
  { name: "Concluídos", value: 24, color: "#22C55E" },
  { name: "Pausados", value: 2, color: "#F59E0B" },
  { name: "Rascunho", value: 3, color: "#6B7280" },
];

const salesByCategory = [
  { category: "Acabamentos", value: 45000000 },
  { category: "Marcenaria", value: 28000000 },
  { category: "Smart Home", value: 15000000 },
  { category: "Consultoria", value: 8000000 },
];

// Default Layout Simulation
const defaultWidgets: WidgetConfig[] = [
  {
    id: "1",
    type: "kpi_card",
    title: "Receita Mensal",
    position: { x: 0, y: 0, w: 1, h: 1 },
    settings: { metric: "revenue", icon: "dollar" },
  },
  {
    id: "2",
    type: "kpi_card",
    title: "Projectos Activos",
    position: { x: 1, y: 0, w: 1, h: 1 },
    settings: { metric: "active_projects", icon: "folder" },
  },
  {
    id: "3",
    type: "kpi_card",
    title: "Clientes",
    position: { x: 2, y: 0, w: 1, h: 1 },
    settings: { metric: "clients", icon: "users" },
  },
  {
    id: "4",
    type: "kpi_card",
    title: "Stock",
    position: { x: 3, y: 0, w: 1, h: 1 },
    settings: { metric: "stock", icon: "package" },
  },
  {
    id: "5",
    type: "line_chart",
    title: "Receita vs Despesas",
    position: { x: 0, y: 1, w: 2, h: 2 },
  },
  {
    id: "6",
    type: "pie_chart",
    title: "Projectos por Estado",
    position: { x: 2, y: 1, w: 2, h: 2 },
  },
  {
    id: "7",
    type: "bar_chart",
    title: "Vendas por Categoria",
    position: { x: 0, y: 3, w: 4, h: 2 },
  },
];

// Helper to render icon
const getIcon = (name: string) => {
  switch (name) {
    case "dollar":
      return DollarSign;
    case "folder":
      return FolderOpen;
    case "users":
      return Users;
    case "package":
      return Package;
    default:
      return BarChart3;
  }
};

export default function BIPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-diamond">Business Intelligence</h1>
          <p className="text-diamond-muted">Análises e métricas de desempenho</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 ${isEditMode ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-diamond-muted"}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <Layout size={16} />
            {isEditMode ? "Salvar Layout" : "Editar Layout"}
          </Button>
          <select className="input-field w-40 py-2 text-sm">
            <option>Este Mês</option>
            <option>Últimos 3 Meses</option>
            <option>Este Ano</option>
          </select>
        </div>
      </div>

      {/* Dashboard Grid - Simplified for now using CSS Grid classes based on mock assumptions */}
      {/* In a real implementation with dynamic drag-and-drop, we'd use react-grid-layout */}

      {/* KPIs Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {widgets
          .filter((w) => w.type === "kpi_card")
          .map((widget, index) => {
            const Icon = getIcon(widget.settings?.icon);
            // Mock values for visual demo
            const value =
              widget.settings?.metric === "revenue"
                ? 12800000
                : widget.settings?.metric === "active_projects"
                  ? 8
                  : widget.settings?.metric === "clients"
                    ? 45
                    : 324;
            const change = widget.settings?.metric === "stock" ? -5.2 : 12.5;

            return (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-panel group relative p-5 ${isEditMode ? "cursor-move border-dashed border-gold/30" : ""}`}
              >
                {isEditMode && (
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
                    <Settings size={14} className="text-gold" />
                  </div>
                )}

                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-gold/10 p-2">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${change >= 0 ? "text-status-success" : "text-status-error"}`}
                  >
                    {change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {Math.abs(change)}%
                  </div>
                </div>
                <p className="mb-1 text-sm text-diamond-muted">{widget.title}</p>
                <p className="font-serif text-2xl text-diamond">
                  {typeof value === "number" && widget.settings?.metric === "revenue"
                    ? formatCurrency(value)
                    : value}
                </p>
              </motion.div>
            );
          })}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Line Chart */}
        {widgets
          .filter((w) => w.type === "line_chart")
          .map((widget) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-panel group relative p-6 ${isEditMode ? "border-dashed border-gold/30" : ""}`}
            >
              {isEditMode && (
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
                  <Settings size={14} className="text-gold" />
                </div>
              )}

              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-medium text-diamond">{widget.title}</h3>
                <BarChart3 className="h-5 w-5 text-diamond-muted" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `${v / 1000000}M`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0A0A0A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => formatCurrency(Number(value || 0))}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#D4AF37"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Receita"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#EF4444"
                      strokeDasharray="5 5"
                      name="Despesas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}

        {/* Pie Chart */}
        {widgets
          .filter((w) => w.type === "pie_chart")
          .map((widget) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-panel group relative p-6 ${isEditMode ? "border-dashed border-gold/30" : ""}`}
            >
              {isEditMode && (
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
                  <Settings size={14} className="text-gold" />
                </div>
              )}

              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-medium text-diamond">{widget.title}</h3>
                <PieChart className="h-5 w-5 text-diamond-muted" />
              </div>
              <div className="flex h-64 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={projectsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={false}
                    >
                      {projectsByStatus.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0A0A0A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Bar Chart - Full Width */}
      {widgets
        .filter((w) => w.type === "bar_chart")
        .map((widget) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel group relative p-6 ${isEditMode ? "border-dashed border-gold/30" : ""}`}
          >
            {isEditMode && (
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
                <Settings size={14} className="text-gold" />
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-medium text-diamond">{widget.title}</h3>
              <BarChart3 className="h-5 w-5 text-diamond-muted" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    type="number"
                    stroke="#666"
                    fontSize={12}
                    tickFormatter={(v) => `${v / 1000000}M`}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke="#666"
                    fontSize={12}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0A0A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => formatCurrency(Number(value || 0))}
                  />
                  <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}

      {isEditMode && (
        <div className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-white/5 p-8 text-diamond-muted transition-colors hover:bg-white/10 hover:text-white">
          <div className="flex flex-col items-center gap-2">
            <Plus size={32} />
            <span>Adicionar Widget</span>
          </div>
        </div>
      )}
    </div>
  );
}
