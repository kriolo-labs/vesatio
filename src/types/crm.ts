
export type LeadStatus = 
    | "new" 
    | "contacted" 
    | "qualified" 
    | "proposal" 
    | "negotiation" 
    | "converted" 
    | "lost" 
    | "waitlist";

export type LeadSource = "website" | "referral" | "ads" | "event" | "other";

export interface Lead {
    id: string;
    code: string;
    name: string;
    email: string;
    phone?: string;
    country: string;
    projectType: string;
    investmentParams: {
        min?: number;
        max?: number;
        currency: "CVE" | "EUR";
    };
    status: LeadStatus;
    source: LeadSource;
    score: number; // 0-100
    assignedTo?: {
        name: string;
        avatar?: string;
    };
    lastInteraction?: string; // Date string
    createdAt: string; // Date string
    notes?: string;
    tags?: string[];
}

export const mockLeads: Lead[] = [
    {
        id: "1",
        code: "LD-2024-001",
        name: "Carlos Silva",
        email: "carlos.silva@email.com",
        phone: "+238 991 23 45",
        country: "Cabo Verde",
        projectType: "Residencial Completo",
        investmentParams: { min: 15_000_000, max: 25_000_000, currency: "CVE" },
        status: "new",
        source: "website",
        score: 85,
        assignedTo: { name: "Ana Pereira" },
        createdAt: "2024-05-15T10:00:00Z",
        lastInteraction: "2024-05-15T10:00:00Z",
        tags: ["VIP", "Urgente"]
    },
    {
        id: "2",
        code: "LD-2024-002",
        name: "Jean Pierre",
        email: "jp.invest@email.fr",
        country: "França",
        projectType: "Hotelaria",
        investmentParams: { min: 50_000_000, max: 100_000_000, currency: "CVE" },
        status: "negotiation",
        source: "referral",
        score: 95,
        assignedTo: { name: "Roberto Dias" },
        createdAt: "2024-05-10T14:30:00Z",
        lastInteraction: "2024-05-18T09:15:00Z",
        tags: ["Investidor", "Luxo"]
    },
    {
        id: "3",
        code: "LD-2024-003",
        name: "Marta Gomes",
        email: "marta.g@email.com",
        country: "Cabo Verde",
        projectType: "Cozinha",
        investmentParams: { max: 2_000_000, currency: "CVE" },
        status: "contacted",
        source: "ads",
        score: 60,
        assignedTo: { name: "Ana Pereira" },
        createdAt: "2024-05-16T11:20:00Z",
        lastInteraction: "2024-05-17T15:00:00Z"
    },
    {
        id: "4",
        code: "LD-2024-004",
        name: "John Smith",
        email: "john@smith.uk",
        country: "UK",
        projectType: "Smart Home",
        investmentParams: { max: 5_000_000, currency: "CVE" },
        status: "qualified",
        source: "website",
        score: 75,
        createdAt: "2024-05-18T08:00:00Z",
    },
    {
        id: "5",
        code: "LD-2024-005",
        name: "Construtora Horizonte",
        email: "contato@chorizonte.cv",
        country: "Cabo Verde",
        projectType: "Parceria",
        investmentParams: { currency: "CVE" },
        status: "proposal",
        source: "event",
        score: 70,
        assignedTo: { name: "Roberto Dias" },
        createdAt: "2024-05-12T16:45:00Z",
    }
];

export type ClientStatus = "active" | "inactive";
export type ClientType = "individual" | "company";

export interface Client {
    id: string;
    code: string;
    name: string;
    email: string;
    phone?: string;
    type: ClientType;
    companyName?: string;
    nif?: string;
    country: string;
    status: ClientStatus;
    vip: boolean;
    totalSpent: number;
    activeProjects: number;
    createdAt: string;
    avatar?: string;
    address?: string;
    billingAddress?: string;
    paymentTerms?: string;
    tags?: string[];
}

export const mockClients: Client[] = [
    {
        id: "1",
        code: "CL-2023-089",
        name: "Sofia Martinez",
        email: "sofia.m@example.com",
        phone: "+238 991 11 22",
        type: "individual",
        country: "Espanha",
        status: "active",
        vip: true,
        totalSpent: 45000000,
        activeProjects: 2,
        createdAt: "2023-11-10T09:00:00Z",
        tags: ["Investidor", "Luxo"]
    },
    {
        id: "2",
        code: "CL-2024-002",
        name: "Tech Solutions Lda",
        email: "contact@techsolutions.cv",
        type: "company",
        companyName: "Tech Solutions Lda",
        nif: "234567890",
        country: "Cabo Verde",
        status: "active",
        vip: false,
        totalSpent: 1200000,
        activeProjects: 1,
        createdAt: "2024-01-20T14:30:00Z",
        tags: ["Parceiro"]
    },
    {
        id: "3",
        code: "CL-2022-156",
        name: "James Bond",
        email: "007@mi6.uk",
        type: "individual",
        country: "UK",
        status: "inactive",
        vip: true,
        totalSpent: 150000000,
        activeProjects: 0,
        createdAt: "2022-05-05T10:00:00Z",
        tags: ["VIP"]
    }
];
