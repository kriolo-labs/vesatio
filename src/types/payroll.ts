export type PayrollStatus = "draft" | "processing" | "approved" | "paid";

export interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  department: string;
  baseSalary: number;
  allowances: number; // Subsídio de Alimentação, etc.
  bonuses: number;
  grossSalary: number;

  // Deductions
  socialSecurity: number; // TSU (Segurança Social)
  irs: number; // Retention tax
  otherDeductions: number;

  netSalary: number;
}

export interface PayrollRun {
  id: string;
  month: number;
  year: number;
  status: PayrollStatus;
  totalEmployees: number;
  totalGross: number;
  totalNet: number;
  totalTaxes: number; // IRS + SS
  processedAt?: string;
  approvedAt?: string;
  paidAt?: string;

  payslips: Payslip[];
}

// Mock Data
export const mockPayrollHistory: PayrollRun[] = [
  {
    id: "PAY-2023-12",
    month: 12,
    year: 2023,
    status: "paid",
    totalEmployees: 24,
    totalGross: 48000,
    totalNet: 32500,
    totalTaxes: 15500,
    processedAt: "2023-12-20T10:00:00Z",
    approvedAt: "2023-12-21T11:00:00Z",
    paidAt: "2023-12-22T09:00:00Z",
    payslips: [],
  },
  {
    id: "PAY-2023-11",
    month: 11,
    year: 2023,
    status: "paid",
    totalEmployees: 24,
    totalGross: 47500,
    totalNet: 32200,
    totalTaxes: 15300,
    processedAt: "2023-11-20T10:00:00Z",
    approvedAt: "2023-11-21T11:00:00Z",
    paidAt: "2023-11-22T09:00:00Z",
    payslips: [],
  },
];

export const mockCurrentPayroll: PayrollRun = {
  id: "PAY-2024-01",
  month: 1,
  year: 2024,
  status: "draft",
  totalEmployees: 25,
  totalGross: 52000,
  totalNet: 35000,
  totalTaxes: 17000,
  payslips: [
    {
      id: "SLIP-001",
      employeeId: "EMP-001",
      employeeName: "Ana Silva",
      role: "Arquiteta Sénior",
      department: "Projetos",
      baseSalary: 2500,
      allowances: 150,
      bonuses: 500,
      grossSalary: 3150,
      socialSecurity: 346.5, // 11% of gross
      irs: 630, // Approx 20%
      otherDeductions: 0,
      netSalary: 2173.5,
    },
    {
      id: "SLIP-002",
      employeeId: "EMP-002",
      employeeName: "Carlos Mendes",
      role: "Gestor de Obra",
      department: "Operações",
      baseSalary: 2000,
      allowances: 150,
      bonuses: 0,
      grossSalary: 2150,
      socialSecurity: 236.5,
      irs: 387,
      otherDeductions: 0,
      netSalary: 1526.5,
    },
    // ... more mock slips
  ],
};
