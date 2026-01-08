"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { AttendanceRecord, AttendanceType, mockAttendanceHistory } from "@/types/attendance";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { AlertCircle, Clock, Coffee, History, LogOut, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function PontoPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendanceHistory);
  const [status, setStatus] = useState<"working" | "break" | "off">("working"); // Setup initial state based on mock

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (type: AttendanceType) => {
    const newRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      employeeId: "EMP-001", // Current user
      timestamp: new Date().toISOString(),
      type: type,
      location: "Lisboa Office (GPS)",
    };

    setRecords([newRecord, ...records]);

    if (type === "check_in" || type === "break_end") setStatus("working");
    else if (type === "break_start") setStatus("break");
    else if (type === "check_out") setStatus("off");
  };

  const getLastRecord = () => records[0];

  const getStatusColor = () => {
    switch (status) {
      case "working":
        return "bg-emerald-500 text-emerald-950 border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]";
      case "break":
        return "bg-amber-500 text-amber-950 border-amber-500/50 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]";
      case "off":
        return "bg-onyx-800 text-diamond-muted border-white/10";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "working":
        return "A Trabalhar";
      case "break":
        return "Em Pausa";
      case "off":
        return "Ausente / Terminado";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registo de Ponto"
        description="Gestão de assiduidade e registo de horas."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Clock Card */}
        <Card className="relative overflow-hidden border-white/5 bg-onyx-900 lg:col-span-2">
          <div className="absolute right-0 top-0 p-4 opacity-50">
            <MapPin className="mr-2 inline-block h-5 w-5 text-gold" />
            <span className="text-sm text-diamond-muted">Localização Atual: Lisboa</span>
          </div>

          <CardContent className="flex flex-col items-center justify-center space-y-8 py-16">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium uppercase tracking-widest text-gold">
                {format(currentTime, "EEEE, d 'de' MMMM", { locale: pt })}
              </h2>
              <div className="font-mono text-7xl font-bold tabular-nums tracking-tighter text-white drop-shadow-2xl sm:text-9xl">
                {format(currentTime, "HH:mm:ss")}
              </div>
            </div>

            <Badge
              variant="outline"
              className={cn(
                "px-6 py-2 text-lg uppercase tracking-widest transition-all duration-500",
                getStatusColor()
              )}
            >
              {getStatusText()}
            </Badge>

            <div className="grid w-full max-w-2xl grid-cols-1 gap-4 px-4 sm:grid-cols-3">
              <Button
                size="lg"
                className="h-16 border border-emerald-500/30 bg-emerald-600 text-lg text-white hover:bg-emerald-700"
                disabled={status === "working"}
                onClick={() => handleRegister("check_in")}
              >
                <Clock className="mr-2 h-6 w-6" />
                Entrar
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="h-16 border border-amber-500/30 bg-amber-600/20 text-lg text-amber-500 hover:bg-amber-600/30"
                disabled={status !== "working"}
                onClick={() => handleRegister(status === "working" ? "break_start" : "break_end")}
              >
                <Coffee className="mr-2 h-6 w-6" />
                {status === "break" ? "Voltar" : "Pausa"}
              </Button>

              <Button
                size="lg"
                variant="destructive"
                className="h-16 text-lg"
                disabled={status === "off"}
                onClick={() => handleRegister("check_out")}
              >
                <LogOut className="mr-2 h-6 w-6" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Stats & History */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-white/5 bg-onyx-900">
              <CardContent className="p-4 text-center">
                <div className="mb-1 text-xs uppercase text-diamond-muted">Horas Hoje</div>
                <div className="font-mono text-2xl text-white">05:30</div>
              </CardContent>
            </Card>
            <Card className="border-white/5 bg-onyx-900">
              <CardContent className="p-4 text-center">
                <div className="mb-1 text-xs uppercase text-diamond-muted">Banco Horas</div>
                <div className="font-mono text-2xl text-emerald-500">+12:00</div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card className="h-full border-white/5 bg-onyx-900">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <History className="mr-2 h-4 w-4 text-gold" />
                Histórico Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative space-y-6 border-l border-white/10 pl-4">
                {records.map((record, index) => (
                  <div key={record.id} className="relative">
                    <div
                      className={cn(
                        "absolute -left-[21px] top-1 h-2 w-2 rounded-full",
                        record.type === "check_in"
                          ? "bg-emerald-500"
                          : record.type === "check_out"
                            ? "bg-rose-500"
                            : "bg-amber-500"
                      )}
                    ></div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium capitalize text-diamond">
                          {record.type.replace("_", " ")}
                        </p>
                        <p className="mt-1 flex items-center text-xs text-diamond-muted">
                          <MapPin className="mr-1 h-3 w-3" />
                          {record.location}
                        </p>
                      </div>
                      <span className="font-mono text-sm text-gold opacity-80">
                        {format(new Date(record.timestamp), "HH:mm")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Alert className="border-white/10 bg-white/5 text-diamond-muted">
        <AlertCircle className="h-4 w-4 text-gold" />
        <AlertTitle>Política de Assiduidade</AlertTitle>
        <AlertDescription>
          Lembre-se de registar todas as pausas superiores a 15 minutos. Para correções de ponto,
          contacte o seu supervisor.
        </AlertDescription>
      </Alert>
    </div>
  );
}
