export type InvoiceStatus = 'draft' | 'pending' | 'overdue' | 'paid' | 'partial' | 'cancelled';
export type PaymentMethod = 'transfer' | 'check' | 'cash' | 'card' | 'online';
export type AccountType = 'current' | 'savings' | 'investment';
export type TransactionType = 'credit' | 'debit' | 'transfer';

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    total: number;
}

export interface Invoice {
    id: string;
    number: string;
    clientId: string;
    clientName: string;
    projectId?: string;
    projectName?: string;
    issueDate: string;
    dueDate: string;
    amount: number;
    paidAmount: number;
    status: InvoiceStatus;
    items: InvoiceItem[];
    customerRef?: string;
    notes?: string;
    internalNotes?: string;
}

export interface Expense {
    id: string;
    number: string;
    supplierId?: string;
    supplierName: string;
    issueDate: string;
    dueDate: string;
    amount: number;
    status: 'pending' | 'approved' | 'paid' | 'cancelled';
    category: string;
    costCenterId?: string;
    description: string;
    documentUrl?: string;
}

export interface BankAccount {
    id: string;
    bankName: string;
    type: AccountType;
    currency: string;
    balance: number;
    lastVerifiedBalance: string;
}

export interface FinancialMovement {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    status: 'reconciled' | 'pending';
    accountId: string;
    category?: string;
    costCenter?: string;
}

export interface ChartOfAccount {
    id: string;
    code: string;
    name: string;
    type: 'income' | 'cost' | 'expense' | 'asset' | 'liability';
    parentId?: string;
    active: boolean;
}

export interface CostCenter {
    id: string;
    name: string;
    type: 'project' | 'department' | 'general';
    parentId?: string;
}

// Mock Data for Dashboard
export const mockFinancialStats = {
    totalBalance: 12500000,
    receivablesTotal: 7300000,
    receivablesOverdue: 1200000,
    payablesTotal: 2100000,
    payablesOverdue: 450000,
    monthlyBilling: 8500000,
    monthlyEbitda: 3200000,
    cashRunway: 8.5, // months
};

export const mockAccounts: BankAccount[] = [
    { id: '1', bankName: 'BCA Main', type: 'current', currency: 'CVE', balance: 8500000, lastVerifiedBalance: '2026-01-08' },
    { id: '2', bankName: 'Caixa Invest', type: 'savings', currency: 'CVE', balance: 4000000, lastVerifiedBalance: '2026-01-07' },
];

export const mockLatestInvoices: Invoice[] = [
    {
        id: 'inv-001',
        number: 'FT-2026-001',
        clientId: 'c-1',
        clientName: 'Imobiliária Praia',
        projectName: 'Torre Atlântico',
        issueDate: '2026-01-05',
        dueDate: '2026-02-05',
        amount: 2500000,
        paidAmount: 0,
        status: 'pending',
        items: []
    },
    {
        id: 'inv-002',
        number: 'FT-2026-002',
        clientId: 'c-2',
        clientName: 'Condomínio Oasis',
        projectName: 'Villa Sal Rei',
        issueDate: '2026-01-06',
        dueDate: '2026-01-20',
        amount: 4800000,
        paidAmount: 4800000,
        status: 'paid',
        items: []
    }
];
