export type ProductStatus = "active" | "inactive" | "discontinued";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type ProductCategory = "materials" | "tools" | "equipment" | "safety" | "office";
export type WarehouseType = "main" | "transit" | "project_site" | "supplier";
export type ToolCondition = "new" | "good" | "fair" | "poor" | "broken";
export type ToolStatus = "available" | "in_use" | "maintenance" | "lost";
export type CountType = "full" | "partial" | "cyclic";
export type CountStatus = "planned" | "in_progress" | "review" | "completed";

export interface InventoryCount {
    id: string;
    code: string;
    warehouseId: string;
    warehouseName: string;
    type: CountType;
    status: CountStatus;
    
    plannedDate: string;
    assignedTo: string[]; // User IDs or Names
    
    // Progress
    totalItems: number;
    countedItems: number;
    
    // Reconciliation
    discrepancies?: number;
    adjustmentValue?: number;
    
    createdAt: string;
    completedAt?: string;
}

export const mockCounts: InventoryCount[] = [
    {
        id: "c1",
        code: "INV-2024-001",
        warehouseId: "w1",
        warehouseName: "Armazém Central",
        type: "full",
        status: "completed",
        plannedDate: "2024-01-31",
        assignedTo: ["Carlos Almada", "João Santos"],
        totalItems: 450,
        countedItems: 450,
        discrepancies: 12,
        adjustmentValue: -1500,
        createdAt: "2024-01-15T09:00:00Z",
        completedAt: "2024-02-01T16:00:00Z"
    },
    {
        id: "c2",
        code: "INV-2024-002",
        warehouseId: "w1",
        warehouseName: "Armazém Central",
        type: "cyclic",
        status: "in_progress",
        plannedDate: "2024-06-15",
        assignedTo: ["Carlos Almada"],
        totalItems: 50,
        countedItems: 22,
        createdAt: "2024-06-10T10:00:00Z"
    }
];

export interface Tool {
    id: string;
    code: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    serialNumber: string;
    
    // Status
    status: ToolStatus;
    condition: ToolCondition;
    
    // Current Assignment
    currentAssignee?: {
        id: string;
        name: string;
    };
    currentProject?: {
        id: string;
        name: string;
    };
    dueDate?: string;
    
    // Financial
    purchaseDate: string;
    purchasePrice: number;
    
    image?: string;
}

export const mockTools: Tool[] = [
    {
        id: "t1",
        code: "FER-001",
        name: "Martelo Demolidor 15kg",
        category: "Elétricas",
        brand: "Hilti",
        model: "TE-1000",
        serialNumber: "SN-998822",
        status: "in_use",
        condition: "good",
        currentAssignee: { id: "u1", name: "Roberto Dias" },
        currentProject: { id: "p1", name: "Villa Atlântico" },
        dueDate: "2024-06-20T18:00:00Z",
        purchaseDate: "2023-05-10",
        purchasePrice: 1500,
        image: "/placeholder-drill.jpg"
    },
    {
        id: "t2",
        code: "FER-002",
        name: "Nível Laser Rotativo",
        category: "Medição",
        brand: "Leica",
        model: "Rugby 610",
        serialNumber: "SN-112233",
        status: "available",
        condition: "new",
        purchaseDate: "2024-01-15",
        purchasePrice: 800,
        image: "/placeholder-laser.jpg"
    }
];

export interface Warehouse {
    id: string;
    code: string;
    name: string;
    type: WarehouseType;
    address: string;
    manager: string;
    capacity?: number; // m3 or percentage
    utilization?: number;
    status: "active" | "inactive";
    createdAt: string;
}

export const mockWarehouses: Warehouse[] = [
    {
        id: "w1",
        code: "WH-MAIN-01",
        name: "Armazém Central - Praia",
        type: "main",
        address: "Zona Industrial Tira Chapéu, Praia",
        manager: "Carlos Almada",
        capacity: 1000,
        utilization: 65,
        status: "active",
        createdAt: "2022-01-01T00:00:00Z"
    },
    {
        id: "w2",
        code: "WH-PROJ-001",
        name: "Obra Villa Atlântico",
        type: "project_site",
        address: "Sal, Cabo Verde",
        manager: "Roberto Dias",
        status: "active",
        createdAt: "2024-02-12T09:00:00Z"
    },
    {
        id: "w3",
        code: "WH-PROJ-002",
        name: "Obra Hotel Santa Maria",
        type: "project_site",
        address: "Sal, Cabo Verde",
        manager: "Ana Pereira",
        status: "active",
        createdAt: "2024-03-01T09:00:00Z"
    }
];

export interface Supplier {
    id: string;
    name: string;
    sku: string;
    price: number;
    leadTime: number; // days
    isPreferred: boolean;
}

export type MovementType = "in" | "out" | "transfer" | "adjustment";

export interface StockMovement {
    id: string;
    date: string;
    type: MovementType;
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    
    // Locations
    fromWarehouseId?: string;
    fromWarehouseName?: string; 
    toWarehouseId?: string;
    toWarehouseName?: string;
    
    reference?: string; // PO number, Project Code, etc.
    performedBy: string;
    notes?: string;
}

