"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Package,
    FolderOpen,
    ArrowUpRight,
    BarChart3,
    PieChart,
} from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RechartsPie,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Mock data
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

const kpis = [
    {
        title: "Receita Mensal",
        value: 12800000,
        change: 25.5,
        trend: "up",
        icon: DollarSign,
    },
    {
        title: "Projectos Activos",
        value: 8,
        change: 2,
        trend: "up",
        icon: FolderOpen,
    },
    {
        title: "Clientes",
        value: 45,
        change: 12.3,
        trend: "up",
        icon: Users,
    },
    {
        title: "Produtos em Stock",
        value: 324,
        change: -5.2,
        trend: "down",
        icon: Package,
    },
];

export default function BIPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-2xl text-diamond">Business Intelligence</h1>
                    <p className="text-diamond-muted">Análises e métricas de desempenho</p>
                </div>
                <div className="flex gap-2">
                    <select className="input-field text-sm py-2">
                        <option>Últimos 6 meses</option>
                        <option>Último ano</option>
                        <option>Este ano</option>
                    </select>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, index) => (
                    <motion.div
                        key={kpi.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-panel p-5"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-gold/10 rounded-lg">
                                <kpi.icon className="w-5 h-5 text-gold" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${kpi.trend === "up" ? "text-status-success" : "text-status-error"
                                }`}>
                                {kpi.trend === "up" ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {Math.abs(kpi.change)}%
                            </div>
                        </div>
                        <p className="text-sm text-diamond-muted mb-1">{kpi.title}</p>
                        <p className="text-2xl font-serif text-diamond">
                            {typeof kpi.value === "number" && kpi.title.includes("Receita")
                                ? formatCurrency(kpi.value)
                                : kpi.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-medium text-diamond">Receita vs Despesas</h3>
                        <BarChart3 className="w-5 h-5 text-diamond-muted" />
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

                {/* Projects by Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-medium text-diamond">Projectos por Estado</h3>
                        <PieChart className="w-5 h-5 text-diamond-muted" />
                    </div>
                    <div className="h-64 flex items-center justify-center">
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
            </div>

            {/* Sales by Category */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-diamond">Vendas por Categoria</h3>
                    <BarChart3 className="w-5 h-5 text-diamond-muted" />
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesByCategory} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" stroke="#666" fontSize={12} tickFormatter={(v) => `${v / 1000000}M`} />
                            <YAxis type="category" dataKey="category" stroke="#666" fontSize={12} width={100} />
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
        </div>
    );
}
