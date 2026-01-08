"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCurrency } from "@/lib/utils";
import { ImportStatus, mockImports } from "@/types/imports";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
    ArrowRight, Calendar, Check,
    Circle, Clock,
    DollarSign, Download,
    FileText, MapPin,
    Package,
    Ship,
    Upload
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function getStatusColor(status: ImportStatus) {
    switch (status) {
        case "draft": return "text-diamond-muted border-diamond-muted/20 bg-diamond-muted/10";
        case "payment_pending": return "text-orange-500 border-orange-500/20 bg-orange-500/10";
        case "production": return "text-blue-500 border-blue-500/20 bg-blue-500/10";
        case "ready_to_ship": return "text-indigo-500 border-indigo-500/20 bg-indigo-500/10";
        case "shipped": return "text-purple-500 border-purple-500/20 bg-purple-500/10";
        case "in_transit": return "text-blue-400 border-blue-400/20 bg-blue-400/10";
        case "arrived": return "text-teal-500 border-teal-500/20 bg-teal-500/10";
        case "customs_clearance": return "text-orange-400 border-orange-400/20 bg-orange-400/10";
        case "released": return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
        case "delivered": return "text-emerald-600 border-emerald-600/20 bg-emerald-600/10";
        case "cancelled": return "text-red-500 border-red-500/20 bg-red-500/10";
        default: return "text-diamond-muted";
    }
}

function getStatusLabel(status: ImportStatus) {
    switch (status) {
        case "draft": return "Rascunho";
        case "payment_pending": return "Pagamento Pendente";
        case "production": return "Em Produção";
        case "ready_to_ship": return "Pronto p/ Embarque";
        case "shipped": return "Embarcado";
        case "in_transit": return "Em Trânsito";
        case "arrived": return "Chegou ao Destino";
        case "customs_clearance": return "Despacho Aduaneiro";
        case "released": return "Liberado";
        case "delivered": return "Entregue";
        case "cancelled": return "Cancelado";
        default: return status;
    }
}

const steps: { status: ImportStatus; label: string }[] = [
    { status: 'production', label: 'Produção' },
    { status: 'ready_to_ship', label: 'Pronto' },
    { status: 'shipped', label: 'Embarcado' },
    { status: 'in_transit', label: 'Trânsito' },
    { status: 'arrived', label: 'Chegada' },
    { status: 'customs_clearance', label: 'Alfândega' },
    { status: 'released', label: 'Liberado' },
    { status: 'delivered', label: 'Entregue' },
];

