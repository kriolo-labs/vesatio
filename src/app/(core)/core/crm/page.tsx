import Link from "next/link";
import { Users, Kanban, UserCheck } from "lucide-react";

export default function CRMPage() {
    const modules = [
        {
            title: "Leads",
            description: "Gestão de leads e oportunidades",
            href: "/core/crm/leads",
            icon: Users,
            count: 47,
        },
        {
            title: "Pipeline",
            description: "Visualização Kanban do funil de vendas",
            href: "/core/crm/pipeline",
            icon: Kanban,
            count: null,
        },
        {
            title: "Clientes",
            description: "Base de dados de clientes",
            href: "/core/crm/clientes",
            icon: UserCheck,
            count: 89,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-2xl text-diamond">CRM</h1>
                <p className="text-diamond-muted">Gestão de relacionamento com clientes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <Link
                        key={module.title}
                        href={module.href}
                        className="glass-panel p-6 hover:shadow-gold-glow/10 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                                <module.icon className="w-6 h-6 text-gold" />
                            </div>
                            {module.count && (
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
