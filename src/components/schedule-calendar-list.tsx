"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ListViewProps } from "@/interface/ICalendar";
import { STAGE_STYLES, TYPE_STYLES, formatTime, isSameDay, parseDate } from "@/util/calendarUtils";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import attendanceTypeObjectBuilder from "@/util/attendanceTypeObjectBuilder";

export default function ListView({ sessions }: ListViewProps) {
    const grouped = useMemo(() => {
        const sorted = [...sessions].sort((a, b) =>
            parseDate(b.dateStart).getTime() - parseDate(a.dateStart).getTime()
        );
        const groups: { date: Date; items: typeof sessions }[] = [];
        sorted.forEach(s => {
            const d    = parseDate(s.dateStart);
            const last = groups[groups.length - 1];
            if (last && isSameDay(last.date, d)) last.items.push(s);
            else groups.push({ date: d, items: [s] });
        });
        return groups;
    }, [sessions]);

    if (grouped.length === 0)
        return <p className="text-sm text-gray-400">Nenhuma sessão encontrada.</p>;

    return (
        <div className="overflow-y-auto h-full space-y-6 pr-1">
            {grouped.map(({ date, items }, gi) => (
                <div key={gi}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 capitalize">
                        {date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <ul className="flex flex-col rounded-xl border border-border-default overflow-hidden divide-y divide-border-default">
                        {items.map(s => {
                            const { ptStage, color } = stageObjectBuilder(s.stage);
                            const { ptType, color: typeColor } = attendanceTypeObjectBuilder(s.type);
                            const start = parseDate(s.dateStart);
                            const end   = s.dateEnd ? parseDate(s.dateEnd) : null;
                            return (
                                <li key={s.id}>
                                    <Link href={`/schedules/${s.id}`}
                                        className="flex items-center gap-4 px-4 py-3 hover:bg-surface-raised transition-colors">
                                        <div className="w-1 self-stretch rounded-full bg-royalBlue shrink-0" />
                                        <p className="flex-1 font-semibold text-sm text-content-primary truncate min-w-0">
                                            {s.patient?.name}
                                        </p>
                                        <span className="text-sm text-content-secondary shrink-0">
                                            {end ? `${formatTime(start)} - ${formatTime(end)}` : formatTime(start)}
                                        </span>
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${TYPE_STYLES[typeColor]}`}>
                                            {ptType}
                                        </span>
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${STAGE_STYLES[color ?? 'yellow']}`}>
                                            {ptStage}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
