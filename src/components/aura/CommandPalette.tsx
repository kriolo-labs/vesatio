"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowRight, Briefcase, FileText, Search, Settings, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CommandItem {
  id: string;
  label: string;
  type: "page" | "action" | "entity" | "aura";
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    // Pages
    {
      id: "p-dashboard",
      label: "Dashboard",
      type: "page",
      icon: <FileText size={16} />,
      action: () => router.push("/core"),
      keywords: ["home", "inicio"],
    },
    {
      id: "p-projetos",
      label: "Projetos",
      type: "page",
      icon: <Briefcase size={16} />,
      action: () => router.push("/core/projetos"),
      keywords: ["obras"],
    },
    {
      id: "p-clientes",
      label: "Clientes",
      type: "page",
      icon: <Users size={16} />,
      action: () => router.push("/core/clientes"),
      keywords: ["crm"],
    },
    {
      id: "p-financeiro",
      label: "Financeiro",
      type: "page",
      icon: <FileText size={16} />,
      action: () => router.push("/core/financeiro"),
      keywords: ["faturas", "pagamentos"],
    },
    {
      id: "p-rh",
      label: "Recursos Humanos",
      type: "page",
      icon: <Users size={16} />,
      action: () => router.push("/core/rh"),
      keywords: ["colaboradores", "funcionarios"],
    },
    {
      id: "p-settings",
      label: "Configurações",
      type: "page",
      icon: <Settings size={16} />,
      action: () => router.push("/core/admin"),
      keywords: ["admin"],
    },
    {
      id: "p-aura-auto",
      label: "Automações AURA",
      type: "page",
      icon: <Zap size={16} />,
      action: () => router.push("/core/aura/automacoes"),
      keywords: ["regras"],
    },
    {
      id: "p-aura-chat",
      label: "AURA Workstation",
      type: "page",
      icon: <Zap size={16} />,
      action: () => router.push("/core/aura/chat"),
      keywords: ["ia", "assistente"],
    },

    // Actions
    {
      id: "a-novo-lead",
      label: "Criar Novo Lead",
      type: "action",
      icon: <ArrowRight size={16} />,
      action: () => {
        router.push("/core/crm"); /* ideally open modal */
      },
      keywords: ["lead", "criar"],
    },
    {
      id: "a-nova-fatura",
      label: "Criar Nova Fatura",
      type: "action",
      icon: <ArrowRight size={16} />,
      action: () => router.push("/core/financeiro/faturas"),
      keywords: ["fatura"],
    },

    // AURA Commands
    {
      id: "aura-saldo",
      label: "AURA: Qual o saldo?",
      type: "aura",
      icon: <Zap size={16} className="text-gold" />,
      action: () => {
        setOpen(false);
        alert("(Demo) AURA responderia aqui com o saldo.");
      },
      keywords: ["saldo", "banco"],
    },
    {
      id: "aura-resumo",
      label: "AURA: Resumo financeiro do mês",
      type: "aura",
      icon: <Zap size={16} className="text-gold" />,
      action: () => {
        setOpen(false);
        alert("(Demo) AURA geraria o resumo.");
      },
      keywords: ["resumo", "financeiro"],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return cmd.label.toLowerCase().includes(q) || cmd.keywords?.some((kw) => kw.includes(q));
  });

  const handleSelect = useCallback((cmd: CommandItem) => {
    setOpen(false);
    setQuery("");
    cmd.action();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-0 overflow-hidden border-white/10 bg-onyx-900 p-0 sm:max-w-[550px]">
        <div className="flex items-center border-b border-white/10 px-4">
          <Search size={18} className="mr-3 text-diamond-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar ou escrever comando..."
            className="border-0 bg-transparent py-4 text-base text-white placeholder:text-diamond-muted focus-visible:ring-0"
            autoFocus
          />
          <kbd className="hidden h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-diamond-muted sm:inline-flex">
            ESC
          </kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredCommands.length === 0 && (
            <div className="p-4 text-center text-sm text-diamond-muted">
              Nenhum resultado para &quot;{query}&quot;
            </div>
          )}
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => handleSelect(cmd)}
              className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-white/5"
            >
              <span
                className={`rounded p-1.5 ${cmd.type === "aura" ? "bg-gold/20 text-gold" : "bg-white/5 text-diamond-muted"}`}
              >
                {cmd.icon}
              </span>
              <span className="flex-1 text-sm text-white">{cmd.label}</span>
              <span className="text-[10px] uppercase text-diamond-muted opacity-0 transition-opacity group-hover:opacity-100">
                {cmd.type}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[10px] text-diamond-muted">
          <span>↑↓ para navegar</span>
          <span>↵ para selecionar</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