export default function ImportDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const importProcess = mockImports.find(i => i.id === id) || mockImports[0];

    const currentStepIndex = steps.findIndex(s => s.status === importProcess.status);

    const docColumns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Documento",
            cell: ({ row }) => <span className="text-white font-medium">{row.getValue("name")}</span>
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => <span className="text-xs text-diamond-muted uppercase">{row.getValue("type")}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant="outline" className={cn(
                        "text-[10px]",
                        status === 'validated' ? "text-emerald-500 border-emerald-500/20" :
                        status === 'received' ? "text-blue-500 border-blue-500/20" :
                        "text-orange-500 border-orange-500/20"
                    )}>
                        {status === 'validated' ? 'Validado' : status === 'received' ? 'Recebido' : 'Pendente'}
                    </Badge>
                )
            }
        },
        {
            id: "actions",
            header: "Ações",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-end">
                    {row.original.url ? (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gold hover:bg-gold/10">
                            <Download size={14} />
                        </Button>
                    ) : (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-blue-500 hover:bg-blue-500/10">
                            <Upload size={14} />
                        </Button>
                    )}
                </div>
            )
        }
    ];

    const costColumns: ColumnDef<any>[] = [
        {
            accessorKey: "categoryName",
            header: "Categoria",
            cell: ({ row }) => <span className="text-white font-medium text-xs">{row.getValue("categoryName")}</span>
        },
        {
            accessorKey: "description",
            header: "Descrição",
            cell: ({ row }) => <span className="text-diamond-muted text-xs">{row.getValue("description")}</span>
        },
        {
            accessorKey: "estimatedValue",
            header: "Valor (Moeda)",
            cell: ({ row }) => (
                <div className="flex flex-col text-xs">
                    <span className="text-white font-mono">{row.original.estimatedValue} {row.original.currency}</span>
                    <span className="text-diamond-muted text-[10px]">Taxa: {row.original.exchangeRate}</span>
                </div>
            )
        },
         {
            accessorKey: "convertedValue",
            header: "Valor (CVE)",
            cell: ({ row }) => (
                <span className="text-gold font-mono font-medium text-xs">
                    {formatCurrency(row.original.estimatedValue * row.original.exchangeRate)}
                </span>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
             cell: ({ row }) => ( <Badge variant="outline" className="text-[10px] border-white/10 text-diamond-muted">{row.getValue("status")}</Badge>)
        }
    ];

    return (
        <CoreLayout>
            <PageHeader
                title={importProcess.code}
                description={`Importação de ${importProcess.supplierName}`}
                backUrl="/core/compras/importacoes"
            >
                <div className="flex items-center gap-3">
                     <Badge variant="outline" className={cn("h-8 px-3 gap-2", getStatusColor(importProcess.status))}>
                        <Clock size={14} /> {getStatusLabel(importProcess.status)}
                    </Badge>
                    <Button className="btn-primary gap-2">
                        Avançar Status <ArrowRight size={16} />
                    </Button>
                </div>
            </PageHeader>

            {/* Visual Timeline */}
            <Card className="p-6 bg-onyx-900 border-white/5 mb-8 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[800px]">
                    {steps.map((step, index) => {
                        const isCompleted = currentStepIndex >= 0 && index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        const isLast = index === steps.length - 1;

                        return (
                            <div key={step.status} className={cn("flex-1 relative flex flex-col items-center gap-2", isLast ? "flex-none" : "")}>
                                {!isLast && (
                                    <div className={cn(
                                        "absolute top-3 left-[50%] w-full h-0.5 z-0",
                                        isCompleted ? "bg-emerald-500" : "bg-white/5"
                                    )} />
                                )}
                                <div className={cn(
                                    "relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all",
                                    isCompleted ? "bg-emerald-500 border-emerald-500 text-onyx" : "bg-onyx-950 border-white/10 text-diamond-muted",
                                    isCurrent && "ring-4 ring-emerald-500/20"
                                )}>
                                    {isCompleted ? <Check size={12} strokeWidth={3} /> : <Circle size={8} fill="currentColor" className="text-transparent" />}
                                </div>
                                <span className={cn(
                                    "text-xs font-medium whitespace-nowrap",
                                    isCompleted ? "text-emerald-500" : "text-diamond-muted",
                                    isCurrent && "font-bold text-white"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="info" className="space-y-6">
                        <TabsList className="bg-onyx-900 border border-white/5 p-1 w-full justify-start">
                            <TabsTrigger value="info" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Informações</TabsTrigger>
                            <TabsTrigger value="documents" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Documentos</TabsTrigger>
                            <TabsTrigger value="costs" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Custos</TabsTrigger>
                            <TabsTrigger value="tracking" className="data-[state=active]:bg-gold data-[state=active]:text-onyx text-diamond-muted">Tracking</TabsTrigger>
                        </TabsList>

                        <TabsContent value="info" className="space-y-6">
                            <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    <FileText size={18} className="text-gold" /> Detalhes do Processo
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                     <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Fornecedor</span>
                                        <div className="text-white font-medium">{importProcess.supplierName}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Referência</span>
                                        <div className="text-white font-medium font-mono">{importProcess.reference || "-"}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Transitário</span>
                                        <div className="text-white font-medium">{importProcess.forwarderName || "-"}</div>
                                    </div>
                                     <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Despachante</span>
                                        <div className="text-white font-medium">{importProcess.brokerName || "-"}</div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    <Ship size={18} className="text-blue-500" /> Logística
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Origem</span>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <MapPin size={14} className="text-diamond-muted" /> {importProcess.originPort}, {importProcess.originCountry}
                                        </div>
                                    </div>
                                     <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Destino</span>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <MapPin size={14} className="text-diamond-muted" /> {importProcess.destinationPort}, {importProcess.destinationCountry}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Incoterm</span>
                                        <Badge variant="outline" className="border-white/10 text-white font-mono">{importProcess.incoterm}</Badge>
                                    </div>
                                     <div className="space-y-1">
                                        <span className="text-xs text-diamond-muted uppercase">Via</span>
                                        <div className="text-white font-medium capitalize">{importProcess.transportType === 'sea' ? 'Marítimo' : 'Aéreo'}</div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    <Package size={18} className="text-gold" /> Ordens de Compra Associadas
                                </h3>
                                <div className="space-y-3">
                                    {importProcess.relatedPoIds.map(poId => {
                                        // In a real app, we would fetch the PO details. Here we mock find.
                                        const poCode = "PO-24-" + poId.replace('po', '00'); 
                                        return (
                                            <div key={poId} className="flex justify-between items-center p-3 rounded bg-onyx-950 border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gold/10 flex items-center justify-center text-gold">
                                                        <FileText size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-white">{poCode}</div>
                                                        <div className="text-xs text-diamond-muted">Associado ao processo</div>
                                                    </div>
                                                </div>
                                                {['arrived', 'released', 'delivered'].includes(importProcess.status) && (
                                                    <Link 
                                                        href={`/core/compras/recepcoes/nova?poId=${poId}`}
                                                        className={cn(
                                                            buttonVariants({ variant: "outline", size: "sm" }),
                                                            "h-8 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                                                        )}
                                                    >
                                                        Receber <ArrowRight size={12} className="ml-1" />
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {importProcess.relatedPoIds.length === 0 && (
                                        <div className="text-sm text-diamond-muted italic">Nenhuma PO associada.</div>
                                    )}
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="documents" className="space-y-6">
                             <DataGrid columns={docColumns} data={importProcess.documents} searchKey="name" />
                        </TabsContent>

                        <TabsContent value="costs" className="space-y-6">
                            <Card className="p-6 bg-onyx-900 border-white/5">
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                        <DollarSign size={18} className="text-emerald-500" /> Breakdown de Custos
                                    </h3>
                                    <div className="text-right">
                                        <div className="text-sm text-diamond-muted">Total Landed Cost Estimado</div>
                                        <div className="text-2xl font-bold text-gold font-mono">{formatCurrency(importProcess.totalLandedCostEstimated)}</div>
                                    </div>
                                </div>
                                <DataGrid columns={costColumns} data={importProcess.costs} searchKey="categoryName" />
                            </Card>
                        </TabsContent>

                         <TabsContent value="tracking" className="space-y-6">
                            <Card className="p-6 bg-onyx-900 border-white/5">
                                 <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                                    <MapPin size={18} className="text-gold" /> Histórico de Eventos
                                </h3>
                                <div className="space-y-8 relative pl-4 border-l border-white/10 ml-2">
                                    {importProcess.events.map((event, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-gold border-2 border-onyx-900" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-mono text-diamond-muted">{format(new Date(event.date), "PPP p")}</span>
                                                <span className="text-white font-medium">{event.description}</span>
                                                <div className="flex items-center gap-2 text-xs text-diamond-muted">
                                                    <MapPin size={12} /> {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {importProcess.events.length === 0 && (
                                        <div className="text-diamond-muted italic text-sm">Nenhum evento de tracking registado.</div>
                                    )}
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column: Key Info */}
                <div className="space-y-6">
                    <Card className="p-6 bg-onyx-900 border-white/5 space-y-4">
                        <h3 className="text-sm font-semibold text-diamond-muted uppercase">Datas Chave</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-diamond-muted flex items-center gap-2"><Calendar size={14}/> ETD (Saída)</span>
                                <span className="text-white font-mono text-sm">{format(new Date(importProcess.etd), "dd/MM/yyyy")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-diamond-muted flex items-center gap-2"><Calendar size={14}/> ETA (Chegada)</span>
                                <span className="text-white font-mono text-sm">{format(new Date(importProcess.eta), "dd/MM/yyyy")}</span>
                            </div>
                             <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                <span className="text-sm text-emerald-500 font-medium">Lead Time Restante</span>
                                <span className="text-white font-mono text-sm">15 dias</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5 space-y-4">
                        <h3 className="text-sm font-semibold text-diamond-muted uppercase">Valores</h3>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-diamond-muted">Mercadoria ({importProcess.currency})</span>
                                <span className="text-white font-mono text-sm">{importProcess.totalMerchandiseValue.toLocaleString()}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-sm text-diamond-muted">Câmbio</span>
                                <span className="text-white font-mono text-sm">110.265</span>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                <span className="text-sm text-white font-medium">Total FOB (CVE)</span>
                                <span className="text-white font-mono text-sm">{formatCurrency(importProcess.totalMerchandiseValue * 110.265)}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </CoreLayout>
    );
}
