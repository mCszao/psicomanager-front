"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { concludeSession, cancelSession, markAsAbsent, rescheduleSession } from "@/services/api";
import { useToast } from "@/contexts/ToastContext";
import { extractApiError } from "@/util/feedback";
import { formatDate } from "@/util/DateUtils";
import { PendingAction } from "@/types/session-action.types";
import { CLOSED_STAGES } from "@/util/sessionActionsConfig";

export function useSessionActions(scheduleId: string, stage: string) {
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);
    const [rescheduleDate, setRescheduleDate] = useState<string | null>(null);

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

            if (pendingAction === 'cancel') {
                const response = await cancelSession(scheduleId);
                if (response.success) {
                    toast.success("Sessão cancelada com sucesso!");
                    router.refresh();
                } else {
                    toast.error(extractApiError(response));
                }
            }

            if (pendingAction === 'absent') {
                const response = await markAsAbsent(scheduleId);
                if (response.success) {
                    toast.success("Falta registrada com sucesso!");
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

    async function handleRescheduleConfirm(dateStart: string, dateEnd?: string) {
        setRescheduleDate(null);
        setLoading(true);
        try {
            const withSeconds = (val: string) => val.length === 16 ? val + ':00' : val;
            const formattedStart = formatDate(withSeconds(dateStart)) as string;
            const formattedEnd = dateEnd ? formatDate(withSeconds(dateEnd)) as string : undefined;
            const response = await rescheduleSession(scheduleId, formattedStart, formattedEnd);
            if (response.success) {
                toast.success("Sessão reagendada com sucesso!");
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

    return {
        isClosed,
        loading,
        pendingAction,
        setPendingAction,
        handleConfirm,
        rescheduleDate,
        setRescheduleDate,
        handleRescheduleConfirm,
    };
}
