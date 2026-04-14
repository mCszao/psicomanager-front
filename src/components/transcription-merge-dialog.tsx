"use client";

import { X, Plus, RefreshCw } from "lucide-react";

type Props = {
    transcribedText: string;
    hasExistingText: boolean;
    onAppend: () => void;
    onReplace: () => void;
    onCancel: () => void;
};

/**
 * Modal exibido após uma transcrição concluída.
 * Pergunta ao usuário se deseja adicionar ao texto existente ou substituí-lo.
 * Segue o mesmo padrão visual do ConfirmDialog.
 */
export default function TranscriptionMergeDialog({
    transcribedText,
    hasExistingText,
    onAppend,
    onReplace,
    onCancel,
}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-md mx-4 z-10">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                    <h3 className="text-base font-semibold text-content-primary">
                        Transcrição concluída
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        <X size={16} />
                        <span className="sr-only">Fechar</span>
                    </button>
                </div>

                {/* Prévia do texto transcrito */}
                <div className="px-5 py-4 flex flex-col gap-3">
                    <p className="text-xs font-medium text-content-secondary uppercase tracking-wide">
                        Texto transcrito
                    </p>
                    <div className="bg-surface-sunken border border-border-default rounded-lg p-3 max-h-40 overflow-y-auto">
                        <p className="text-sm text-content-primary whitespace-pre-wrap leading-relaxed">
                            {transcribedText}
                        </p>
                    </div>
                    {hasExistingText && (
                        <p className="text-xs text-content-secondary">
                            Você já tem anotações nesta sessão. Como deseja aplicar o texto transcrito?
                        </p>
                    )}
                </div>

                {/* Ações */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border-default">
                    <button
                        onClick={onCancel}
                        className="text-sm px-4 py-2 rounded-lg border border-border-default text-content-secondary hover:bg-surface-hover transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    {hasExistingText && (
                        <button
                            onClick={onReplace}
                            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-border-default text-content-primary hover:bg-surface-hover transition-colors font-medium"
                        >
                            <RefreshCw size={14} />
                            Substituir
                        </button>
                    )}
                    <button
                        onClick={onAppend}
                        className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                    >
                        <Plus size={14} />
                        {hasExistingText ? "Adicionar ao existente" : "Usar texto"}
                    </button>
                </div>
            </div>
        </div>
    );
}
