"use client";

import { FileText } from "lucide-react";
import { useAnnotations } from "@/hooks/useAnnotations";

type AnnotationsPanelProps = {
    scheduleId: string;
    initialAnnotations: string | null;
};

/**
 * Painel de anotações de uma sessão.
 *
 * Client component isolado para não forçar a page inteira a ser client.
 * Recebe as anotações já salvas via props (vindas do servidor) e gerencia
 * o estado local + persistência via hook useAnnotations.
 */
export default function AnnotationsPanel({ scheduleId, initialAnnotations }: AnnotationsPanelProps) {
    const { text, setText, loading, handleSave } = useAnnotations(scheduleId, initialAnnotations);

    return (
        <div className="flex-1 flex flex-col rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden">
            <div className="flex items-center px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                <h2 className="flex items-center gap-2 text-base font-semibold text-content-primary">
                    <FileText size={18} /> Anotações
                </h2>
            </div>
            <div className="flex-1 flex flex-col p-4 gap-3 min-h-0">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Registre as anotações desta sessão…"
                    className="flex-1 resize-none bg-surface-sunken text-content-primary placeholder:text-content-disabled border border-border-default rounded-lg p-4 text-sm focus:ring-royalBlue focus:border-royalBlue outline-none"
                />
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="self-end text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Salvando…" : "Salvar anotação"}
                </button>
            </div>
        </div>
    );
}
