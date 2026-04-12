'use client';

import { CalendarClock, CheckCircle2, UserX, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { concludeSession } from "@/services/api";
import { useToast } from "@/contexts/ToastContext";
import { extractApiError } from "@/util/feedback";
import ConfirmDialog from "@/components/ui/confirm-dialog";

interface SessionActionsProps {
    scheduleId: string;
    stage: string;
}

type PendingAction = 'conclude' | 'cancel' | 'absent' | null;

const CLOSED_STAGES = ['CANCELLED', 'CONCLUDED', 'ABSENT'];

const CONFIRM_CONFIG: Record<Exclude<PendingAction, null>, {
    title: string;
    description: string;
    confirmLabel: string;
    confirmClassName: string;
}> = {
    conclude: {
        title: "Concluir sessão",
        description: "Tem certeza que deseja concluir esta sessão? Esta ação não poderá ser desfeita.",
        confirmLabel: "Concluir",
        confirmClassName: "bg-green-600 hover:bg-green-700 text-white",
    },
    cancel: {
        title: "Cancelar sessão",
        description: "Tem certeza que deseja cancelar esta sessão? Esta ação não poderá ser desfeita.",
        confirmLabel: "Cancelar sessão",
        confirmClassName: "bg-red-600 hover:bg-red-700 text-white",
    },
    absent: {
        title: "Marcar falta",
        description: "Tem certeza que deseja registrar falta para esta sessão? Esta ação não poderá ser desfeita.",
        confirmLabel: "Marcar falta",
        confirmClassName: "bg-orange-500 hover:bg-orange-600 text-white",
    },
};

export default function SessionActions({ scheduleId, stage }: SessionActionsProps) {
    const isClosed = CLOSED_STAGES.includes(stage);
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);

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

    return (
        <>
            {pendingAction && (
                <ConfirmDialog
                    {...CONFIRM_CONFIG[pendingAction]}
                    onConfirm={handleConfirm}
                    onCancel={() => setPendingAction(null)}
                />
            )}

            <div className="border border-border-default rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                    <h2 className="text-base font-semibold text-content-primary">Ações</h2>
                </div>
                <div className="p-4 flex flex-col gap-2">
                    {isClosed ? (
                        <p className="text-sm text-content-secondary text-center py-4">
                            Esta sessão não possui ações disponíveis.
                        </p>
                    ) : (
                        <>
                            <button
                                onClick={() => setPendingAction('conclude')}
                                disabled={loading}
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle2 size={16} />
                                {loading ? "Processando..." : "Concluir sessão"}
                            </button>
                            <button
                                disabled
                                title="Em breve"
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-sm font-medium hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CalendarClock size={16} />
                                Reagendar
                            </button>
                            <button
                                onClick={() => setPendingAction('absent')}
                                disabled
                                title="Em breve"
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-sm font-medium hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <UserX size={16} />
                                Marcar falta
                            </button>
                            <button
                                onClick={() => setPendingAction('cancel')}
                                disabled
                                title="Em breve"
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-red-600 border border-red-200 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <XCircle size={16} />
                                Cancelar sessão
                            </button>
                            <p className="text-xs text-content-disabled text-center mt-1">
                                Funcionalidades em desenvolvimento
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
