"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { mockProjects } from "@/types/project";
import { AlertCircle, Calendar, CheckSquare, Clock, DollarSign, FileText, Image as ImageIcon, LayoutDashboard, PieChart, Plus, Settings, Users } from "lucide-react";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const project = mockProjects.find(p => p.id === params.id) || mockProjects[0];

    return (
        <CoreLayout>
             {/* Header Section */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-gold uppercase tracking-wider">{project.code}</span>
                            <StatusBadge status={project.status} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                        <p className="text-sm text-diamond-muted">
                            Cliente: <span className="text-white hover:underline cursor-pointer">{project.client?.name || `Client #${project.clientId}`}</span> • 
                            Gestor: <span className="text-white">{project.manager?.name}</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2 border-white/10 text-diamond-muted hover:text-white">
                            <Settings size={16} /> Configurações
                        </Button>
                        <Button className="btn-primary gap-2">
                            <Plus size={16} /> Nova Tarefa
                        </Button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-onyx-900 border border-white/5 rounded-full h-8 flex items-center px-4 relative overflow-hidden">
                    <div className="z-10 flex justify-between w-full text-xs font-medium text-white mix-blend-difference">
                        <span>Progresso Geral</span>
                        <span>{project.progress}%</span>
                    </div>
                    <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000" 
                        style={{ width: `${project.progress}%` }} 
                    />
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-onyx-900 border border-white/5 w-full justify-start h-12 p-1 overflow-x-auto">
                    <TabsTrigger value="overview" className="gap-2"><LayoutDashboard size={14}/> Visão Geral</TabsTrigger>
                    <TabsTrigger value="timeline" className="gap-2"><Calendar size={14}/> Timeline</TabsTrigger>
                    <TabsTrigger value="financial" className="gap-2"><DollarSign size={14}/> Financeiro</TabsTrigger>
                    <TabsTrigger value="tasks" className="gap-2"><CheckSquare size={14}/> Tarefas</TabsTrigger>
                    <TabsTrigger value="team" className="gap-2"><Users size={14}/> Equipa</TabsTrigger>
                    <TabsTrigger value="docs" className="gap-2"><FileText size={14}/> Documentos</TabsTrigger>
                    <TabsTrigger value="gallery" className="gap-2"><ImageIcon size={14}/> Galeria</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KPI label="Budget Consumido" value="60%" subvalue={`${formatCurrency(project.costs.total)} / ${formatCurrency(project.budget)}`} icon={PieChart} color="text-blue-500" />
                        <KPI label="Margem Atual" value={formatCurrency(project.margin)} subvalue={`${((project.margin / project.revenue.total) * 100).toFixed(1)}%`} icon={DollarSign} color="text-emerald-500" />
                        <KPI label="Prazo Restante" value="45 dias" subvalue="Termina 30 Ago" icon={Clock} color="text-gold" />
                        <KPI label="Tarefas em Atraso" value="3" subvalue="Críticas" icon={AlertCircle} color="text-rose-500" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 p-6 bg-onyx-900 border-white/5">
                            <h3 className="font-semibold text-white mb-4">Atividade Recente</h3>
                            <div className="space-y-6">
                                {[
                                    { user: "Roberto Dias", action: "concluiu a fase", target: "Demolição", time: "Há 2 horas" },
                                    { user: "Ana Pereira", action: "adicionou um documento", target: "Planta Elétrica v2.pdf", time: "Ontem, 14:30" },
                                    { user: "Sistema", action: "alertou sobre", target: "Atraso na entrega de materiais", time: "Ontem, 09:00" },
                                ].map((activity, i) => (
                                    <div key={i} className="flex gap-4">
                                         <Avatar className="w-8 h-8 border border-white/10">
                                            <AvatarFallback className="text-xs bg-onyx-800 text-gold">{activity.user.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm text-white">
                                                <span className="font-semibold">{activity.user}</span> {activity.action} <span className="text-gold">{activity.target}</span>
                                            </p>
                                            <p className="text-xs text-diamond-muted">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                         
                         <Card className="p-6 bg-onyx-900 border-white/5">
                            <h3 className="font-semibold text-white mb-4">Equipa Alocada</h3>
                            <div className="space-y-4">
                                {['Roberto Dias', 'Ana Pereira', 'Carlos Silva'].map((member, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8 border border-white/10">
                                                <AvatarFallback className="text-xs bg-onyx-800 text-gold">{member.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm text-white">{member}</span>
                                        </div>
                                        <span className="text-xs text-diamond-muted">Gestor</span>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full mt-2 border-white/10 text-diamond-muted hover:text-white">+ Adicionar Membro</Button>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* TIMELINE TAB */}
                <TabsContent value="timeline">
                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <div className="flex justify-between items-center mb-6">
                             <h3 className="font-semibold text-white">Cronograma de Fases</h3>
                             <Button size="sm" variant="outline" className="border-white/10 text-diamond-muted hover:text-white">Exportar Gantt</Button>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { name: "Preparação e Demolição", status: "completed", date: "12 Fev - 28 Fev" },
                                { name: "Estrutura e Alvenaria", status: "custom-in-progress", date: "01 Mar - 15 Abr" },
                                { name: "Instalações Técnicas", status: "pending", date: "16 Abr - 30 Mai" },
                                { name: "Acabamentos", status: "pending", date: "01 Jun - 15 Jul" },
                                { name: "Entrega e Vistoria", status: "pending", date: "16 Jul - 30 Jul" },
                            ].map((phase, i) => (
                                <div key={i} className="relative pl-6 border-l border-white/10 pb-2 last:border-0 last:pb-0">
                                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${phase.status === 'completed' ? 'bg-emerald-500' : phase.status === 'custom-in-progress' ? 'bg-gold' : 'bg-onyx-800 border border-white/20'}`} />
                                    <div className="flex justify-between items-start bg-white/5 p-4 rounded-lg">
                                        <div>
                                            <h4 className="font-medium text-white">{phase.name}</h4>
                                            <p className="text-xs text-diamond-muted">{phase.date}</p>
                                        </div>
                                        <Badge variant={phase.status === 'completed' ? 'default' : phase.status === 'custom-in-progress' ? 'secondary' : 'outline'} className={phase.status === 'completed' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                                            {phase.status === 'completed' ? 'Concluída' : phase.status === 'custom-in-progress' ? 'Em Curso' : 'Pendente'}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                {/* FINANCIAL TAB */}
                <TabsContent value="financial">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card className="p-6 bg-onyx-900 border-white/5">
                            <p className="text-sm text-diamond-muted mb-1">Total Faturado</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(project.revenue.total)}</p>
                            <div className="mt-2 text-xs text-emerald-500">
                                45% do contrato
                            </div>
                        </Card>
                        <Card className="p-6 bg-onyx-900 border-white/5">
                             <p className="text-sm text-diamond-muted mb-1">Custos Totais</p>
                            <p className="text-2xl font-bold text-rose-500">{formatCurrency(project.costs.total)}</p>
                             <div className="mt-2 text-xs text-diamond-muted">
                                Materiais: {formatCurrency(project.costs.materials)}
                            </div>
                        </Card>
                        <Card className="p-6 bg-onyx-900 border-white/5">
                             <p className="text-sm text-diamond-muted mb-1">Margem Real</p>
                            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(project.margin)}</p>
                             <div className="mt-2 text-xs text-emerald-500">
                                +5% acima do esperado
                            </div>
                        </Card>
                     </div>

                    <Card className="p-6 bg-onyx-900 border-white/5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-white">Breakdown de Custos</h3>
                            <Button variant="outline" size="sm" className="border-white/10 text-diamond-muted">+ Registar Custo</Button>
                        </div>
                        <div className="relative h-10 w-full bg-white/5 rounded-full overflow-hidden flex">
                             <div className="h-full bg-blue-500" style={{ width: '45%' }} title="Materiais" />
                             <div className="h-full bg-purple-500" style={{ width: '30%' }} title="Mão de Obra" />
                             <div className="h-full bg-orange-500" style={{ width: '15%' }} title="Subempreitadas" />
                             <div className="h-full bg-gray-500" style={{ width: '10%' }} title="Overhead" />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-diamond-muted">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"/> Materiais (45%)</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"/> Mão de Obra (30%)</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"/> Subs (15%)</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-500"/> Overhead (10%)</span>
                        </div>
                    </Card>
                </TabsContent>

                 <TabsContent value="tasks" className="text-center py-20 text-diamond-muted">
                    <p>Implementação do Kanban de Tarefas na Fase 9.4</p>
                </TabsContent>
                <TabsContent value="team" className="text-center py-20 text-diamond-muted">
                    <p>Gestão detalhada de equipa em breve.</p>
                </TabsContent>
                <TabsContent value="docs" className="text-center py-20 text-diamond-muted">
                    <p>Gestão de Documentos em breve.</p>
                </TabsContent>
                <TabsContent value="gallery" className="text-center py-20 text-diamond-muted">
                    <p>Galeria de Imagens em breve.</p>
                </TabsContent>

            </Tabs>
        </CoreLayout>
    );
}

function KPI({ label, value, subvalue, icon: Icon, color }: any) {
    return (
        <Card className="p-4 bg-onyx-900 border-white/5">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-diamond-muted">{label}</p>
                    <h3 className="text-xl font-bold text-white mt-1">{value}</h3>
                    <p className="text-xs text-diamond-muted mt-1">{subvalue}</p>
                </div>
                <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
                    <Icon className={color} size={18} />
                </div>
            </div>
        </Card>
    );
}
