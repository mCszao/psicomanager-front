import { useMemo } from "react";
import Session from "@/interface/ISchedule";
import { isSameDay, parseDate } from "@/util/calendarUtils";

export type SessionEntry = {
    session: Session;
    entryDate: Date;
    isStart: boolean;
    isEnd: boolean;
    isMiddle: boolean;
};

type Group = {
    date: Date;
    entries: SessionEntry[];
};

function getDaysBetween(start: Date, end: Date): Date[] {
    const days: Date[] = [];
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    const endDay = new Date(end);
    endDay.setHours(0, 0, 0, 0);
    while (cursor <= endDay) {
        days.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
    }
    return days;
}

export function useListView(sessions: Session[]) {
    const grouped = useMemo(() => {
        const entries: SessionEntry[] = [];

        sessions.forEach(s => {
            const start = parseDate(s.dateStart);
            const end   = s.dateEnd ? parseDate(s.dateEnd) : null;

            if (!end || isSameDay(start, end)) {
                entries.push({ session: s, entryDate: start, isStart: true, isEnd: true, isMiddle: false });
                return;
            }

            const days = getDaysBetween(start, end);
            days.forEach((day, i) => {
                entries.push({
                    session:   s,
                    entryDate: day,
                    isStart:   i === 0,
                    isEnd:     i === days.length - 1,
                    isMiddle:  i > 0 && i < days.length - 1,
                });
            });
        });

        entries.sort((a, b) => b.entryDate.getTime() - a.entryDate.getTime());

        const groups: Group[] = [];
        entries.forEach(entry => {
            const last = groups[groups.length - 1];
            if (last && isSameDay(last.date, entry.entryDate)) {
                last.entries.push(entry);
            } else {
                groups.push({ date: entry.entryDate, entries: [entry] });
            }
        });

        return groups;
    }, [sessions]);

    return { grouped };
}
