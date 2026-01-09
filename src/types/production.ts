export type ProductionPriority = "low" | "medium" | "high" | "urgent";
export type ProductionStatus =
  | "draft"
  | "planned"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "on_hold";
export type ItemStatus = "pending" | "in_production" | "completed" | "problem";
export type MachineStatus = "operational" | "maintenance" | "broken" | "inactive";
export type InspectionResult = "approved" | "rejected" | "approved_with_notes";
export type NonConformitySeverity = "critical" | "major" | "minor";
export type NonConformityStatus = "open" | "investigating" | "verification" | "closed";

export interface ProductionOrder {
  id: string;
  code: string;
  project_id: string;
  description: string;
  priority: ProductionPriority;
  status: ProductionStatus;
  start_date_planned?: string;
  end_date_planned?: string;
  start_date_actual?: string;
  end_date_actual?: string;
  created_at: string;
  updated_at: string;
  items?: ProductionItem[];
}

export interface ProductionItem {
  id: string;
  order_id: string;
  description: string;
  quantity: number;
  specifications?: string; // JSON or text
  drawing_url?: string;
  status: ItemStatus;
  bom?: BOMItem[];
  logs?: WorkLog[];
}

export interface BOMItem {
  id: string;
  production_item_id: string;
  product_id: string; // From catalogue
  product_name: string; // Denormalized for display
  quantity: number;
  unit: string;
  status: "available" | "requisitioned" | "consumed";
}

export interface WorkLog {
  id: string;
  production_item_id: string;
  operator_id: string;
  start_time: string;
  end_time?: string;
  status: "active" | "completed";
  notes?: string;
  quantity_produced?: number;
}

export interface CuttingPlan {
  id: string;
  code: string;
  material_id: string;
  material_name: string;
  material_dimensions: string; // e.g., "2750x1830"
  status: "draft" | "generated" | "cut";
  created_at: string;
  waste_percentage?: number;
  total_sheets?: number;
  pieces?: CuttingPlanItem[];
}

export interface CuttingPlanItem {
  id: string;
  plan_id: string;
  description: string;
  length: number;
  width: number;
  quantity: number;
  grain_direction?: "length" | "width" | "none";
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  serial_number: string;
  purchase_date?: string;
  status: MachineStatus;
  next_maintenance_date?: string;
  location?: string;
}

export interface MaintenanceLog {
  id: string;
  machine_id: string;
  date: string;
  type: "preventive" | "corrective";
  description: string;
  cost?: number;
  technician_name: string;
  parts_replaced?: string;
}

export interface QualityInspection {
  id: string;
  order_id?: string;
  item_id?: string;
  type: "material" | "process" | "final";
  inspector_id: string;
  date: string;
  result: InspectionResult;
  checklist_data?: any; // JSON
  notes?: string;
  photos?: string[];
}

export interface NonConformity {
  id: string;
  inspection_id?: string;
  order_id?: string;
  description: string;
  severity: NonConformitySeverity;
  status: NonConformityStatus;
  root_cause?: string;
  corrective_action?: string;
  responsible_id?: string;
  deadline?: string;
  created_at: string;
}
