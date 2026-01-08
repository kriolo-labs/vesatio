"use client";

import { CoreLayout } from "@/components/layout/core-layout";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/ui/data-grid";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";

// Types
type Notification = {
    id: string;
    title: string;
    message: string;
    type: string;
    createdAt: string;
    read: boolean;
};

// Mock Data
const notifications: Notification[] = [
    {
        id: "1",
        title: "Novo Pedido de Orçamento",
        message: "Cliente João da Silva solicitou orçamento para Cozinha.",
        type: "info",
        createdAt: "2024-05-10 14:30",
        read: false,
    },
    {
        id: "2",
        title: "Alerta de Stock",
        message: "Stock de MDF Branco abaixo do mínimo.",
        type: "warning",
        createdAt: "2024-05-10 09:15",
        read: true,
    },
    {
        id: "3",
        title: "Falha na Cópia de Segurança",
        message: "O backup noturno falhou. Verifique logs.",
        type: "error",
        createdAt: "2024-05-09 23:00",
        read: false,
    },
    {
        id: "4",
        title: "Fatura Paga",
        message: "Fatura #1023 foi liquidada.",
        type: "success",
        createdAt: "2024-05-09 16:45",
        read: true,
    }
];

export default function NotificationsPage() {
    const columns: ColumnDef<Notification>[] = [
        {
            accessorKey: "title",
            header: "Título",
            cell: ({ row }) => <div className="font-medium text-white">{row.getValue("title")}</div>,
        },
        {
            accessorKey: "message",
            header: "Mensagem",
            cell: ({ row }) => <div className="max-w-md truncate text-diamond-muted">{row.getValue("message")}</div>,
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                let status = "info";
                if (type === 'warning') status = 'warning';
                if (type === 'error') status = 'error';
                if (type === 'success') status = 'success';
                
                return <StatusBadge status={status} label={type} />;
            },
        },
        {
            accessorKey: "createdAt",
            header: "Data",
            cell: ({ row }) => <div className="text-xs">{row.getValue("createdAt")}</div>,
        },
         {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted hover:text-white">
                        <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-diamond-muted hover:text-rose-500">
                        <Trash2 size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <CoreLayout>
            <PageHeader 
                title="Notificações" 
                description="Gestão centralizada de alertas e avisos do sistema."
            >
                <Button variant="outline" className="text-diamond-muted hover:text-white">
                    Marcar todas como lidas
                </Button>
            </PageHeader>

            <DataGrid 
                columns={columns} 
                data={notifications} 
                searchKey="title"
                searchPlaceholder="Filtrar notificações..."
            />
        </CoreLayout>
    );
}
