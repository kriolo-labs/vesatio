"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
    Building2,
    ChevronDown,
    ChevronRight,
    Edit3,
    LayoutGrid,
    MoreHorizontal,
    Plus,
    Search,
    Settings2,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface AccountNode {
    id: string;
    code: string;
    name: string;
    type: 'income' | 'expense' | 'asset' | 'liability';
    children?: AccountNode[];
    expanded?: boolean;
}

const mockChartOfAccounts: AccountNode[] = [
    {
        id: "1", code: "1", name: "RECEITAS", type: "income",
        children: [
            { id: "1.1", code: "1.1", name: "Receitas de Obras", type: "income" },
            { id: "1.2", code: "1.2", name: "Receitas Médicas/Consultoria", type: "income" },
            { id: "1.3", code: "1.3", name: "Venda de Mercadorias", type: "income" },
        ]
    },
    {
        id: "2", code: "2", name: "CUSTOS E DESPESAS", type: "expense",
        children: [
            {
                id: "2.1", code: "2.1", name: "Custos Diretos (CPV)", type: "expense",
                children: [
                    { id: "2.1.1", code: "2.1.1", name: "Mão de Obra Direta", type: "expense" },
                    { id: "2.1.2", code: "2.1.2", name: "Materiais de Construção", type: "expense" },
                ]
            },
            {
                id: "2.2", code: "2.2", name: "Despesas Administrativas", type: "expense",
                children: [
                    { id: "2.2.1", code: "2.2.1", name: "Salários Adm", type: "expense" },
                    { id: "2.2.2", code: "2.2.2", name: "Aluguéis e Condomínios", type: "expense" },
                ]
            }
        ]
    }
];

const mockCostCenters = [
    { id: "cc1", name: "Torre Atlântico", type: "Projeto", status: "Ativo", manager: "Carlos M." },
    { id: "cc2", name: "Villa Sal Rei", type: "Projeto", status: "Ativo", manager: "Carlos M." },
    { id: "cc3", name: "Sede Praia", type: "Administrativo", status: "Ativo", manager: "Marina S." },
    { id: "cc4", name: "Logística Central", type: "Departamento", status: "Ativo", manager: "João P." },
];

export default function EstruturaFinanceiraPage() {
    const [expanded, setExpanded] = useState<string[]>(["1", "2", "2.1", "2.2"]);

    const toggleExpand = (id: string) => {
        setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const renderNode = (node: AccountNode, level: number = 0) => {
        const isExpanded = expanded.includes(node.id);
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div key={node.id} className="select-none">
                <div 
                    className={`
                        flex items-center group py-2 px-4 hover:bg-white/[0.03] rounded-lg transition-colors cursor-pointer
                        ${node.id.length === 1 ? 'mt-4 border-b border-white/5' : ''}
                    `}
                    onClick={() => hasChildren && toggleExpand(node.id)}
                >
                    <div style={{ marginLeft: `${level * 24}px` }} className="flex items-center gap-3 flex-1">
                        {hasChildren ? (
                            isExpanded ? <ChevronDown size={14} className="text-gold" /> : <ChevronRight size={14} className="text-diamond-muted" />
                        ) : (
                            <div className="w-[14px]" />
                        )}
                        <span className="font-mono text-[10px] text-diamond-muted w-12">{node.code}</span>
                        <span className={`text-sm ${level === 0 ? 'font-serif text-gold uppercase tracking-wider' : 'text-diamond'}`}>{node.name}</span>
                        {node.id.length === 1 && (
                            <Badge variant="outline" className={`ml-4 text-[10px] ${node.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {node.type === 'income' ? 'CRÉDITO' : 'DÉBITO'}
                            </Badge>
                        )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-diamond-muted hover:text-gold"><Plus size={14} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-diamond-muted hover:text-gold"><Edit3 size={14} /></Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-diamond-muted"><MoreHorizontal size={14} /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-onyx-900 border-white/5 text-diamond">
                                <DropdownMenuItem><Settings2 size={14} className="mr-2" /> Configurações</DropdownMenuItem>
                                <DropdownMenuItem className="text-rose-500"><Trash2 size={14} className="mr-2" /> Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {hasChildren && isExpanded && (
                    <div className="mt-1">
                        {node.children!.map(child => renderNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6 text-left pb-20">
            <PageHeader 
                title="Estrutura e Plano de Contas" 
                description="Configuração hierárquica e centros de custo."
                backUrl="/core/financeiro"
            />

            <Tabs defaultValue="plano" className="space-y-6">
                <TabsList className="bg-onyx-900 border-white/5 p-1 h-12">
                    <TabsTrigger value="plano" className="data-[state=active]:bg-gold data-[state=active]:text-onyx h-10 px-6">
                        <LayoutGrid size={16} className="mr-2" /> Plano de Contas
                    </TabsTrigger>
                    <TabsTrigger value="custos" className="data-[state=active]:bg-gold data-[state=active]:text-onyx h-10 px-6">
                        <Building2 size={16} className="mr-2" /> Centros de Custo
                    </TabsTrigger>
                    <TabsTrigger value="config" className="data-[state=active]:bg-gold data-[state=active]:text-onyx h-10 px-6">
                        <Settings2 size={16} className="mr-2" /> Parâmetros Contabilísticos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="plano" className="space-y-4">
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                                <Input placeholder="Procurar conta pelo nome ou código..." className="pl-10 bg-onyx-950 border-white/5 text-diamond" />
                            </div>
                            <Button className="bg-gold-gradient text-onyx">
                                <Plus className="w-4 h-4 mr-2" /> Nova Conta Nível 1
                            </Button>
                        </div>

                        <div className="bg-onyx-950/50 rounded-xl border border-white/5 p-4 min-h-[500px]">
                            {mockChartOfAccounts.map(node => renderNode(node))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="custos" className="space-y-4">
                    <div className="flex items-center justify-between">
                         <div className="relative max-w-sm flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                            <Input placeholder="Procurar centro de custo..." className="pl-10 bg-onyx-950 border-white/5 text-diamond" />
                        </div>
                        <Button className="bg-gold-gradient text-onyx">
                            <Plus className="w-4 h-4 mr-2" /> Novo Centro de Custo
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockCostCenters.map((cc) => (
                            <Card key={cc.id} className="p-6 bg-onyx-900 border-white/5 hover:border-gold/20 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                                        <Building2 size={20} />
                                    </div>
                                    <Badge variant="outline" className="bg-white/5 text-diamond-muted border-white/10 uppercase text-[9px] tracking-widest">{cc.type}</Badge>
                                </div>
                                <h4 className="font-serif text-lg text-white mb-1">{cc.name}</h4>
                                <div className="space-y-4 pt-4 border-t border-white/5 mt-4">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-diamond-muted italic">Gestor Responsável</span>
                                        <span className="text-diamond">{cc.manager}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-diamond-muted italic">Estado</span>
                                        <span className="text-emerald-500">{cc.status}</span>
                                    </div>
                                    <Link 
                                        href={`/core/financeiro/estrutura/custos/${cc.id}`}
                                        className={cn(buttonVariants({ variant: "ghost" }), "w-full text-gold hover:text-gold hover:bg-gold/5 justify-between px-0")}
                                    >
                                        Ver Despesas Alocadas <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
