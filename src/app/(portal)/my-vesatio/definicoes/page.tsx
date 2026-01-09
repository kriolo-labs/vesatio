"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { useState } from "react";

export default function DefinicoesPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    updates: true,
    payments: true,
    marketing: false,
  });

  return (
    <div className="space-y-6 p-4 pb-24">
      <h1 className="font-serif text-xl text-diamond">Definições</h1>

      {/* Profile */}
      <Card className="border-white/5 bg-onyx-900 p-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient">
            <User size={28} className="text-onyx-950" />
          </div>
          <div>
            <p className="font-medium text-diamond">Carlos Silva</p>
            <p className="text-xs text-diamond-muted">carlos.silva@email.com</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-diamond-muted">Nome Completo</Label>
            <Input
              defaultValue="Carlos Silva"
              className="border-white/10 bg-white/5 text-diamond"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-diamond-muted">Telefone</Label>
            <Input
              defaultValue="+238 991 2345"
              className="border-white/10 bg-white/5 text-diamond"
            />
          </div>
          <Button className="text-onyx-950 w-full bg-gold">Guardar Alterações</Button>
        </div>
      </Card>

      {/* Security */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Lock size={14} className="text-gold" /> Segurança
        </h2>
        <div className="space-y-2">
          <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-diamond-muted" />
              <p className="text-sm text-diamond">Alterar Password</p>
            </div>
            <ChevronRight size={16} className="text-diamond-muted" />
          </Card>
          <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-diamond-muted" />
              <div>
                <p className="text-sm text-diamond">Autenticação 2FA</p>
                <p className="text-[10px] text-diamond-muted">Segurança adicional</p>
              </div>
            </div>
            <Switch />
          </Card>
          <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
            <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-diamond-muted" />
              <div>
                <p className="text-sm text-diamond">Dispositivos Conectados</p>
                <p className="text-[10px] text-diamond-muted">2 dispositivos ativos</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-diamond-muted" />
          </Card>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Bell size={14} className="text-gold" /> Notificações
        </h2>
        <Card className="space-y-4 border-white/5 bg-onyx-900 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-diamond">Notificações Push</p>
            <Switch
              checked={notifications.push}
              onCheckedChange={(v) => setNotifications({ ...notifications, push: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-diamond">Email</p>
            <Switch
              checked={notifications.email}
              onCheckedChange={(v) => setNotifications({ ...notifications, email: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-diamond">SMS</p>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(v) => setNotifications({ ...notifications, sms: v })}
            />
          </div>
          <hr className="border-white/10" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-diamond-muted">Atualizações do Projeto</p>
            <Switch
              checked={notifications.updates}
              onCheckedChange={(v) => setNotifications({ ...notifications, updates: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-diamond-muted">Lembretes de Pagamento</p>
            <Switch
              checked={notifications.payments}
              onCheckedChange={(v) => setNotifications({ ...notifications, payments: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-diamond-muted">Novidades e Ofertas</p>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(v) => setNotifications({ ...notifications, marketing: v })}
            />
          </div>
        </Card>
      </div>

      {/* Language */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <Globe size={14} className="text-gold" /> Idioma
        </h2>
        <Card className="flex items-center justify-between border-white/5 bg-onyx-900 p-4">
          <p className="text-sm text-diamond">Português</p>
          <ChevronRight size={16} className="text-diamond-muted" />
        </Card>
      </div>

      {/* Support */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-diamond">
          <HelpCircle size={14} className="text-gold" /> Suporte
        </h2>
        <div className="space-y-2">
          <Card className="flex cursor-pointer items-center justify-between border-white/5 bg-onyx-900 p-4">
            <p className="text-sm text-diamond">FAQ</p>
            <ChevronRight size={16} className="text-diamond-muted" />
          </Card>
          <Card className="flex cursor-pointer items-center justify-between border-white/5 bg-onyx-900 p-4">
            <p className="text-sm text-diamond">Contactar Suporte</p>
            <ChevronRight size={16} className="text-diamond-muted" />
          </Card>
          <Card className="flex cursor-pointer items-center justify-between border-white/5 bg-onyx-900 p-4">
            <p className="text-sm text-diamond">Reportar Problema</p>
            <ChevronRight size={16} className="text-diamond-muted" />
          </Card>
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={16} /> Terminar Sessão
      </Button>

      <p className="text-center text-[10px] text-diamond-muted">
        My Vesatio v1.0.0 • © 2026 Vesatio
      </p>
    </div>
  );
}
