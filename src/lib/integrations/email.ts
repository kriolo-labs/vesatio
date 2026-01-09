// Email Integration Service using Resend
// Documentation: https://resend.com/docs/introduction

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "Vesatio <noreply@vesatio.com>";

// Email Template Types
export type EmailTemplate =
  | "welcome"
  | "password_reset"
  | "project_update"
  | "invoice"
  | "payment_reminder"
  | "appointment_confirmation";

// EmailPayload interface reserved for future typed sends
// interface EmailPayload { to: string; subject: string; html: string; replyTo?: string; }

interface EmailLog {
  id: string;
  to: string;
  template: EmailTemplate;
  subject: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed";
  sentAt: Date;
}

// Base Email Template Wrapper
function wrapEmailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #0a0a0a; color: #e5e5e5; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #b8860b, #d4af37); border-radius: 12px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; }
        .logo span { color: #0a0a0a; font-weight: bold; font-size: 24px; }
        .content { line-height: 1.6; }
        .button { display: inline-block; background: linear-gradient(135deg, #b8860b, #d4af37); color: #0a0a0a !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { border-top: 1px solid #333; padding-top: 20px; margin-top: 40px; font-size: 12px; color: #888; text-align: center; }
        h1, h2 { color: #d4af37; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo"><span>V</span></div>
            <h2 style="margin: 10px 0 0; color: #e5e5e5;">Vesatio</h2>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>Vesatio Lda • Rua Principal, Mindelo, Cabo Verde</p>
            <p>+238 XXX XXXX • info@vesatio.com</p>
            <p style="margin-top: 10px;">© 2026 Vesatio. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>`;
}

// Email Templates
const emailTemplates: Record<
  EmailTemplate,
  (data: Record<string, unknown>) => { subject: string; html: string }
> = {
  welcome: (data) => ({
    subject: "Bem-vindo à Vesatio",
    html: wrapEmailTemplate(`
            <h1>Bem-vindo, ${data.name}!</h1>
            <p>A sua conta no portal My Vesatio foi criada com sucesso.</p>
            <p>Clique no botão abaixo para aceder ao seu portal pessoal e acompanhar o seu projeto.</p>
            <a href="${data.portalUrl}" class="button">Aceder ao Portal</a>
            <p>Se tiver alguma dúvida, estamos sempre disponíveis.</p>
        `),
  }),
  password_reset: (data) => ({
    subject: "Recuperar Password - Vesatio",
    html: wrapEmailTemplate(`
            <h1>Recuperar Password</h1>
            <p>Recebemos um pedido para redefinir a sua password.</p>
            <p>Clique no botão abaixo para definir uma nova password. Este link expira em 1 hora.</p>
            <a href="${data.resetUrl}" class="button">Redefinir Password</a>
            <p style="color: #888; font-size: 12px;">Se não pediu esta alteração, ignore este email.</p>
        `),
  }),
  project_update: (data) => ({
    subject: `Atualização do Projeto: ${data.projectName}`,
    html: wrapEmailTemplate(`
            <h1>Novidades no seu projeto</h1>
            <p><strong>Projeto:</strong> ${data.projectName}</p>
            <p><strong>Atualização:</strong> ${data.updateText}</p>
            ${data.hasPhotos ? "<p>Foram adicionadas novas fotos à galeria.</p>" : ""}
            <a href="${data.portalUrl}" class="button">Ver Detalhes</a>
        `),
  }),
  invoice: (data) => ({
    subject: `Fatura ${data.invoiceNumber} - Vesatio`,
    html: wrapEmailTemplate(`
            <h1>Fatura Emitida</h1>
            <p>Informamos que foi emitida a fatura <strong>${data.invoiceNumber}</strong>.</p>
            <p><strong>Valor:</strong> ${data.amount}</p>
            <p><strong>Data de Vencimento:</strong> ${data.dueDate}</p>
            <a href="${data.pdfUrl}" class="button">Download PDF</a>
            <p style="color: #888; font-size: 12px;">Para qualquer esclarecimento, contacte-nos.</p>
        `),
  }),
  payment_reminder: (data) => ({
    subject: `Lembrete de Pagamento - ${data.projectName}`,
    html: wrapEmailTemplate(`
            <h1>Lembrete de Pagamento</h1>
            <p>Este é um lembrete amigável sobre o próximo pagamento do seu projeto.</p>
            <p><strong>Projeto:</strong> ${data.projectName}</p>
            <p><strong>Valor:</strong> ${data.amount}</p>
            <p><strong>Data:</strong> ${data.dueDate}</p>
            <p><strong>Marco:</strong> ${data.milestone}</p>
            <a href="${data.portalUrl}" class="button">Ver Detalhes Financeiros</a>
        `),
  }),
  appointment_confirmation: (data) => ({
    subject: `Confirmação de Agendamento - Vesatio`,
    html: wrapEmailTemplate(`
            <h1>Agendamento Confirmado</h1>
            <p>O seu agendamento foi confirmado com sucesso.</p>
            <p><strong>Tipo:</strong> ${data.type}</p>
            <p><strong>Data:</strong> ${data.date}</p>
            <p><strong>Hora:</strong> ${data.time}</p>
            ${data.location ? `<p><strong>Local:</strong> ${data.location}</p>` : ""}
            <a href="${data.calendarUrl}" class="button">Adicionar ao Calendário</a>
        `),
  }),
};

// Send Email Function
export async function sendEmail(
  template: EmailTemplate,
  to: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { subject, html } = emailTemplates[template](data);

    if (!RESEND_API_KEY) {
      console.log("[EMAIL] Mock mode - API key not configured");
      console.log(`[EMAIL] Would send "${subject}" to ${to}`);
      return { success: true, id: "mock-" + Date.now() };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || "Failed to send email" };
    }

    // Log to database (would be a Supabase insert)
    console.log(`[EMAIL] Sent: ${template} to ${to}, ID: ${result.id}`);

    return { success: true, id: result.id };
  } catch (error) {
    console.error("[EMAIL] Error:", error);
    return { success: false, error: String(error) };
  }
}

// Get Email Logs (Mock)
export async function getEmailLogs(_limit = 50): Promise<EmailLog[]> {
  // In production, fetch from Supabase table 'email_logs'
  return [
    {
      id: "1",
      to: "cliente@email.com",
      template: "project_update",
      subject: "Atualização do Projeto",
      status: "delivered",
      sentAt: new Date(),
    },
    {
      id: "2",
      to: "cliente@email.com",
      template: "invoice",
      subject: "Fatura FT 2026/001",
      status: "opened",
      sentAt: new Date(),
    },
  ];
}
