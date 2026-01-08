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
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
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
        Insert: Omit<Database["public"]["Tables"]["clients"]["Row"], "id" | "created_at" | "updated_at">;
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
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
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
        Insert: Omit<Database["public"]["Tables"]["invoices"]["Row"], "id" | "created_at" | "updated_at">;
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
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
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
        Insert: Omit<Database["public"]["Tables"]["employees"]["Row"], "id" | "created_at" | "updated_at">;
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
