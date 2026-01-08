"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { EmployeeStatus, mockEmployees } from "@/types/rh";
import {
  AlertCircle,
  Award,
  Briefcase,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Smartphone,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const employee = mockEmployees.find((e) => e.id === id) || mockEmployees[0]; // Fallback to first for demo if id not found

  const getStatusColor = (status: EmployeeStatus) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "inactive":
        return "bg-white/10 text-diamond-muted border-white/10";
      case "on_leave":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "terminated":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-white/10 text-diamond-muted border-white/10";
    }
  };

  const getStatusLabel = (status: EmployeeStatus) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "on_leave":
        return "Ausente";
      case "terminated":
        return "Desligado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title={employee ? `${employee.firstName} ${employee.lastName}` : "Colaborador"}
        description={employee?.role || "Detalhe do Colaborador"}
        backUrl="/core/rh/colaboradores"
      >
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
            <Pencil className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
          <Button
            variant="destructive"
            className="border-rose-500/20 bg-rose-500/10 text-rose-500 shadow-none hover:bg-rose-500/20"
          >
            Desativar Acesso
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar Summary */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="flex flex-col items-center border-white/5 bg-onyx-900 p-6 text-center">
            <Avatar className="mb-4 h-32 w-32 border-4 border-onyx">
              <AvatarImage src={employee.avatarUrl} />
              <AvatarFallback className="bg-onyx-800 text-2xl">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="mb-1 font-serif text-xl text-white">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="mb-3 text-sm text-gold">{employee.role}</p>
            <Badge variant="outline" className={getStatusColor(employee.status)}>
              {getStatusLabel(employee.status)}
            </Badge>

            <div className="mt-6 w-full space-y-4 text-left">
              <div className="flex items-center text-sm text-diamond-muted">
                <Briefcase className="mr-3 h-4 w-4 text-gold/50" />
                <div>
                  <p className="text-xs opacity-50">Departamento</p>
                  <p className="capitalize text-diamond">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-diamond-muted">
                <Mail className="mr-3 h-4 w-4 text-gold/50" />
                <div className="overflow-hidden">
                  <p className="text-xs opacity-50">Email</p>
                  <p className="truncate text-diamond">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-diamond-muted">
                <Phone className="mr-3 h-4 w-4 text-gold/50" />
                <div>
                  <p className="text-xs opacity-50">Telefone</p>
                  <p className="text-diamond">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-diamond-muted">
                <MapPin className="mr-3 h-4 w-4 text-gold/50" />
                <div>
                  <p className="text-xs opacity-50">Localidade</p>
                  <p className="text-diamond">Lisboa, PT</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-white/5 bg-onyx-900 p-6">
            <h3 className="mb-4 flex items-center text-sm font-medium text-white">
              <Award className="mr-2 h-4 w-4 text-gold" /> Próxima Avaliação
            </h3>
            <div className="space-y-4">
              <div className="rounded border border-white/5 bg-white/5 p-3">
                <div className="mb-1 text-xs text-diamond-muted">Data Prevista</div>
                <div className="font-mono text-diamond">15 Dez 2024</div>
              </div>
              <Button className="w-full border-white/10" variant="outline">
                Agendar Reunião
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="h-auto w-full justify-start gap-4 overflow-x-auto rounded-none border-b border-white/5 bg-transparent p-0">
              <TabsTrigger
                value="profile"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <User className="mr-2 h-4 w-4" /> Pessoal
              </TabsTrigger>
              <TabsTrigger
                value="contract"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <Briefcase className="mr-2 h-4 w-4" /> Contrato
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <CreditCard className="mr-2 h-4 w-4" /> Remuneração
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <FileText className="mr-2 h-4 w-4" /> Documentos
              </TabsTrigger>
              <TabsTrigger
                value="vacation"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <Calendar className="mr-2 h-4 w-4" /> Férias
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <Smartphone className="mr-2 h-4 w-4" /> Equipamento
              </TabsTrigger>
            </TabsList>

            {/* TAB: Personal Profile */}
            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card className="border-white/5 bg-onyx-900">
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Personal details fields would typically be Inputs, here displayed as read-only for view */}
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">Data de Nascimento</Label>
                    <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                      {new Date(employee.birthDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">Nacionalidade</Label>
                    <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                      {employee.nacionality}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">NIF</Label>
                    <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                      {employee.nif}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">Estado Civil</Label>
                    <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                      Solteiro(a)
                    </div>
                  </div>
                  <div className="col-span-1 space-y-1 md:col-span-2">
                    <Label className="text-xs text-diamond-muted">Endereço Completo</Label>
                    <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                      {employee.address}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/5 bg-onyx-900">
                <CardHeader>
                  <CardTitle>Contacto de Emergência</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">Nome do Contacto</Label>
                    <div className="text-sm text-diamond">{employee.emergencyContact.name}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">Parentesco</Label>
                    <div className="text-sm text-diamond">{employee.emergencyContact.relation}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-diamond-muted">Telefone</Label>
                    <div className="text-sm text-diamond">{employee.emergencyContact.phone}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: Contract */}
            <TabsContent value="contract" className="mt-6 space-y-6">
              <Card className="border-white/5 bg-onyx-900">
                <CardHeader>
                  <CardTitle>Informações Contratuais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">Tipo de Contrato</Label>
                      <div className="rounded border border-white/5 bg-white/5 p-2 text-sm capitalize text-diamond">
                        {employee.contractType.replace("_", " ")}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">Data de Admissão</Label>
                      <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                        {new Date(employee.admissionDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">Cargo Atual</Label>
                      <div className="rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                        {employee.role}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">Departamento</Label>
                      <div className="rounded border border-white/5 bg-white/5 p-2 text-sm capitalize text-diamond">
                        {employee.department}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">Superior Hierárquico</Label>
                      <div className="flex items-center rounded border border-white/5 bg-white/5 p-2 text-sm text-diamond">
                        {employee.managerId ? (
                          // This would ideally lookup the manager name
                          <span className="flex items-center">
                            <User size={14} className="mr-2 opacity-50" /> Ana Silva
                          </span>
                        ) : (
                          <span className="italic text-diamond-muted">Não atribuído</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6">
                    <h4 className="mb-4 font-serif text-sm text-white">Histórico de Cargos</h4>
                    <div className="relative space-y-6 border-l border-white/10 pl-4">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-gold"></div>
                        <p className="text-sm font-medium text-diamond">{employee.role}</p>
                        <p className="text-xs text-diamond-muted">
                          {new Date(employee.admissionDate).getFullYear()} - Presente
                        </p>
                      </div>
                      {/* Dummy history item */}
                      <div className="relative opacity-50">
                        <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-white/20"></div>
                        <p className="text-sm font-medium text-diamond">Estagiário</p>
                        <p className="text-xs tracking-wider text-diamond-muted">2019 - 2020</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: Financial/Remuneration */}
            <TabsContent value="financial" className="mt-6 space-y-6">
              <Alert className="border-amber-500/20 bg-amber-500/10 text-amber-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Acesso Restrito</AlertTitle>
                <AlertDescription>
                  As informações de remuneração são confidenciais e visíveis apenas para RH e
                  Administração.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="border-white/5 bg-onyx-900">
                  <CardHeader>
                    <CardTitle>Vencimento & Benefícios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 py-2">
                      <span className="text-sm text-diamond-muted">Salário Base Bruto</span>
                      <span className="font-serif text-lg text-white">
                        {formatCurrency(employee.baseSalary)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 py-2">
                      <span className="text-sm text-diamond-muted">Subsídio de Alimentação</span>
                      <span className="text-sm text-diamond">€ 9.60 / dia</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 py-2">
                      <span className="text-sm text-diamond-muted">Seguro de Saúde</span>
                      <span className="text-sm text-diamond">Médis Opção 2</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/5 bg-onyx-900">
                  <CardHeader>
                    <CardTitle>Dados Bancários</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">IBAN</Label>
                      <div className="rounded border border-white/5 bg-white/5 p-2 font-mono text-diamond">
                        PT50 0033 0000 1234 5678 9012 3
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">Banco</Label>
                      <div className="text-sm text-diamond">Millennium BCP</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-diamond-muted">SWIFT/BIC</Label>
                      <div className="font-mono text-sm text-diamond">BCP PTP L</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB: Documents */}
            <TabsContent value="documents" className="mt-6 space-y-6">
              <Card className="border-white/5 bg-onyx-900">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Arquivo Digital</CardTitle>
                  <Button size="sm" variant="outline" className="border-white/10">
                    <Download className="mr-2 h-4 w-4" /> Upload Documento
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {[
                      {
                        name: "Contrato de Trabalho.pdf",
                        type: "Contrato",
                        date: "15 Jan 2020",
                        size: "1.2 MB",
                      },
                      {
                        name: "Cópia Cartão Cidadão.pdf",
                        type: "Identificação",
                        date: "15 Jan 2020",
                        size: "0.5 MB",
                      },
                      {
                        name: "Registo Criminal.pdf",
                        type: "Legal",
                        date: "10 Jan 2020",
                        size: "0.8 MB",
                      },
                      {
                        name: "Certificado Habilitações.pdf",
                        type: "Certificado",
                        date: "15 Jan 2020",
                        size: "2.1 MB",
                      },
                    ].map((doc, i) => (
                      <div
                        key={i}
                        className="group flex items-center justify-between rounded-md p-3 transition-colors hover:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-onyx-800 text-gold">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-diamond">{doc.name}</p>
                            <p className="text-xs text-diamond-muted">
                              {doc.type} • {doc.date} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-diamond-muted opacity-0 hover:text-white group-hover:opacity-100"
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: Vacation */}
            <TabsContent value="vacation" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="border-white/5 bg-onyx-900">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-1 font-serif text-4xl text-gold">12</div>
                    <div className="text-xs uppercase tracking-wider text-diamond-muted">
                      Dias Disponíveis
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-white/5 bg-onyx-900">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-1 font-serif text-4xl text-white">10</div>
                    <div className="text-xs uppercase tracking-wider text-diamond-muted">
                      Dias Gozados
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-white/5 bg-onyx-900">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-1 font-serif text-4xl text-white">0</div>
                    <div className="text-xs uppercase tracking-wider text-diamond-muted">
                      Dias Agendados
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-white/5 bg-onyx-900">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Histórico de Ausências</CardTitle>
                  <Button size="sm" variant="outline" className="border-white/10">
                    Registar Ausência
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-center text-sm text-diamond-muted">
                    Sem registos recentes.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: Assets */}
            <TabsContent value="assets" className="mt-6 space-y-6">
              <Card className="border-white/5 bg-onyx-900">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Equipamentos Atribuídos</CardTitle>
                  <Button size="sm" variant="outline" className="border-white/10">
                    Adicionar Equipamento
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {[
                      {
                        name: 'MacBook Pro 16"',
                        serial: "FVCD1234XYZ",
                        date: "15 Jan 2020",
                        status: "Em uso",
                      },
                      {
                        name: "iPhone 14",
                        serial: "DX998877",
                        date: "20 Set 2023",
                        status: "Em uso",
                      },
                      {
                        name: "Monitor Dell UltraSharp",
                        serial: "DL-554433",
                        date: "15 Jan 2020",
                        status: "Em uso",
                      },
                    ].map((asset, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-md border-b border-white/5 p-3 transition-colors last:border-0 hover:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-onyx-800 text-diamond-muted">
                            <Smartphone size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-diamond">{asset.name}</p>
                            <p className="text-xs text-diamond-muted">
                              S/N: {asset.serial} • Atribuído em {asset.date}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        >
                          {asset.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
