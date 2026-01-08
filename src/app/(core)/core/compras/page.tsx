import Link from "next/link";
import { Truck, Package, FileText, Building2, BarChart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ComprasPage() {
    const modules = [
        {
            title: "Ordens de Compra",
            description: "Pedidos a fornecedores",
            href: "/core/compras/ordens",
            icon: FileText,
            count: 5,
            highlight: true,
        },
        {
            title: "Fornecedores",
            description: "Base de fornecedores",
            href: "/core/compras/fornecedores",
            icon: Building2,
            count: 32,
        },
        {
            title: "Importações",
            description: "Tracking de importações",
            href: "/core/compras/importacoes",
            icon: Truck,
            count: 3,
        },
        {
            title: "Cotações",
            description: "Pedidos de cotação",
            href: "/core/compras/cotacoes",
            icon: BarChart,
            count: 8,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-diamond">Compras</h1>
                <p className="text-diamond-muted">Gestão de procurement e fornecedores</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Ordens Pendentes</p>
                    <p className="text-2xl font-serif text-status-warning">5</p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Em Trânsito</p>
                    <p className="text-2xl font-serif text-gold">3</p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Valor Pendente</p>
                    <p className="text-2xl font-serif text-diamond">{formatCurrency(2500000)}</p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Compras (Mês)</p>
                    <p className="text-2xl font-serif text-status-success">{formatCurrency(8500000)}</p>
                </div>
            </div>

            {/* Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map((module) => (
                    <Link
                        key={module.title}
                        href={module.href}
                        className={`glass-panel p-6 hover:shadow-gold-glow/10 transition-all group ${module.highlight ? "border-gold/20" : ""
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg transition-colors ${module.highlight ? "bg-gold/20" : "bg-gold/10 group-hover:bg-gold/20"
                                }`}>
                                <module.icon className="w-6 h-6 text-gold" />
                            </div>
                            {module.count !== null && (
                                <span className="text-2xl font-serif text-diamond">{module.count}</span>
                            )}
                        </div>
                        <h3 className="font-medium text-diamond mb-1">{module.title}</h3>
                        <p className="text-sm text-diamond-muted">{module.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
