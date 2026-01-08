export type EmployeeStatus = "active" | "inactive" | "on_leave" | "terminated";
export type ContractType = "full_time" | "part_time" | "internship" | "contractor" | "temporary";
export type Department =
  | "management"
  | "engineering"
  | "design"
  | "sales"
  | "marketing"
  | "rh"
  | "finance"
  | "operations"
  | "legal";
export type Role =
  | "manager"
  | "developer"
  | "designer"
  | "sales_rep"
  | "hr_specialist"
  | "accountant"
  | "architect"
  | "engineer";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;

  // Contractual
  department: Department;
  role: string;
  status: EmployeeStatus;
  contractType: ContractType;
  admissionDate: string;
  contractEndDate?: string;
  managerId?: string;

  // Personal
  birthDate: string;
  nacionality: string;
  nif: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };

  // Financial (Sensitive)
  baseSalary: number;
  bankAccount?: {
    bankName: string;
    iban: string;
    swift: string;
  };

  // System
  systemUserId?: string; // Link to Supabase Auth User
  createdAt: string;
  updatedAt: string;
}

export const mockEmployees: Employee[] = [
  {
    id: "EMP-001",
    firstName: "Ana",
    lastName: "Silva",
    email: "ana.silva@vesatio.com",
    phone: "+351 912 345 678",
    avatarUrl: "https://i.pravatar.cc/150?u=ana",
    department: "management",
    role: "Diretora Geral",
    status: "active",
    contractType: "full_time",
    admissionDate: "2020-01-15",
    birthDate: "1985-05-20",
    nacionality: "Portuguesa",
    nif: "234567890",
    address: "Rua das Flores, 123, Lisboa",
    emergencyContact: {
      name: "João Silva",
      phone: "+351 912 345 679",
      relation: "Marido",
    },
    baseSalary: 3500,
    createdAt: "2020-01-15T09:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "EMP-002",
    firstName: "Carlos",
    lastName: "Mendes",
    email: "carlos.mendes@vesatio.com",
    phone: "+351 961 234 567",
    avatarUrl: "https://i.pravatar.cc/150?u=carlos",
    department: "engineering",
    role: "Engenheiro Civil Sénior",
    status: "active",
    contractType: "full_time",
    admissionDate: "2021-03-10",
    birthDate: "1988-11-12",
    nacionality: "Portuguesa",
    nif: "223344556",
    address: "Av. da Liberdade, 50, Lisboa",
    emergencyContact: {
      name: "Maria Mendes",
      phone: "+351 961 234 568",
      relation: "Esposa",
    },
    baseSalary: 2800,
    managerId: "EMP-001",
    createdAt: "2021-03-10T09:00:00Z",
    updatedAt: "2023-06-15T14:30:00Z",
  },
  {
    id: "EMP-003",
    firstName: "Beatriz",
    lastName: "Costa",
    email: "beatriz.costa@vesatio.com",
    phone: "+351 933 445 566",
    avatarUrl: "https://i.pravatar.cc/150?u=beatriz",
    department: "design",
    role: "Arquiteta Júnior",
    status: "on_leave",
    contractType: "internship",
    admissionDate: "2023-09-01",
    contractEndDate: "2024-08-31",
    birthDate: "1999-07-30",
    nacionality: "Portuguesa",
    nif: "255667788",
    address: "Praceta dos Olivais, 5, Lisboa",
    emergencyContact: {
      name: "Paulo Costa",
      phone: "+351 933 445 567",
      relation: "Pai",
    },
    baseSalary: 1200,
    managerId: "EMP-001",
    createdAt: "2023-09-01T09:00:00Z",
    updatedAt: "2023-12-20T11:00:00Z",
  },
  {
    id: "EMP-004",
    firstName: "David",
    lastName: "Gomes",
    email: "david.gomes@vesatio.com",
    phone: "+351 915 667 788",
    department: "operations",
    role: "Técnico de Obras",
    status: "active",
    contractType: "full_time",
    admissionDate: "2022-06-01",
    birthDate: "1990-02-15",
    nacionality: "Portuguesa",
    nif: "266778899",
    address: "Estrada de Benfica, 200, Lisboa",
    emergencyContact: {
      name: "Sofia Gomes",
      phone: "+351 915 667 789",
      relation: "Irmã",
    },
    baseSalary: 1800,
    managerId: "EMP-002",
    createdAt: "2022-06-01T09:00:00Z",
    updatedAt: "2023-11-10T16:45:00Z",
  },
  {
    id: "EMP-005",
    firstName: "Elena",
    lastName: "Ferrari",
    email: "elena.ferrari@vesatio.com",
    phone: "+351 922 333 444",
    avatarUrl: "https://i.pravatar.cc/150?u=elena",
    department: "sales",
    role: "Gestora de Contas",
    status: "terminated",
    contractType: "full_time",
    admissionDate: "2021-01-10",
    contractEndDate: "2023-12-31",
    birthDate: "1987-09-05",
    nacionality: "Italiana",
    nif: "299887766",
    address: "Rua do Ouro, 88, Lisboa",
    emergencyContact: {
      name: "Marco Ferrari",
      phone: "+39 333 123456",
      relation: "Pai",
    },
    baseSalary: 2500,
    createdAt: "2021-01-10T09:00:00Z",
    updatedAt: "2023-12-31T17:00:00Z",
  },
];
