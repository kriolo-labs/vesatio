import { NextRequest, NextResponse } from "next/server";

// Action executors
type ActionExecutor = (data: Record<string, unknown>) => Promise<{
    success: boolean;
    message: string;
    result?: unknown;
}>;

const actionExecutors: Record<string, ActionExecutor> = {
    create_invoice: async (data) => {
        // In production, this would create an invoice in the database
        console.log("Creating invoice:", data);

        // Simulate database operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            success: true,
            message: `Factura criada com sucesso para ${data.client}`,
            result: {
                id: `INV-${Date.now()}`,
                ...data,
                status: "pending",
            },
        };
    },

    register_employee: async (data) => {
        console.log("Registering employee:", data);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            success: true,
            message: `Funcionário ${data.name} registado com sucesso`,
            result: {
                id: `EMP-${Date.now()}`,
                ...data,
                status: "active",
            },
        };
    },

    add_inventory: async (data) => {
        console.log("Adding to inventory:", data);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            success: true,
            message: `${data.quantity} unidades de ${data.product} adicionadas ao inventário`,
            result: {
                id: `INV-${Date.now()}`,
                ...data,
                movementType: "entry",
            },
        };
    },

    create_lead: async (data) => {
        console.log("Creating lead:", data);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            success: true,
            message: `Lead ${data.name} criado com sucesso`,
            result: {
                id: `LEAD-${Date.now()}`,
                ...data,
                status: "new",
            },
        };
    },

    import_products: async (data) => {
        console.log("Importing products:", data);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            success: true,
            message: `${data.itemCount} produtos importados com sucesso do ficheiro ${data.fileName}`,
            result: {
                importId: `IMP-${Date.now()}`,
                ...data,
            },
        };
    },
};

export async function POST(request: NextRequest) {
    try {
        const { action } = await request.json();

        if (!action || !action.type) {
            return NextResponse.json(
                { error: "Action type is required" },
                { status: 400 }
            );
        }

        const executor = actionExecutors[action.type];

        if (!executor) {
            return NextResponse.json(
                { error: `Unknown action type: ${action.type}` },
                { status: 400 }
            );
        }

        // Execute the action
        const result = await executor(action.data || {});

        // Log the action (in production, save to aura_actions table)
        console.log("Action executed:", {
            type: action.type,
            data: action.data,
            result,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Action execution error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to execute action",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
