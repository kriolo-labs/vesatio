export type CalculationResult = {
    material: string;
    units_needed: number;
    units_from_leftovers: number;
    units_to_buy: number;
    action: string;
};

// Mock Parametric Rules DB
const PARAMETRIC_LOGIC: Record<string, { coverage: number, waste: number }> = {
    'Paint_Matte_Gold': { coverage: 10, waste: 1.10 },
    'Cement_Type_B': { coverage: 2, waste: 1.05 }
};

// Mock Inventory DB
const INVENTORY_GLOBAL = [
    { sku: 'Paint_Matte_Gold', site_leftovers: 2, location: 'Project Alpha' },
    { sku: 'Cement_Type_B', site_leftovers: 0, location: 'Warehouse' }
];

export class BudgetAgent {
    static calculateMaterialNeeds(area: number, materialType: string): CalculationResult {
        // HALLUCINATION CHECK: Zero or Negative Dimensions
        if (area <= 0 || isNaN(area)) {
            console.warn(`[BudgetAgent] Invalid area input: ${area}. Returning 0.`);
            return {
                material: materialType,
                units_needed: 0,
                units_from_leftovers: 0,
                units_to_buy: 0,
                action: "Invalid input dimensions. No materials ordered."
            };
        }

        const rule = PARAMETRIC_LOGIC[materialType];
        if (!rule) throw new Error(`Rule not found for ${materialType}`);

        const rawUnits = (area / rule.coverage) * rule.waste;
        const totalNeeded = Math.ceil(rawUnits);

        const leftoverStock = INVENTORY_GLOBAL.filter(i => i.sku === materialType);
        const totalLeftovers = leftoverStock.reduce((acc, curr) => acc + curr.site_leftovers, 0);

        const unitsFromLeftovers = Math.min(totalNeeded, totalLeftovers);
        const unitsToBuy = totalNeeded - unitsFromLeftovers;

        let action = `Buy ${unitsToBuy} units.`;
        if (unitsFromLeftovers > 0) {
            action = `Transfer ${unitsFromLeftovers} from Leftovers. Buy ${unitsToBuy}.`;
        }

        return {
            material: materialType,
            units_needed: totalNeeded,
            units_from_leftovers: unitsFromLeftovers,
            units_to_buy: unitsToBuy,
            action
        };
    }
}
