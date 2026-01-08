"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSubcontractors, SubcontractorStatus } from "@/types/subcontractor";
import { FileText, History, Mail, MapPin, Pencil, Phone, Star } from "lucide-react";
import { useParams } from "next/navigation";

export default function SubcontractorDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const subcontractor = mockSubcontractors.find((s) => s.id === id) || mockSubcontractors[0];

  const getStatusColor = (status: SubcontractorStatus) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "inactive":
        return "bg-white/10 text-diamond-muted border-white/10";
      case "blacklisted":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  const getStatusLabel = (status: SubcontractorStatus) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "blacklisted":
        return "Bloqueado";
    }
  };

  // Simple inline Star Rating component for display
  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex text-gold">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= Math.round(rating) ? "fill-gold" : "text-onyx-700"}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title={subcontractor ? subcontractor.companyName : "Subcontratado"}
        description={subcontractor?.specialty}
        backUrl="/core/rh/subcontratados"
      >
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/5 bg-white/5 text-diamond">
            <Pencil className="mr-2 h-4 w-4" /> Editar Dados
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Sidebar: Contact & Status */}
        <Card className="h-fit border-white/5 bg-onyx-900">
          <CardContent className="space-y-6 pt-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/5 bg-onyx-800 text-2xl font-bold text-gold">
                {subcontractor.companyName.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="mb-1 text-lg font-medium text-white">{subcontractor.companyName}</h2>
              <p className="mb-3 text-sm text-diamond-muted">{subcontractor.contactPerson}</p>
              <Badge variant="outline" className={getStatusColor(subcontractor.status)}>
                {getStatusLabel(subcontractor.status)}
              </Badge>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-4">
              <div className="flex items-center text-sm text-diamond">
                <Mail className="mr-3 h-4 w-4 text-gold/50" />
                {subcontractor.email}
              </div>
              <div className="flex items-center text-sm text-diamond">
                <Phone className="mr-3 h-4 w-4 text-gold/50" />
                {subcontractor.phone}
              </div>
              <div className="flex items-center text-sm text-diamond">
                <MapPin className="mr-3 h-4 w-4 text-gold/50" />
                <span className="truncate">{subcontractor.address}</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-diamond-muted">Rating Global</span>
                <span className="text-lg font-bold text-gold">{subcontractor.rating}</span>
              </div>
              <div className="flex justify-center rounded bg-white/5 p-2">
                <StarDisplay rating={subcontractor.rating} />
              </div>
            </div>

            {/* Documents Status */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              <h4 className="mb-2 text-xs uppercase tracking-wider text-diamond-muted">
                Conformidade
              </h4>

              <div className="flex items-center justify-between text-sm">
                <span className="text-diamond">Seguro Acidentes</span>
                {subcontractor.insuranceValid ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/5 text-[10px] text-emerald-500"
                  >
                    Válido
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-rose-500/20 bg-rose-500/5 text-[10px] text-rose-500"
                  >
                    Expirado
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-diamond">Alvará/Certificado</span>
                <Badge
                  variant="outline"
                  className="border-emerald-500/20 bg-emerald-500/5 text-[10px] text-emerald-500"
                >
                  Válido
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content: History & Details */}
        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="h-auto w-full justify-start gap-4 rounded-none border-b border-white/5 bg-transparent p-0">
              <TabsTrigger
                value="history"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <History className="mr-2 h-4 w-4" /> Histórico de Projetos
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold"
              >
                <FileText className="mr-2 h-4 w-4" /> Financeiro
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-6 space-y-4">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-diamond-muted">
                Projetos Recentes & Avaliações
              </h3>

              {subcontractor.recentProjects.length > 0 ? (
                subcontractor.recentProjects.map((project) => (
                  <Card key={project.id} className="border-white/5 bg-onyx-900">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="text-base font-medium text-white">
                            {project.projectName}
                          </h4>
                          <p className="text-xs text-diamond-muted">
                            {new Date(project.date).toLocaleDateString("pt-PT")}
                          </p>
                        </div>
                        <div className="flex items-center rounded bg-white/5 px-2 py-1">
                          <Star size={14} className="mr-1 fill-gold text-gold" />
                          <span className="text-sm font-bold text-white">{project.score}</span>
                        </div>
                      </div>
                      {project.comment && (
                        <div className="mt-2 border-l-2 border-white/10 pl-3 text-sm italic text-diamond-muted">
                          "{project.comment}"
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm italic text-diamond-muted">
                  Sem histórico de projetos recente.
                </p>
              )}
            </TabsContent>

            <TabsContent value="financial" className="mt-6">
              <Card className="border-white/5 bg-onyx-900">
                <CardHeader>
                  <CardTitle className="text-base">Condições Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-diamond-muted">NIF</p>
                      <p className="font-mono text-sm text-diamond">{subcontractor.nif}</p>
                    </div>
                    <div>
                      <p className="text-xs text-diamond-muted">Condições de Pagamento</p>
                      <p className="text-sm text-diamond">{subcontractor.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-diamond-muted">Desconto Comercial</p>
                      <p className="text-sm text-diamond">
                        {subcontractor.commercialDiscount
                          ? `${subcontractor.commercialDiscount}%`
                          : "-"}
                      </p>
                    </div>
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
