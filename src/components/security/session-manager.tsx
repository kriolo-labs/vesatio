"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Globe, Laptop, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Session {
    id: string; // This would be the mapping to Supabase session or custom table
    ip_address: string;
    device_info: any;
    last_active_at: string;
    is_current?: boolean;
}

export function SessionManager() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const supabase = createClient();

    useEffect(() => {
        // Fetch sessions from our custom table or Supabase RPC
        const fetchSessions = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from("user_sessions")
                .select("*")
                .eq("user_id", user.id)
                .eq("is_active", true)
                .order("last_active_at", { ascending: false });

            if (data) {
                setSessions(data as Session[]);
            }
            setLoading(false);
        };

        fetchSessions();
    }, [supabase]);

    const handleRevoke = async (sessionId: string) => {
        const { error } = await supabase
            .from("user_sessions")
            .update({ is_active: false })
            .eq("id", sessionId);

        if (error) {
            toast({ title: "Erro", description: "Não foi possível terminar a sessão", variant: "destructive" });
        } else {
            setSessions(sessions.filter(s => s.id !== sessionId));
            toast({ title: "Sessão terminada", variant: "success" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-white">Sessões Ativas</h3>
                    <p className="text-sm text-diamond-muted">Gerencie os dispositivos com acesso à sua conta.</p>
                </div>
                <Button variant="destructive" size="sm">Terminar todas exceto atual</Button>
            </div>

            <div className="space-y-4">
                {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-onyx-100 rounded-lg border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-onyx-900 rounded-full text-gold">
                                <Laptop size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-white">
                                    {session.device_info?.browser || "Dispositivo Desconhecido"} on {session.device_info?.os}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-diamond-muted">
                                    <span className="flex items-center gap-1"><Globe size={10} /> {session.ip_address}</span>
                                    <span>•</span>
                                    <span>
                                        Ativo há {formatDistanceToNow(new Date(session.last_active_at), { locale: pt })}
                                    </span>
                                    {session.is_current && <span className="text-status-success font-bold">• Atual</span>}
                                </div>
                            </div>
                        </div>
                        {!session.is_current && (
                            <Button variant="ghost" size="icon" onClick={() => handleRevoke(session.id)} className="text-diamond-muted hover:text-status-error">
                                <Trash2 size={18} />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
