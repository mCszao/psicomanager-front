"use client";

import { useMemo } from "react";
import Link from "next/link";
import { WeekViewProps } from "@/interface/ICalendar";
import { FIRST_HOUR, HOUR_HEIGHT, HOURS, WEEKDAYS, formatTime, isSameDay, parseDate } from "@/util/calendarUtils";

export default function WeekView({ sessions, weekStart, today }: WeekViewProps) {
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        return d;
    });

    const sessionsByDay = useMemo(() =>
        weekDays.map(day => sessions.filter(s => isSameDay(parseDate(s.dateStart), day))),
        [sessions, weekStart]
    );

    return (
        <div className="flex flex-col h-full overflow-hidden border border-gray-100 dark:border-gray-800 rounded-xl">
            <div
                className="grid shrink-0 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                style={{ gridTemplateColumns: '3.5rem repeat(7, 1fr)' }}
            >
                <div />
                {weekDays.map((day, i) => {
                    const isToday = isSameDay(day, today);
                    return (
                        <div key={i} className="py-2 text-center border-l border-gray-100 dark:border-gray-800">
                            <p className="text-xs font-semibold text-gray-400 uppercase">{WEEKDAYS[day.getDay()]}</p>
                            <p className={`text-lg font-bold mt-0.5 mx-auto w-9 h-9 flex items-center justify-center rounded-full
                                ${isToday ? 'bg-royalBlue text-white' : 'text-gray-700 dark:text-gray-200'}`}>
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
                            className={`relative border-l border-gray-100 dark:border-gray-800
                                ${isSameDay(day, today) ? 'bg-blue-50/50 dark:bg-blue-950/10' : ''}`}
                            style={{ height: HOURS.length * HOUR_HEIGHT }}
                        >
                            {HOURS.map(h => (
                                <div key={h} className="absolute w-full border-t border-gray-100 dark:border-gray-800"
                                    style={{ top: (h - FIRST_HOUR) * HOUR_HEIGHT }} />
                            ))}
                            {sessionsByDay[di].map(s => {
                                const start    = parseDate(s.dateStart);
                                const end      = s.dateEnd ? parseDate(s.dateEnd) : null;
                                const topPx    = (start.getHours() + start.getMinutes() / 60 - FIRST_HOUR) * HOUR_HEIGHT;
                                const duration = end ? (end.getTime() - start.getTime()) / 3_600_000 : 1;
                                const height   = Math.max(duration * HOUR_HEIGHT, 28);
                                return (
                                    <Link
                                        key={s.id}
                                        href={`/schedules/${s.id}`}
                                        className="absolute left-0.5 right-0.5 bg-royalBlue text-white rounded-lg px-2 py-1 overflow-hidden hover:opacity-90 transition-opacity z-10"
                                        style={{ top: topPx, height }}
                                    >
                                        <p className="text-xs font-semibold truncate leading-tight">{s.patient?.name}</p>
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
