import { Client } from "./crm";

export type ProjectStatus = "draft" | "approved" | "in_progress" | "on_hold" | "completed" | "archived";
export type ProjectType = "residential" | "commercial" | "hospitality" | "industrial";
export type ProjectPriority = "low" | "medium" | "high" | "critical";

export interface ProjectRevenue {
    total: number;
    paid: number;
    pending: number;
}

export interface ProjectCosts {
    materials: number;
    labor: number;
    subcontractors: number;
    overhead: number;
    total: number;
}

export interface Project {
    id: string;
    code: string;
    name: string;
    description?: string;
    clientId: string;
    client?: Client;
    managerId: string;
    manager?: {
        name: string;
        avatar?: string;
    };
    status: ProjectStatus;
    type: ProjectType;
    priority: ProjectPriority;
    
    // Dates
    startDate: string;
    endDate?: string;
    actualEndDate?: string;
    
    // Location
    location?: {
        address: string;
        city: string;
        country: string;
        coordinates?: { lat: number, lng: number };
    };

    // Financials
    budget: number;
    revenue: ProjectRevenue;
    costs: ProjectCosts;
    margin: number; // calculated

    // Progress
    progress: number; // 0-100
    
    // Metadata
    tags: string[];
    createdAt: string;
    updatedAt: string;
    
    // Images
    coverImage?: string;
    gallery?: string[];
}

export const mockProjects: Project[] = [
    {
        id: "1",
        code: "PRJ-2024-001",
        name: "Villa Atlântico - Renovação Total",
        description: "Renovação completa de villa de luxo com domótica integrada.",
        clientId: "1",
        managerId: "u1",
        manager: { name: "Roberto Dias" },
        status: "in_progress",
        type: "residential",
        priority: "high",
        startDate: "2024-02-12T09:00:00Z",
        endDate: "2024-08-30T18:00:00Z",
        location: {
            address: "Rua do Mar 12",
            city: "Sal",
            country: "Cabo Verde"
        },
        budget: 45000000,
        revenue: {
            total: 45000000,
            paid: 15000000,
            pending: 30000000
        },
        costs: {
            materials: 12000000,
            labor: 8000000,
            subcontractors: 5000000,
            overhead: 2000000,
            total: 27000000
        },
        margin: 18000000,
        progress: 45,
        tags: ["Luxo", "Domótica", "VIP"],
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-05-20T14:30:00Z",
        coverImage: "/placeholder-project-1.jpg"
    },
    {
        id: "2",
        code: "PRJ-2024-005",
        name: "Hotel Santa Maria - Ala Nova",
        clientId: "2",
        managerId: "u2",
        manager: { name: "Ana Pereira" },
        status: "approved",
        type: "hospitality",
        priority: "medium",
        startDate: "2024-06-01T08:00:00Z",
        endDate: "2024-12-15T18:00:00Z",
        budget: 120000000,
        revenue: {
            total: 120000000,
            paid: 20000000,
            pending: 100000000
        },
        costs: {
            materials: 40000000,
            labor: 20000000,
            subcontractors: 20000000,
            overhead: 10000000,
            total: 90000000
        },
        margin: 30000000,
        progress: 0,
        tags: ["Hotelaria", "Construção"],
        createdAt: "2024-04-10T09:15:00Z",
        updatedAt: "2024-05-18T11:20:00Z"
    }
];
