import { NextResponse } from 'next/server';
import { PriceAnalyst } from '@/lib/services/priceAnalyst';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get('sku');
    const priceParam = searchParams.get('currentPrice');

    if (!sku || !priceParam) {
        return NextResponse.json({ error: 'Missing sku or currentPrice' }, { status: 400 });
    }

    const currentPrice = parseFloat(priceParam);

    try {
        const alert = await PriceAnalyst.checkMarketPrices(sku, currentPrice);

        if (alert) {
            return NextResponse.json({ alert_triggered: true, data: alert });
        } else {
            return NextResponse.json({ alert_triggered: false, message: 'Market prices are higher or equal. Good job.' });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
