"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { Calculator, DollarSign, Package, Percent, PieChart, RefreshCw, Save } from "lucide-react";
import { useState } from "react";

export default function LandedCostCalculatorPage() {
    const [currency, setCurrency] = useState("EUR");
    const [productValue, setProductValue] = useState("");
    const [freightCost, setFreightCost] = useState("");
    const [insuranceCost, setInsuranceCost] = useState("");
    const [dutyRate, setDutyRate] = useState("20");
    const [ivaRate, setIvaRate] = useState("15");

    const exchangeRate = currency === "EUR" ? 110.265 : 102.50; // Mock rates

    const calculateCosts = () => {
        const value = parseFloat(productValue) || 0;
        const freight = parseFloat(freightCost) || 0;
        const insurance = parseFloat(insuranceCost) || 0;
        
        const cif = value + freight + insurance;
        const cifCVE = cif * exchangeRate;
        const duties = cifCVE * (parseFloat(dutyRate) / 100);
        const taxableBase = cifCVE + duties;
        const iva = taxableBase * (parseFloat(ivaRate) / 100);
        const fees = 5000; // Fixed broker fee mock

        const totalLanded = cifCVE + duties + iva + fees;
        
        return { 
            cif, cifCVE, duties, iva, fees, totalLanded,
            unitFactor: value > 0 ? (totalLanded / (value * exchangeRate)).toFixed(2) : "0.00"
        };
    };

    const results = calculateCosts();

    return (
        <CoreLayout>
            <PageHeader
                title="Calculadora Landed Cost"
                description="Simule os custos totais de importação (FOB -> DDP)."
            >
                <Button variant="outline" className="border-white/10 text-diamond-muted hover:text-white" onClick={() => {
                    setProductValue(""); setFreightCost(""); setInsuranceCost("");
                }}>
                    <RefreshCw size={16} className="mr-2" /> Limpar
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="p-6 bg-onyx-900 border-white/5 space-y-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Package size={20} className="text-gold" /> Parâmetros da Carga
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Moeda Origem</Label>
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EUR">Euro (€)</SelectItem>
                                    <SelectItem value="USD">Dólar ($)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Taxa Câmbio (Estimada)</Label>
                            <Input value={exchangeRate} disabled className="bg-onyx-950/50 text-diamond-muted" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Valor Mercadoria (FOB)</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-diamond-muted" />
                            <Input 
                                type="number" 
                                placeholder="0.00" 
                                className="pl-9"
                                value={productValue}
                                onChange={(e) => setProductValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Frete Internacional</Label>
                             <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-diamond-muted" />
                                <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="pl-9"
                                    value={freightCost}
                                    onChange={(e) => setFreightCost(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Seguro</Label>
                             <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-diamond-muted" />
                                <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="pl-9"
                                    value={insuranceCost}
                                    onChange={(e) => setInsuranceCost(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                        <h4 className="text-sm font-medium text-white mb-4">Taxas Aduaneiras</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Direitos (%)</Label>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-diamond-muted" />
                                    <Input 
                                        type="number" 
                                        className="pl-9"
                                        value={dutyRate}
                                        onChange={(e) => setDutyRate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>IVA (%)</Label>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-diamond-muted" />
                                    <Input 
                                        type="number" 
                                        className="pl-9"
                                        value={ivaRate}
                                        onChange={(e) => setIvaRate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    <Card className="p-6 bg-onyx-900 border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Calculator size={20} className="text-emerald-500" /> Resultados Estimados (CVE)
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-dashed border-white/10">
                                <span className="text-diamond-muted">Valor CIF</span>
                                <span className="font-mono text-white">{formatCurrency(results.cifCVE)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-dashed border-white/10">
                                <span className="text-diamond-muted">Direitos Aduaneiros</span>
                                <span className="font-mono text-white">{formatCurrency(results.duties)}</span>
                            </div>
                             <div className="flex justify-between items-center py-2 border-b border-dashed border-white/10">
                                <span className="text-diamond-muted">IVA (15%)</span>
                                <span className="font-mono text-white">{formatCurrency(results.iva)}</span>
                            </div>
                             <div className="flex justify-between items-center py-2 border-b border-dashed border-white/10">
                                <span className="text-diamond-muted">Despesas Locais (Est.)</span>
                                <span className="font-mono text-white">{formatCurrency(results.fees)}</span>
                            </div>
                            
                            <div className="pt-4 flex justify-between items-end">
                                <div>
                                    <div className="text-sm text-diamond-muted uppercase tracking-wider mb-1">Custo Total Landed</div>
                                    <div className="text-3xl font-bold text-white font-serif tracking-tight">
                                        {formatCurrency(results.totalLanded)}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
                                        Fator: x{results.unitFactor}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-onyx-900 border-white/5 flex flex-col justify-center items-center text-center space-y-4 min-h-[200px]">
                         <PieChart size={48} className="text-onyx-800" />
                         <div>
                            <h4 className="text-white font-medium">Distribuição de Custos</h4>
                            <p className="text-sm text-diamond-muted max-w-xs mx-auto mt-2">
                                Mercadoria: {((results.cifCVE / results.totalLanded) * 100 || 0).toFixed(1)}% <br/>
                                Impostos & Taxas: {(((results.duties + results.iva + results.fees) / results.totalLanded) * 100 || 0).toFixed(1)}%
                            </p>
                         </div>
                    </Card>

                    <Button className="w-full btn-primary h-12 text-base">
                        <Save size={18} className="mr-2" /> Salvar Simulação
                    </Button>
                </div>
            </div>
        </CoreLayout>
    );
}
