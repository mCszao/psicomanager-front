import { serverGet } from '@/services/api/http-server';
import BaseResponse from '@/interface/IBaseResponse';
import { FinancialTransaction } from '@/interface/IFinancial';
import Patient from '@/interface/IPatient';
import metadataFactory from '@/util/metadataFactory';
import PatientFinancialPanel from '@/components/financial/patient-financial-panel';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = metadataFactory('Financeiro do paciente');
export const dynamic = 'force-dynamic';

type PageProps = {
    params: { id: string };
};

export default async function Page({ params }: PageProps) {
    const [patientRes, transactionsRes] = await Promise.all([
        serverGet<BaseResponse<Patient>>(`/patients/${params.id}`),
        serverGet<BaseResponse<FinancialTransaction[]>>(`/financial/transactions/patient?id=${params.id}`),
    ]);

    const patient = patientRes.object;
    const transactions = transactionsRes.object ?? [];

    // Calcula saldos derivados a partir das transações (mirror do backend)
    const balance = transactions
        .filter(t => t.status === 'PENDING' || t.status === 'OVERDUE')
        .reduce((sum, t) => sum + t.amount, 0);

    const creditBalance = transactions
        .filter(t => t.status === 'ADVANCE')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="flex flex-col h-full px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 gap-5 overflow-auto">
            {/* Header */}
            <div className="shrink-0 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <Link
                        href={`/patients/${params.id}`}
                        className="flex items-center gap-1.5 text-xs text-content-secondary hover:text-royalBlue transition-colors"
                    >
                        <ArrowLeft size={13} /> Voltar para o prontuário
                    </Link>
                    <h1 className="text-2xl font-bold text-content-primary">Financeiro</h1>
                    <p className="text-sm text-content-secondary">{patient?.name}</p>
                </div>
            </div>

            {/* Panel */}
            <PatientFinancialPanel
                patientId={params.id}
                patientName={patient?.name ?? ''}
                balance={balance}
                creditBalance={creditBalance}
                transactions={transactions}
            />
        </div>
    );
}
