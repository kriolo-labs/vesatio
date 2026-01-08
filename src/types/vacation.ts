export type AbsenceType = "vacation" | "sick_leave" | "parental" | "personal" | "other";
export type RequestStatus = "pending" | "approved" | "rejected";

export interface VacationRequest {
  id: string;
  employeeId: string;
  employeeName: string; // Denormalized for simpler UI
  type: AbsenceType;
  startDate: string; // ISO Date
  endDate: string; // ISO Date
  status: RequestStatus;
  reason?: string;
  createdAt: string;
}

export interface VacationBalance {
  employeeId: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  scheduledDays: number;
}

export const mockVacationBalance: VacationBalance = {
  employeeId: "EMP-001",
  totalDays: 22,
  usedDays: 5,
  pendingDays: 3,
  scheduledDays: 0,
};

export const mockVacationRequests: VacationRequest[] = [
  {
    id: "REQ-001",
    employeeId: "EMP-001",
    employeeName: "Ana Silva",
    type: "vacation",
    startDate: "2024-08-01",
    endDate: "2024-08-15",
    status: "approved",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "REQ-002",
    employeeId: "EMP-001",
    employeeName: "Ana Silva",
    type: "personal",
    startDate: "2024-03-20",
    endDate: "2024-03-20",
    status: "approved",
    reason: "Consulta médica",
    createdAt: "2024-03-01T09:30:00Z",
  },
  {
    id: "REQ-003",
    employeeId: "EMP-001",
    employeeName: "Ana Silva",
    type: "vacation",
    startDate: "2024-12-20",
    endDate: "2024-12-31",
    status: "pending",
    createdAt: "2024-06-15T14:00:00Z",
  },
  // Team requests for calendar view mock
  {
    id: "REQ-004",
    employeeId: "EMP-002",
    employeeName: "Carlos Mendes",
    type: "vacation",
    startDate: "2024-08-10",
    endDate: "2024-08-25",
    status: "approved",
    createdAt: "2024-02-01T11:00:00Z",
  },
  {
    id: "REQ-005",
    employeeId: "EMP-003",
    employeeName: "Beatriz Costa",
    type: "sick_leave",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "approved",
    createdAt: "2024-05-10T08:00:00Z",
  },
];
