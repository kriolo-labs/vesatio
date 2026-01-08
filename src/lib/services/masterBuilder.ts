export type ChatResponse = {
    answer: string;
    references: string[]; // Materials suggested
};

// Mock Knowledge Context
const KNOWLEDGE_BASE = {
    'humidity': "For wall humidity, verify the source. If rising damp, inject a chemical damp-proof course. If penetrative, apply a water-repellent sealant.",
    'cracks': "For hairline cracks (<1mm), use a fine surface filler. For structural cracks (>5mm), consult a structural engineer immediately."
};

export class MasterBuilder {
    /**
     * "Site Chat" - Answers technical questions using context and inventory.
     */
    static async consult(query: string, inventoryContext: string[]): Promise<ChatResponse> {
        console.log(`[AURA MASTER] Thinking about: ${query}`);

        // Simulate LLM latency
        await new Promise(resolve => setTimeout(resolve, 800));

        const lowerQuery = query.toLowerCase();

        let advice = "I'm not sure about that specific issue. Please upload a photo for better analysis.";
        const references: string[] = [];

        if (lowerQuery.includes('humidity') || lowerQuery.includes('water') || lowerQuery.includes('moist')) {
            advice = KNOWLEDGE_BASE['humidity'];

            // Check if we have relevant inventory
            const sealant = inventoryContext.find(i => i.toLowerCase().includes('sealant'));
            if (sealant) {
                advice += ` I see we have ${sealant} in stock at the Warehouse. Use that.`;
                references.push(sealant);
            } else {
                advice += " We don't have sealant in stock. Please order 'SikaTop Seal-107'.";
            }
        } else if (lowerQuery.includes('crack')) {
            advice = KNOWLEDGE_BASE['cracks'];
            const filler = inventoryContext.find(i => i.toLowerCase().includes('filler') || i.toLowerCase().includes('plaster'));
            if (filler) {
                references.push(filler);
                advice += ` You can use the ${filler} available on site.`;
            }
        }

        return {
            answer: advice,
            references
        };
    }
}
