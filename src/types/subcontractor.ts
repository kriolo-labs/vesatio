export type SubcontractorStatus = "active" | "inactive" | "blacklisted";

export interface SubcontractorRating {
  id: string;
  projectId: string;
  projectName: string;
  score: number; // 1-5
  comment?: string;
  date: string; // ISO Date
}

export interface Subcontractor {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialty: string; // e.g., "Electrician", "Plumber", "HVAC"
  nif: string;
  address: string;
  status: SubcontractorStatus;
  rating: number; // Average rating
  commercialDiscount?: number; // %
  paymentTerms?: string; // e.g., "30 days"

  // Documents status
  insuranceValid: boolean;
  insuranceExpiry?: string;

  recentProjects: SubcontractorRating[];
}

export const mockSubcontractors: Subcontractor[] = [
  {
    id: "SUB-001",
    companyName: "ElectroLuz Ltda",
    contactPerson: "José Santos",
    email: "jose@electroluz.pt",
    phone: "+351 911 222 333",
    specialty: "Eletricista",
    nif: "501234567",
    address: "Rua da Luz, 45, Lisboa",
    status: "active",
    rating: 4.8,
    commercialDiscount: 10,
    paymentTerms: "30 dias",
    insuranceValid: true,
    insuranceExpiry: "2024-12-31",
    recentProjects: [
      {
        id: "RAT-001",
        projectId: "PRJ-001",
        projectName: "Villa Cascais",
        score: 5,
        date: "2023-11-15",
        comment: "Excelente trabalho, dentro do prazo.",
      },
      {
        id: "RAT-002",
        projectId: "PRJ-003",
        projectName: "Apt Chiado",
        score: 4.5,
        date: "2023-09-20",
        comment: "Bom serviço.",
      },
    ],
  },
  {
    id: "SUB-002",
    companyName: "Canalizações Rápidas",
    contactPerson: "Manuel Ferreira",
    email: "manuel@canarim.pt",
    phone: "+351 922 333 444",
    specialty: "Canalizador",
    nif: "502345678",
    address: "Av. da Água, 10, Porto",
    status: "active",
    rating: 3.5,
    paymentTerms: "Pronto Pagamento",
    insuranceValid: false,
    insuranceExpiry: "2023-10-01",
    recentProjects: [
      {
        id: "RAT-003",
        projectId: "PRJ-002",
        projectName: "Escritório Parque",
        score: 3,
        date: "2023-10-05",
        comment: "Atraso na entrega.",
      },
      {
        id: "RAT-004",
        projectId: "PRJ-005",
        projectName: "Loja Shopping",
        score: 4,
        date: "2023-08-12",
      },
    ],
  },
  {
    id: "SUB-003",
    companyName: "Estruturas Fortes SA",
    contactPerson: "Eng.ª Maria João",
    email: "maria@estruturas.pt",
    phone: "+351 933 444 555",
    specialty: "Serralharia",
    nif: "503456789",
    address: "Zona Industrial, Lote 5, Maia",
    status: "inactive",
    rating: 4.2,
    paymentTerms: "60 dias",
    insuranceValid: true,
    insuranceExpiry: "2025-06-30",
    recentProjects: [],
  },
  {
    id: "SUB-004",
    companyName: "Pinturas & Cores",
    contactPerson: "António Silva",
    email: "antonio@pinturas.pt",
    phone: "+351 966 777 888",
    specialty: "Pintor",
    nif: "504567890",
    address: "Rua das Cores, 2, Coimbra",
    status: "blacklisted",
    rating: 1.5,
    paymentTerms: "Pronto Pagamento",
    insuranceValid: false,
    recentProjects: [
      {
        id: "RAT-005",
        projectId: "PRJ-010",
        projectName: "Hotel Mar",
        score: 1,
        date: "2023-05-20",
        comment: "Abandonou a obra.",
      },
    ],
  },
];
