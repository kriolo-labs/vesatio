export type WidgetType =
  | "kpi_card"
  | "line_chart"
  | "bar_chart"
  | "pie_chart"
  | "gauge"
  | "table"
  | "map";
export type MetricCategory = "financial" | "operational" | "commercial" | "hr" | "quality";
export type KPIStatus = "critical" | "warning" | "good" | "neutral";
export type AlertSeverity = "critical" | "high" | "medium" | "low";
export type ReportType = "table" | "chart" | "mixed";

export interface DashboardLayout {
  id: string;
  name: string;
  user_id: string;
  is_default: boolean;
  widgets: WidgetConfig[];
  created_at: string;
  updated_at: string;
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  metric_id?: string; // Link to a defined KPI
  data_source?: string; // If not linked to a KPI
  position: { x: number; y: number; w: number; h: number };
  settings?: any; // JSON for specific chart settings (colors, axes)
}

export interface KPI {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: MetricCategory;
  formula?: string; // Human readable formula
  unit: string; // e.g., "CVE", "%", "qty"

  // Thresholds for status
  threshold_warning?: number;
  threshold_critical?: number;
  direction: "higher_is_better" | "lower_is_better"; // To determine colors

  owner_id?: string;
  update_frequency: "realtime" | "daily" | "weekly" | "monthly";

  // Current values (cached/computed)
  current_value: number;
  previous_value?: number;
  target_value?: number;
  status: KPIStatus;

  last_updated: string;
}

export interface ReportConfig {
  id: string;
  name: string;
  description?: string;
  category: string;
  type: ReportType;
  config: {
    source_table: string;
    fields: string[];
    filters?: FilterConfig[];
    aggregation?: { field: string; type: "sum" | "avg" | "count" };
    sort?: { field: string; direction: "asc" | "desc" };
  };
  is_public: boolean;
  owner_id: string;
  created_at: string;
}

export interface FilterConfig {
  field: string;
  operator: "eq" | "neq" | "gt" | "lt" | "contains" | "between";
  value: any;
}

export interface BusinessAlert {
  id: string;
  name: string;
  description?: string;
  condition_rule: string; // e.g. "kpi:margin < 0.2"
  severity: AlertSeverity;
  channels: ("app" | "email" | "sms")[];
  is_active: boolean;
  created_at: string;
  last_triggered?: string;
}

export interface AlertHistory {
  id: string;
  alert_id: string;
  triggered_at: string;
  value_at_trigger: number;
  status: "new" | "acknowledged" | "resolved";
  acknowledged_by?: string;
  acknowledged_at?: string;
}
