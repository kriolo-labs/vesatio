export type SupplierStatus = "active" | "inactive" | "blocked";
export type SupplierType = "national" | "international";
export type SupplierRating = 1 | 2 | 3 | 4 | 5;

export interface SupplierBankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    iban: string;
    swift?: string;
    currency: string;
    isPrimary: boolean;
}

export interface SupplierContact {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    isPrimary: boolean;
}

export interface Supplier {
    id: string;
    code: string;
    name: string;
    commercialName?: string;
    taxId: string; // NIF
    type: SupplierType;
    status: SupplierStatus;
    
    // Contact Info
    email: string;
    phone: string;
    website?: string;
    address: string;
    city: string;
    country: string;
    
    // Categorization
    categories: string[];
    rating: SupplierRating;
    
    // Commercial Conditions
    paymentTerms: string; // e.g., "30 days", "Prompt"
    currency: string;
    incoterm?: string;
    
    // Financial
    totalPurchased: number;
    balance: number; // Outstanding balance
    
    // Relations
    contacts: SupplierContact[];
    bankAccounts: SupplierBankAccount[];
    
    createdAt: string;
    updatedAt: string;
    
    logo?: string;
    notes?: string;
}

export const mockSuppliers: Supplier[] = [
    {
        id: "s1",
        code: "SUP-001",
        name: "ConstruMat, Lda",
        commercialName: "ConstruMat CV",
        taxId: "258193849",
        type: "national",
        status: "active",
        email: "comercial@construmat.cv",
        phone: "+238 261 00 00",
        address: "Achada Grande Frente",
        city: "Praia",
        country: "Cabo Verde",
        categories: ["shipping", "materials"],
        rating: 4,
        paymentTerms: "30 dias",
        currency: "CVE",
        totalPurchased: 12500000,
        balance: 450000,
        contacts: [
            { id: "c1", name: "Maria Silva", role: "Gestora de Conta", email: "maria@construmat.cv", phone: "9910000", isPrimary: true }
        ],
        bankAccounts: [
            { id: "b1", bankName: "BCA", accountNumber: "12345678", iban: "CV640001000012345678", currency: "CVE", isPrimary: true }
        ],
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2024-05-20T14:30:00Z",
        logo: "/placeholder-supplier-1.png"
    },
    {
        id: "s2",
        code: "SUP-INT-002",
        name: "Global Tools GmbH",
        taxId: "DE8119283",
        type: "international",
        status: "active",
        email: "sales@globaltools.de",
        phone: "+49 30 123456",
        address: "Industrial Allee 5",
        city: "Berlin",
        country: "Germany",
        categories: ["tools", "equipment"],
        rating: 5,
        paymentTerms: "Pre-paid",
        currency: "EUR",
        incoterm: "CIF Praia",
        totalPurchased: 45000, // converted value usually
        balance: 0,
        contacts: [],
        bankAccounts: [],
        createdAt: "2023-03-10T11:00:00Z",
        updatedAt: "2024-02-15T09:00:00Z"
    },
     {
        id: "s3",
        code: "SUP-003",
        name: "Tintas & Cores S.A.",
        taxId: "200399182",
        type: "national",
        status: "blocked",
        email: "geral@tintasecores.cv",
        phone: "+238 262 55 55",
        address: "Chã de Areia",
        city: "Praia",
        country: "Cabo Verde",
        categories: ["materials"],
        rating: 2,
        paymentTerms: "Pronto Pagamento",
        currency: "CVE",
        totalPurchased: 200000,
        balance: 0,
        contacts: [],
        bankAccounts: [],
        createdAt: "2022-11-05T16:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",
        notes: "Bloqueado por recorrentes atrasos na entrega."
    }
];

export type RequisitionStatus = "draft" | "pending_approval" | "approved" | "rejected" | "converted";
export type RequisitionPriority = "normal" | "urgent" | "critical";

export interface RequisitionItem {
    id: string;
    productId?: string;
    productName: string; // fallback if text
    description?: string;
    quantity: number;
    unit: string;
    estimatedPrice?: number;
    total: number;
    notes?: string;
}

export interface Requisition {
    id: string;
    code: string;
    requestedBy: {
        id: string;
        name: string;
        avatar?: string;
        department: string;
    };
    projectId?: string;
    projectName?: string;
    department?: string;
    
    date: string;
    requiredDate: string;
    priority: RequisitionPriority;
    status: RequisitionStatus;
    
    items: RequisitionItem[];
    totalEstimated: number;
    
    justification: string;
    
    // Approval
    approvedBy?: string;
    approvedAt?: string;
    rejectionReason?: string;
    
    createdAt: string;
}

