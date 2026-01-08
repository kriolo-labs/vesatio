"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockClients } from "@/types/crm";
import { Building2, FileText, LayoutDashboard, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
    // Find client
    const client = mockClients.find(c => c.id === params.id) || mockClients[0];

    return (
        <CoreLayout>
            <PageHeader
                title={client.type === 'company' ? client.companyName || client.name : client.name}
                description={`Código: ${client.code} • ${client.country}`}
                backUrl="/core/crm/clientes"
            >
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white">
                        <ShieldCheck size={14} />
                        Acesso Portal
                    </Button>
                    <Button size="sm" className="btn-primary gap-2">
                        <LayoutDashboard size={14} />
                       Novo Projeto
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                
                {/* Left Sidebar: Profile */}
                <Card className="xl:col-span-1 p-6 bg-onyx-900 border-white/5 h-fit space-y-6">
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="w-24 h-24 border-2 border-white/10 mb-4">
                            <AvatarFallback className="text-2xl bg-onyx-800 text-gold">
                                {client.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="text-lg font-bold text-white mb-1">{client.name}</h2>
                        <div className="flex items-center gap-2 mb-4">
                            <StatusBadge status={client.status} />
                             {client.vip && (
                                <Badge variant="outline" className="border-gold/30 text-gold bg-gold/5">VIP</Badge>
                            )}
                        </div>
                        
                         <div className="w-full grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 mb-4">
                            <div>
                                <p className="text-xs text-diamond-muted mb-1">Projetos</p>
                                <p className="text-lg font-semibold text-white">{client.activeProjects}</p>
                            </div>
                            <div>
                                <p className="text-xs text-diamond-muted mb-1">Total Gasto</p>
                                <p className="text-sm font-semibold text-emerald-500">{(client.totalSpent / 1000000).toFixed(1)}M</p>
                            </div>
                        </div>

                         <div className="w-full space-y-3 text-left">
                            <div className="flex items-center gap-3 text-sm text-diamond-muted">
                                <Mail size={14} />
                                <span className="truncate">{client.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-diamond-muted">
                                <Phone size={14} />
                                <span>{client.phone || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-diamond-muted">
                                <MapPin size={14} />
                                <span>{client.country}</span>
                            </div>
                            {client.nif && (
                                <div className="flex items-center gap-3 text-sm text-diamond-muted">
                                    <FileText size={14} />
                                    <span>NIF: {client.nif}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Main Content: Tabs */}
                <div className="xl:col-span-3">
                     <Tabs defaultValue="projects" className="w-full">
                        <TabsList className="bg-onyx-900 border border-white/5 w-full justify-start h-12 p-1 mb-6">
                            <TabsTrigger value="projects">Projetos</TabsTrigger>
                            <TabsTrigger value="financial">Financeiro</TabsTrigger>
                            <TabsTrigger value="comms">Comunicações</TabsTrigger>
                            <TabsTrigger value="access">Portal</TabsTrigger>
                        </TabsList>

                        {/* Projects Tab */}
                        <TabsContent value="projects" className="space-y-4">
                             {client.activeProjects === 0 ? (
                                 <Card className="p-8 border-dashed border-white/10 bg-transparent text-center">
                                     <p className="text-diamond-muted mb-4">Este cliente ainda não tem projetos.</p>
                                     <Button variant="secondary">Criar Primeiro Projeto</Button>
                                 </Card>
                             ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Mock Project Cards */}
                                    {[1, 2].slice(0, client.activeProjects).map((i) => (
                                        <Card key={i} className="p-5 bg-onyx-900/50 border-white/5 hover:border-gold/30 transition-all cursor-pointer group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 rounded bg-white/5 text-gold mb-2">
                                                    <Building2 size={20} />
                                                </div>
                                                <StatusBadge status="active" label="Em Curso" />
                                            </div>
                                            <h3 className="font-semibold text-white mb-1 group-hover:text-gold transition-colors">Villa Atlântico - Renovação Total</h3>
                                            <p className="text-xs text-diamond-muted mb-4">Iniciado em 12 Fev 2024</p>
                                            
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-diamond-muted">Progresso</span>
                                                    <span className="text-white">45%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gold w-[45%]" />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                             )}
                        </TabsContent>

                        {/* Financial Tab */}
                        <TabsContent value="financial" className="space-y-4">
                             <div className="grid grid-cols-3 gap-4 mb-6">
                                 <Card className="p-4 bg-onyx-900 border-white/5">
                                     <p className="text-xs text-diamond-muted mb-1">Total Faturado</p>
                                     <p className="text-lg font-bold text-white">{client.totalSpent.toLocaleString()} CVE</p>
                                 </Card>
                                 <Card className="p-4 bg-onyx-900 border-white/5">
                                     <p className="text-xs text-diamond-muted mb-1">Pendente</p>
                                     <p className="text-lg font-bold text-amber-500">250.000 CVE</p>
                                 </Card>
                                  <Card className="p-4 bg-onyx-900 border-white/5">
                                     <p className="text-xs text-diamond-muted mb-1">Limite Crédito</p>
                                     <p className="text-lg font-bold text-emerald-500">5.000.000 CVE</p>
                                 </Card>
                             </div>
                             
                             <Card className="p-0 bg-onyx-900 border-white/5">
                                 <div className="p-4 border-b border-white/5">
                                     <h3 className="font-semibold text-white">Histórico de Transações</h3>
                                 </div>
                                 <div className="p-8 text-center text-diamond-muted text-sm italic">
                                     Tabela de faturas e pagamentos virá aqui.
                                 </div>
                             </Card>
                        </TabsContent>

                        {/* Portal Tab */}
                         <TabsContent value="access" className="space-y-4">
                             <Card className="p-6 bg-onyx-900 border-white/5">
                                 <div className="flex justify-between items-start">
                                     <div>
                                         <h3 className="font-semibold text-white mb-2">Acesso ao My Vesatio</h3>
                                         <p className="text-sm text-diamond-muted max-w-md">
                                             O cliente tem acesso ao portal para visualizar o progresso da obra, documentos e aprovar orçamentos.
                                         </p>
                                     </div>
                                     <div className="flex flex-col items-end gap-2">
                                         <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/10">Ativo</Badge>
                                         <span className="text-xs text-diamond-muted">Último login: Há 2 dias</span>
                                     </div>
                                 </div>
                                 
                                 <div className="mt-8 flex gap-3">
                                     <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white">Resetar Password</Button>
                                     <Button variant="destructive" className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/20">Revogar Acesso</Button>
                                 </div>
                             </Card>
                         </TabsContent>

                     </Tabs>
                </div>
            </div>
        </CoreLayout>
    );
}
