"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Integration } from "@/types/admin";
import { Bot, CreditCard, Globe, Mail, Map, MessageSquare, Plus, Settings } from "lucide-react";

// Mock Integrations
const mockIntegrations: Integration[] = [
  {
    id: "1",
    service: "resend",
    name: "Resend (Email)",
    status: "active",
    config: { apiKey: "re_123..." },
  },
  {
    id: "2",
    service: "openai",
    name: "OpenAI (AURA)",
    status: "active",
    config: { apiKey: "sk_..." },
  },
  {
    id: "3",
    service: "mapbox",
    name: "Mapbox",
    status: "inactive",
    config: {},
  },
  {
    id: "4",
    service: "twilio",
    name: "Twilio (WhatsApp)",
    status: "error",
    error_message: "Auth Token expired",
    config: {},
  },
];

export default function IntegrationsPage() {
  const getIcon = (service: string) => {
    switch (service) {
      case "resend":
        return <Mail size={32} />;
      case "openai":
        return <Bot size={32} />;
      case "mapbox":
      case "google_maps":
        return <Map size={32} />;
      case "twilio":
        return <MessageSquare size={32} />;
      case "stripe":
        return <CreditCard size={32} />;
      default:
        return <Globe size={32} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500 border-green-500/30 bg-green-500/10";
      case "error":
        return "text-red-500 border-red-500/30 bg-red-500/10";
      default:
        return "text-diamond-muted border-white/10 bg-white/5";
    }
  };

  return (
    <CoreLayout>
      <PageHeader title="Integrações" description="Conecte o Vesatio Core a serviços externos.">
        <div className="flex gap-2">
          <Button className="btn-primary gap-2">
            <Plus size={16} /> Adicionar Nova
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockIntegrations.map((integration) => (
          <Card
            key={integration.id}
            className="flex flex-col gap-4 border-white/5 bg-onyx-900 p-6 transition-all hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-lg border p-3 ${getStatusColor(integration.status)}`}>
                {getIcon(integration.service)}
              </div>
              <Badge
                variant={
                  integration.status === "active"
                    ? "default"
                    : integration.status === "error"
                      ? "destructive"
                      : "secondary"
                }
              >
                {integration.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
              {integration.status === "error" && (
                <p className="mt-1 text-xs text-red-400">{integration.error_message}</p>
              )}
              {integration.status === "active" && (
                <p className="mt-1 flex items-center gap-1 text-xs text-green-500">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></div>
                  Sincronizado
                </p>
              )}
            </div>

            <div className="mt-auto flex gap-2 pt-4">
              <Button variant="outline" className="w-full gap-2 border-white/10 hover:bg-white/5">
                <Settings size={14} /> Configurar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </CoreLayout>
  );
}
