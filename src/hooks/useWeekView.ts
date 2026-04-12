import { useMemo } from "react";
import Session from "@/interface/ISchedule";
import { isSameDay, parseDate } from "@/util/calendarUtils";

interface UseWeekViewProps {
    sessions: Session[];
    weekStart: Date;
}

export function useWeekView({ sessions, weekStart }: UseWeekViewProps) {
    const weekDays = useMemo(() =>
        Array.from({ length: 7 }, (_, i) => {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + i);
            return d;
        }),
        [weekStart]
    );

    const sessionsByDay = useMemo(() =>
        weekDays.map(day => sessions.filter(s => isSameDay(parseDate(s.dateStart), day))),
        [sessions, weekStart]
    );

    return { weekDays, sessionsByDay };
}
