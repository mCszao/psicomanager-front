'use client';

import { CalendarClock, CheckCircle2, UserX, XCircle, CalendarCheck, CheckCheck, Ban, Clock } from "lucide-react";
import Link from "next/link";
import { SessionActionsProps } from "@/interface/ISessionActions";
import { CONFIRM_CONFIG, CLOSED_STAGES } from "@/util/sessionActionsConfig";
import { useSessionActions } from "@/hooks/useSessionActions";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import RescheduleDialog from "@/components/reschedule-dialog";
import { parseDate, formatTime, MONTHS } from "@/util/calendarUtils";

function formatClosedDate(dateStr: string) {
    const d = parseDate(dateStr);
    return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()} às ${formatTime(d)}`;
}

type ClosedStateProps = {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    children: React.ReactNode;
};

function ClosedState({ icon, iconBg, title, children }: ClosedStateProps) {
    return (
        <div className="flex flex-col items-center gap-3 py-5 px-2 text-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBg}`}>
                {icon}
            </div>
            <p className="text-sm font-semibold text-content-primary">{title}</p>
            <div className="flex flex-col gap-1 w-full">
                {children}
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-2 px-1 text-xs">
            <span className="text-content-secondary shrink-0">{label}</span>
            <span className="text-content-primary font-medium text-right">{value}</span>
        </div>
    );
}

export default function SessionActions({ scheduleId, stage, dateEnd, rescheduledTo }: SessionActionsProps) {
    const { isClosed, loading, pendingAction, setPendingAction, handleConfirm, rescheduleDate, setRescheduleDate, handleRescheduleConfirm } = useSessionActions(scheduleId, stage);

    function renderClosedState() {
        switch (stage) {
            case 'CONCLUDED':
                return (
                    <ClosedState
                        icon={<CheckCheck size={20} className="text-green-600" />}
                        iconBg="bg-green-100"
                        title="Sessão concluída"
                    >
                        <InfoRow label="Encerrada em" value={formatClosedDate(dateEnd)} />
                    </ClosedState>
                );
            case 'CANCELLED':
                return (
                    <ClosedState
                        icon={<Ban size={20} className="text-red-600" />}
                        iconBg="bg-red-100"
                        title="Sessão cancelada"
                    >
                        <p className="text-xs text-content-secondary">Esta sessão foi cancelada e não pode ser alterada.</p>
                    </ClosedState>
                );
            case 'ABSENT':
                return (
                    <ClosedState
                        icon={<UserX size={20} className="text-orange-600" />}
                        iconBg="bg-orange-100"
                        title="Falta registrada"
                    >
                        <p className="text-xs text-content-secondary">O paciente não compareceu a esta sessão.</p>
                    </ClosedState>
                );
            case 'RESCHEDULED':
                return (
                    <ClosedState
                        icon={<CalendarCheck size={20} className="text-gray-500" />}
                        iconBg="bg-gray-100"
                        title="Sessão reagendada"
                    >
                        {rescheduledTo ? (
                            <>
                                <InfoRow label="Nova data" value={formatClosedDate(rescheduledTo.dateStart)} />
                                <InfoRow
                                    label="Horário"
                                    value={`${formatTime(parseDate(rescheduledTo.dateStart))} – ${formatTime(parseDate(rescheduledTo.dateEnd))}`}
                                />
                                <Link
                                    href={`/schedules/${rescheduledTo.id}`}
                                    className="mt-2 flex items-center justify-center gap-1.5 w-full text-xs font-medium text-royalBlue hover:underline"
                                >
                                    <Clock size={12} />
                                    Ver nova sessão
                                </Link>
                            </>
                        ) : (
                            <p className="text-xs text-content-secondary">Uma nova sessão foi criada para este paciente.</p>
                        )}
                    </ClosedState>
                );
            default:
                return (
                    <p className="text-sm text-content-secondary text-center py-4">
                        Esta sessão não possui ações disponíveis.
                    </p>
                );
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

            {rescheduleDate !== null && (
                <RescheduleDialog
                    onConfirm={(dateStart, dateEnd) => handleRescheduleConfirm(dateStart, dateEnd)}
                    onCancel={() => setRescheduleDate(null)}
                />
            )}

            <div className="border border-border-default rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                    <h2 className="text-base font-semibold text-content-primary">Ações</h2>
                </div>
                <div className="p-4 flex flex-col gap-2">
                    {isClosed ? renderClosedState() : (
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
                                onClick={() => setRescheduleDate('')}
                                disabled={loading}
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-sm font-medium hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CalendarClock size={16} />
                                {loading ? "Processando..." : "Reagendar"}
                            </button>
                            <button
                                onClick={() => setPendingAction('absent')}
                                disabled={loading}
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-sm font-medium hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <UserX size={16} />
                                {loading ? "Processando..." : "Marcar falta"}
                            </button>
                            <button
                                onClick={() => setPendingAction('cancel')}
                                disabled={loading}
                                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-red-600 border border-red-200 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <XCircle size={16} />
                                {loading ? "Processando..." : "Cancelar sessão"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
