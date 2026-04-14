"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAnnotations } from "@/services/api";
import { useToast } from "@/contexts/ToastContext";
import { extractApiError } from "@/util/feedback";

export type TranscriptionMergeMode = "append" | "replace";

/**
 * Gerencia o estado e a persistência das anotações de uma sessão.
 *
 * @param scheduleId  - Id da sessão
 * @param initialText - Texto já salvo, vindo do servidor (pode ser null)
 */
export function useAnnotations(scheduleId: string, initialText: string | null) {
    const router = useRouter();
    const toast = useToast();

    const [text, setText] = useState(initialText ?? "");
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        setLoading(true);
        try {
            const response = await saveAnnotations(scheduleId, text);
            if (response.success) {
                toast.success("Anotações salvas com sucesso!");
                router.refresh();
            } else {
                toast.error(extractApiError(response));
            }
        } catch {
            toast.error("Ocorreu um erro inesperado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    /**
     * Aplica o texto transcrito ao conteúdo atual.
     *
     * @param transcribed - Texto vindo da transcrição
     * @param mode        - "append" adiciona ao final com quebra de linha;
     *                      "replace" substitui o conteúdo inteiro
     */
    function applyTranscription(transcribed: string, mode: TranscriptionMergeMode) {
        setText(prev => {
            if (mode === "replace") return transcribed;
            const separator = prev.trim() ? "\n\n" : "";
            return prev + separator + transcribed;
        });
    }

    return { text, setText, loading, handleSave, applyTranscription };
}
