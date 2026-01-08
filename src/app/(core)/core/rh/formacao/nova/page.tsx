"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import Link from "next/link";

export default function NewTrainingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <PageHeader
        title="Agendar Nova Formação"
        description="Crie uma nova sessão de formação para a equipa."
        backUrl="/core/rh/formacao"
      />

      <Card className="border-white/5 bg-onyx-900">
        <CardHeader>
          <CardTitle>Detalhes da Sessão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-diamond">
                Título da Formação
              </Label>
              <Input
                id="title"
                placeholder="Ex: Workshop de Segurança"
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-diamond">
                Categoria
              </Label>
              <Select>
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-onyx-900 text-diamond">
                  <SelectItem value="technical">Técnica</SelectItem>
                  <SelectItem value="safety">Segurança (HST)</SelectItem>
                  <SelectItem value="softskills">Soft Skills</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-diamond">
              Descrição / Objetivos
            </Label>
            <Textarea
              id="description"
              placeholder="Descreva os objetivos da formação..."
              className="min-h-[100px] border-white/10 bg-white/5 text-white"
            />
          </div>

          <Separator className="bg-white/5" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-diamond">
                Data
              </Label>
              <Input id="date" type="date" className="border-white/10 bg-white/5 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-diamond">
                Hora de Início
              </Label>
              <Input id="time" type="time" className="border-white/10 bg-white/5 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-diamond">
                Duração (min)
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="120"
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="trainer" className="text-diamond">
                Formador
              </Label>
              <Input
                id="trainer"
                placeholder="Nome do formador ou entidade"
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-diamond">
                Localização
              </Label>
              <Input
                id="location"
                placeholder="Sala de Reuniões, Online, etc."
                className="border-white/10 bg-white/5 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-diamond">
              Capacidade Máxima
            </Label>
            <Input
              id="capacity"
              type="number"
              placeholder="20"
              className="max-w-[150px] border-white/10 bg-white/5 text-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-white/5 pt-6">
          <Link
            href="/core/rh/formacao"
            className={cn(buttonVariants({ variant: "ghost" }), "text-diamond hover:bg-white/5")}
          >
            Cancelar
          </Link>
          <Button className="bg-gold text-onyx hover:bg-gold/90">
            <Save className="mr-2 h-4 w-4" /> Agendar Sessão
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
