"use client";

import Link from "next/link";
import {ListViewProps} from "@/interface/ICalendar";
import {STAGE_CARD_STYLES, STAGE_STYLES, TYPE_STYLES, formatTime, parseDate} from "@/util/calendarUtils";
import {useListView} from "@/hooks/useListView";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import attendanceTypeObjectBuilder from "@/util/attendanceTypeObjectBuilder";

export default function ListView({sessions}: ListViewProps) {
    const {grouped} = useListView(sessions);

    if (grouped.length === 0)
        return <p className="text-sm text-gray-400">Nenhuma sessão encontrada.</p>;

    return (
        <div className="overflow-y-auto h-full space-y-6 pr-1">
            {grouped.map(({date, items}, gi) => (
                <div key={gi}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 capitalize">
                        {date.toLocaleDateString('pt-BR', {weekday: 'long', day: 'numeric', month: 'long'})}
                    </p>
                    <ul className="flex flex-col gap-2">
                        {items.map(s => {
                            const {ptStage, color} = stageObjectBuilder(s.stage);
                            const {ptType, color: typeColor} = attendanceTypeObjectBuilder(s.type);
                            const start = parseDate(s.dateStart);
                            const end = s.dateEnd ? parseDate(s.dateEnd) : null;
                            const cardStyle = STAGE_CARD_STYLES[color ?? 'yellow'];
                            return (
                                <li key={s.id}>
                                    <Link
                                        href={`/schedules/${s.id}`}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${cardStyle}`}
                                    >
                                        <p className="flex-1 font-semibold text-sm truncate min-w-0">
                                            {s.patient?.name}
                                        </p>
                                        <span className="text-sm opacity-75 shrink-0">
                                            {end ? `${formatTime(start)} - ${formatTime(end)}` : formatTime(start)}
                                        </span>
                                        <span
                                            className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${TYPE_STYLES[typeColor]}`}>
                                            {ptType}
                                        </span>
                                        <span
                                            className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${STAGE_STYLES[color ?? 'yellow']}`}>
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
