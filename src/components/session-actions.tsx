'use client';

import { SessionActionsProps } from "@/interface/ISessionActions";
import { CONFIRM_CONFIG } from "@/util/sessionActionsConfig";
import { useSessionActions } from "@/hooks/useSessionActions";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import RescheduleDialog from "@/components/reschedule-dialog";
import SessionClosedState from "@/components/session-closed-state";
import SessionActionButtons from "@/components/session-action-buttons";

export default function SessionActions({ scheduleId, stage, dateEnd, rescheduledTo }: SessionActionsProps) {
    const {
        isClosed,
        loading,
        pendingAction,
        setPendingAction,
        handleConfirm,
        rescheduleDate,
        setRescheduleDate,
        handleRescheduleConfirm,
    } = useSessionActions(scheduleId, stage);

    return (
        <>
            {pendingAction && (
                <ConfirmDialog
                    {...CONFIRM_CONFIG[pendingAction]}
                    onConfirm={handleConfirm}
                    onCancel={() => setPendingAction(null)}
                />
            )}

            {rescheduleDate !== null && (
                <RescheduleDialog
                    onConfirm={(dateStart, dateEnd) => handleRescheduleConfirm(dateStart, dateEnd)}
                    onCancel={() => setRescheduleDate(null)}
                />
            )}

            <div className="border border-border-default rounded-xl shadow-sm overflow-hidden shrink-0">
                <div className="px-4 py-3 md:px-5 md:py-4 border-b border-border-default bg-surface-raised">
                    <h2 className="text-base font-semibold text-content-primary">Ações</h2>
                </div>
                <div className="p-3 md:p-4">
                    {isClosed
                        ? <SessionClosedState stage={stage} dateEnd={dateEnd} rescheduledTo={rescheduledTo} />
                        : <SessionActionButtons loading={loading} onAction={setPendingAction} onReschedule={() => setRescheduleDate('')} />
                    }
                </div>
            </div>
        </>
    );
}
