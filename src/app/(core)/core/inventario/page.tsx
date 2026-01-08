import Link from "next/link";
import { Package, TrendingUp, AlertTriangle, QrCode } from "lucide-react";

export default function InventoryPage() {
    const modules = [
        {
            title: "Produtos",
            description: "Catálogo completo de materiais",
            href: "/core/inventario/produtos",
            icon: Package,
            count: 156,
        },
        {
            title: "Movimentos",
            description: "Entradas, saídas e transferências",
            href: "/core/inventario/movimentos",
            icon: TrendingUp,
            count: null,
        },
        {
            title: "Alertas",
            description: "Stock baixo e reposições",
            href: "/core/inventario/alertas",
            icon: AlertTriangle,
            count: 3,
            warning: true,
        },
        {
            title: "QR Codes",
            description: "Geração e leitura de códigos",
            href: "/core/inventario/qrcodes",
            icon: QrCode,
            count: null,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-diamond">Inventário</h1>
                <p className="text-diamond-muted">Gestão de stock e materiais</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map((module) => (
                    <Link
                        key={module.title}
                        href={module.href}
                        className="glass-panel p-6 hover:shadow-gold-glow/10 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg transition-colors ${module.warning ? "bg-status-warning/10 group-hover:bg-status-warning/20" : "bg-gold/10 group-hover:bg-gold/20"
                                }`}>
                                <module.icon className={`w-6 h-6 ${module.warning ? "text-status-warning" : "text-gold"}`} />
                            </div>
                            {module.count !== null && (
                                <span className={`text-2xl font-serif ${module.warning ? "text-status-warning" : "text-diamond"}`}>
                                    {module.count}
                                </span>
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
