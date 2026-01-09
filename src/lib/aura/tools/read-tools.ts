import { z } from "zod";
import { registerTool } from "./definitions";

// Implementações de ferramentas de leitura (Consultas)
// Estas ferramentas apenas retornam dados e não requerem confirmação (geralmente)

// Tool 1: Buscar Cliente
registerTool({
  name: "buscar_cliente",
  description: "Procura detalhes de um cliente por nome, email ou NIF.",
  schema: z.object({
    termo: z.string().describe("Nome, email ou NIF do cliente a pesquisar"),
  }),
  requiresConfirmation: false,
  execute: async (data, userId) => {
    // Mock query logic
    console.log(`[AURA TOOL] Searching client with term: ${data.termo}`);
    return {
      encontrado: true,
      clientes: [
        { id: "CLI-001", nome: "João Silva", email: "joao@exemplo.com", telefone: "9912345" },
      ],
    };
  },
});

// Tool: Listar Projetos
registerTool({
  name: "listar_projetos",
  description: "Lista os projetos ativos da empresa.",
  schema: z.object({
    limite: z.number().optional().describe("Número máximo de projetos a retornar"),
  }),
  requiresConfirmation: false,
  execute: async (data, userId) => {
    return {
      projetos: [
        { codigo: "VST-00123", nome: "Villa Mar", status: "Em construção", progresso: "45%" },
        { codigo: "VST-00124", nome: "Hotel Central", status: "Planeamento", progresso: "10%" },
      ],
    };
  },
});

// Tool: Obter Saldo Bancário
registerTool({
  name: "obter_saldo_bancario",
  description: "Consulta o saldo atual das contas bancárias da empresa.",
  schema: z.object({}),
  requiresConfirmation: false,
  execute: async () => {
    return {
      banco_bai: "2.450.000,00 CVE",
      banco_bca: "1.200.000,00 CVE",
      caixa: "45.000,00 CVE",
      total: "3.695.000,00 CVE",
    };
  },
});

// Tool: Obter Resumo Financeiro do Mês (21.1.4)
registerTool({
  name: "obter_resumo_financeiro_mes",
  description:
    "Compila faturação, recebimentos, pagamentos e saldo do mês corrente com comparativo.",
  schema: z.object({
    mes: z.number().optional(),
    ano: z.number().optional(),
  }),
  requiresConfirmation: false,
  execute: async (data) => {
    // Mock data aggregation
    return {
      periodo: "Janeiro 2026",
      faturacao: { valor: 4500000, variacao_mes_anterior: "+12%" },
      recebimentos: { valor: 3800000, pendente: 700000 },
      pagamentos: { valor: 2100000, fixos: 1500000, variaveis: 600000 },
      saldo_operacional: 1700000,
      alerta: "Atenção: Recebimentos abaixo da meta de 4M.",
      status: "saudavel",
    };
  },
});
