export type UserRole = "admin" | "manager" | "staff" | "client" | string; // extensible
export type UserStatus = "active" | "inactive" | "suspended" | "invited";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: UserRole;
  department?: string;
  status: UserStatus;
  last_login?: string;
  created_at: string;
  phone?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  is_system: boolean; // Cannot be deleted
  permissions_count?: number;
  users_count?: number;
  created_at: string;
}

export interface Permission {
  code: string; // e.g., 'projects.view'
  module: string; // e.g., 'Projects'
  description: string;
}

export interface CompanySettings {
  name: string;
  legal_name: string;
  nif: string;
  address: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  email: string;
  phone: string;
  website?: string;
}

export interface Integration {
  id: string;
  service: "resend" | "twilio" | "openai" | "mapbox" | "google_maps" | "stripe" | "other";
  name: string;
  status: "active" | "inactive" | "error";
  config: Record<string, string>; // Masked in UI
  last_sync?: string;
  error_message?: string;
}

export interface APIKey {
  id: string;
  name: string;
  key_prefix: string; // Display only first few chars
  created_at: string;
  last_used_at?: string;
  scopes: string[];
  is_active: boolean;
}

export interface WebhookConfig {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  secret: string;
  created_at: string;
}
