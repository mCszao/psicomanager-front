"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MonthViewProps } from "@/interface/ICalendar";
import { MONTHS, STAGE_STYLES, WEEKDAYS, isSameDay, parseDate, formatTime } from "@/util/calendarUtils";
import stageObjectBuilder from "@/util/stageObjectBuilder";

export default function MonthView({ sessions, viewMonth, viewYear, today, selectedDay, onSelectDay }: MonthViewProps) {
    const sessionsByDay = useMemo(() => {
        const map: Record<number, typeof sessions> = {};
        sessions.forEach(s => {
            const d = parseDate(s.dateStart);
            if (d.getMonth() === viewMonth && d.getFullYear() === viewYear) {
                map[d.getDate()] = [...(map[d.getDate()] ?? []), s];
            }
        });
        return map;
    }, [sessions, viewMonth, viewYear]);

    const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array(firstWeekday).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const todayInView    = today.getMonth() === viewMonth && today.getFullYear() === viewYear;
    const selectedDayNum = selectedDay && isSameDay(selectedDay, new Date(viewYear, viewMonth, selectedDay.getDate()))
        ? selectedDay.getDate() : null;
    const selectedSessions = selectedDayNum ? (sessionsByDay[selectedDayNum] ?? []) : [];

    return (
        <div className="flex gap-6 h-full">
            <div className="flex-1 flex flex-col min-w-0">
                <div className="grid grid-cols-7 mb-2 shrink-0">
                    {WEEKDAYS.map(d => (
                        <span key={d} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide py-1">{d}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 flex-1">
                    {cells.map((day, i) => {
                        if (!day) return <div key={i} />;
                        const hasSessions = !!sessionsByDay[day];
                        const isToday    = todayInView && day === today.getDate();
                        const isSelected = day === selectedDayNum;
                        return (
                            <button
                                key={i}
                                onClick={() => onSelectDay(new Date(viewYear, viewMonth, day))}
                                className={`relative flex flex-col items-center justify-start pt-2 rounded-xl text-sm font-medium transition-colors border
                                    ${isSelected ? 'bg-royalBlue text-white border-royalBlue'
                                    : isToday    ? 'border-royalBlue text-royalBlue bg-blue-50 dark:bg-blue-950/20'
                                    : 'border-transparent hover:bg-surface-raised text-content-primary'}`}
                            >
                                <span>{day}</span>
                                {hasSessions && (
                                    <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-royalBlue'}`} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="w-64 shrink-0 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    {selectedDayNum ? `${selectedDayNum} de ${MONTHS[viewMonth]}` : 'Selecione um dia'}
                </p>
                {selectedSessions.length === 0
                    ? <p className="text-sm text-gray-400">Nenhuma sessão neste dia.</p>
                    : (
                        <ul className="flex flex-col gap-2">
                            {selectedSessions.map(s => {
                                const { ptStage, color } = stageObjectBuilder(s.stage);
                                const start = parseDate(s.dateStart);
                                return (
                                    <li key={s.id}>
                                        <Link href={`/schedules/${s.id}`} className="flex flex-col bg-royalBlue text-white rounded-xl px-4 py-3 hover:opacity-90 transition-opacity">
                                            <span className="font-semibold text-sm truncate">{s.patient?.name}</span>
                                            <span className="text-xs opacity-75 mt-0.5">{formatTime(start)}</span>
                                            <span className={`mt-2 self-start text-xs px-2 py-0.5 rounded-full border font-medium ${STAGE_STYLES[color ?? 'yellow']}`}>
                                                {ptStage}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )
                }
            </div>
        </div>
    );
}
