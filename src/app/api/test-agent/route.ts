import { NextResponse } from 'next/server';
import { BudgetAgent } from '@/lib/services/budgetAgent';

export async function GET() {
    try {
        // 1. Test Material Calculation (Smart)
        // 'Paint_Matte_Gold' has 2 units in leftovers (mocked in service)
        // Area 60m2 / 10 coverage = 6 * 1.1 waste = 6.6 -> 7 units needed.
        // Should suggest: Transfer 2, Buy 5.
        const budgetCalc = BudgetAgent.calculateMaterialNeeds(60, 'Paint_Matte_Gold');

        return NextResponse.json({
            success: true,
            tests: {
                smart_budget: budgetCalc
            }
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
