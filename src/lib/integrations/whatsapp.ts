// WhatsApp Integration Service using Twilio
// Documentation: https://www.twilio.com/docs/whatsapp

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., "whatsapp:+14155238886"

// Pre-approved WhatsApp Templates (Content SID in Twilio)
export type WhatsAppTemplate =
  | "appointment_confirmation"
  | "project_update"
  | "payment_reminder"
  | "general_notification";

interface WhatsAppTemplateConfig {
  contentSid: string; // Twilio Content SID
  variables: string[];
}

// Template configurations (would be populated with actual Twilio Content SIDs)
const whatsappTemplates: Record<WhatsAppTemplate, WhatsAppTemplateConfig> = {
  appointment_confirmation: {
    contentSid: "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Replace with actual
    variables: ["date", "time", "type"],
  },
  project_update: {
    contentSid: "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    variables: ["projectName", "updateText"],
  },
  payment_reminder: {
    contentSid: "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    variables: ["amount", "dueDate", "projectName"],
  },
  general_notification: {
    contentSid: "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    variables: ["message"],
  },
};

interface WhatsAppMessagePayload {
  to: string; // Phone number with country code (e.g., +238991234567)
  template: WhatsAppTemplate;
  variables: Record<string, string>;
}

interface WhatsAppLog {
  id: string;
  to: string;
  template: WhatsAppTemplate;
  status: "queued" | "sent" | "delivered" | "read" | "failed";
  sentAt: Date;
}

// Send WhatsApp Message
export async function sendWhatsAppMessage(
  payload: WhatsAppMessagePayload
): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const templateConfig = whatsappTemplates[payload.template];

    // Format phone number for Twilio
    const toNumber = `whatsapp:${payload.to.startsWith("+") ? payload.to : "+" + payload.to}`;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      console.log("[WHATSAPP] Mock mode - credentials not configured");
      console.log(`[WHATSAPP] Would send "${payload.template}" to ${payload.to}`);
      console.log(`[WHATSAPP] Variables:`, payload.variables);
      return { success: true, sid: "mock-" + Date.now() };
    }

    // Build request to Twilio API
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append("From", TWILIO_WHATSAPP_NUMBER!);
    formData.append("To", toNumber);
    formData.append("ContentSid", templateConfig.contentSid);

    // Add variables as ContentVariables JSON
    const contentVariables: Record<string, string> = {};
    templateConfig.variables.forEach((varName, index) => {
      contentVariables[String(index + 1)] = payload.variables[varName] || "";
    });
    formData.append("ContentVariables", JSON.stringify(contentVariables));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || "Failed to send WhatsApp message" };
    }

    console.log(`[WHATSAPP] Sent: ${payload.template} to ${payload.to}, SID: ${result.sid}`);

    return { success: true, sid: result.sid };
  } catch (error) {
    console.error("[WHATSAPP] Error:", error);
    return { success: false, error: String(error) };
  }
}

// Webhook handler for incoming WhatsApp messages
export function parseWhatsAppWebhook(body: Record<string, string | undefined>): {
  from: string;
  message: string;
  mediaUrl?: string;
  timestamp: Date;
} | null {
  try {
    return {
      from: body.From?.replace("whatsapp:", "") || "",
      message: body.Body || "",
      mediaUrl: body.MediaUrl0,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("[WHATSAPP] Webhook parse error:", error);
    return null;
  }
}

// Get WhatsApp Logs (Mock)
export async function getWhatsAppLogs(_limit = 50): Promise<WhatsAppLog[]> {
  return [
    {
      id: "1",
      to: "+238991234567",
      template: "project_update",
      status: "delivered",
      sentAt: new Date(),
    },
    {
      id: "2",
      to: "+238991234567",
      template: "payment_reminder",
      status: "read",
      sentAt: new Date(),
    },
  ];
}

// Helper: Send Quick Notifications
export async function notifyClientViaWhatsApp(
  phoneNumber: string,
  projectName: string,
  message: string
): Promise<boolean> {
  const result = await sendWhatsAppMessage({
    to: phoneNumber,
    template: "project_update",
    variables: { projectName, updateText: message },
  });
  return result.success;
}
