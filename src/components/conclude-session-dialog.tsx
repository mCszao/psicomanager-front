'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { PaymentMethod } from '@/interface/IFinancial';

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
    { value: 'PIX', label: 'PIX' },
    { value: 'CARD', label: 'Cartão' },
    { value: 'CASH', label: 'Dinheiro' },
    { value: 'TRANSFER', label: 'Transferência' },
];

type Props = {
    loading: boolean;
    onConcludeOnly: () => void;
    onConcludeAndPay: (method: PaymentMethod) => void;
    onCancel: () => void;
};

/**
 * Dialog de conclusão de sessão com opção de "concluir e pagar".
 * "Só concluir" gera a cobrança pendente; "Concluir e pagar" já registra o
 * pagamento com a forma selecionada.
 */
export default function ConcludeSessionDialog({ loading, onConcludeOnly, onConcludeAndPay, onCancel }: Props) {
    const [method, setMethod] = useState<PaymentMethod>('PIX');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-sm mx-4 z-10">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                    <h3 className="text-base font-semibold text-content-primary">Concluir sessão</h3>
                    <button
                        onClick={onCancel}
                        className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        <X size={16} />
                        <span className="sr-only">Fechar</span>
                    </button>
                </div>

                <div className="px-5 py-4 flex flex-col gap-3">
                    <p className="text-sm text-content-secondary">
                        &quot;Concluir&quot; marca a sessão como concluída e gera a cobrança pendente.
                        &quot;Concluir e pagar&quot; já registra o pagamento com a forma abaixo.
                    </p>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="conclude-pay-method" className="text-xs font-medium text-content-secondary">
                            Forma de pagamento
                        </label>
                        <select
                            id="conclude-pay-method"
                            value={method}
                            onChange={e => setMethod(e.target.value as PaymentMethod)}
                            className="w-full rounded-lg border border-border-default bg-surface-raised px-3 py-2 text-sm text-content-primary focus:outline-none focus:ring-2 focus:ring-royalBlue"
                        >
                            {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border-default">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="text-sm px-3 py-2 rounded-lg border border-border-default text-content-secondary hover:bg-surface-hover transition-colors font-medium disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConcludeOnly}
                        disabled={loading}
                        className="text-sm px-3 py-2 rounded-lg border border-border-default text-content-primary hover:bg-surface-hover transition-colors font-medium disabled:opacity-50"
                    >
                        Só concluir
                    </button>
                    <button
                        onClick={() => onConcludeAndPay(method)}
                        disabled={loading}
                        className="text-sm px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors font-medium disabled:opacity-50"
                    >
                        Concluir e pagar
                    </button>
                </div>
            </div>
        </div>
    );
}
