import { serverGet } from '@/services/api/http-server';
import BaseResponse from '@/interface/IBaseResponse';
import { FinancialSummary, FinancialTransaction } from '@/interface/IFinancial';
import metadataFactory from '@/util/metadataFactory';
import FinancialDashboard from '@/components/financial/financial-dashboard';

export const metadata = metadataFactory('Financeiro');
export const dynamic = 'force-dynamic';

export default async function Page() {
    const [summaryRes, transactionsRes, patientsRes] = await Promise.all([
        serverGet<BaseResponse<FinancialSummary>>('/financial/summary'),
        serverGet<BaseResponse<FinancialTransaction[]>>('/financial/transactions'),
        serverGet<BaseResponse<{ id: string; name: string }[]>>('/patients/resume'),
    ]);

    const summary = summaryRes.object ?? {
        totalReceivable: 0,
        totalReceived: 0,
        totalOverdue: 0,
        totalPendingCount: 0,
    };
    const transactions = transactionsRes.object ?? [];
    const patients = (patientsRes.object ?? []).map((p: { id: string; name: string }) => ({ id: p.id, name: p.name }));

    return (
        <div className="flex flex-col h-full px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 gap-4 overflow-hidden">
            <div className="shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-content-primary">Financeiro</h1>
                <p className="text-sm text-content-secondary mt-1">Controle de cobranças, pagamentos e adiantamentos</p>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
                <FinancialDashboard
                    summary={summary}
                    transactions={transactions}
                    patients={patients}
                />
            </div>
        </div>
    );
}
