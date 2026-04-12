import Schedule from "@/interface/ISchedule";
import Link from "next/link";
import { parseDate, formatTime, STAGE_STYLES, TYPE_STYLES } from "@/util/calendarUtils";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import attendanceTypeObjectBuilder from "@/util/attendanceTypeObjectBuilder";

interface PatientScheduleItemProps {
    schedule: Schedule;
}

export default function PatientScheduleItem({ schedule }: PatientScheduleItemProps) {
    const { ptStage, color } = stageObjectBuilder(schedule.stage);
    const { ptType, color: typeColor } = attendanceTypeObjectBuilder(schedule.type);
    const start = parseDate(schedule.dateStart);

    return (
        <Link
            href={`/schedules/${schedule.id}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border-default hover:bg-surface-raised transition-colors"
        >
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-content-primary">
                    {start.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-xs text-content-secondary">{formatTime(start)}</p>
            </div>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${TYPE_STYLES[typeColor]}`}>
                {ptType}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${STAGE_STYLES[color ?? 'yellow']}`}>
                {ptStage}
            </span>
        </Link>
    );
}
