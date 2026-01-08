export type AttendanceType = "check_in" | "check_out" | "break_start" | "break_end";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  timestamp: string; // ISO string
  type: AttendanceType;
  location?: string;
  device?: string;
  notes?: string;
}

export interface AttendanceDailySummary {
  date: string; // YYYY-MM-DD
  records: AttendanceRecord[];
  totalWorkMinutes: number;
  totalBreakMinutes: number;
  status: "present" | "absent" | "leave" | "holiday";
  expectedWorkMinutes: number;
}

export const mockAttendanceHistory: AttendanceRecord[] = [
  {
    id: "ATT-001",
    employeeId: "EMP-001",
    timestamp: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    type: "check_in",
    location: "Lisboa Office",
  },
  {
    id: "ATT-002",
    employeeId: "EMP-001",
    timestamp: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
    type: "break_start",
    location: "Lisboa Office",
  },
  {
    id: "ATT-003",
    employeeId: "EMP-001",
    timestamp: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    type: "break_end",
    location: "Lisboa Office",
  },
];
