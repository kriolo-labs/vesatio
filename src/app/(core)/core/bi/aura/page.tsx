"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { BrainCircuit, Lightbulb, TrendingDown, TrendingUp } from "lucide-react";

export default function AureInsightsPage() {
  return (
    <CoreLayout>
      <PageHeader
        title="AURA Insights (Alpha)"
        description="Análise preditiva e deteção de anomalias impulsionada por IA."
      >
        <Badge
          variant="outline"
          className="gap-2 border-gold/30 bg-gold/5 uppercase tracking-widest text-gold"
        >
          <BrainCircuit size={14} /> Powered by Gemini 1.5
        </Badge>
      </PageHeader>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Deteção de Anomalias */}
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <TrendingDown className="text-red-400" /> Anomalias Detetadas
          </h3>
          <Card className="border-l-4 border-white/5 border-l-red-500 bg-onyx-900 p-6">
            <div className="mb-2 flex items-start justify-between">
              <span className="text-sm font-bold uppercase text-red-400">Produção</span>
              <span className="text-xs text-diamond-muted">Hoje, 10:30</span>
            </div>
            <h4 className="mb-2 text-lg font-medium text-white">
              Queda súbita na eficiência da Orladora B
            </h4>
            <p className="text-sm leading-relaxed text-diamond-muted">
              A OEE caiu 15% nas últimas 2 horas em comparação com a média histórica de terça-feira.
              Possível obstrução no alimentador de cola.
            </p>
            <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
              <Button size="sm" variant="outline" className="text-xs">
                Ver Máquina
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                Ignorar
              </Button>
            </div>
          </Card>

          <Card className="border-l-4 border-white/5 border-l-orange-500 bg-onyx-900 p-6">
            <div className="mb-2 flex items-start justify-between">
              <span className="text-sm font-bold uppercase text-orange-400">Financeiro</span>
              <span className="text-xs text-diamond-muted">Ontem</span>
            </div>
            <h4 className="mb-2 text-lg font-medium text-white">
              Desvio de Custo em Projeto "Villa Mar"
            </h4>
            <p className="text-sm leading-relaxed text-diamond-muted">
              Custos de carpintaria excederam o orçamento em 22%. Preço da madeira maciça subiu
              inesperadamente.
            </p>
          </Card>
        </div>

        {/* Tendências e Oportunidades */}
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
            <TrendingUp className="text-green-400" /> Tendências & Oportunidades
          </h3>
          <Card className="border-l-4 border-white/5 border-l-gold bg-onyx-900 p-6">
            <div className="mb-2 flex items-start justify-between">
              <span className="text-sm font-bold uppercase text-gold">Vendas</span>
              <Badge variant="secondary" className="border-gold/20 bg-gold/10 text-gold">
                Alta Confiança
              </Badge>
            </div>
            <div className="flex items-start gap-4">
              <Lightbulb size={24} className="mt-1 shrink-0 text-gold" />
              <div>
                <h4 className="mb-2 text-lg font-medium text-white">
                  Aumentar Stock de MDF Hidrófugo
                </h4>
                <p className="text-sm leading-relaxed text-diamond-muted">
                  A análise sazonal prevê um aumento de 40% na procura por cozinhas em Setembro.
                  Recomenda-se antecipar compra para evitar rutura.
                </p>
              </div>
            </div>
            <div className="mt-4 border-t border-white/5 pt-4">
              <Button size="sm" className="btn-primary w-full">
                Gerar Ordem de Compra
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </CoreLayout>
  );
}
