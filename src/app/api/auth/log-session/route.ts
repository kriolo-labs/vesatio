import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  // Get User from session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse User Agent
  const userAgent = req.headers.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  // Get IP (from generic headers, specific to platform)
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // Device Fingerprint (passed from client ideally, or just UA/IP hash)
  // For now we log the session details
  
  const deviceInfo = {
    browser: `${browser.name} ${browser.version}`,
    os: `${os.name} ${os.version}`,
    device: device.model || "Desktop",
    ip,
    user_agent: userAgent,
  };

  try {
     // Insert into user_sessions table
     const { error } = await supabase.from("user_sessions").insert({
         user_id: user.id,
         device_info: deviceInfo,
         ip_address: ip,
         is_active: true,
         last_active_at: new Date().toISOString(),
     });

     if (error) throw error;

     return NextResponse.json({ success: true });
  } catch (error: any) {
      console.error("Session Log Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
