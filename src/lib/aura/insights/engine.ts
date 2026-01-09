// Insights Engine - Análise Contínua (Mock/Simulada)

export interface Insight {
  id: string;
  type: "warning" | "opportunity" | "info" | "anomaly";
  title: string;
  description: string;
  action?: string;
  createdAt: Date;
}

// Mock Insights Generator
export function generateDailyInsights(): Insight[] {
  return [
    {
      id: "ins-1",
      type: "warning",
      title: "Margem do Projeto VST-00123 abaixo do target",
      description:
        "A margem atual é de 12%, 10% abaixo do target de 22%. Reveja os custos de materiais.",
      action: "Ver Projeto",
      createdAt: new Date(),
    },
    {
      id: "ins-2",
      type: "opportunity",
      title: "Lead de Alto Valor Inativo",
      description: "O lead 'Maria Ferreira' (investimento 5M+ CVE) não foi contactado há 5 dias.",
      action: "Contactar Agora",
      createdAt: new Date(),
    },
    {
      id: "ins-3",
      type: "info",
      title: "Fornecedor com Preços Competitivos",
      description: "A MadeiraPro tem preços 18% abaixo da média para madeira de Ipe.",
      action: "Ver Cotação",
      createdAt: new Date(),
    },
    {
      id: "ins-4",
      type: "anomaly",
      title: "Login Suspeito Detetado",
      description:
        "Tentativa de login fora de horas (03:42) para o utilizador 'admin@vesatio.com' a partir de IP desconhecido.",
      action: "Rever Logs",
      createdAt: new Date(),
    },
  ];
}

export interface DailyBriefing {
  date: string;
  tasksToday: number;
  criticalAlerts: number;
  kpis: { label: string; value: string; trend: "up" | "down" | "stable" }[];
  suggestions: string[];
}

export function generateDailyBriefing(): DailyBriefing {
  return {
    date: new Date().toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
    tasksToday: 8,
    criticalAlerts: 2,
    kpis: [
      { label: "Faturação Mês", value: "4.2M CVE", trend: "up" },
      { label: "Projetos Ativos", value: "12", trend: "stable" },
      { label: "Leads Novos", value: "5", trend: "down" },
    ],
    suggestions: [
      "Agendar follow-up com Lead 'Maria Ferreira'",
      "Rever orçamento do Projeto VST-00123",
      "Aprovar requisição de compra #RC-088",
    ],
  };
}
