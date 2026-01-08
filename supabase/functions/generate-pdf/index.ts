// Edge Function: generate-pdf
// Purpose: Generate PDF documents (invoices, reports, etc.)

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface PDFRequest {
  type: "invoice" | "report" | "contract" | "quote";
  data: Record<string, unknown>;
  filename?: string;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { type, data, filename }: PDFRequest = await req.json();

    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: type, data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate HTML based on type
    let html = "";
    
    switch (type) {
      case "invoice":
        html = generateInvoiceHTML(data);
        break;
      case "report":
        html = generateReportHTML(data);
        break;
      case "contract":
        html = generateContractHTML(data);
        break;
      case "quote":
        html = generateQuoteHTML(data);
        break;
      default:
        throw new Error(`Unknown PDF type: ${type}`);
    }

    // For now, return the HTML (PDF generation would use a service like Puppeteer or a hosted API)
    // In production, you would convert this HTML to PDF using:
    // - Puppeteer (in a Deno Deploy compatible way)
    // - html-pdf-node
    // - External API like DocRaptor, Prince, etc.

    const generatedFilename = filename || `${type}-${Date.now()}.pdf`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        filename: generatedFilename,
        html, // In production, this would be a URL to the stored PDF
        message: "PDF generation template ready. Connect to PDF service for actual generation."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

function generateInvoiceHTML(data: Record<string, unknown>): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 40px; color: #333; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .logo { font-size: 24px; font-weight: bold; color: #D4AF37; }
        .invoice-details { text-align: right; }
        .client-info { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f5f5f5; font-weight: 600; }
        .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">VESATIO</div>
        <div class="invoice-details">
          <h2>FACTURA</h2>
          <p>Nº: ${data.invoiceNumber || 'FAT-0000'}</p>
          <p>Data: ${data.date || new Date().toLocaleDateString('pt-PT')}</p>
        </div>
      </div>
      <div class="client-info">
        <h3>Cliente</h3>
        <p>${data.clientName || 'Nome do Cliente'}</p>
        <p>${data.clientAddress || 'Morada'}</p>
        <p>NIF: ${data.clientNIF || '000000000'}</p>
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
          ${(data.items as Array<{description: string; quantity: number; price: number}> || []).map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${item.price?.toLocaleString('pt-CV')} CVE</td>
              <td>${(item.quantity * item.price)?.toLocaleString('pt-CV')} CVE</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="total">
        Total: ${data.total?.toLocaleString('pt-CV') || '0'} CVE
      </div>
      <div class="footer">
        <p>Vesatio Lda | NIF: 123456789 | Praia, Cabo Verde</p>
        <p>Tel: +238 XXX XXXX | Email: info@vesatio.cv</p>
      </div>
    </body>
    </html>
  `;
}

function generateReportHTML(data: Record<string, unknown>): string {
  return `<html><body><h1>Relatório ${data.title || ''}</h1></body></html>`;
}

function generateContractHTML(data: Record<string, unknown>): string {
  return `<html><body><h1>Contrato ${data.title || ''}</h1></body></html>`;
}

function generateQuoteHTML(data: Record<string, unknown>): string {
  return `<html><body><h1>Orçamento ${data.title || ''}</h1></body></html>`;
}
