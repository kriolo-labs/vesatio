// PDF Generation Service
// Uses: jsPDF or a server-side solution

import { formatCurrency } from "@/lib/utils";

export type PDFTemplate =
  | "invoice"
  | "quote"
  | "purchase_order"
  | "report"
  | "contract"
  | "heritage_timeline";

interface PDFGenerationResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Invoice Data
interface InvoiceData {
  number: string;
  date: string;
  dueDate: string;
  client: {
    name: string;
    address: string;
    nif?: string;
  };
  items: { description: string; quantity: number; unitPrice: number }[];
  notes?: string;
}

// Quote Data
interface QuoteData {
  number: string;
  date: string;
  validUntil: string;
  client: { name: string; email: string };
  projectName: string;
  items: { description: string; quantity: number; unitPrice: number }[];
  terms?: string;
}

// Generate PDF (Server-Side Mock - would use jsPDF or Puppeteer)
export async function generatePDF(
  template: PDFTemplate,
  data: Record<string, unknown>
): Promise<PDFGenerationResult> {
  try {
    console.log(`[PDF] Generating ${template} PDF...`);
    console.log(`[PDF] Data:`, data);

    // In production, this would:
    // 1. Call a server API endpoint (Edge Function)
    // 2. Generate PDF using jsPDF, Puppeteer, or a service like DocRaptor
    // 3. Upload to Supabase Storage
    // 4. Return the URL

    // Mock response
    const mockUrl = `https://storage.vesatio.com/pdfs/${template}_${Date.now()}.pdf`;

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      url: mockUrl,
    };
  } catch (error) {
    console.error("[PDF] Generation error:", error);
    return { success: false, error: String(error) };
  }
}

// Invoice PDF Generator
export async function generateInvoicePDF(data: InvoiceData): Promise<PDFGenerationResult> {
  const total = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const enrichedData = {
    ...data,
    subtotal: total,
    tax: total * 0.15, // 15% IVA
    total: total * 1.15,
    formatted: {
      subtotal: formatCurrency(total),
      tax: formatCurrency(total * 0.15),
      total: formatCurrency(total * 1.15),
    },
  };

  return generatePDF("invoice", enrichedData);
}

// Quote PDF Generator
export async function generateQuotePDF(data: QuoteData): Promise<PDFGenerationResult> {
  const total = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const enrichedData = {
    ...data,
    total,
    formatted: {
      total: formatCurrency(total),
    },
  };

  return generatePDF("quote", enrichedData);
}

// Heritage Timeline PDF Generator
export async function generateHeritageTimelinePDF(data: {
  projectName: string;
  clientName: string;
  phases: { name: string; startDate: string; endDate: string; photos: string[] }[];
  materials: { name: string; origin: string; supplier: string }[];
}): Promise<PDFGenerationResult> {
  return generatePDF("heritage_timeline", data);
}

// Report PDF Generator
export async function generateReportPDF(data: {
  title: string;
  period: string;
  sections: { heading: string; content: string }[];
  charts?: { title: string; imageUrl: string }[];
}): Promise<PDFGenerationResult> {
  return generatePDF("report", data);
}

// HTML Template for Client-Side Preview
export function getInvoiceHTMLPreview(data: InvoiceData): string {
  const total = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = total * 0.15;

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #333; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #b8860b; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #0a0a0a; }
        .logo span { color: #b8860b; }
        .invoice-info { text-align: right; }
        .invoice-number { font-size: 24px; color: #b8860b; }
        .client-info { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { background: #f5f5f5; padding: 12px; text-align: left; border-bottom: 2px solid #ddd; }
        td { padding: 12px; border-bottom: 1px solid #eee; }
        .totals { text-align: right; }
        .totals .total { font-size: 20px; color: #b8860b; font-weight: bold; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo"><span>V</span>esatio</div>
        <div class="invoice-info">
            <div class="invoice-number">Fatura ${data.number}</div>
            <p>Data: ${data.date}</p>
            <p>Vencimento: ${data.dueDate}</p>
        </div>
    </div>
    <div class="client-info">
        <h3>Cliente</h3>
        <p><strong>${data.client.name}</strong></p>
        <p>${data.client.address}</p>
        ${data.client.nif ? `<p>NIF: ${data.client.nif}</p>` : ""}
    </div>
    <table>
        <thead>
            <tr>
                <th>Descrição</th>
                <th>Qtd</th>
                <th>Preço Unit.</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${data.items
              .map(
                (item) => `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.unitPrice)}</td>
                    <td>${formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
            `
              )
              .join("")}
        </tbody>
    </table>
    <div class="totals">
        <p>Subtotal: ${formatCurrency(total)}</p>
        <p>IVA (15%): ${formatCurrency(tax)}</p>
        <p class="total">Total: ${formatCurrency(total + tax)}</p>
    </div>
    ${data.notes ? `<p style="margin-top: 30px; font-size: 12px; color: #666;">Notas: ${data.notes}</p>` : ""}
    <div class="footer">
        <p>Vesatio Lda • NIF: XXXXXXXXX • Mindelo, Cabo Verde</p>
        <p>Conta: CV64 0006 0001 2345 6789 0123 4 (Banco BAI)</p>
    </div>
</body>
</html>`;
}
