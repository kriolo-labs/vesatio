export type LogAction =
  | "create"
  | "update"
  | "delete"
  | "soft_delete"
  | "login"
  | "logout"
  | "access_denied"
  | "approve"
  | "reject"
  | "restore";
export type SecuritySeverity = "critical" | "high" | "medium" | "low";
export type IntegrityStatus = "valid" | "corrupted" | "checking" | "unknown";

export interface AuditLog {
  id: string;
  timestamp: string;
  user_id?: string;
  user_email?: string; // Denormalized for easier query
  action: LogAction;
  table_name?: string;
  record_id?: string;

  // Data Snapshot
  old_data?: any; // JSON
  new_data?: any; // JSON

  // Context
  ip_address?: string;
  user_agent?: string;
  device_fingerprint?: string;
  geolocation?: string;
  metadata?: any; // Extra info

  // Integrity
  hash: string;
  previous_hash: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  alert_type: string; // e.g., "Suspicious Login", "Mass Deletion"
  description: string;
  severity: SecuritySeverity;
  status: "active" | "investigating" | "resolved" | "false_positive";

  affected_user_id?: string;
  context_data?: any; // JSON

  resolved_by?: string;
  resolved_at?: string;
  resolution_notes?: string;
}

export interface IntegrityCheckResult {
  id: string;
  checked_at: string;
  status: IntegrityStatus;
  checked_count: number;
  corrupted_records: number;
  first_corruption_id?: string;
  performed_by: string;
}

export interface KillSwitchStatus {
  is_active: boolean;
  activated_at?: string;
  activated_by?: string;
  reason?: string;
  active_modules_disabled: string[];
}
