'use client';

import { X } from "lucide-react";

interface ConfirmDialogProps {
    title: string;
    description: string;
    confirmLabel: string;
    confirmClassName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    title,
    description,
    confirmLabel,
    confirmClassName,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-surface-raised border border-border-default rounded-xl shadow-lg w-full max-w-sm mx-4 z-10">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
                    <h3 className="text-base font-semibold text-content-primary">{title}</h3>
                    <button
                        onClick={onCancel}
                        className="text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        <X size={16} />
                        <span className="sr-only">Fechar</span>
                    </button>
                </div>
                <div className="px-5 py-4">
                    <p className="text-sm text-content-secondary">{description}</p>
                </div>
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border-default">
                    <button
                        onClick={onCancel}
                        className="text-sm px-4 py-2 rounded-lg border border-border-default text-content-secondary hover:bg-surface-hover transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${confirmClassName}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
