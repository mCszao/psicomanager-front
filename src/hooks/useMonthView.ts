import { useMemo } from "react";
import Session from "@/interface/ISchedule";
import { isSameDay, parseDate } from "@/util/calendarUtils";

interface UseMonthViewProps {
    sessions: Session[];
    viewMonth: number;
    viewYear: number;
    today: Date;
    selectedDay: Date | null;
}

export function useMonthView({ sessions, viewMonth, viewYear, today, selectedDay }: UseMonthViewProps) {
    const sessionsByDay = useMemo(() => {
        const map: Record<number, Session[]> = {};
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
        ? selectedDay.getDate()
        : null;
    const selectedSessions = selectedDayNum ? (sessionsByDay[selectedDayNum] ?? []) : [];

    return { sessionsByDay, cells, todayInView, selectedDayNum, selectedSessions };
}
