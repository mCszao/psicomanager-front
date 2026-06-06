'use client';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, PaymentFormValues } from '@/services/validation/financialSchemas';
import { registerPayment } from '@/services/api/financial-service';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { FinancialTransaction } from '@/interface/IFinancial';
import LabelContainer from '@/components/ui/label-container';
import Input from '@/components/ui/input';

type Props = {
    transaction: FinancialTransaction;
    onClose: () => void;
};

const PAYMENT_METHODS = [
    { value: 'PIX', label: 'PIX' },
    { value: 'CARD', label: 'Cartão' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'TRANSFER', label: 'Transferência' },
] as const;

export default function PaymentDialog({ transaction, onClose }: Props) {
    const toast = useToast();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            transactionId: transaction.id,
            amountPaid: transaction.amount,
        },
    });

    async function onSubmit(data: PaymentFormValues) {
        try {
            await registerPayment(data);
            toast.success('Pagamento registrado com sucesso!');
            router.refresh();
            onClose();
        } catch {
            toast.error('Erro ao registrar pagamento. Tente novamente.');
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-sm mx-4 z-10">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                    <h3 className="text-base font-semibold text-content-primary">Registrar pagamento</h3>
                    <button type="button" onClick={onClose} className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors">
                        <X size={16} /><span className="sr-only">Fechar</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4 flex flex-col gap-3">
                    <input type="hidden" {...register('transactionId')} />
                    <LabelContainer title="Valor pago (R$) *" labelFor="amountPaid">
                        <Input type="number" id="amountPaid" step="0.01" min="0.01" {...register('amountPaid', { valueAsNumber: true })} />
                        {errors.amountPaid && <span className="block text-xs text-red-500 mt-1">{errors.amountPaid.message}</span>}
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
                        {isSubmitting ? 'Registrando...' : 'Confirmar pagamento'}
                    </button>
                </div>
            </div>
        </div>
    );
}
