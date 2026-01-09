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
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Database,
  Eye,
  FileText,
  Filter,
  List,
  Save,
  Table,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Step = "source" | "fields" | "filters" | "visual" | "save";

export default function NewReportPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("source");

  // Form State
  const [source, setSource] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [visualization, setVisualization] = useState("table");
  const [reportName, setReportName] = useState("");

  const steps = [
    { id: "source", label: "Fonte de Dados", icon: Database },
    { id: "fields", label: "Campos", icon: List },
    { id: "filters", label: "Filtros", icon: Filter },
    { id: "visual", label: "Visualização", icon: Eye },
    { id: "save", label: "Salvar", icon: Save },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    if (currentStep === "source" && !source) {
      toast({ title: "Selecione uma fonte", variant: "destructive" });
      return;
    }
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id as Step);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id as Step);
    }
  };

  const handleSave = () => {
    if (!reportName) {
      toast({ title: "Defina um nome para o relatório", variant: "destructive" });
      return;
    }
    toast({ title: "Relatório salvo com sucesso!" });
    router.push("/core/bi/relatorios");
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Novo Relatório Personalizado"
        description="Assistente de criação de relatórios."
      >
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-diamond-muted hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Cancelar
        </Button>
      </PageHeader>

      {/* Stepper */}
      <div className="mb-8">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-white/5" />
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="bg-onyx-950 flex flex-col items-center gap-2 px-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    isActive
                      ? "text-onyx-950 border-gold bg-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      : isCompleted
                        ? "bg-onyx-950 border-gold text-gold"
                        : "border-white/10 bg-onyx-900 text-diamond-muted"
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : <step.icon size={18} />}
                </div>
                <span
                  className={`text-xs font-medium ${isActive ? "text-white" : "text-diamond-muted"}`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Card className="min-h-[400px] border-white/5 bg-onyx-900 p-6">
            {currentStep === "source" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Escolha a Fonte de Dados
                  </h3>
                  <p className="text-sm text-diamond-muted">
                    Selecione a tabela ou entidade base para o seu relatório.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {["Vendas", "Projetos", "Financeiro", "Produção", "RH", "Clientes"].map((opt) => (
                    <div
                      key={opt}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${source === opt ? "border-gold bg-gold/10" : "border-white/5 bg-white/5 hover:border-white/20"}`}
                      onClick={() => setSource(opt)}
                    >
                      <div className="flex items-center gap-3">
                        <Database
                          className={source === opt ? "text-gold" : "text-diamond-muted"}
                          size={20}
                        />
                        <span
                          className={`font-medium ${source === opt ? "text-gold" : "text-white"}`}
                        >
                          {opt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "fields" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Selecione os Campos</h3>
                  <p className="text-sm text-diamond-muted">
                    Escolha quais colunas devem aparecer no relatório.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "ID",
                    "Nome",
                    "Data Criação",
                    "Valor Total",
                    "Status",
                    "Cliente",
                    "Responsável",
                  ].map((field) => (
                    <div
                      key={field}
                      className="flex items-center gap-2 rounded border border-white/5 bg-white/5 p-3"
                    >
                      <input
                        type="checkbox"
                        className="accent-gold"
                        id={field}
                        checked={selectedFields.includes(field)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedFields([...selectedFields, field]);
                          else setSelectedFields(selectedFields.filter((f) => f !== field));
                        }}
                      />
                      <label
                        htmlFor={field}
                        className="cursor-pointer select-none text-sm text-white"
                      >
                        {field}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "filters" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Defina Filtros (Opcional)
                  </h3>
                  <p className="text-sm text-diamond-muted">Restrinja os dados exibidos.</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded border border-white/5 bg-white/5 p-8 text-diamond-muted">
                  <Filter size={32} className="mb-2 opacity-50" />
                  <p>Nenhum filtro aplicado.</p>
                  <Button variant="ghost" className="text-gold">
                    Adicionar Filtro
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "visual" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Tipo de Visualização</h3>
                  <p className="text-sm text-diamond-muted">
                    Como você quer apresentar estes dados?
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "table", label: "Tabela", icon: Table },
                    { id: "bar", label: "Gráfico de Barras", icon: BarChart3 },
                    { id: "pie", label: "Gráfico de Pizza", icon: FileText }, // using FileText as placeholder for unknown icon
                  ].map((v) => (
                    <div
                      key={v.id}
                      className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border p-6 transition-all ${visualization === v.id ? "border-gold bg-gold/10" : "border-white/5 bg-white/5 hover:border-white/20"}`}
                      onClick={() => setVisualization(v.id)}
                    >
                      <v.icon
                        className={visualization === v.id ? "text-gold" : "text-diamond-muted"}
                        size={24}
                      />
                      <span
                        className={`text-sm font-medium ${visualization === v.id ? "text-gold" : "text-white"}`}
                      >
                        {v.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "save" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Finalizar Relatório</h3>
                  <p className="text-sm text-diamond-muted">
                    Defina os detalhes finais para salvar.
                  </p>
                </div>
                <div className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <Label>Nome do Relatório</Label>
                    <Input
                      placeholder="Ex: Relatório de Vendas Mensal"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="operacional">Operacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <input type="checkbox" id="public" className="accent-gold" />
                    <label htmlFor="public" className="cursor-pointer text-sm text-diamond-muted">
                      Tornar público para a organização
                    </label>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="border-white/10"
            >
              Anterior
            </Button>

            {currentStep === "save" ? (
              <Button className="btn-primary gap-2" onClick={handleSave}>
                <Save size={16} /> Salvar Relatório
              </Button>
            ) : (
              <Button className="btn-primary gap-2" onClick={handleNext}>
                Próximo <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>

        {/* Preview / Context Column */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-white/5 bg-onyx-900 p-6">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Resumo
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Fonte</span>
                <span className="font-medium text-white">{source || "-"}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Campos</span>
                <span className="font-medium text-white">{selectedFields.length} selecionados</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Filtros</span>
                <span className="font-medium text-white">{filters.length} ativos</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-diamond-muted">Visualização</span>
                <span className="font-medium capitalize text-white">{visualization}</span>
              </div>
            </div>
          </Card>

          <div className="rounded-lg border border-gold/10 bg-gold/5 p-4">
            <p className="text-xs leading-relaxed text-gold/80">
              <strong className="mb-1 block">Dica Pro:</strong>
              Relatórios do tipo "Tabela" permitem exportação direta para Excel. Gráficos são ideais
              para dashboards.
            </p>
          </div>
        </div>
      </div>
    </CoreLayout>
  );
}
