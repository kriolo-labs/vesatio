import { auraOrchestrator } from "../orchestrator";

export interface AutomationRule {
  id: string;
  name: string;
  is_active: boolean;
  trigger_type: "event" | "schedule";
  trigger_config: Record<string, any>;
  conditions: any[];
  actions: AutomationAction[];
}

export interface AutomationAction {
  type: "send_email" | "create_task" | "aura_command";
  params: Record<string, any>;
}

export class AutomationEngine {
  // Simula a recepção de um evento do sistema
  async processEvent(eventName: string, payload: any) {
    console.log(`[AURA AUTOMATION] Event received: ${eventName}`, payload);

    // 1. Fetch active rules matching this event (Mock fetch)
    const rules = await this.fetchRulesForEvent(eventName);

    for (const rule of rules) {
      if (this.evaluateConditions(rule.conditions, payload)) {
        await this.executeActions(rule, payload);
      }
    }
  }

  private async fetchRulesForEvent(eventName: string): Promise<AutomationRule[]> {
    // TODO: Buscar da BD supabase aura_automation_rules
    // Mock return
    if (eventName === "invoice.overdue") {
      return [
        {
          id: "rule-1",
          name: "Alertar Cliente Fatura Vencida",
          is_active: true,
          trigger_type: "event",
          trigger_config: { eventName: "invoice.overdue" },
          conditions: [],
          actions: [
            {
              type: "aura_command",
              params: {
                command: `Enviar email gentil ao cliente ${(payload: any) => payload.client_name} lembrando da fatura ${(payload: any) => payload.invoice_number}`,
              },
            },
          ],
        },
      ];
    }
    return [];
  }

  private evaluateConditions(conditions: any[], payload: any): boolean {
    // Implementar lógica de avaliação (ex: json-logic-js)
    return true; // Simplified
  }

  private async executeActions(rule: AutomationRule, payload: any) {
    console.log(`[AURA AUTOMATION] Executing rule: ${rule.name}`);

    for (const action of rule.actions) {
      try {
        if (action.type === "aura_command") {
          // Interpolate params
          const command = this.interpolate(action.params.command, payload);
          // Aura executes the command autonomously
          // Note: We user a system user ID for automation
          await auraOrchestrator.processMessage("SYSTEM_AUTOMATION", command, []);
        }
        // Handle other native actions...
      } catch (e) {
        console.error(`[AURA AUTOMATION] Action failed:`, e);
      }
    }
  }

  private interpolate(template: string, data: any): string {
    // Very basic interpolation mechanism mock
    // In real impl, would parse ${}
    if (typeof template === "string" && template.includes("payload =>")) {
      // Mocking dynamic behaviour for the example above
      if (data.client_name)
        return template.replace("payload => payload.client_name", data.client_name);
    }
    return template;
  }
}

export const automationEngine = new AutomationEngine();
