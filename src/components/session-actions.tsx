'use client';

import { CalendarClock, CheckCircle2, UserX, XCircle } from "lucide-react";
import { SessionActionsProps } from "@/interface/ISessionActions";
import { CONFIRM_CONFIG } from "@/util/sessionActionsConfig";
import { useSessionActions } from "@/hooks/useSessionActions";
import ConfirmDialog from "@/components/ui/confirm-dialog";

export default function SessionActions({ scheduleId, stage }: SessionActionsProps) {
    const { isClosed, loading, pendingAction, setPendingAction, handleConfirm } = useSessionActions(scheduleId, stage);

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
                                disabled
                                title="Em breve"
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-sm font-medium hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <UserX size={16} />
                                Marcar falta
                            </button>
                            <button
                                onClick={() => setPendingAction('cancel')}
                                disabled={loading}
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-red-600 border border-red-200 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <XCircle size={16} />
                                {loading ? "Processando..." : "Cancelar sessão"}
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
