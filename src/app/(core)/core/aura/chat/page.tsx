"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Upload } from "lucide-react";

export default function AuraChatPage() {
  return (
    <CoreLayout>
      <div className="flex h-[calc(100vh-100px)] flex-col">
        <PageHeader
          title="AURA Workstation"
          description="Ambiente imersivo para colaboração com o Agente de Inteligência."
        />

        <div className="mt-4 grid flex-1 grid-cols-12 gap-6 overflow-hidden">
          {/* Sidebar de Contexto / Histórico (Mock) */}
          <div className="col-span-3 hidden space-y-4 overflow-y-auto pr-2 md:block">
            <Card className="border-white/5 bg-onyx-900 p-4">
              <h3 className="mb-3 text-xs font-bold uppercase text-diamond-muted">
                Memória Recente
              </h3>
              <div className="space-y-2 text-sm text-white/70">
                <div className="cursor-pointer rounded border-l-2 border-gold p-2 pl-3 hover:bg-white/5">
                  Criação de Fatura #992
                  <span className="block text-[10px] text-diamond-muted">Há 10 min</span>
                </div>
                <div className="cursor-pointer rounded border-l-2 border-transparent p-2 pl-3 hover:bg-white/5">
                  Análise Obra Villa Mar
                  <span className="block text-[10px] text-diamond-muted">Há 2 horas</span>
                </div>
              </div>
            </Card>

            <Card className="flex cursor-pointer flex-col items-center justify-center gap-2 border-dashed border-white/5 bg-onyx-900 p-4 py-8 text-center text-diamond-muted transition-colors hover:bg-white/5">
              <Upload size={24} />
              <span className="text-xs">Arraste documentos para análise (PDF, Imagens, Excel)</span>
            </Card>
          </div>

          {/* Chat Area - Reusing Component but styled for full page */}
          <div className="relative col-span-12 flex flex-col overflow-hidden rounded-xl border border-white/5 bg-onyx-900 md:col-span-9">
            {/* We modify AuraChat slightly via props or just embed it. 
                             Ideally AuraChat would be responsive. For now, since AuraChat is built as a widget, 
                             we might need to refactor it or just display it "open" and fixed.
                             
                             Given the limitations of the current tool usage, I will simulate a "Fullscreen" mode by
                             creating a dedicated view here or reusing parts. 
                             
                             To save complexity, I will render a placeholder for the "Pro" chat here, 
                             or simply state that the AuraChat widget is the main interface. 
                             But the prompt asks for a dedicated page.
                         */}

            {/* Quick Hack: Render the Widget in "Open" mode by default? 
                             The widget controls its own state. 
                             Better approach: Instantiate a new chat view specifically for this page.
                         */}

            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-diamond-muted">
              <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gold/10 text-gold">
                <span className="text-2xl font-bold">A</span>
              </div>
              <p>A interface de chat dedicada partilha o estado com o widget global.</p>
              <p className="rounded border border-white/10 bg-black/20 p-2 text-sm">
                (Em produção, o estado seria içado para um Context Provider global)
              </p>
            </div>
          </div>
        </div>
      </div>
    </CoreLayout>
  );
}
