import { TransactionStatus, TransactionType, PaymentMethod } from '@/interface/IFinancial';

export const TRANSACTION_STATUS_STYLES: Record<
    TransactionStatus,
    { label: string; className: string }
> = {
    PENDING:        { label: 'Pendente',          className: 'bg-amber-100 text-amber-800' },
    PAID:           { label: 'Pago',              className: 'bg-green-100 text-green-800' },
    OVERDUE:        { label: 'Vencido',           className: 'bg-red-100 text-red-800' },
    PARTIALLY_PAID: { label: 'Parc. pago',        className: 'bg-orange-100 text-orange-800' },
    CANCELLED:      { label: 'Cancelado',         className: 'bg-gray-100 text-gray-600' },
    ADVANCE:        { label: 'Adiantamento',      className: 'bg-blue-100 text-blue-800' },
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
    SESSION_CHARGE:    'Sessão',
    PLAN_CHARGE:       'Plano',
    ADVANCE_PAYMENT:   'Adiantamento',
    PAYMENT:           'Pagamento',
    CREDIT_ADJUSTMENT: 'Ajuste de crédito',
    REFUND:            'Reembolso',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
    PIX:      'PIX',
    CARD:     'Cartão',
    CASH:     'Dinheiro',
    TRANSFER: 'Transferência',
};

export function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDateBR(dateStr: string | null): string {
    if (!dateStr) return '—';
    // Handles ISO dates (yyyy-MM-dd) or datetime strings
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00');
    return d.toLocaleDateString('pt-BR');
}

/** Status that allow a payment to be registered */
export const PAYABLE_STATUSES: TransactionStatus[] = ['PENDING', 'OVERDUE', 'PARTIALLY_PAID'];
