"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CuttingPlanItem } from "@/types/production";
import { BrainCircuit, Download, Layers, Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CuttingPlansPage() {
  const { toast } = useToast();
  const [material, setMaterial] = useState("mdf-white-18");
  const [sheetWidth, setSheetWidth] = useState(2750);
  const [sheetHeight, setSheetHeight] = useState(1830);
  const [parts, setParts] = useState<Partial<CuttingPlanItem>[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAddPart = () => {
    setParts([...parts, { id: crypto.randomUUID(), length: 500, width: 300, quantity: 1 }]);
  };

  const handleRemovePart = (id: string) => {
    setParts(parts.filter((p) => p.id !== id));
  };

  const handleUpdatePart = (id: string, field: keyof CuttingPlanItem, value: any) => {
    setParts(parts.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleGenerate = () => {
    if (parts.length === 0) {
      toast({
        title: "Adicione peças",
        description: "A lista de corte está vazia.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AURA processing
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        totalSheets: 2,
        waste: 12.5,
        cutPath: "M0,0 ...", // Placeholder
      });
      toast({ title: "Plano Gerado", description: "Otimização concluída com sucesso." });
    }, 2000);
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Gerador de Planos de Corte"
        description="Otimização de uso de material com AURA."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-white/10 text-diamond-muted">
            Histórico
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Configuration Panel */}
        <div className="space-y-6 lg:col-span-4">
          <Card className="space-y-4 border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
              <Layers size={18} /> Material Base
            </h3>

            <div className="space-y-2">
              <Label>Tipo de Material</Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdf-white-18">MDF Branco Tx 18mm</SelectItem>
                  <SelectItem value="mdf-oak-18">MDF Carvalho 18mm</SelectItem>
                  <SelectItem value="plywood-15">Contraplacado 15mm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Largura (mm)</Label>
                <Input
                  type="number"
                  value={sheetWidth}
                  onChange={(e) => setSheetWidth(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Comprimento (mm)</Label>
                <Input
                  type="number"
                  value={sheetHeight}
                  onChange={(e) => setSheetHeight(Number(e.target.value))}
                />
              </div>
            </div>
          </Card>

          <Card className="space-y-4 border-white/5 bg-onyx-900 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Peças</h3>
              <Button variant="ghost" size="sm" onClick={handleAddPart}>
                <Plus size={16} />
              </Button>
            </div>

            <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
              {parts.map((part, idx) => (
                <div
                  key={part.id}
                  className="space-y-2 rounded border border-white/5 bg-white/5 p-3 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-diamond-muted">#{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 text-diamond-muted hover:text-red-500"
                      onClick={() => handleRemovePart(part.id!)}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="L"
                      className="h-7 text-xs"
                      type="number"
                      value={part.length}
                      onChange={(e) => handleUpdatePart(part.id!, "length", Number(e.target.value))}
                    />
                    <Input
                      placeholder="W"
                      className="h-7 text-xs"
                      type="number"
                      value={part.width}
                      onChange={(e) => handleUpdatePart(part.id!, "width", Number(e.target.value))}
                    />
                    <Input
                      placeholder="Qtd"
                      className="h-7 text-xs"
                      type="number"
                      value={part.quantity}
                      onChange={(e) =>
                        handleUpdatePart(part.id!, "quantity", Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="btn-primary w-full gap-2"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <BrainCircuit className="animate-pulse" size={18} /> Otimizando...
                </>
              ) : (
                <>
                  <Play size={18} /> Gerar Plano
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Result Panel */}
        <div className="lg:col-span-8">
          {result ? (
            <Card className="flex h-full flex-col border-white/5 bg-onyx-900 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Resultado da Otimização</h3>
                  <div className="mt-2 flex gap-4 text-sm text-diamond-muted">
                    <span>
                      Chapas: <strong className="text-white">{result.totalSheets}</strong>
                    </span>
                    <span>
                      Desperdício: <strong className="text-white">{result.waste}%</strong>
                    </span>
                    <span>
                      Aproveitamento:{" "}
                      <strong className="text-green-400">{100 - result.waste}%</strong>
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="gap-2 border-white/10">
                  <Download size={16} /> Exportar DXF
                </Button>
              </div>

              <div className="bg-onyx-950 flex flex-1 items-center justify-center rounded-lg border border-white/10 p-8">
                {/* Mock Visualization */}
                <div className="relative h-full w-full border-2 border-dashed border-white/10 p-4">
                  <div className="absolute left-2 top-2 text-xs text-white/20">Chapa 1/2</div>
                  <div className="absolute left-10 top-10 flex h-[60%] w-[80%] items-center justify-center border border-gold/30 bg-gold/10 text-xs text-gold">
                    Peça 1
                  </div>
                  <div className="absolute left-10 top-[75%] flex h-[20%] w-[80%] items-center justify-center border border-gold/30 bg-gold/10 text-xs text-gold">
                    Peça 2
                  </div>
                  <div className="absolute right-8 top-10 flex h-[60%] w-[15%] items-center justify-center border border-gold/30 bg-gold/10 text-xs text-gold">
                    Peça 3
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 p-12 text-diamond-muted">
              <Layers size={48} className="mb-4 text-white/10" />
              <p className="text-lg font-medium text-white/50">Nenhum plano gerado</p>
              <p className="text-sm">Configure o material e adicione peças para iniciar.</p>
            </div>
          )}
        </div>
      </div>
    </CoreLayout>
  );
}
