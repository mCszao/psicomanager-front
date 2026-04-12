import { useMemo } from "react";
import Session from "@/interface/ISchedule";
import { isSameDay, parseDate } from "@/util/calendarUtils";

export function useListView(sessions: Session[]) {
    const grouped = useMemo(() => {
        const sorted = [...sessions].sort((a, b) =>
            parseDate(b.dateStart).getTime() - parseDate(a.dateStart).getTime()
        );
        const groups: { date: Date; items: Session[] }[] = [];
        sorted.forEach(s => {
            const d    = parseDate(s.dateStart);
            const last = groups[groups.length - 1];
            if (last && isSameDay(last.date, d)) last.items.push(s);
            else groups.push({ date: d, items: [s] });
        });
        return groups;
    }, [sessions]);

    return { grouped };
}
