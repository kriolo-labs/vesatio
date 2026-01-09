"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Key, Plus, RefreshCw, Trash2, Webhook } from "lucide-react";

export default function DeveloperPage() {
  return (
    <CoreLayout>
      <PageHeader
        title="Ferramentas de Desenvolvedor"
        description="Gestão de acesso à API e Webhooks do V-OS."
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <Code size={16} className="mr-2" /> Documentação API
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="apikeys" className="w-full space-y-6">
        <TabsList className="border border-white/5 bg-onyx-900 p-1">
          <TabsTrigger value="apikeys" className="gap-2">
            <Key size={14} /> API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="gap-2">
            <Webhook size={14} /> Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apikeys" className="space-y-6">
          <div className="flex justify-end">
            <Button className="btn-primary gap-2">
              <Plus size={16} /> Nova API Key
            </Button>
          </div>
          <Card className="border-white/5 bg-onyx-900">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-diamond-muted">Nome</TableHead>
                  <TableHead className="text-diamond-muted">Prefixo</TableHead>
                  <TableHead className="text-diamond-muted">Scopes</TableHead>
                  <TableHead className="text-diamond-muted">Criada em</TableHead>
                  <TableHead className="text-diamond-muted">Último uso</TableHead>
                  <TableHead className="text-right text-diamond-muted">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium text-white">Integração Website</TableCell>
                  <TableCell className="font-mono text-xs text-gold">vos_live_...</TableCell>
                  <TableCell>
                    <Badge variant="outline">leads.create</Badge>{" "}
                    <Badge variant="outline">brands.read</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-diamond-muted">01 Jan 2024</TableCell>
                  <TableCell className="text-xs text-diamond-muted">Há 5 min</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium text-white">Script Importação</TableCell>
                  <TableCell className="font-mono text-xs text-gold">vos_test_...</TableCell>
                  <TableCell>
                    <Badge variant="outline">all</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-diamond-muted">15 Dez 2023</TableCell>
                  <TableCell className="text-xs text-diamond-muted">Há 2 dias</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex justify-end">
            <Button className="btn-primary gap-2">
              <Plus size={16} /> Novo Endpoint
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-white/5 bg-onyx-900 p-6 transition-colors hover:border-white/10">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">Notificar Slack (Vendas)</h3>
                    <Badge className="border-green-500/20 bg-green-500/10 text-green-500">
                      Ativo
                    </Badge>
                  </div>
                  <p className="w-fit rounded bg-black/20 px-2 py-1 font-mono text-xs text-diamond-muted">
                    https://hooks.slack.com/services/T000/B000/XXXX
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="text-diamond-muted hover:text-white">
                    Testar
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-diamond-muted hover:text-white"
                  >
                    <RefreshCw size={14} />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="my-auto mr-2 text-xs font-bold uppercase text-diamond-muted">
                  Eventos:
                </span>
                <Badge variant="secondary">invoice.paid</Badge>
                <Badge variant="secondary">project.created</Badge>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </CoreLayout>
  );
}
