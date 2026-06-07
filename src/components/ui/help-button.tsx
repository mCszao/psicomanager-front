'use client';

import { useState, type ReactNode } from 'react';
import { HelpCircle, X } from 'lucide-react';

interface Props {
    /** Título exibido no cabeçalho do modal de ajuda. */
    title: string;
    /** Conteúdo explicativo da feature (texto, listas, passos). */
    children: ReactNode;
}

/**
 * Botão de ajuda genérico, por tela. Exibe um ícone de interrogação que abre
 * um modal explicando a feature e como usá-la. Reutilizável: cada tela passa
 * seu próprio `title` e conteúdo via `children`.
 *
 * Segue o padrão visual dos modais do projeto (overlay fixo + backdrop blur).
 */
export default function HelpButton({ title, children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-full border border-border-default bg-surface-raised text-content-secondary shadow-lg hover:bg-surface-hover hover:text-content-primary transition-colors font-medium"
            >
                <HelpCircle size={15} /> Ajuda
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-md mx-4 z-10 max-h-[85vh] flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border-default shrink-0">
                            <div className="flex items-center gap-2">
                                <HelpCircle size={18} className="text-royalBlue" />
                                <h3 className="text-base font-semibold text-content-primary">{title}</h3>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                            >
                                <X size={16} />
                                <span className="sr-only">Fechar</span>
                            </button>
                        </div>

                        <div className="px-5 py-4 overflow-y-auto text-sm text-content-secondary leading-relaxed">
                            {children}
                        </div>

                        <div className="flex items-center justify-end px-5 py-4 border-t border-border-default shrink-0">
                            <button
                                onClick={() => setOpen(false)}
                                className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity bg-royalBlue text-white hover:opacity-90"
                            >
                                Entendi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
