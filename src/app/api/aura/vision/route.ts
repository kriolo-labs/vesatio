import { NextResponse } from 'next/server';
import { AuraSupervisor } from '@/lib/services/auraSupervisor';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { imageUrl, phase } = body;

        if (!imageUrl || !phase) {
            return NextResponse.json({ error: 'Missing imageUrl or phase' }, { status: 400 });
        }

        const report = await AuraSupervisor.analyzeSitePhoto(imageUrl, phase);
        return NextResponse.json(report);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
