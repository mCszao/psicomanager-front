'use client';

import { useState } from 'react';
import { FinancialTransaction } from '@/interface/IFinancial';
import {
    TRANSACTION_STATUS_STYLES,
    TRANSACTION_TYPE_LABELS,
    PAYMENT_METHOD_LABELS,
    PAYABLE_STATUSES,
    formatCurrency,
    formatDateBR,
} from '@/util/financialUtils';
import PaymentDialog from '@/components/financial/payment-dialog';
import AdvanceDialog from '@/components/financial/advance-dialog';
import { Plus } from 'lucide-react';

type Props = {
    patientId: string;
    patientName: string;
    balance: number;
    creditBalance: number;
    transactions: FinancialTransaction[];
};

export default function PatientFinancialPanel({
    patientId,
    patientName,
    balance,
    creditBalance,
    transactions,
}: Props) {
    const [payingTransaction, setPayingTransaction] = useState<FinancialTransaction | null>(null);
    const [showAdvance, setShowAdvance] = useState(false);

    return (
        <div className="flex flex-col gap-5">
            {/* Saldo cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="px-4 py-3 rounded-xl border border-border-default bg-surface-raised flex flex-col gap-1">
                    <p className="text-xs text-content-secondary">Saldo devedor</p>
                    <p className={`text-xl font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(balance)}
                    </p>
                </div>
                <div className="px-4 py-3 rounded-xl border border-border-default bg-surface-raised flex flex-col gap-1">
                    <p className="text-xs text-content-secondary">Crédito disponível</p>
                    <p className="text-xl font-bold text-blue-600">{formatCurrency(creditBalance)}</p>
                </div>
            </div>

            {/* Actions header */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowAdvance(true)}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                >
                    <Plus size={15} /> Registrar adiantamento
                </button>
            </div>

            {/* Transaction list */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-content-primary">Histórico de transações</h3>
                {transactions.length === 0 && (
                    <p className="text-sm text-content-secondary text-center py-6">Nenhuma transação registrada.</p>
                )}
                {transactions.map(t => (
                    <div
                        key={t.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border-default bg-surface-raised"
                    >
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-content-primary">
                                    {TRANSACTION_TYPE_LABELS[t.type]}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TRANSACTION_STATUS_STYLES[t.status].className}`}>
                                    {TRANSACTION_STATUS_STYLES[t.status].label}
                                </span>
                            </div>
                            <div className="flex gap-3 flex-wrap text-xs text-content-disabled">
                                {t.dueDate && <span>Venc. {formatDateBR(t.dueDate)}</span>}
                                {t.paymentMethod && <span>{PAYMENT_METHOD_LABELS[t.paymentMethod]}</span>}
                                <span>Criado em {formatDateBR(t.createdAt)}</span>
                            </div>
                            {t.notes && (
                                <span className="text-xs text-content-secondary italic mt-0.5">{t.notes}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-content-primary">{formatCurrency(t.amount)}</span>
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
                    fixedPatient={{ id: patientId, name: patientName }}
                    onClose={() => setShowAdvance(false)}
                />
            )}
        </div>
    );
}