export const mockRequisitions: Requisition[] = [
    {
        id: "req1",
        code: "REQ-2024-102",
        requestedBy: { id: "u1", name: "Roberto Dias", department: "Obras" },
        projectId: "p1",
        projectName: "Villa Atlântico",
        date: "2024-06-10T09:00:00Z",
        requiredDate: "2024-06-20",
        priority: "normal",
        status: "approved",
        items: [
            { id: "ri1", productId: "1", productName: "Cimento Portland", quantity: 50, unit: "saco 50kg", estimatedPrice: 850, total: 42500 }
        ],
        totalEstimated: 42500,
        justification: "Material para fundações da fase 2.",
        approvedBy: "Carlos Almada",
        approvedAt: "2024-06-11T10:00:00Z",
        createdAt: "2024-06-10T09:00:00Z"
    },
    {
        id: "req2",
        code: "REQ-2024-105",
        requestedBy: { id: "u3", name: "Ana Pereira", department: "Obras" },
        projectId: "p2",
        projectName: "Hotel Santa Maria",
        date: "2024-06-12T14:00:00Z",
        requiredDate: "2024-06-15",
        priority: "urgent",
        status: "pending_approval",
        items: [
            { id: "ri2", productName: "Disjuntores 16A", quantity: 20, unit: "un", estimatedPrice: 450, total: 9000 },
             { id: "ri3", productName: "Cabo 2.5mm", quantity: 200, unit: "m", estimatedPrice: 45, total: 9000 }
        ],
        totalEstimated: 18000,
        justification: "Falta de material elétrico crítico.",
        createdAt: "2024-06-12T14:00:00Z"
    }
];

export type POStatus = "draft" | "sent" | "partial_received" | "closed" | "cancelled";

export interface PurchaseOrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    discount?: number;
    taxRate: number; // %
    total: number;
}

export interface PurchaseOrder {
    id: string;
    code: string;
    supplierId: string;
    supplierName: string;
    
    date: string;
    deliveryDate: string;
    
    status: POStatus;
    
    items: PurchaseOrderItem[];
    
    subtotal: number;
    taxTotal: number;
    shippingCost: number;
    total: number;
    
    paymentTerms: string;
    notes?: string;
    
    // Workflow
    createdBy: string;
    approvedBy?: string;
    
    quotes?: {
        supplierId: string;
        supplierName: string;
        price: number;
        deliveryDays: number;
        auraScore: number;
        features: string[];
    }[]; // For triple quote comparison
}

export const mockPOs: PurchaseOrder[] = [
    {
        id: "po1",
        code: "PO-24-001",
        supplierId: "s1",
        supplierName: "ConstruMat, Lda",
        date: "2024-06-15T10:00:00Z",
        deliveryDate: "2024-06-25",
        status: "sent",
        items: [
             { id: "poi1", productId: "1", productName: "Cimento Portland", quantity: 100, unit: "saco", unitPrice: 850, taxRate: 15, total: 85000 }
        ],
        subtotal: 85000,
        taxTotal: 12750,
        shippingCost: 2000,
        total: 99750,
        paymentTerms: "30 dias",
        createdBy: "Roberto Dias",
        quotes: [
            { supplierId: "s1", supplierName: "ConstruMat", price: 99750, deliveryDays: 10, auraScore: 9.2, features: ["Menor Preço", "Entrega Rápida"] },
            { supplierId: "s2", supplierName: "Global Mat", price: 105000, deliveryDays: 15, auraScore: 7.5, features: ["Stock Disponível"] },
            { supplierId: "s5", supplierName: "Lusa Cimento", price: 110000, deliveryDays: 7, auraScore: 8.0, features: ["Entrega Imediata"] }
        ]
    },
    {
        id: "po2",
        code: "PO-24-005",
        supplierId: "s2",
        supplierName: "Global Tools GmbH",
        date: "2024-06-18T11:00:00Z",
        deliveryDate: "2024-07-05",
        status: "draft",
        items: [
             { id: "poi3", productId: "tools1", productName: "Martelo Demolidor", quantity: 2, unit: "un", unitPrice: 45000, taxRate: 15, total: 90000 }
        ],
        subtotal: 90000,
        taxTotal: 13500,
        shippingCost: 5000,
        total: 108500,
        paymentTerms: "Pre-paid",
        createdBy: "Ana Pereira"
    }
];

export type ReceiptStatus = "received" | "inspected" | "stocked" | "returned_partially";

export interface GoodsReceiptItem {
    id: string;
    itemPOId: string;
    productName: string;
    quantityOrdered: number;
    quantityReceived: number;
    quantityRejected: number;
    notes?: string;
}

export interface GoodsReceipt {
    id: string;
    code: string;
    poId: string;
    poCode: string;
    supplierName: string;
    
    date: string;
    status: ReceiptStatus;
    
    items: GoodsReceiptItem[];
    
    receivedBy: string;
    inspector?: string;
    notes?: string;
    
    documentUrl?: string; // Delivery Note / Guia de Remessa
}

export const mockReceipts: GoodsReceipt[] = [
    {
        id: "rec1",
        code: "GR-2024-050",
        poId: "po1",
        poCode: "PO-24-001",
        supplierName: "ConstruMat, Lda",
        date: "2024-06-25T14:30:00Z",
        status: "stocked",
        items: [
             { id: "gri1", itemPOId: "poi1", productName: "Cimento Portland", quantityOrdered: 100, quantityReceived: 100, quantityRejected: 0 }
        ],
        receivedBy: "João Santos",
        inspector: "Eng. Carlos",
        notes: "Tudo em conformidade."
    }
];
