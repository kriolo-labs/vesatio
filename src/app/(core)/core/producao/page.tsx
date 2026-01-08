import Link from "next/link";
import { Factory, Package, ClipboardCheck, Truck, Timer } from "lucide-react";

export default function ProducaoPage() {
    const modules = [
        {
            title: "Ordens de Produção",
            description: "Pedidos de fabrico",
            href: "/core/producao/ordens",
            icon: Factory,
            count: 8,
            highlight: true,
        },
        {
            title: "Rastreamento",
            description: "Tracking de lotes",
            href: "/core/producao/rastreamento",
            icon: Package,
            count: 12,
        },
        {
            title: "Controlo de Qualidade",
            description: "Inspeções e registos",
            href: "/core/producao/qualidade",
            icon: ClipboardCheck,
            count: 3,
            warning: true,
        },
        {
            title: "Expedição",
            description: "Entregas e logística",
            href: "/core/producao/expedicao",
            icon: Truck,
            count: 5,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-diamond">Produção</h1>
                <p className="text-diamond-muted">Gestão de fábrica e manufactura</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Timer className="w-5 h-5 text-gold" />
                        <p className="text-sm text-diamond-muted">Em Produção</p>
                    </div>
                    <p className="text-2xl font-serif text-gold">8</p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Concluído (Mês)</p>
                    <p className="text-2xl font-serif text-status-success">24</p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Aguardando QC</p>
                    <p className="text-2xl font-serif text-status-warning">3</p>
                </div>
                <div className="glass-panel p-4">
                    <p className="text-sm text-diamond-muted mb-1">Pronto p/ Entrega</p>
                    <p className="text-2xl font-serif text-diamond">5</p>
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
                            <div className={`p-3 rounded-lg transition-colors ${module.warning
                                    ? "bg-status-warning/10 group-hover:bg-status-warning/20"
                                    : module.highlight
                                        ? "bg-gold/20"
                                        : "bg-gold/10 group-hover:bg-gold/20"
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
