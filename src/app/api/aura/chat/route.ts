import { NextRequest, NextResponse } from "next/server";

// Types for intent parsing
interface ParsedIntent {
    action: string | null;
    entity: string | null;
    parameters: Record<string, unknown>;
    confidence: number;
}

interface ChatResponse {
    message: string;
    action?: {
        type: string;
        status: "pending";
        data: Record<string, unknown>;
    };
}

// Simple intent parsing (in production, use Gemini API)
function parseIntent(message: string): ParsedIntent {
    const lowerMessage = message.toLowerCase();

    // Invoice creation
    if (lowerMessage.includes("factura") || lowerMessage.includes("fatura")) {
        const amountMatch = message.match(/(\d+(?:\.\d+)?)\s*(cvs?|€|eur)/i);
        const clientMatch = message.match(/para\s+(.+?)(?:\s+de|\s+no|\s*$)/i);

        return {
            action: "create_invoice",
            entity: "invoice",
            parameters: {
                amount: amountMatch ? parseFloat(amountMatch[1]) : null,
                client: clientMatch ? clientMatch[1].trim() : null,
            },
            confidence: 0.85,
        };
    }

    // Employee registration
    if (lowerMessage.includes("funcionário") || lowerMessage.includes("funcionario") ||
        lowerMessage.includes("empregado") || lowerMessage.includes("colaborador")) {
        const nameMatch = message.match(/registar\s+(?:o\s+)?(.+?)(?:\s+como|\s+no|\s*$)/i);

        return {
            action: "register_employee",
            entity: "employee",
            parameters: {
                name: nameMatch ? nameMatch[1].trim() : null,
            },
            confidence: 0.8,
        };
    }

    // Product/inventory
    if (lowerMessage.includes("produto") || lowerMessage.includes("stock") ||
        lowerMessage.includes("inventário") || lowerMessage.includes("inventario")) {
        const productMatch = message.match(/adicionar\s+(\d+)\s*(?:unidades?\s+de\s+)?(.+?)(?:\s+ao|\s*$)/i);

        return {
            action: "add_inventory",
            entity: "inventory",
            parameters: {
                quantity: productMatch ? parseInt(productMatch[1]) : null,
                product: productMatch ? productMatch[2].trim() : null,
            },
            confidence: 0.75,
        };
    }

    // Project status
    if (lowerMessage.includes("projecto") || lowerMessage.includes("projeto") ||
        lowerMessage.includes("obra")) {
        return {
            action: "query_project",
            entity: "project",
            parameters: {},
            confidence: 0.7,
        };
    }

    // Lead creation
    if (lowerMessage.includes("lead") || lowerMessage.includes("cliente potencial") ||
        lowerMessage.includes("contacto")) {
        const nameMatch = message.match(/(?:novo\s+lead|registar)\s+(.+?)(?:\s+com|\s+de|\s*$)/i);

        return {
            action: "create_lead",
            entity: "lead",
            parameters: {
                name: nameMatch ? nameMatch[1].trim() : null,
            },
            confidence: 0.8,
        };
    }

    // Default - no specific action
    return {
        action: null,
        entity: null,
        parameters: {},
        confidence: 0,
    };
}

// Generate response based on intent
function generateResponse(intent: ParsedIntent, originalMessage: string): ChatResponse {
    if (intent.action === "create_invoice" && intent.confidence > 0.7) {
        const { amount, client } = intent.parameters;

        if (!amount || !client) {
            return {
                message: "Para criar uma factura, preciso saber:\n- **Cliente**: Para quem é a factura?\n- **Valor**: Qual o montante?\n\nPor exemplo: \"Criar factura de 50.000 CVE para João Silva\"",
            };
        }

        return {
            message: `Entendido! Vou criar uma factura de **${amount.toLocaleString()} CVE** para **${client}**.\n\nDeseja confirmar esta ação?`,
            action: {
                type: "create_invoice",
                status: "pending",
                data: {
                    client,
                    amount,
                    currency: "CVE",
                    createdAt: new Date().toISOString(),
                },
            },
        };
    }

    if (intent.action === "register_employee" && intent.confidence > 0.7) {
        const { name } = intent.parameters;

        if (!name) {
            return {
                message: "Para registar um funcionário, preciso saber o nome completo. Como se chama o novo colaborador?",
            };
        }

        return {
            message: `Vou registar o funcionário **${name}** no sistema.\n\nPreciso de mais algumas informações:\n- Cargo/Função\n- Data de início\n- Contacto\n\nOu posso criar com os dados básicos. Deseja confirmar?`,
            action: {
                type: "register_employee",
                status: "pending",
                data: {
                    name,
                    createdAt: new Date().toISOString(),
                },
            },
        };
    }

    if (intent.action === "add_inventory" && intent.confidence > 0.7) {
        const { quantity, product } = intent.parameters;

        if (!quantity || !product) {
            return {
                message: "Para adicionar ao inventário, preciso saber:\n- **Produto**: Qual o material?\n- **Quantidade**: Quantas unidades?\n\nPor exemplo: \"Adicionar 50 m² de mármore calacatta ao stock\"",
            };
        }

        return {
            message: `Vou adicionar **${quantity} unidades** de **${product}** ao inventário.\n\nDeseja confirmar esta operação?`,
            action: {
                type: "add_inventory",
                status: "pending",
                data: {
                    product,
                    quantity,
                    createdAt: new Date().toISOString(),
                },
            },
        };
    }

    if (intent.action === "create_lead" && intent.confidence > 0.7) {
        const { name } = intent.parameters;

        return {
            message: name
                ? `Vou criar um novo lead para **${name}**. Deseja adicionar mais informações como email ou telefone?`
                : "Para criar um novo lead, preciso pelo menos do nome. Qual o nome do potencial cliente?",
            action: name ? {
                type: "create_lead",
                status: "pending",
                data: {
                    name,
                    createdAt: new Date().toISOString(),
                },
            } : undefined,
        };
    }

    if (intent.action === "query_project") {
        return {
            message: "Aqui está o resumo dos projectos activos:\n\n| Projecto | Estado | Progresso |\n|----------|--------|----------|\n| Villa Sal Rei | Em curso | 92% |\n| Penthouse Mindelo | Em curso | 45% |\n| Hotel Praia Mar | Atrasado | 30% |\n\nDeseja ver detalhes de algum projecto específico?",
        };
    }

    // Default conversational response
    const conversationalResponses = [
        "Sou a AURA, a assistente inteligente da Vesatio. Posso ajudá-lo com:\n\n- 📄 **Facturas**: \"Criar factura de X para Y\"\n- 👤 **Funcionários**: \"Registar funcionário João\"\n- 📦 **Inventário**: \"Adicionar 50 m² de mármore\"\n- 📊 **Projectos**: \"Estado dos projectos\"\n- 👥 **Leads**: \"Novo lead Carlos Santos\"\n\nO que gostaria de fazer?",
    ];

    return {
        message: conversationalResponses[0],
    };
}

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Parse the intent
        const intent = parseIntent(message);

        // Generate response
        const response = generateResponse(intent, message);

        return NextResponse.json(response);
    } catch (error) {
        console.error("AURA chat error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
