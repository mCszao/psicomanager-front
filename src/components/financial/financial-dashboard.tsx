'use client';

import { useState } from 'react';
import { FinancialSummary, FinancialTransaction } from '@/interface/IFinancial';
import { useFinancialFilters, StatusFilter } from '@/hooks/useFinancialFilters';
import {
    TRANSACTION_STATUS_STYLES,
    TRANSACTION_TYPE_LABELS,
    PAYABLE_STATUSES,
    formatCurrency,
    formatDateBR,
} from '@/util/financialUtils';
import PaymentDialog from '@/components/financial/payment-dialog';
import AdvanceDialog from '@/components/financial/advance-dialog';
import { DollarSign, TrendingUp, AlertTriangle, Clock, Plus } from 'lucide-react';

type PatientOption = { id: string; name: string };

type Props = {
    summary: FinancialSummary;
    transactions: FinancialTransaction[];
    patients: PatientOption[];
};

const FILTERS: { key: StatusFilter; label: string }[] = [
    { key: 'ALL', label: 'Todos' },
    { key: 'PENDING', label: 'Pendentes' },
    { key: 'PAID', label: 'Pagos' },
    { key: 'PARTIALLY_PAID', label: 'Parc. pagos' },
    { key: 'OVERDUE', label: 'Vencidos' },
    { key: 'ADVANCE', label: 'Adiantamentos' },
];

export default function FinancialDashboard({ summary, transactions, patients }: Props) {
    const {
        status, setStatus,
        dateFrom, setDateFrom,
        dateTo, setDateTo,
        applyPreset, clearDates,
        filtered,
    } = useFinancialFilters(transactions);
    const [payingTransaction, setPayingTransaction] = useState<FinancialTransaction | null>(null);
    const [showAdvance, setShowAdvance] = useState(false);

    return (
        <div className="flex flex-col gap-5 h-full overflow-hidden">
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
                <SummaryCard
                    label="A receber"
                    value={formatCurrency(summary.totalReceivable)}
                    icon={<TrendingUp size={18} />}
                    colorClass="text-blue-600 bg-blue-50"
                />
                <SummaryCard
                    label="Recebido"
                    value={formatCurrency(summary.totalReceived)}
                    icon={<DollarSign size={18} />}
                    colorClass="text-green-600 bg-green-50"
                />
                <SummaryCard
                    label="Vencido"
                    value={formatCurrency(summary.totalOverdue)}
                    icon={<AlertTriangle size={18} />}
                    colorClass="text-red-600 bg-red-50"
                />
                <SummaryCard
                    label="Pendentes"
                    value={String(summary.totalPendingCount)}
                    icon={<Clock size={18} />}
                    colorClass="text-amber-600 bg-amber-50"
                    suffix=" cobranças"
                />
            </div>

            {/* Header + filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div className="flex flex-wrap gap-2">
                    {FILTERS.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setStatus(f.key)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                                status === f.key
                                    ? 'bg-royalBlue text-white border-royalBlue'
                                    : 'bg-surface-raised text-content-secondary border-border-default hover:bg-surface-hover'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setShowAdvance(true)}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium self-start sm:self-auto"
                >
                    <Plus size={15} /> Adiantamento
                </button>
            </div>

            {/* Date filter */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-xs text-content-secondary">Período:</span>
                {([
                    { key: 'thisMonth', label: 'Mês atual' },
                    { key: 'lastMonth', label: 'Mês passado' },
                    { key: 'last7', label: 'Últimos 7 dias' },
                    { key: 'last30', label: 'Últimos 30 dias' },
                ] as const).map(p => (
                    <button
                        key={p.key}
                        onClick={() => applyPreset(p.key)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border bg-surface-raised text-content-secondary border-border-default hover:bg-surface-hover transition-colors"
                    >
                        {p.label}
                    </button>
                ))}
                <div className="flex items-center gap-1.5">
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={e => setDateFrom(e.target.value)}
                        aria-label="Data inicial"
                        className="text-xs px-2 py-1.5 rounded-lg border border-border-default bg-surface-raised text-content-primary"
                    />
                    <span className="text-xs text-content-disabled">até</span>
                    <input
                        type="date"
                        value={dateTo}
                        onChange={e => setDateTo(e.target.value)}
                        aria-label="Data final"
                        className="text-xs px-2 py-1.5 rounded-lg border border-border-default bg-surface-raised text-content-primary"
                    />
                </div>
                {(dateFrom || dateTo) && (
                    <button
                        onClick={clearDates}
                        className="text-xs text-content-secondary hover:text-royalBlue transition-colors"
                    >
                        Limpar
                    </button>
                )}
            </div>

            {/* Transaction list */}
            <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-1">
                {filtered.length === 0 && (
                    <p className="text-sm text-content-secondary text-center py-8">Nenhuma transação encontrada.</p>
                )}
                {filtered.map(t => (
                    <div
                        key={t.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border-default bg-surface-raised"
                    >
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm font-medium text-content-primary truncate">{t.patient.name}</span>
                            <span className="text-xs text-content-secondary">
                                {TRANSACTION_TYPE_LABELS[t.type]}
                                {t.sessionDate && ` · ${formatDateBR(t.sessionDate)}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm font-semibold text-content-primary">{formatCurrency(t.amount)}</span>
                            <span className="text-xs text-content-disabled">{t.dueDate ? `Venc. ${formatDateBR(t.dueDate)}` : '—'}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TRANSACTION_STATUS_STYLES[t.status].className}`}>
                                {TRANSACTION_STATUS_STYLES[t.status].label}
                            </span>
                            {PAYABLE_STATUSES.includes(t.status) && (
                                <button
                                    onClick={() => setPayingTransaction(t)}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
                                >
                                    Pagar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {payingTransaction && (
                <PaymentDialog
                    transaction={payingTransaction}
                    onClose={() => setPayingTransaction(null)}
                />
            )}
            {showAdvance && (
                <AdvanceDialog
                    patients={patients}
                    onClose={() => setShowAdvance(false)}
                />
            )}
        </div>
    );
}

function SummaryCard({
    label, value, icon, colorClass, suffix = '',
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    colorClass: string;
    suffix?: string;
}) {
    return (
        <div className="flex flex-col gap-2 px-4 py-3 rounded-xl border border-border-default bg-surface-raised">
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-content-secondary">{label}</p>
                <p className="text-lg font-bold text-content-primary">{value}{suffix}</p>
            </div>
        </div>
    );
}
