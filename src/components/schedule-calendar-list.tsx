"use client";

import Link from "next/link";
import { ListViewProps } from "@/interface/ICalendar";
import { STAGE_CARD_STYLES, STAGE_STYLES, TYPE_STYLES, formatTime, parseDate } from "@/util/calendarUtils";
import { useListView, SessionEntry } from "@/hooks/useListView";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import attendanceTypeObjectBuilder from "@/util/attendanceTypeObjectBuilder";

function resolveTimeLabel(entry: SessionEntry): string {
    const start = parseDate(entry.session.dateStart);
    const end   = entry.session.dateEnd ? parseDate(entry.session.dateEnd) : null;

    if (entry.isStart && entry.isEnd) {
        return end ? `${formatTime(start)} – ${formatTime(end)}` : formatTime(start);
    }
    if (entry.isStart)  return `${formatTime(start)} → (continua)`;
    if (entry.isEnd)    return end ? `(continua) → ${formatTime(end)}` : '';
    return 'dia inteiro';
}

export default function ListView({ sessions }: ListViewProps) {
    const { grouped } = useListView(sessions);

    if (grouped.length === 0)
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-400">Nenhuma sessão encontrada.</p>
            </div>
        );

    return (
        <div className="overflow-y-auto h-full space-y-6 pr-1">
            {grouped.map(({ date, entries }, gi) => (
                <div key={gi}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 capitalize">
                        {date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <ul className="flex flex-col gap-2">
                        {entries.map((entry, ei) => {
                            const { ptStage, color }           = stageObjectBuilder(entry.session.stage);
                            const { ptType, color: typeColor } = attendanceTypeObjectBuilder(entry.session.type);
                            const cardStyle   = STAGE_CARD_STYLES[color ?? 'yellow'];
                            const timeLabel   = resolveTimeLabel(entry);
                            return (
                                <li key={`${entry.session.id}-${ei}`}>
                                    <Link
                                        href={`/schedules/${entry.session.id}`}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${cardStyle}`}
                                    >
                                        {(entry.isMiddle || entry.isEnd) && !entry.isStart && (
                                            <span className="text-xs opacity-60 shrink-0 italic">continuação</span>
                                        )}
                                        <p className="flex-1 font-semibold text-sm truncate min-w-0">
                                            {entry.session.patient?.name}
                                        </p>
                                        <span className="text-sm opacity-75 shrink-0">
                                            {timeLabel}
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
