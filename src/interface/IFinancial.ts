export type TransactionType =
    | 'SESSION_CHARGE'
    | 'PLAN_CHARGE'
    | 'ADVANCE_PAYMENT'
    | 'PAYMENT'
    | 'CREDIT_ADJUSTMENT'
    | 'REFUND';

export type TransactionStatus =
    | 'PENDING'
    | 'PAID'
    | 'OVERDUE'
    | 'PARTIALLY_PAID'
    | 'CANCELLED'
    | 'ADVANCE';

export type PaymentMethod = 'PIX' | 'CARD' | 'CASH' | 'TRANSFER';

export interface FinancialTransaction {
    id: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    dueDate: string | null;
    paidAt: string | null;
    paymentMethod: PaymentMethod | null;
    notes: string | null;
    createdAt: string;
    patient: { id: string; name: string };
    planId: string | null;
    sessionId: string | null;
    sessionDate: string | null;
}

export interface FinancialSummary {
    totalReceivable: number;
    totalReceived: number;
    totalOverdue: number;
    totalPendingCount: number;
}

export interface PaymentRegisterDTO {
    transactionId: string;
    amountPaid: number;
    paymentMethod: PaymentMethod;
    notes?: string;
}

export interface AdvancePaymentRegisterDTO {
    patientId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    notes?: string;
}
