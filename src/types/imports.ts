export type ImportStatus = 
    | "draft" 
    | "payment_pending" 
    | "production" 
    | "ready_to_ship" 
    | "shipped" 
    | "in_transit" 
    | "arrived" 
    | "customs_clearance" 
    | "released" 
    | "delivered"
    | "cancelled";

export type TransportType = "sea" | "air" | "road" | "multimodal";
export type Incoterm = "EXW" | "FOB" | "CIF" | "DDP" | "DAP" | "FCA" | "CPT" | "CIP" | "DAT";

export interface ImportDocument {
    id: string;
    type: "proforma" | "commercial_invoice" | "packing_list" | "bill_of_lading" | "origin_certificate" | "customs_declaration" | "insurance" | "other";
    name: string;
    url?: string;
    status: "pending" | "received" | "validated" | "rejected";
    uploadedAt?: string;
    required: boolean;
}

export interface ImportEvent {
    id: string;
    date: string;
    description: string;
    location: string;
    type: "status_change" | "document" | "location" | "alert" | "customs";
    createdBy: string; // User or System
}

export interface ImportCost {
    id: string;
    categoryId: string; // e.g., 'freight', 'customs', 'handling'
    categoryName: string;
    description: string;
    estimatedValue: number;
    actualValue?: number;
    currency: string;
    exchangeRate: number; // to local currency
    status: "estimated" | "invoiced" | "paid";
    linkedDocumentId?: string; // e.g. Freelancer invoice ID
}

export interface ImportItem {
    id: string;
    poItemId: string;
    productName: string;
    quantity: number;
    unitPrice: number; // FOB/EXW price
    currency: string;
    // Landed Cost Allocation
    allocatedFreight: number;
    allocatedInsurance: number;
    allocatedCustoms: number;
    allocatedOther: number;
    totalLandedCost: number;
    unitLandedCost: number;
}

export interface ImportProcess {
    id: string;
    code: string;
    reference?: string; // External ref (BL number, Booking ref)
    
    // Relations
    relatedPoIds: string[]; // Can combine multiple POs
    supplierId: string;
    supplierName: string;
    
    // Logistics
    originCountry: string;
    originPort: string;
    destinationCountry: string;
    destinationPort: string;
    transportType: TransportType;
    incoterm: Incoterm;
    vesselName?: string;
    containerNumber?: string;
    
    // Partners
    forwarderId?: string;
    forwarderName?: string;
    brokerId?: string; // Despachante
    brokerName?: string;
    
    // Dates
    etd: string; // Estimated Time of Departure
    atd?: string; // Actual
    eta: string; // Estimated Time of Arrival
    ata?: string; // Actual
    clearedAt?: string;
    
    status: ImportStatus;
    
    // Financials (Proforma)
    totalMerchandiseValue: number; // FOB
    currency: string;
    totalLandedCostEstimated: number; // Local Currency
    
    documents: ImportDocument[];
    events: ImportEvent[];
    costs: ImportCost[];
    items: ImportItem[];
    
    createdAt: string;
    updatedAt: string;
}

// Mock Data
export const mockImports: ImportProcess[] = [
    {
        id: "imp1",
        code: "IMP-2024-001",
        reference: "BL-HLCU12345678",
        relatedPoIds: ["po1"],
        supplierId: "s1",
        supplierName: "ConstruMat, Lda",
        originCountry: "Portugal",
        originPort: "Leixões",
        destinationCountry: "Cabo Verde",
        destinationPort: "Praia",
        transportType: "sea",
        incoterm: "FOB",
        vesselName: "MSC ALYSSA",
        containerNumber: "MSCU9876543",
        forwarderName: "Rangel Logistics",
        brokerName: "Despachos CV",
        etd: "2024-06-20",
        atd: "2024-06-21",
        eta: "2024-07-05",
        status: "in_transit",
        totalMerchandiseValue: 12500,
        currency: "EUR",
        totalLandedCostEstimated: 1650000, // CVE approx
        documents: [
            { id: "d1", type: "proforma", name: "Proforma Invoice", status: "validated", required: true, url: "/docs/pi.pdf" },
            { id: "d2", type: "bill_of_lading", name: "Bill of Lading", status: "received", required: true, url: "/docs/bl.pdf" },
            { id: "d3", type: "packing_list", name: "Packing List", status: "received", required: true }
        ],
        events: [
            { id: "e1", date: "2024-06-21", description: "Vessel departed from origin", location: "Leixões, PT", type: "location", createdBy: "System" }
        ],
        costs: [
            { id: "c1", categoryId: "freight", categoryName: "Frete Marítimo", description: "Frete Leixões -> Praia", estimatedValue: 1200, currency: "EUR", exchangeRate: 110.265, status: "invoiced" }
        ],
        items: [],
        createdAt: "2024-06-15",
        updatedAt: "2024-06-21"
    },
    {
        id: "imp2",
        code: "IMP-2024-005",
        relatedPoIds: ["po2"],
        supplierId: "s2",
        supplierName: "Global Tools GmbH",
        originCountry: "Germany",
        originPort: "Hamburg",
        destinationCountry: "Cabo Verde",
        destinationPort: "Praia",
        transportType: "air",
        incoterm: "CIF",
        forwarderName: "DHL Global Forwarding",
        etd: "2024-07-10",
        eta: "2024-07-12",
        status: "production",
        totalMerchandiseValue: 45000,
        currency: "EUR",
        totalLandedCostEstimated: 5800000, // CVE
        documents: [
            { id: "d4", type: "proforma", name: "Proforma", status: "validated", required: true }
        ],
        events: [],
        costs: [],
        items: [],
        createdAt: "2024-06-25",
        updatedAt: "2024-06-25"
    }
];
