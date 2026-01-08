"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, formatCurrency } from "@/lib/utils";
import { Incoterm, TransportType } from "@/types/imports";
import { mockPOs } from "@/types/purchasing";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CalendarIcon, Check, Package, Plane, Ship, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewImportPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [creationMethod, setCreationMethod] = useState<'po' | 'manual'>('po');
    const [selectedPoId, setSelectedPoId] = useState<string>("");
    
    // Form States
    const [formData, setFormData] = useState({
        supplierId: "",
        transportType: "sea" as TransportType,
        incoterm: "FOB" as Incoterm,
        originCountry: "",
        originPort: "",
        destinationPort: "Praia",
        etd: undefined as Date | undefined,
        eta: undefined as Date | undefined,
        forwarder: "",
        proformaValue: 0,
        currency: "EUR"
    });

    const handlePoSelect = (poId: string) => {
        const po = mockPOs.find(p => p.id === poId);
        if (po) {
            setSelectedPoId(poId);
            setFormData(prev => ({
                ...prev,
                supplierId: po.supplierId,
                proformaValue: po.total, // Using total as base
                // In a real app we would map more fields
            }));
        }
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const transportTypes: { value: TransportType; label: string; icon: any }[] = [
        { value: "sea", label: "Marítimo", icon: Ship },
        { value: "air", label: "Aéreo", icon: Plane },
        { value: "road", label: "Terrestre", icon: Truck },
    ];

    const incoterms: Incoterm[] = ["EXW", "FOB", "CIF", "DDP", "DAP"];

    return (
        <CoreLayout>
            <PageHeader
                title="Nova Importação"
                description="Inicie um novo processo de importação."
                backUrl="/core/compras/importacoes"
            >
                 <div className="flex gap-2">
                     <div className="flex items-center text-sm text-diamond-muted">
                        Passo <span className="text-gold font-mono mx-1">{step}</span> de 3
                     </div>
                 </div>
            </PageHeader>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                {/* Steps Sidebar */}
                <div className="space-y-4">
                    {[
                        { num: 1, title: "Origem" },
                        { num: 2, title: "Logística" },
                        { num: 3, title: "Revisão" }
                    ].map((s) => (
                        <div 
                            key={s.num}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border transition-all",
                                step === s.num 
                                    ? "bg-gold/10 border-gold/20 text-gold" 
                                    : step > s.num
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                        : "bg-onyx-900 border-white/5 text-diamond-muted"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-current",
                                step > s.num && "bg-emerald-500 text-white ring-0"
                            )}>
                                {step > s.num ? <Check size={14} /> : s.num}
                            </div>
                            <span className="font-medium text-sm">{s.title}</span>
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <Card className="p-6 bg-onyx-900 border-white/5 min-h-[500px]">
                    
                    {/* STEP 1: ORIGIN */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Origem da Importação</h3>
                                <div className="grid grid-cols-2 gap-4">
                                     <div 
                                        className={cn(
                                            "cursor-pointer p-4 rounded-lg border-2 transition-all flex flex-col gap-2 relative overflow-hidden",
                                            creationMethod === 'po' 
                                                ? "border-gold bg-gold/5" 
                                                : "border-white/5 bg-onyx-950 hover:bg-white/5"
                                        )}
                                        onClick={() => setCreationMethod('po')}
                                    >
                                        <div className="p-2 rounded bg-blue-500/10 text-blue-500 w-fit">
                                            <Package size={20} />
                                        </div>
                                        <div className="font-medium text-white">A partir de PO</div>
                                        <div className="text-xs text-diamond-muted">Vincular a uma Ordem de Compra existente</div>
                                    </div>

                                    <div 
                                        className={cn(
                                            "cursor-pointer p-4 rounded-lg border-2 transition-all flex flex-col gap-2 relative overflow-hidden",
                                            creationMethod === 'manual' 
                                                ? "border-gold bg-gold/5" 
                                                : "border-white/5 bg-onyx-950 hover:bg-white/5"
                                        )}
                                        onClick={() => setCreationMethod('manual')}
                                    >
                                         <div className="p-2 rounded bg-emerald-500/10 text-emerald-500 w-fit">
                                            <Package size={20} />
                                        </div>
                                        <div className="font-medium text-white">Manual</div>
                                        <div className="text-xs text-diamond-muted">Criar processo sem PO prévia</div>
                                    </div>
                                </div>
                            </div>

                            {creationMethod === 'po' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <Label>Selecione a Ordem de Compra (PO)</Label>
                                    <Select value={selectedPoId} onValueChange={handlePoSelect}>
                                        <SelectTrigger className="bg-onyx-950 border-white/10 text-white">
                                            <SelectValue placeholder="Selecione uma PO..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockPOs.filter(po => po.status === 'sent').map(po => (
                                                <SelectItem key={po.id} value={po.id} className="text-white">
                                                    <span className="font-mono text-gold mr-2">{po.code}</span>
                                                    <span>{po.supplierName}</span>
                                                    <span className="ml-2 text-diamond-muted text-xs">({formatCurrency(po.total)})</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                             {creationMethod === 'manual' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                     <Label>Fornecedor</Label>
                                     <Input placeholder="Nome do Fornecedor" className="bg-onyx-950 border-white/10" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 2: LOGISTICS */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                             <h3 className="text-lg font-semibold text-white mb-4">Dados Logísticos</h3>
                             
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>País de Origem</Label>
                                    <Input 
                                        value={formData.originCountry} 
                                        onChange={(e) => setFormData({...formData, originCountry: e.target.value})}
                                        className="bg-onyx-950 border-white/10" 
                                        placeholder="Ex: Portugal" 
                                    />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Porto de Origem</Label>
                                    <Input 
                                        value={formData.originPort} 
                                        onChange={(e) => setFormData({...formData, originPort: e.target.value})}
                                        className="bg-onyx-950 border-white/10" 
                                        placeholder="Ex: Leixões" 
                                    />
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label>Modal de Transporte</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {transportTypes.map((type) => (
                                            <div 
                                                key={type.value}
                                                className={cn(
                                                    "cursor-pointer p-2 rounded border text-center transition-all flex flex-col items-center gap-1",
                                                    formData.transportType === type.value
                                                        ? "border-gold bg-gold/10 text-gold" 
                                                        : "border-white/10 hover:bg-white/5 text-diamond-muted"
                                                )}
                                                onClick={() => setFormData({...formData, transportType: type.value})}
                                            >
                                                <type.icon size={16} />
                                                <span className="text-[10px] uppercase font-bold">{type.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                 </div>
                                  <div className="space-y-2">
                                    <Label>Incoterm</Label>
                                    <Select value={formData.incoterm} onValueChange={(v: Incoterm) => setFormData({...formData, incoterm: v})}>
                                        <SelectTrigger className="bg-onyx-950 border-white/10 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {incoterms.map((i) => (
                                                <SelectItem key={i} value={i}>{i}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                 </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>ETD (Estimada)</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal bg-onyx-950 border-white/10",
                                                    !formData.etd && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.etd ? format(formData.etd, "PPP") : <span>Selecione a data</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={formData.etd}
                                                onSelect={(d) => setFormData({...formData, etd: d})}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>Estimativa de Custo ({formData.currency})</Label>
                                    <Input 
                                        type="number"
                                        value={formData.proformaValue}
                                        onChange={(e) => setFormData({...formData, proformaValue: Number(e.target.value)})}
                                        className="bg-onyx-950 border-white/10 font-mono"
                                    />
                                </div>
                             </div>
                        </div>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-8 flex justify-between pt-4 border-t border-white/5">
                        {step > 1 ? (
                            <Button variant="outline" onClick={handleBack} className="border-white/10 text-white">
                                <ArrowLeft size={16} className="mr-2" /> Anterior
                            </Button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <Button onClick={handleNext} className="btn-primary" disabled={creationMethod === 'po' && !selectedPoId}>
                                Próximo <ArrowRight size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button className="bg-emerald-500 hover:bg-emerald-600 border-0 text-white" onClick={() => router.push('/core/compras/importacoes')}>
                                <Check size={16} className="mr-2" /> Confirmar Importação
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </CoreLayout>
    );
}
