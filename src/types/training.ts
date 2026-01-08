export type TrainingStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
export type ReviewStatus = "pending" | "completed" | "acknowledged";

export interface TrainingSession {
  id: string;
  title: string;
  description?: string;
  trainer: string;
  date: string; // ISO Date
  startTime: string; // HH:mm
  duration: number; // minutes
  location: string;
  capacity: number;
  attendees: string[]; // Employee IDs
  status: TrainingStatus;
  category: "Technical" | "Safety" | "Soft Skills" | "Compliance";
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  cycle: string; // e.g., "2023 Q4", "2024 Annual"
  date: string; // ISO Date
  rating: number; // 1-5
  status: ReviewStatus;
  feedback?: string;
  goals?: string[];
}

// Mock Data
export const mockTrainingSessions: TrainingSession[] = [
  {
    id: "TRN-001",
    title: "Segurança e Higiene no Trabalho",
    trainer: "Ext. Safety Corp",
    date: "2024-02-15",
    startTime: "09:00",
    duration: 240,
    location: "Sala de Reuniões A",
    capacity: 15,
    attendees: ["EMP-001", "EMP-002", "EMP-005"],
    status: "scheduled",
    category: "Safety",
  },
  {
    id: "TRN-002",
    title: "Workshop de Liderança",
    trainer: "Ana Silva (HR)",
    date: "2024-02-20",
    startTime: "14:00",
    duration: 120,
    location: "Online (Teams)",
    capacity: 20,
    attendees: ["EMP-001", "EMP-003"],
    status: "scheduled",
    category: "Soft Skills",
  },
  {
    id: "TRN-003",
    title: "Novas Funcionalidades CAD",
    trainer: "Carlos Mendes",
    date: "2024-01-10",
    startTime: "10:00",
    duration: 180,
    location: "Lab Design",
    capacity: 10,
    attendees: ["EMP-001", "EMP-004"],
    status: "completed",
    category: "Technical",
  },
];

export const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: "REV-001",
    employeeId: "EMP-001",
    employeeName: "Ana Silva",
    reviewerId: "MGR-001",
    reviewerName: "João Diretor",
    cycle: "2023 Annual",
    date: "2023-12-15",
    rating: 4.5,
    status: "acknowledged",
    feedback:
      "Excelente desempenho na gestão de equipas. Foco em melhorar a delegação de tarefas técnicas.",
    goals: ["Mentoria de 2 juniores", "Certificação PMP"],
  },
  {
    id: "REV-002",
    employeeId: "EMP-002",
    employeeName: "Carlos Mendes",
    reviewerId: "EMP-001",
    reviewerName: "Ana Silva",
    cycle: "2023 Annual",
    date: "2023-12-20",
    rating: 4.0,
    status: "completed",
    feedback: "Muito consistente nas entregas.",
    goals: ["Reduzir desperdício em obra", "Formação em Segurança"],
  },
];
