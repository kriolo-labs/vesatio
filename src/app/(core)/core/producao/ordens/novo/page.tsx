"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ProductionItem, ProductionPriority } from "@/types/production";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductionOrderPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Order State
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<ProductionPriority>("medium");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // Items State
  const [items, setItems] = useState<Partial<ProductionItem>[]>([]);

  const handleAddItem = () => {
    setItems([...items, { id: crypto.randomUUID(), description: "", quantity: 1 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof ProductionItem, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSave = async () => {
    if (!description || !projectId) {
      toast({
        title: "Erro de validação",
        description: "Preencha os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ordem criada",
      description: "A ordem de produção foi criada com sucesso.",
    });

    // Mock save logic
    console.log({ projectId, description, priority, startDate, endDate, items });
    router.push("/core/producao/ordens");
  };

  return (
    <CoreLayout>
      <PageHeader title="Nova Ordem de Produção" description="Criar uma nova ordem para a fábrica.">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-diamond-muted hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Button size="sm" className="btn-primary gap-2" onClick={handleSave}>
            <Save size={16} />
            Criar Ordem
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="space-y-4 border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Informações Gerais</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Projeto Vinculado</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proj-001">Residência Silva</SelectItem>
                    <SelectItem value="proj-002">Escritório Central</SelectItem>
                    <SelectItem value="proj-003">Apartamento Modelo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select
                  value={priority}
                  onValueChange={(v) => setPriority(v as ProductionPriority)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Descrição Geral</Label>
                <Input
                  placeholder="Ex: Cozinha Completa em MDF..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Início Planeado</Label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>

              <div className="space-y-2">
                <Label>Conclusão Planeada</Label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
          </Card>

          <Card className="border-white/5 bg-onyx-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Itens a Produzir</h3>
              <Button variant="outline" size="sm" onClick={handleAddItem} className="gap-2">
                <Plus size={16} />
                Adicionar Item
              </Button>
            </div>

            <div className="space-y-4">
              {items.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/10 py-8 text-center text-sm text-diamond-muted">
                  Nenhum item adicionado à ordem.
                </div>
              )}

              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-start gap-4 rounded-lg border border-white/5 bg-white/5 p-4"
                >
                  <span className="col-span-12 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 font-mono text-xs text-diamond-muted md:col-span-1">
                    {index + 1}
                  </span>

                  <div className="col-span-12 space-y-2 md:col-span-7">
                    <Input
                      placeholder="Descrição do item (ex: Balcão inferior)"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id!, "description", e.target.value)}
                      className="bg-onyx-950 border-white/10"
                    />
                    <Textarea
                      placeholder="Especificações técnicas..."
                      value={item.specifications as string}
                      onChange={(e) => handleUpdateItem(item.id!, "specifications", e.target.value)}
                      className="bg-onyx-950 h-20 border-white/10 text-xs"
                    />
                  </div>

                  <div className="col-span-6 space-y-2 md:col-span-3">
                    <Input
                      type="number"
                      placeholder="Qtd"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateItem(item.id!, "quantity", parseInt(e.target.value))
                      }
                      className="bg-onyx-950 border-white/10"
                    />
                  </div>

                  <div className="col-span-6 flex justify-end md:col-span-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => handleRemoveItem(item.id!)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Summary / Helper */}
        <div className="space-y-6">
          <Card className="sticky top-6 border-white/5 bg-onyx-900 p-6">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Resumo
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-diamond-muted">Total de Itens</span>
                <span className="font-mono text-white">{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-diamond-muted">Qtd. Total Peças</span>
                <span className="font-mono text-white">
                  {items.reduce((acc, item) => acc + (item.quantity || 0), 0)}
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-xs text-blue-200">
                <strong className="mb-1 block text-blue-100">Dica:</strong>
                Após salvar a ordem, você poderá detalhar o BOM (Lista de Materiais) para cada item
                na aba de detalhes.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
