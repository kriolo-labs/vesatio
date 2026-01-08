"use client";

import { InteractionTimeline } from "@/components/crm/leads/interaction-timeline";
import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeads } from "@/types/crm";
import { Calendar as CalendarIcon, CheckCircle2, Edit, FileText, Mail, MoreVertical, Phone, User } from "lucide-react";

export default function LeadDetailPage({ params }: { params: { id: string } }) {
    // In real app, fetch lead by ID. For now find in mock
    // Using mockLeads[0] as fallback if not found for demo
    // Note: params.id might need unwrapping in newer Next.js or use React.use()
    // For simplicity assuming standard usage
    
    // Safety check for static types
    const lead = mockLeads.find(l => l.id === params.id) || mockLeads[0];

    return (
        <CoreLayout>
            <PageHeader
                title={lead.name}
                description={`Lead Code: ${lead.code}`}
                backUrl="/core/crm/leads"
            >
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-diamond-muted border-white/10 hover:text-white">
                        <Edit size={14} />
                        Editar
                    </Button>
                     <Button size="sm" className="btn-primary gap-2 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                        <CheckCircle2 size={14} />
                        Converter em Cliente
                    </Button>
                     <Button variant="ghost" size="icon" className="text-diamond-muted hover:text-white">
                        <MoreVertical size={16} />
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Left Column: Main Info (2 Cols) */}
                <div className="xl:col-span-2 space-y-6">
                    
                    {/* Status & Score Banner */}
                    <Card className="p-4 bg-onyx-900 border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-xs text-diamond-muted mb-1">Status Atual</p>
                                <StatusBadge status={lead.status} size="md" className="text-sm px-3 py-1" />
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div>
                                <p className="text-xs text-diamond-muted mb-1">Qualificação (Score)</p>
                                <div className="flex items-center gap-2">
                                     <span className="text-xl font-bold text-white">{lead.score}</span>
                                     <div className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 rounded">Alta</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             {/* Quick Actions */}
                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-white/10 bg-onyx-800 hover:text-gold" title="Ligar">
                                <Phone size={14} />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-white/10 bg-onyx-800 hover:text-gold" title="Email">
                                <Mail size={14} />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-white/10 bg-onyx-800 hover:text-gold" title="Agendar">
                                <CalendarIcon size={14} />
                            </Button>
                        </div>
                    </Card>

                    {/* Tabs Content */}
                    <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="bg-onyx-900 border border-white/5 w-full justify-start h-12 p-1">
                            <TabsTrigger value="summary">Resumo</TabsTrigger>
                            <TabsTrigger value="interactions">Interações</TabsTrigger>
                            <TabsTrigger value="documents">Documentos</TabsTrigger>
                            <TabsTrigger value="history">Histórico</TabsTrigger>
                        </TabsList>

                        <div className="mt-4">
                            <TabsContent value="summary" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="p-5 bg-onyx-900/50 border-white/5">
                                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                            <User size={16} className="text-gold" />
                                            Dados do Contacto
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">Email:</span>
                                                <span className="col-span-2 text-white">{lead.email}</span>
                                            </div>
                                            <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">Telefone:</span>
                                                <span className="col-span-2 text-white">{lead.phone || "-"}</span>
                                            </div>
                                            <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">País:</span>
                                                <span className="col-span-2 text-white">{lead.country}</span>
                                            </div>
                                             <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">Origem:</span>
                                                <span className="col-span-2 text-white capitalize">{lead.source}</span>
                                            </div>
                                        </div>
                                    </Card>

                                     <Card className="p-5 bg-onyx-900/50 border-white/5">
                                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                            <FileText size={16} className="text-gold" />
                                            Dados do Projeto
                                        </h3>
                                         <div className="space-y-3 text-sm">
                                            <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">Tipo:</span>
                                                <span className="col-span-2 text-white">{lead.projectType}</span>
                                            </div>
                                            <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">Budget Esp.:</span>
                                                <span className="col-span-2 text-white">
                                                    {lead.investmentParams.max ? `${(lead.investmentParams.max).toLocaleString()} ${lead.investmentParams.currency}` : "Não definido"}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3">
                                                <span className="text-diamond-muted">Criado em:</span>
                                                <span className="col-span-2 text-white">
                                                    {new Date(lead.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                
                                <Card className="p-5 bg-onyx-900/50 border-white/5">
                                     <h3 className="font-semibold text-white mb-4">Notas Internas</h3>
                                     <p className="text-sm text-diamond-muted italic">
                                         "Cliente muito interessado no portfólio de Smart Living. Agendar visita ao showroom assim que possível."
                                     </p>
                                </Card>
                            </TabsContent>
                            
                            <TabsContent value="interactions">
                                 <Card className="p-5 bg-onyx-900/50 border-white/5">
                                     <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-semibold text-white">Timeline de Interações</h3>
                                        <Button size="sm" variant="secondary">Nova Interação</Button>
                                     </div>
                                     <InteractionTimeline />
                                 </Card>
                            </TabsContent>

                            <TabsContent value="documents">
                                <Card className="p-10 bg-onyx-900/50 border-white/5 flex flex-col items-center justify-center text-center">
                                     <FileText size={32} className="text-diamond-muted mb-4 opacity-50" />
                                     <p className="text-diamond-muted">Nenhum documento anexado.</p>
                                     <Button variant="ghost" className="text-gold hover:text-gold/80 hover:bg-transparent">Fazer upload</Button>
                                </Card>
                            </TabsContent>

                             <TabsContent value="history">
                                <Card className="p-5 bg-onyx-900/50 border-white/5">
                                     <p className="text-sm text-diamond-muted">Log de auditoria completo (simulado).</p>
                                     <ul className="mt-4 space-y-2 text-xs text-white/50">
                                         <li>15 Mai 10:00 - Lead criado por Sistema (Web)</li>
                                         <li>15 Mai 10:05 - Atribuído a Ana Pereira</li>
                                         <li>15 Mai 11:30 - Status alterado para Contactado</li>
                                     </ul>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    {/* Assigned To */}
                    <Card className="p-4 bg-onyx-900 border-white/5">
                        <h4 className="text-xs font-semibold text-diamond-muted uppercase tracking-wider mb-3">Responsável</h4>
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-white/10">
                                <AvatarFallback className="bg-gold/10 text-gold">{lead.assignedTo?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium text-white">{lead.assignedTo?.name || "Não atribuído"}</p>
                                <p className="text-xs text-diamond-muted">Sales Representative</p>
                            </div>
                        </div>
                         <Button variant="outline" size="sm" className="w-full mt-4 text-xs h-8 border-white/10 hover:text-white">
                            Reatribuir
                        </Button>
                    </Card>

                    {/* Next Action */}
                    <Card className="p-4 bg-gradient-to-br from-onyx-900 to-onyx-950 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <CalendarIcon size={48} />
                        </div>
                        <h4 className="text-xs font-semibold text-diamond-muted uppercase tracking-wider mb-2">Próxima Ação</h4>
                        <p className="text-white font-medium text-sm">Follow-up Proposta</p>
                         <div className="flex items-center gap-2 mt-2 text-xs text-gold">
                            <CalendarIcon size={12} />
                            <span>19 Mai, 14:00</span>
                        </div>
                    </Card>
                    
                    {/* Tags */}
                    <Card className="p-4 bg-onyx-900 border-white/5">
                        <h4 className="text-xs font-semibold text-diamond-muted uppercase tracking-wider mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {lead.tags?.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-diamond-muted">
                                    {tag}
                                </span>
                            ))}
                            <button className="px-2 py-1 border border-dashed border-white/20 rounded text-[10px] text-diamond-muted hover:text-white hover:border-white/40 transition-colors">
                                + Adicionar
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </CoreLayout>
    );
}