export const mockMovements: StockMovement[] = [
    {
        id: "m1",
        date: "2024-06-12T10:30:00Z",
        type: "in",
        productId: "1",
        productName: "Cimento Portland 42.5N",
        sku: "MAT-CEM-001",
        quantity: 200,
        toWarehouseId: "w1",
        toWarehouseName: "Armazém Central",
        reference: "PO-2024-055",
        performedBy: "João Santos",
        notes: "Receção de fornecedor ConstruMat"
    },
     {
        id: "m2",
        date: "2024-06-12T14:15:00Z",
        type: "transfer",
        productId: "1",
        productName: "Cimento Portland 42.5N",
        sku: "MAT-CEM-001",
        quantity: 50,
        fromWarehouseId: "w1",
        fromWarehouseName: "Armazém Central",
        toWarehouseId: "w2",
        toWarehouseName: "Obra Villa Atlântico",
        reference: "REQ-2024-102",
        performedBy: "Roberto Dias",
    },
     {
        id: "m3",
        date: "2024-06-11T09:00:00Z",
        type: "out",
        productId: "2",
        productName: "Tinta Interior Branco",
        sku: "TIN-INT-WHT",
        quantity: 5,
        fromWarehouseId: "w1",
        fromWarehouseName: "Armazém Central",
        reference: "PRJ-2024-001",
        performedBy: "Ana Pereira",
        notes: "Consumo em obra"
    }
];

export interface WarehouseStock {
    warehouseId: string;
    warehouseName: string;
    quantity: number;
    reserved: number;
    incoming: number;
    location?: string;
}

export interface Product {
    id: string;
    sku: string;
    barcode?: string;
    name: string;
    description?: string;
    category: ProductCategory;
    subCategory?: string;
    
    // Status
    status: ProductStatus;
    
    // Stock
    stockTotal: number;
    stockMinimum: number;
    stockStatus: StockStatus;
    stocks: WarehouseStock[]; // Breakdown by warehouse
    
    // Units & Dimensions
    unit: string;
    weight?: number;
    dimensions?: string;
    
    // Financial
    averageCost: number;
    lastPurchasePrice?: number;
    
    // Media
    image?: string;
    gallery?: string[];
    
    // Relationships
    suppliers: Supplier[];
    
    createdAt: string;
    updatedAt: string;
}

export const mockProducts: Product[] = [
    {
        id: "1",
        sku: "MAT-CEM-001",
        name: "Cimento Portland 42.5N",
        category: "materials",
        subCategory: "Construção Bruta",
        status: "active",
        stockTotal: 450,
        stockMinimum: 100,
        stockStatus: "in_stock",
        stocks: [
            { warehouseId: "w1", warehouseName: "Armazém Central", quantity: 300, reserved: 50, incoming: 200, location: "A-01" },
            { warehouseId: "w2", warehouseName: "Obra Villa Atlântico", quantity: 150, reserved: 0, incoming: 0 }
        ],
        unit: "saco 50kg",
        averageCost: 850,
        image: "/placeholder-cement.jpg",
        suppliers: [
            { id: "s1", name: "ConstruMat Lda", sku: "CM-882", price: 820, leadTime: 2, isPreferred: true }
        ],
        createdAt: "2023-01-10T10:00:00Z",
        updatedAt: "2024-05-20T14:30:00Z"
    },
    {
        id: "2",
        sku: "TIN-INT-WHT",
        name: "Tinta Interior Branco Mate 15L",
        category: "materials",
        subCategory: "Pintura",
        status: "active",
        stockTotal: 12,
        stockMinimum: 20,
        stockStatus: "low_stock",
        stocks: [
            { warehouseId: "w1", warehouseName: "Armazém Central", quantity: 12, reserved: 5, incoming: 50, location: "B-05" }
        ],
        unit: "lata 15L",
        averageCost: 4500,
        image: "/placeholder-paint.jpg",
        suppliers: [],
        createdAt: "2023-03-15T09:00:00Z",
        updatedAt: "2024-06-01T11:20:00Z"
    },
    {
        id: "3",
        sku: "TOO-DRI-MAK",
        name: "Berbequim Percussão Makita 18V",
        category: "tools",
        subCategory: "Elétricas",
        status: "active",
        stockTotal: 5,
        stockMinimum: 2,
        stockStatus: "in_stock",
        stocks: [
            { warehouseId: "w1", warehouseName: "Armazém Central", quantity: 2, reserved: 0, incoming: 0 },
            { warehouseId: "w2", warehouseName: "Obra Hotel SM", quantity: 3, reserved: 0, incoming: 0 }
        ],
        unit: "un",
        averageCost: 12000,
        image: "/placeholder-drill.jpg",
        suppliers: [],
        createdAt: "2023-06-20T14:00:00Z",
        updatedAt: "2024-04-10T16:00:00Z"
    }
];

export const categoryLabels: Record<ProductCategory, string> = {
    materials: "Materiais",
    tools: "Ferramentas",
    equipment: "Equipamentos",
    safety: "Segurança",
    office: "Escritório"
};
