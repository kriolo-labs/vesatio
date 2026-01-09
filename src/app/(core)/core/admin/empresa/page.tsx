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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, Trash2, Upload } from "lucide-react";

export default function CompanySettingsPage() {
  return (
    <CoreLayout>
      <PageHeader
        title="Configurações do Sistema"
        description="Gestão centralizada de parâmetros da empresa e módulos."
      >
        <div className="flex gap-2">
          <Button className="btn-primary gap-2">
            <Save size={16} /> Salvar Alterações
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="geral" className="w-full space-y-6">
        <TabsList className="border border-white/5 bg-onyx-900 p-1">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="compras">Compras</TabsTrigger>
          <TabsTrigger value="projetos">Projetos</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        {/* --- GERAL --- */}
        <TabsContent value="geral" className="space-y-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
                <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
                  Informação Legal
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nome Comercial</Label>
                    <Input defaultValue="Vesatio" />
                  </div>
                  <div className="space-y-2">
                    <Label>Razão Social</Label>
                    <Input defaultValue="Vesatio Architecture & Design Lda." />
                  </div>
                  <div className="space-y-2">
                    <Label>NIF / Tax ID</Label>
                    <Input defaultValue="250123456" />
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input defaultValue="https://vesatio.com" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Endereço Sede</Label>
                    <Input defaultValue="Av. Amilcar Cabral, Praia, Cabo Verde" />
                  </div>
                </div>
              </Card>
              <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
                <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
                  Contactos & Regional
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email Geral</Label>
                    <Input defaultValue="info@vesatio.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone Principal</Label>
                    <Input defaultValue="+238 999 99 99" />
                  </div>
                  <div className="space-y-2">
                    <Label>Moeda Padrão</Label>
                    <Input
                      defaultValue="CVE (Escudo Cabo-verdiano)"
                      disabled
                      className="bg-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Input
                      defaultValue="Atlantic/Cape_Verde (GMT-1)"
                      disabled
                      className="bg-white/5"
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="space-y-6 lg:col-span-1">
              <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
                <h3 className="border-b border-white/5 pb-2 font-semibold text-white">Branding</h3>
                <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 p-6 transition-colors hover:bg-white/5">
                  <div className="bg-onyx-950 mb-4 flex h-20 w-20 items-center justify-center rounded border border-white/10">
                    <span className="font-serif text-2xl text-white">V</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Upload size={14} /> Alterar Logotipo
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cor Primária</Label>
                    <div className="flex gap-2">
                      <div className="h-9 w-9 shrink-0 rounded border border-white/10 bg-[#D4AF37]"></div>
                      <Input defaultValue="#D4AF37" className="font-mono" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor Secundária</Label>
                    <div className="flex gap-2">
                      <div className="h-9 w-9 shrink-0 rounded border border-white/10 bg-[#353839]"></div>
                      <Input defaultValue="#353839" className="font-mono" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- FINANCEIRO --- */}
        <TabsContent value="financeiro" className="space-y-6">
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
              Moedas Adicionais & Câmbio
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center justify-between rounded border border-white/5 bg-white/5 p-4">
                <div>
                  <p className="font-bold text-white">USD (Dólar Americano)</p>
                  <p className="text-xs text-diamond-muted">Taxa Fixa: 102.50 CVE</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded border border-white/5 bg-white/5 p-4">
                <div>
                  <p className="font-bold text-white">EUR (Euro)</p>
                  <p className="text-xs text-diamond-muted">Taxa Fixa: 110.265 CVE</p>
                </div>
                <Switch defaultChecked disabled />
              </div>
            </div>
          </Card>
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
              Contas Bancárias da Empresa
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded border border-white/5 bg-white/5 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gold/20 font-bold text-gold">
                  BCA
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">BCA - Conta Principal</p>
                  <p className="font-mono text-xs text-diamond-muted">
                    IBAN: CV64 0001 0000 1234 5678 9012 3
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full border-dashed border-white/10 text-diamond-muted hover:text-white"
              >
                <Plus size={16} className="mr-2" /> Adicionar Nova Conta
              </Button>
            </div>
          </Card>
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">Faturação</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Próximo Número de Fatura</Label>
                <Input defaultValue="FT 2024/0045" className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label>Termos de Pagamento Padrão</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="border-white/10 bg-onyx-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">A Pronto</SelectItem>
                    <SelectItem value="30">30 Dias</SelectItem>
                    <SelectItem value="60">60 Dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* --- COMPRAS --- */}
        <TabsContent value="compras" className="space-y-6">
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
              Políticas de Aprovação
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Exigir 3 Orçamentos</Label>
                  <p className="text-xs text-diamond-muted">
                    Para compras acima de um determinado valor.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input className="w-32 text-right" defaultValue="50000" />
                  <span className="text-sm font-bold text-diamond-muted">CVE</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Aprovação de Gerência</Label>
                  <p className="text-xs text-diamond-muted">
                    Necessária para qualquer despesa acima de:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input className="w-32 text-right" defaultValue="100000" />
                  <span className="text-sm font-bold text-diamond-muted">CVE</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* --- PROJETOS --- */}
        <TabsContent value="projetos" className="space-y-6">
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
              Padrões de Projeto
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Margem de Lucro Target (%)</Label>
                <Input defaultValue="25" type="number" />
              </div>
              <div className="space-y-2">
                <Label>Formato Código Projeto</Label>
                <Input defaultValue="PRJ-{YYYY}-{000}" className="font-mono" />
              </div>
            </div>
          </Card>
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">Fases Padrão</h3>
            <div className="space-y-2">
              {["Estudo Prévio", "Licenciamento", "Execução", "Acompanhamento Obra"].map(
                (phase, i) => (
                  <div key={i} className="flex gap-2">
                    <Input defaultValue={phase} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-diamond-muted hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                )
              )}
              <Button variant="ghost" className="pl-0 text-gold hover:text-gold/80">
                <Plus size={16} className="mr-2" /> Adicionar Fase
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* --- SEGURANÇA --- */}
        <TabsContent value="seguranca" className="space-y-6">
          <Card className="space-y-6 border-white/5 bg-onyx-900 p-6">
            <h3 className="border-b border-white/5 pb-2 font-semibold text-white">
              Políticas de Acesso
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Autenticação de Dois Fatores (2FA)</Label>
                  <p className="text-xs text-diamond-muted">
                    Obrigatório para Administradores e Financeiro.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Tempo Limite de Sessão</Label>
                  <p className="text-xs text-diamond-muted">Logout automático após inatividade.</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-40 border-white/10 bg-onyx-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Minutos</SelectItem>
                    <SelectItem value="60">1 Hora</SelectItem>
                    <SelectItem value="480">8 Horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Política de Password</Label>
                <div className="space-y-2 rounded bg-white/5 p-3 text-sm text-diamond-muted">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked disabled /> Mínimo 8 caracteres
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked /> Exigir caractere especial
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked /> Exigir número
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* --- WORKFLOWS --- */}
        <TabsContent value="workflows" className="space-y-6">
          <Card className="border-white/5 bg-onyx-900 p-6">
            <div className="space-y-4 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-diamond-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                  <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                  <line x1="6" x2="6.01" y1="6" y2="6" />
                  <line x1="6" x2="6.01" y1="18" y2="18" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Automação de Processos</h3>
              <p className="mx-auto max-w-md text-diamond-muted">
                Em breve: configure fluxos de aprovação visuais para feriados, compras e projetos
                usando um editor drag-and-drop.
              </p>
              <Button variant="outline" disabled>
                Editor de Workflow (Alpha)
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </CoreLayout>
  );
}
