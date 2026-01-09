"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
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
import { ContractType } from "@/types/documents";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewContractPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<ContractType>("client");
  const [entityName, setEntityName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSave = async () => {
    if (!title || !entityName || !type) {
      toast({
        title: "Erro de validação",
        description: "Preencha os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contrato registado",
      description: "O contrato foi salvo com sucesso.",
    });

    console.log({ title, type, entityName, startDate, endDate, value, description, file });
    router.push("/core/documentos/contratos");
  };

  return (
    <CoreLayout>
      <PageHeader title="Novo Contrato" description="Registar um novo documento contratual.">
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
            Salvar Contrato
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Dados Principais</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="col-span-2 space-y-2">
                  <Label>Título do Contrato</Label>
                  <Input
                    placeholder="Ex: Prestação de Serviços - Projeto X"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Contrato</Label>
                  <Select value={type} onValueChange={(v) => setType(v as ContractType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Cliente</SelectItem>
                      <SelectItem value="supplier">Fornecedor</SelectItem>
                      <SelectItem value="employee">Colaborador (RH)</SelectItem>
                      <SelectItem value="partnership">Parceria</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Entidade Relacionada</Label>
                  {/* In a real app, this would be an async select search based on Type */}
                  <Input
                    placeholder="Nome do Cliente/Fornecedor/Colaborador"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data Início</Label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>

                <div className="space-y-2">
                  <Label>Data Fim (Opcional)</Label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>

                <div className="space-y-2">
                  <Label>Valor do Contrato (CVE)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <h3 className="text-lg font-semibold text-white">Condições & Detalhes</h3>
              <div className="space-y-2">
                <Label>Descrição / Notas</Label>
                <Textarea
                  className="bg-onyx-950 min-h-[100px]"
                  placeholder="Resumo das condições, cláusulas importantes ou observações..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <Card className="space-y-4 border-white/5 bg-onyx-900 p-6">
            <h3 className="text-lg font-semibold text-white">Documento Digital</h3>
            <p className="text-xs text-diamond-muted">
              Faça upload do contrato assinado (PDF) para arquivamento.
            </p>

            <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 p-6 text-center transition-colors hover:bg-white/5">
              <FileUpload onFileSelect={setFile} acceptedTypes=".pdf,.doc,.docx" maxSizeMB={10} />
            </div>
          </Card>

          <Card className="space-y-4 border-white/5 bg-onyx-900 p-6">
            <h3 className="text-lg font-semibold text-white">Configurações</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="cursor-pointer">Alerta de Vencimento</Label>
                <input type="checkbox" className="accent-gold" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="cursor-pointer">Renovação Automática</Label>
                <input type="checkbox" className="accent-gold" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
