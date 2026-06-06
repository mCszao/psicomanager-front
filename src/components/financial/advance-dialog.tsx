'use client';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { advancePaymentSchema, AdvancePaymentFormValues } from '@/services/validation/financialSchemas';
import { registerAdvance } from '@/services/api/financial-service';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import LabelContainer from '@/components/ui/label-container';
import Input from '@/components/ui/input';

type PatientOption = { id: string; name: string };

type Props = {
    fixedPatient?: PatientOption;
    patients?: PatientOption[];
    onClose: () => void;
};

const PAYMENT_METHODS = [
    { value: 'PIX', label: 'PIX' },
    { value: 'CARD', label: 'Cartão' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'TRANSFER', label: 'Transferência' },
] as const;

export default function AdvanceDialog({ fixedPatient, patients = [], onClose }: Props) {
    const toast = useToast();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdvancePaymentFormValues>({
        resolver: zodResolver(advancePaymentSchema),
        defaultValues: { patientId: fixedPatient?.id ?? '' },
    });

    async function onSubmit(data: AdvancePaymentFormValues) {
        try {
            await registerAdvance(data);
            toast.success('Adiantamento registrado com sucesso!');
            router.refresh();
            onClose();
        } catch {
            toast.error('Erro ao registrar adiantamento. Tente novamente.');
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-sm mx-4 z-10">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                    <h3 className="text-base font-semibold text-content-primary">Registrar adiantamento</h3>
                    <button type="button" onClick={onClose} className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors">
                        <X size={16} /><span className="sr-only">Fechar</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4 flex flex-col gap-3">
                    {fixedPatient ? (
                        <>
                            <input type="hidden" {...register('patientId')} />
                            <div className="px-3 py-2 rounded-lg bg-surface-sunken text-sm text-content-secondary">
                                Paciente: <span className="font-medium text-content-primary">{fixedPatient.name}</span>
                            </div>
                        </>
                    ) : (
                        <LabelContainer title="Paciente *" labelFor="patientId">
                            <select id="patientId" {...register('patientId')} className="w-full rounded-lg border border-border-default bg-surface-raised px-3 py-2 text-sm text-content-primary focus:outline-none focus:ring-2 focus:ring-royalBlue">
                                <option value="">Selecione o paciente...</option>
                                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                            {errors.patientId && <span className="block text-xs text-red-500 mt-1">{errors.patientId.message}</span>}
                        </LabelContainer>
                    )}

                    <LabelContainer title="Valor (R$) *" labelFor="amount">
                        <Input type="number" id="amount" step="0.01" min="0.01" {...register('amount', { valueAsNumber: true })} />
                        {errors.amount && <span className="block text-xs text-red-500 mt-1">{errors.amount.message}</span>}
                    </LabelContainer>

                    <LabelContainer title="Forma de pagamento *" labelFor="paymentMethod">
                        <select id="paymentMethod" {...register('paymentMethod')} className="w-full rounded-lg border border-border-default bg-surface-raised px-3 py-2 text-sm text-content-primary focus:outline-none focus:ring-2 focus:ring-royalBlue">
                            <option value="">Selecione...</option>
                            {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                        {errors.paymentMethod && <span className="block text-xs text-red-500 mt-1">{errors.paymentMethod.message}</span>}
                    </LabelContainer>

                    <LabelContainer title="Observações" labelFor="notes">
                        <Input type="text" id="notes" placeholder="Opcional" {...register('notes')} />
                    </LabelContainer>
                </form>

                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border-default">
                    <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-border-default text-content-secondary hover:bg-surface-hover transition-colors font-medium">
                        Cancelar
                    </button>
                    <button type="button" disabled={isSubmitting} onClick={handleSubmit(onSubmit)} className="text-sm px-4 py-2 rounded-lg font-medium transition-colors bg-royalBlue hover:opacity-90 text-white disabled:opacity-50">
                        {isSubmitting ? 'Registrando...' : 'Registrar adiantamento'}
                    </button>
                </div>
            </div>
        </div>
    );
}
