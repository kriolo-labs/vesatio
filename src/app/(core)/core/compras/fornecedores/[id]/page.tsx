"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/types/inventory";
import { mockSuppliers } from "@/types/purchasing";
import {
    ArrowLeft, Ban, Building2, CreditCard,
    Edit, FileText,
    MapPin, Phone,
    Plus,
    Star,
    User
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function SupplierDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    
    // In a real app, fetch data based on ID
    const supplier = mockSuppliers.find(s => s.id === id) || mockSuppliers[0];

    if (!supplier) return <div>Fornecedor não encontrado</div>;

    return (
        <CoreLayout>
            {/* Header Section */}
            <div className="mb-6">
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mb-4 pl-0 text-diamond-muted hover:text-white"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Voltar para Fornecedores
                </Button>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-white/10 rounded-lg">
                            <AvatarImage src={supplier.logo} />
                            <AvatarFallback className="rounded-lg bg-onyx-800 text-xl font-bold text-diamond-muted">
                                {supplier.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                                {supplier.name}
                                <Badge variant="outline" className={cn("text-xs uppercase", supplier.status === 'active' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-red-500 border-red-500/20 bg-red-500/10")}>
                                    {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                                </Badge>
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-diamond-muted mt-1">
                                <span className="flex items-center gap-1 font-mono text-gold"><Building2 size={14}/> {supplier.code}</span>
                                <span className="flex items-center gap-1"><MapPin size={14}/> {supplier.city}, {supplier.country}</span>
                                <span className="flex items-center gap-1"><Star size={14} className="fill-gold text-gold"/> {supplier.rating} / 5</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                         <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400">
                             <Ban size={16} className="mr-2"/> Bloquear
                        </Button>
                        <Button className="btn-primary">
                            <Edit size={16} className="mr-2"/> Editar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="info" className="space-y-6">
                <TabsList className="bg-onyx-900 border border-white/5 p-1">
                    <TabsTrigger value="info" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Informações</TabsTrigger>
                    <TabsTrigger value="financial" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Financeiro</TabsTrigger>
                     <TabsTrigger value="products" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Produtos</TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Histórico</TabsTrigger>
                    <TabsTrigger value="ratings" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Avaliações</TabsTrigger>
                </TabsList>

                {/* TAB: INFORMATIONS */}
                <TabsContent value="info" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Column 1: Core Details */}
                        <div className="md:col-span-2 space-y-6">
                            <Card className="p-6 bg-onyx-900 border-white/5">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Building2 size={18} className="text-gold" /> Dados da Empresa
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div>
                                        <label className="text-diamond-muted block mb-1">Nome Comercial</label>
                                        <div className="text-white">{supplier.commercialName || "-"}</div>
                                    </div>
                                    <div>
                                        <label className="text-diamond-muted block mb-1">NIF / Tax ID</label>
                                        <div className="text-white font-mono">{supplier.taxId}</div>
                                    </div>
                                    <div>
                                        <label className="text-diamond-muted block mb-1">Website</label>
                                        <div className="text-blue-400 hover:underline cursor-pointer">{supplier.website || "-"}</div>
                                    </div>
                                    <div>
                                        <label className="text-diamond-muted block mb-1">Email Geral</label>
                                        <div className="text-white">{supplier.email}</div>
                                    </div>
                                     <div className="col-span-2">
                                        <label className="text-diamond-muted block mb-1">Morada</label>
                                        <div className="text-white">{supplier.address}</div>
                                    </div>
                                    <div>
                                        <label className="text-diamond-muted block mb-1">Telefone</label>
                                        <div className="text-white">{supplier.phone}</div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-onyx-900 border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <User size={18} className="text-gold" /> Contactos
                                    </h3>
                                    <Button variant="ghost" size="sm"><Plus size={16}/></Button>
                                </div>
                                <div className="space-y-4">
                                    {supplier.contacts.map(contact => (
                                        <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-onyx-950 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-onyx-800 text-xs">{contact.name.substring(0,1)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-medium text-white">{contact.name} {contact.isPrimary && <Badge variant="secondary" className="text-[9px] h-4 ml-2">Principal</Badge>}</div>
                                                    <div className="text-xs text-diamond-muted">{contact.role} • {contact.email}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                 <Button variant="ghost" size="icon" className="h-7 w-7 text-diamond-muted hover:text-white"><Phone size={14}/></Button>
                                            </div>
                                        </div>
                                    ))}
                                    {supplier.contacts.length === 0 && <div className="text-diamond-muted text-sm italic">Nenhum contacto registado.</div>}
                                </div>
                            </Card>
                        </div>

                        {/* Column 2: Metadata & Notes */}
                        <div className="space-y-6">
                            <Card className="p-6 bg-onyx-900 border-white/5">
                                <h3 className="text-lg font-semibold text-white mb-4">Categorias</h3>
                                <div className="flex flex-wrap gap-2">
                                    {supplier.categories.map(cat => (
                                        <Badge key={cat} variant="outline" className="text-xs border-white/10 text-diamond-muted">
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>

                             <Card className="p-6 bg-onyx-900 border-white/5">
                                <h3 className="text-lg font-semibold text-white mb-4">Notas Internas</h3>
                                <p className="text-sm text-diamond-muted leading-relaxed">
                                    {supplier.notes || "Nenhuma nota adicionada."}
                                </p>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* TAB: FINANCEIRO */}
                <TabsContent value="financial" className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <Card className="p-6 bg-onyx-900 border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <CreditCard size={18} className="text-gold" /> Dados Bancários
                            </h3>
                            <div className="space-y-4">
                                {supplier.bankAccounts.map(account => (
                                    <div key={account.id} className="p-4 rounded-lg bg-onyx-950 border border-white/5 relative overflow-hidden group">
                                         <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <Button variant="ghost" size="icon" className="h-6 w-6"><Edit size={12}/></Button>
                                         </div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-white">{account.bankName}</div>
                                            {account.isPrimary && <Badge className="bg-gold/20 text-gold hover:bg-gold/30 text-[10px]">Principal</Badge>}
                                        </div>
                                        <div className="space-y-1 font-mono text-sm text-diamond-muted">
                                            <div className="flex justify-between">
                                                <span>Conta:</span>
                                                <span className="text-white">{account.accountNumber}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>IBAN:</span>
                                                <span className="text-white">{account.iban}</span>
                                            </div>
                                             <div className="flex justify-between">
                                                <span>Moeda:</span>
                                                <span className="text-white">{account.currency}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-white/10 hover:border-gold/50 text-diamond-muted hover:text-gold">
                                    <Plus size={16} className="mr-2" /> Adicionar Conta Bancária
                                </Button>
                            </div>
                        </Card>

                         <Card className="p-6 bg-onyx-900 border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-gold" /> Condições Comerciais
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-diamond-muted">Prazo de Pagamento</span>
                                    <span className="text-white font-medium">{supplier.paymentTerms}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-diamond-muted">Moeda Preferencial</span>
                                    <span className="text-white font-medium">{supplier.currency}</span>
                                </div>
                                {supplier.incoterm && (
                                    <div className="flex justify-between py-2 border-b border-white/5">
                                        <span className="text-diamond-muted">Incoterm Padrão</span>
                                        <span className="text-white font-medium">{supplier.incoterm}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-diamond-muted">Saldo Pendente</span>
                                    <span className="text-red-400 font-mono font-bold">{formatCurrency(supplier.balance)}</span>
                                </div>
                                 <div className="flex justify-between py-2">
                                    <span className="text-diamond-muted">Volume Total de Compras</span>
                                    <span className="text-emerald-400 font-mono font-bold">{formatCurrency(supplier.totalPurchased)}</span>
                                </div>
                            </div>
                        </Card>
                     </div>
                </TabsContent>
                
                {/* TAB: PRODUCTS - Placeholder using Mock Products */}
                <TabsContent value="products">
                    <Card className="bg-onyx-900 border-white/5">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-semibold text-white">Produtos Fornecidos</h3>
                            <Button size="sm" variant="outline" className="border-white/10 text-diamond-muted">Associar Produto</Button>
                        </div>
                        <div className="p-0">
                            {/* In a real app we would filter products by this supplier */}
                            {mockProducts.length > 0 ? (
                                <table className="w-full text-sm">
                                    <thead className="bg-white/5 text-diamond-muted text-left">
                                        <tr>
                                            <th className="p-3 font-medium">SKU</th>
                                            <th className="p-3 font-medium">Produto</th>
                                            <th className="p-3 font-medium text-right">Preço Tab.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-diamond-muted">
                                        {mockProducts.map(prod => (
                                            <tr key={prod.id} className="hover:bg-white/5">
                                                <td className="p-3 font-mono text-gold">{prod.sku}</td>
                                                <td className="p-3 text-white">{prod.name}</td>
                                                <td className="p-3 text-right font-mono">{formatCurrency(prod.averageCost)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-diamond-muted">Nenhum produto associado.</div>
                            )}
                        </div>
                    </Card>
                </TabsContent>

                 {/* TAB: RATINGS */}
                <TabsContent value="ratings" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 bg-onyx-900 border-white/5 flex flex-col items-center justify-center text-center">
                            <div className="text-xs text-diamond-muted uppercase tracking-wider mb-2">Score Global</div>
                            <div className="text-5xl font-bold text-white mb-2">{supplier.rating.toFixed(1)}</div>
                            <div className="flex text-gold mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={18} className={star <= supplier.rating ? "fill-gold" : "text-onyx-700"} />
                                ))}
                            </div>
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Excelente Parceiro</Badge>
                        </Card>
                        
                        <Card className="p-6 bg-onyx-900 border-white/5 col-span-2">
                             <h3 className="text-lg font-semibold text-white mb-6">Detalle da Avaliação</h3>
                             <div className="space-y-4">
                                 {[
                                     { label: "Qualidade dos Produtos", score: 4.8, color: "bg-emerald-500" },
                                     { label: "Pontualidade na Entrega", score: 4.2, color: "bg-blue-500" },
                                     { label: "Competitividade de Preço", score: 3.9, color: "bg-yellow-500" },
                                     { label: "Comunicação e Suporte", score: 4.5, color: "bg-emerald-500" },
                                 ].map(criteria => (
                                     <div key={criteria.label} className="space-y-1">
                                         <div className="flex justify-between text-sm">
                                             <span className="text-diamond-muted">{criteria.label}</span>
                                             <span className="text-white font-bold">{criteria.score}</span>
                                         </div>
                                         <div className="h-2 w-full bg-onyx-950 rounded-full overflow-hidden">
                                             <div className={cn("h-full rounded-full", criteria.color)} style={{ width: `${(criteria.score / 5) * 100}%` }} />
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </Card>
                    </div>
                </TabsContent>

            </Tabs>
        </CoreLayout>
    );
}
