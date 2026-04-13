import { CheckCheck, Ban, UserX, CalendarCheck, Clock } from "lucide-react";
import Link from "next/link";
import ClosedState from "@/components/ui/closed-state";
import InfoRow from "@/components/ui/info-row";
import { ScheduleRescheduledTo } from "@/interface/ISchedule";
import { formatClosedDate } from "@/util/sessionActionsUtils";
import { parseDate, formatTime } from "@/util/calendarUtils";
import { StageEnum } from "@/types/schedule.dto";

type Props = {
    stage: StageEnum | string;
    dateEnd: string;
    rescheduledTo?: ScheduleRescheduledTo | null;
};

export default function SessionClosedState({ stage, dateEnd, rescheduledTo }: Props) {
    switch (stage) {
        case 'CONCLUDED':
            return (
                <ClosedState icon={<CheckCheck size={20} className="text-green-600" />} iconBg="bg-green-100" title="Sessão concluída">
                    <InfoRow label="Encerrada em" value={formatClosedDate(dateEnd)} />
                </ClosedState>
            );
        case 'CANCELLED':
            return (
                <ClosedState icon={<Ban size={20} className="text-red-600" />} iconBg="bg-red-100" title="Sessão cancelada">
                    <p className="text-xs text-content-secondary">Esta sessão foi cancelada e não pode ser alterada.</p>
                </ClosedState>
            );
        case 'ABSENT':
            return (
                <ClosedState icon={<UserX size={20} className="text-orange-600" />} iconBg="bg-orange-100" title="Falta registrada">
                    <p className="text-xs text-content-secondary">O paciente não compareceu a esta sessão.</p>
                </ClosedState>
            );
        case 'RESCHEDULED':
            return (
                <ClosedState icon={<CalendarCheck size={20} className="text-gray-500" />} iconBg="bg-gray-100" title="Sessão reagendada">
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
