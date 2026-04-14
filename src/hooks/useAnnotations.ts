"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAnnotations } from "@/services/api";
import { useToast } from "@/contexts/ToastContext";
import { extractApiError } from "@/util/feedback";

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

    return { text, setText, loading, handleSave };
}
