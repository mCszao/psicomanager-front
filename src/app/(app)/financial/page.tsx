import { serverGet } from '@/services/api/http-server';
import BaseResponse from '@/interface/IBaseResponse';
import { FinancialSummary, FinancialTransaction } from '@/interface/IFinancial';
import metadataFactory from '@/util/metadataFactory';
import FinancialDashboard from '@/components/financial/financial-dashboard';
import HelpButton from '@/components/ui/help-button';

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
            <div className="flex-1 min-h-0 overflow-hidden">
                <FinancialDashboard
                    summary={summary}
                    transactions={transactions}
                    patients={patients}
                />
            </div>
            <HelpButton title="Como usar o financeiro">
                <div className="flex flex-col gap-4">
                    <p>
                        Aqui você acompanha as <strong className="font-semibold text-content-primary">cobranças, pagamentos e adiantamentos</strong> dos seus pacientes.
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-content-primary">Totalizadores (no topo)</p>
                        <ul className="flex flex-col gap-1.5 list-disc list-inside">
                            <li><strong className="font-semibold text-content-primary">A receber</strong>, <strong className="font-semibold text-content-primary">Recebido</strong> e <strong className="font-semibold text-content-primary">Vencido</strong> somam os valores por situação.</li>
                            <li><strong className="font-semibold text-content-primary">Pendentes</strong> mostra quantas cobranças ainda aguardam pagamento.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-content-primary">Como usar</p>
                        <ul className="flex flex-col gap-1.5 list-disc list-inside">
                            <li>Use os <strong className="font-semibold text-content-primary">filtros</strong> (Todos, Pendentes, Pagos, Vencidos…) para filtrar as transações.</li>
                            <li>Clique em <strong className="font-semibold text-content-primary">Pagar</strong> em uma cobrança para registrar o pagamento.</li>
                            <li>Use <strong className="font-semibold text-content-primary">Adiantamento</strong> para registrar um valor adiantado por um paciente.</li>
                        </ul>
                    </div>
                </div>
            </HelpButton>
        </div>
    );
}
