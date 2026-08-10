import { useState } from 'react';
import { FinancialTransaction, TransactionStatus, FinancialSummary } from '@/interface/IFinancial';

export type StatusFilter = TransactionStatus | 'ALL';
export type DatePreset = 'thisMonth' | 'lastMonth' | 'last7' | 'last30';

/** Calcula o intervalo (yyyy-MM-dd) de um preset de período. Função pura. */
function presetRange(preset: DatePreset): { from: string; to: string } {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    let from: Date;
    let to: Date;
    if (preset === 'thisMonth') {
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (preset === 'lastMonth') {
        from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        to = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (preset === 'last7') {
        to = now;
        from = new Date(now);
        from.setDate(now.getDate() - 6);
    } else {
        to = now;
        from = new Date(now);
        from.setDate(now.getDate() - 29);
    }
    return { from: ymd(from), to: ymd(to) };
}

/**
 * Encapsula o estado e a lógica de filtragem do financeiro — filtro por status
 * e por período (presets rápidos + intervalo personalizado) — mantendo o
 * componente apenas apresentacional.
 *
 * @param transactions lista completa de transações
 * @returns estado dos filtros, handlers e a lista já filtrada
 */
export function useFinancialFilters(transactions: FinancialTransaction[]) {
    const [status, setStatus] = useState<StatusFilter>('ALL');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Presets preenchem os campos; o usuário ainda pode ajustá-los manualmente
    function applyPreset(preset: DatePreset) {
        const { from, to } = presetRange(preset);
        setDateFrom(from);
        setDateTo(to);
    }

    function clearDates() {
        setDateFrom('');
        setDateTo('');
    }

    // Filtra por status e por período (createdAt entre dateFrom e dateTo, inclusive)
    const filtered = transactions.filter(t => {
        if (status !== 'ALL' && t.status !== status) return false;
        const day = t.createdAt.slice(0, 10);
        if (dateFrom && day < dateFrom) return false;
        if (dateTo && day > dateTo) return false;
        return true;
    });

    const isFiltered = status !== 'ALL' || dateFrom !== '' || dateTo !== '';

    // Totais só do que está sendo filtrado — mesma semântica do getSummary do servidor
    const outstanding = (t: FinancialTransaction) =>
        Math.max(0, t.amount - (t.amountPaid ?? 0) - (t.creditApplied ?? 0));
    const OPEN: TransactionStatus[] = ['PENDING', 'OVERDUE', 'PARTIALLY_PAID'];

    const filteredSummary: FinancialSummary = {
        totalReceivable: filtered.filter(t => OPEN.includes(t.status)).reduce((s, t) => s + outstanding(t), 0),
        totalReceived: filtered.reduce((s, t) => s + (t.status === 'ADVANCE' ? t.amount : (t.amountPaid ?? 0)), 0),
        totalOverdue: filtered.filter(t => t.status === 'OVERDUE').reduce((s, t) => s + outstanding(t), 0),
        totalPendingCount: filtered.filter(t => t.status === 'PENDING').length,
    };

    return {
        status,
        setStatus,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        applyPreset,
        clearDates,
        filtered,
        isFiltered,
        filteredSummary,
    };
}
