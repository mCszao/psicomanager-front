"use client";

import Link from "next/link";
import { WeekViewProps } from "@/interface/ICalendar";
import { FIRST_HOUR, HOUR_HEIGHT, HOURS, STAGE_CARD_STYLES, WEEKDAYS, formatTime, isSameDay, parseDate } from "@/util/calendarUtils";
import { useWeekView } from "@/hooks/useWeekView";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import attendanceTypeObjectBuilder from "@/util/attendanceTypeObjectBuilder";

const TYPE_DOT: Record<string, string> = {
    indigo: 'bg-indigo-300',
    teal:   'bg-teal-300',
};

export default function WeekView({ sessions, weekStart, today }: WeekViewProps) {
    const { weekDays, sessionsByDay } = useWeekView({ sessions, weekStart });

    return (
        <div className="flex flex-col h-full overflow-hidden border border-border-default rounded-xl">
            <div
                className="grid shrink-0 border-b border-border-default bg-surface-raised"
                style={{ gridTemplateColumns: '3.5rem repeat(7, 1fr)' }}
            >
                <div />
                {weekDays.map((day, i) => {
                    const isToday = isSameDay(day, today);
                    return (
                        <div key={i} className="py-2 text-center border-l border-border-default">
                            <p className="text-xs font-semibold text-content-secondary uppercase">{WEEKDAYS[day.getDay()]}</p>
                            <p className={`text-lg font-bold mt-0.5 mx-auto w-9 h-9 flex items-center justify-center rounded-full
                                ${isToday ? 'bg-royalBlue text-white' : 'text-content-primary'}`}>
                                {day.getDate()}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="overflow-y-auto flex-1">
                <div className="grid relative" style={{ gridTemplateColumns: '3.5rem repeat(7, 1fr)' }}>
                    <div>
                        {HOURS.map(h => (
                            <div key={h} className="flex items-start justify-end pr-2 text-xs text-gray-400"
                                style={{ height: HOUR_HEIGHT }}>
                                <span className="-translate-y-2">{`${h}h`}</span>
                            </div>
                        ))}
                    </div>

                    {weekDays.map((day, di) => (
                        <div
                            key={di}
                            className={`relative border-l border-border-default ${isSameDay(day, today) ? 'bg-royalBlue/5' : ''}`}
                            style={{ height: HOURS.length * HOUR_HEIGHT }}
                        >
                            {HOURS.map(h => (
                                <div key={h} className="absolute w-full border-t border-border-default"
                                    style={{ top: (h - FIRST_HOUR) * HOUR_HEIGHT }} />
                            ))}
                            {sessionsByDay[di].map(s => {
                                const start    = parseDate(s.dateStart);
                                const end      = s.dateEnd ? parseDate(s.dateEnd) : null;
                                const topPx    = (start.getHours() + start.getMinutes() / 60 - FIRST_HOUR) * HOUR_HEIGHT;
                                const duration = end ? (end.getTime() - start.getTime()) / 3_600_000 : 1;
                                const height   = Math.max(duration * HOUR_HEIGHT, 28);
                                const { color: typeColor, ptType } = attendanceTypeObjectBuilder(s.type);
                                const { color } = stageObjectBuilder(s.stage);
                                const cardStyle = STAGE_CARD_STYLES[color ?? 'yellow'];
                                return (
                                    <Link
                                        key={s.id}
                                        href={`/schedules/${s.id}`}
                                        title={`${s.patient?.name} — ${ptType}`}
                                        className={`absolute left-0.5 right-0.5 rounded-lg px-2 py-1 overflow-hidden transition-colors z-10 ${cardStyle}`}
                                        style={{ top: topPx, height }}
                                    >
                                        <div className="flex items-center gap-1 leading-tight">
                                            <span className={`w-2 h-2 rounded-full shrink-0 ${TYPE_DOT[typeColor]}`} />
                                            <p className="text-xs font-semibold truncate">{s.patient?.name}</p>
                                        </div>
                                        <p className="text-xs opacity-75">{formatTime(start)}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
