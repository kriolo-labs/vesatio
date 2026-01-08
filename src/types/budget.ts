export type BudgetStatus = "draft" | "sent" | "approved" | "rejected" | "converted";
export type BudgetItemCategory = "material" | "labor" | "equipment" | "subcontractor" | "other";

export interface BudgetItem {
    id: string;
    description: string;
    category: BudgetItemCategory;
    quantity: number;
    unit: string;
    unitPrice: number;
    discount: number; // percentage
    total: number;
    
    // Internal costs
    unitCost: number;
    margin: number;
}

export interface Budget {
    id: string;
    code: string;
    version: number;
    projectId?: string;
    clientId: string;
    clientName: string;
    
    title: string;
    description: string;
    
    items: BudgetItem[];
    
    subtotal: number;
    discount: number; // value
    taxes: number;
    total: number;
    
    costs: number;
    margin: number;
    marginPercent: number;
    
    status: BudgetStatus;
    validUntil: string;
    paymentTerms: string;
    notes?: string;
    
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export const unitOptions = ["un", "m", "m²", "m³", "kg", "l", "h", "dia"];
export const categoryOptions: { value: BudgetItemCategory, label: string }[] = [
    { value: "material", label: "Materiais" },
    { value: "labor", label: "Mão de Obra" },
    { value: "equipment", label: "Equipamentos" },
    { value: "subcontractor", label: "Subempreitada" },
    { value: "other", label: "Outros" },
];
