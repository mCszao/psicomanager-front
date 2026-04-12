"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { concludeSession } from "@/services/api";
import { useToast } from "@/contexts/ToastContext";
import { extractApiError } from "@/util/feedback";
import { PendingAction } from "@/types/session-action.types";
import { CLOSED_STAGES } from "@/util/sessionActionsConfig";

export function useSessionActions(scheduleId: string, stage: string) {
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);

    const isClosed = CLOSED_STAGES.includes(stage);

    async function handleConfirm() {
        if (!pendingAction) return;
        setPendingAction(null);
        setLoading(true);
        try {
            if (pendingAction === 'conclude') {
                const response = await concludeSession(scheduleId);
                if (response.success) {
                    toast.success("Sessão concluída com sucesso!");
                    router.refresh();
                } else {
                    toast.error(extractApiError(response));
                }
            }
        } catch {
            toast.error("Ocorreu um erro inesperado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return {
        isClosed,
        loading,
        pendingAction,
        setPendingAction,
        handleConfirm,
    };
}
