'use client';

import { useEffect } from 'react';
import BaseContainerProps from '@/interface/IBaseContainerProps';

/**
 * Modal base do sistema.
 *
 * Renderiza centralizado no viewport completo — independente da largura
 * da sidebar. O backdrop escurece o fundo e bloqueia interação com o conteúdo
 * por trás. Fecha com ESC por padrão.
 *
 * Uso: qualquer componente filho é renderizado dentro do card branco central.
 * Para fechar ao clicar no backdrop, passe `onClose` como prop e adicione
 * onClick no backdrop.
 */
export default function Dialog({ children, onClose }: BaseContainerProps & { onClose?: () => void }) {
    // Fecha com ESC
    useEffect(() => {
        if (!onClose) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose?.();
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Trava o scroll do body enquanto o modal está aberto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Card central — nunca encostar na sidebar nem nas bordas */}
            <div className="relative z-10 w-full max-w-md max-h-[90vh] flex flex-col bg-surface-raised border border-border-default rounded-2xl shadow-2xl overflow-hidden">
                {children}
            </div>
        </div>
    );
}
