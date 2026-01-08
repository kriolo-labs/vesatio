export type PriceAlert = {
    sku: string;
    internal_price: number;
    market_price: number;
    saving_potential_percent: number;
    source: string;
    recommendation: string;
};

// Mock External Data
const MARKET_PRICES: Record<string, { price: number; supplier: string }> = {
    'Cement_Type_B': { price: 8.50, supplier: 'ConstrOportugal' }, // Our price might be 10.00
    'Copper_Wire_2.5mm': { price: 45.00, supplier: 'CaboVerdeElectrics' } // Our price might be 50.00
};

export class PriceAnalyst {
    /**
     * Checks market prices for a given list of SKUs.
     */
    static async checkMarketPrices(sku: string, currentInternalPrice: number): Promise<PriceAlert | null> {
        console.log(`[AURA WEB] Scraping prices for SKU: ${sku}...`);

        // Simulate Scraping
        await new Promise(resolve => setTimeout(resolve, 1000));

        const marketData = MARKET_PRICES[sku];

        if (!marketData) {
            return null; // No external data found
        }

        const { price: marketPrice, supplier } = marketData;

        if (marketPrice < currentInternalPrice) {
            const savings = ((currentInternalPrice - marketPrice) / currentInternalPrice) * 100;

            // Only alert if savings > 5%
            if (savings > 5) {
                return {
                    sku,
                    internal_price: currentInternalPrice,
                    market_price: marketPrice,
                    saving_potential_percent: parseFloat(savings.toFixed(2)),
                    source: supplier,
                    recommendation: `IMPORT ALERT: Buying from ${supplier} is ${savings.toFixed(1)}% cheaper.`
                };
            }
        }

        return null;
    }
}
