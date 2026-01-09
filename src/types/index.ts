// ========================================
// Database Types (auto-generated should go here)
// ========================================

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          role: "admin" | "manager" | "staff" | "client";
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["profiles"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      clients: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          nif: string | null;
          address: string | null;
          type: "individual" | "company";
          status: "active" | "inactive" | "lead";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["clients"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          name: string;
          client_id: string;
          status: "draft" | "planning" | "in_progress" | "on_hold" | "completed" | "cancelled";
          type: "residential" | "commercial" | "renovation" | "consulting";
          budget: number | null;
          start_date: string | null;
          end_date: string | null;
          progress: number;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          client_id: string;
          project_id: string | null;
          status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          subtotal: number;
          tax: number;
          total: number;
          due_date: string;
          paid_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["invoices"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          sku: string;
          category: string;
          unit: string;
          unit_price: number;
          cost_price: number | null;
          stock_quantity: number;
          min_stock: number;
          max_stock: number | null;
          status: "active" | "inactive" | "discontinued";
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["products"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      employees: {
        Row: {
          id: string;
          profile_id: string;
          department: string;
          position: string;
          hire_date: string;
          salary: number | null;
          status: "active" | "on_leave" | "terminated";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["employees"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["employees"]["Insert"]>;
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity: string;
          entity_id: string | null;
          details: Record<string, unknown> | null;
          ip_address: string | null;
          risk_level: "low" | "medium" | "high";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["audit_logs"]["Row"], "id" | "created_at">;
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

// ========================================
// Business Model Types
// ========================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "manager" | "staff" | "client";
  permissions?: string[];
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  nif?: string;
  address?: string;
  type: "individual" | "company";
  status: "active" | "inactive" | "lead";
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  client?: Client;
  status: "draft" | "planning" | "in_progress" | "on_hold" | "completed" | "cancelled";
  type: "residential" | "commercial" | "renovation" | "consulting";
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  progress: number;
  description?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client?: Client;
  projectId?: string;
  project?: Project;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  subtotal: number;
  tax: number;
  total: number;
  dueDate: Date;
  paidAt?: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  unitPrice: number;
  costPrice?: number;
  stockQuantity: number;
  minStock: number;
  maxStock?: number;
  status: "active" | "inactive" | "discontinued";
  imageUrl?: string;
}

export interface Employee {
  id: string;
  profileId: string;
  user?: User;
  department: string;
  position: string;
  hireDate: Date;
  salary?: number;
  status: "active" | "on_leave" | "terminated";
}

// ========================================
// API Response Types
// ========================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ========================================
// AURA Types
// ========================================

export interface AURAIntent {
  action: string;
  entity: string;
  params: Record<string, unknown>;
  confidence: number;
}

export interface AURAAction {
  type: string;
  params: Record<string, unknown>;
  requiresConfirmation: boolean;
  description: string;
  rollbackAction?: string;
}

// ========================================
// Production Types
// ========================================

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
  checklist_data?: Record<string, unknown>; // JSON
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
