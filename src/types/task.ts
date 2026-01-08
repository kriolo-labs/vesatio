export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Task {
    id: string;
    code: string;
    title: string;
    description?: string;
    projectId: string;
    projectName: string;
    phase?: string;
    
    status: TaskStatus;
    priority: TaskPriority;
    
    assignedTo: {
        id: string;
        name: string;
        avatar?: string;
    }[];
    
    dueDate?: string;
    estimatedHours: number;
    loggedHours: number;
    
    tags: string[];
    createdAt: string;
}

export const mockTasks: Task[] = [
    {
        id: "1",
        code: "TSK-101",
        title: "Revisão de Planta Elétrica",
        projectId: "1",
        projectName: "Villa Atlântico",
        phase: "Instalações Técnicas",
        status: "in_progress",
        priority: "high",
        assignedTo: [{ id: "u1", name: "Roberto Dias" }],
        dueDate: "2024-06-15T18:00:00Z",
        estimatedHours: 4,
        loggedHours: 1.5,
        tags: ["Elétrica", "Urgente"],
        createdAt: "2024-06-10T09:00:00Z"
    },
    {
        id: "2",
        code: "TSK-102",
        title: "Encomenda de Cerâmicas",
        projectId: "1",
        projectName: "Villa Atlântico",
        phase: "Acabamentos",
        status: "todo",
        priority: "medium",
        assignedTo: [{ id: "u2", name: "Ana Pereira" }],
        dueDate: "2024-06-20T17:00:00Z",
        estimatedHours: 2,
        loggedHours: 0,
        tags: ["Compras", "Materiais"],
        createdAt: "2024-06-11T14:30:00Z"
    },
    {
        id: "3",
        code: "TSK-103",
        title: "Vistoria Estrutural",
        projectId: "2",
        projectName: "Hotel Santa Maria",
        phase: "Estrutura",
        status: "done",
        priority: "critical",
        assignedTo: [{ id: "u3", name: "Eng. Carlos" }],
        dueDate: "2024-05-30T10:00:00Z",
        estimatedHours: 8,
        loggedHours: 8.5,
        tags: ["Vistoria", "Qualidade"],
        createdAt: "2024-05-01T08:00:00Z"
    }
];
