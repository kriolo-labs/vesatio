type InventoryItem = {
    id: string;
    sku: string;
    quantity: number;
    location_type: 'warehouse' | 'site_leftover';
    project_id?: string;
    location_name: string; // "Warehouse A" or "Project Beta"
};

// Mock Inventory Data
const MOCK_INVENTORY: InventoryItem[] = [
    { id: '1', sku: 'Paint_Premium_Black', quantity: 50, location_type: 'warehouse', location_name: 'Main Warehouse' },
    { id: '2', sku: 'Paint_Premium_Black', quantity: 5, location_type: 'site_leftover', project_id: 'proj_beta', location_name: 'Project Beta (Site)' },
    { id: '3', sku: 'Pladur_Standard', quantity: 100, location_type: 'warehouse', location_name: 'Main Warehouse' }
];

export class InventoryAgent {
    /**
     * Checks if requested materials can be sourced from leftovers in other sites
     * before ordering new ones.
     */
    static checkCrossStock(requiredSku: string, requiredQty: number, currentProjectId: string) {
        // Filter for leftovers of the same SKU, excluding the current project (if implied)
        const leftovers = MOCK_INVENTORY.filter(
            item => item.sku === requiredSku &&
                item.location_type === 'site_leftover' &&
                item.quantity > 0 &&
                item.project_id !== currentProjectId
        );

        const foundLeftoverQty = leftovers.reduce((acc, item) => acc + item.quantity, 0);

        if (foundLeftoverQty > 0) {
            // Recommendation Logic
            const transferSources = leftovers.map(i => `${i.quantity} units from ${i.location_name}`);
            return {
                alert: true,
                message: `STOP BUYING! Found ${foundLeftoverQty} units of ${requiredSku} in leftovers.`,
                suggestion: `Transfer: ${transferSources.join(', ')}.`,
                quantity_available: foundLeftoverQty,
                remaining_to_buy: Math.max(0, requiredQty - foundLeftoverQty)
            };
        }

        return {
            alert: false,
            message: 'No leftovers found. Proceed with purchase from Warehouse/Supplier.',
            remaining_to_buy: requiredQty
        };
    }
}
