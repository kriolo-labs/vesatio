export type ContractType = "client" | "supplier" | "employee" | "partnership" | "other";
export type ContractStatus = "draft" | "active" | "expired" | "cancelled" | "renewing";
export type ProposalStatus = "draft" | "sent" | "viewed" | "accepted" | "rejected";
export type FileType = "folder" | "file";
export type TemplateCategory = "contract" | "proposal" | "report" | "email" | "other";

export interface Contract {
  id: string;
  code: string;
  title: string;
  type: ContractType;
  entity_id: string; // Client, Supplier, or User ID
  entity_name: string; // Denormalized for display
  status: ContractStatus;
  value?: number;
  currency?: string;
  start_date: string;
  end_date?: string; // If null, indefinite
  signed_date?: string;
  description?: string;
  file_url?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  versions?: ContractVersion[];
}

export interface ContractVersion {
  id: string;
  contract_id: string;
  version_number: number;
  file_url: string;
  created_at: string;
  notes?: string;
}

export interface Proposal {
  id: string;
  code: string;
  title: string;
  client_id?: string;
  client_name?: string;
  status: ProposalStatus;
  value?: number;
  valid_until?: string;
  content?: any; // JSON content for the editor
  file_url?: string; // Generated PDF
  created_at: string;
  updated_at: string;
}

export interface ArchiveItem {
  id: string;
  parent_id?: string | null; // Null for root
  name: string;
  type: FileType;
  size?: number; // In bytes, 0 for folder
  mime_type?: string;
  url?: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  tags?: string[];
  path_tokens?: string[]; // For breadcrumbs/search
}

export interface DocumentTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  content?: string; // HTML/Markdown or File URL
  variables?: string[]; // List of placeholders {{var}}
  created_at: string;
  updated_at: string;
}
