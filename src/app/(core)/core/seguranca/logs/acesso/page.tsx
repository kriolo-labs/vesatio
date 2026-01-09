"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { AuditLog } from "@/types/security";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Laptop,
  MapPin,
  Shield,
  Smartphone,
} from "lucide-react";

// Mock Data specific for access
const accessLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-01-09T10:30:15Z",
    user_email: "admin@vesatio.com",
    action: "login",
    ip_address: "192.168.1.100",
    device_fingerprint: "MacBook Pro - Chrome",
    geolocation: "Praia, CV",
    hash: "",
    previous_hash: "",
  },
  {
    id: "4",
    timestamp: "2024-01-09T11:15:00Z",
    user_email: "unknown",
    action: "access_denied",
    ip_address: "10.0.0.55",
    device_fingerprint: "Unknown Device",
    geolocation: "Lisbon, PT",
    hash: "",
    previous_hash: "",
  },
  {
    id: "5",
    timestamp: "2024-01-09T08:00:00Z",
    user_email: "manager@vesatio.com",
    action: "login",
    ip_address: "192.168.1.101",
    device_fingerprint: "iPhone 14 - Safari",
    geolocation: "Mindelo, CV",
    hash: "",
    previous_hash: "",
  },
];

export default function AccessLogsPage() {
  const getDeviceIcon = (deviceStr?: string) => {
    if (!deviceStr) return <Globe size={16} />;
    if (deviceStr.toLowerCase().includes("iphone") || deviceStr.toLowerCase().includes("android"))
      return <Smartphone size={16} />;
    return <Laptop size={16} />;
  };

  return (
    <CoreLayout>
      <PageHeader
        title="Log de Acessos"
        description="Monitorização de sessões, dispositivos e tentativas de login."
      >
        <div className="flex gap-2">
          <Button variant="ghost" className="gap-2 text-diamond-muted hover:text-white">
            <MapPin size={16} /> Mapa de Acessos
          </Button>
        </div>
      </PageHeader>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-6">
          <div>
            <p className="text-sm font-bold uppercase text-diamond-muted">Logins Hoje</p>
            <p className="mt-1 font-serif text-2xl text-white">124</p>
          </div>
          <div className="rounded-full bg-green-500/10 p-3 text-green-500">
            <CheckCircle size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-6">
          <div>
            <p className="text-sm font-bold uppercase text-diamond-muted">Logins Falhados</p>
            <p className="mt-1 font-serif text-2xl text-white">3</p>
          </div>
          <div className="rounded-full bg-red-500/10 p-3 text-red-500">
            <AlertTriangle size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-6">
          <div>
            <p className="text-sm font-bold uppercase text-diamond-muted">Dispositivos Únicos</p>
            <p className="mt-1 font-serif text-2xl text-white">45</p>
          </div>
          <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
            <Laptop size={24} />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Atividade Recente</h3>

        {accessLogs.map((log) => (
          <Card
            key={log.id}
            className={`flex flex-col items-start justify-between gap-4 border bg-onyx-900 p-4 transition-all md:flex-row md:items-center ${log.action === "access_denied" ? "border-red-500/30 bg-red-500/5" : "border-white/5"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${log.action === "login" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
              >
                {log.action === "login" ? <Shield size={20} /> : <AlertTriangle size={20} />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">{log.user_email}</h4>
                  <Badge
                    variant="outline"
                    className={`border bg-transparent text-[10px] uppercase ${log.action === "login" ? "border-green-500/30 text-green-500" : "border-red-500/30 text-red-500"}`}
                  >
                    {log.action === "login" ? "Sucesso" : "Falha"}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-diamond-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="flex items-center gap-1">
                    {getDeviceIcon(log.device_fingerprint)} {log.device_fingerprint}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {log.geolocation}
                  </span>
                  <span className="font-mono text-xs opacity-70">IP: {log.ip_address}</span>
                </div>
              </div>
            </div>

            {log.action === "access_denied" && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                Bloquear IP
              </Button>
            )}
          </Card>
        ))}
      </div>
    </CoreLayout>
  );
}
