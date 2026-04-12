import { useState, useMemo } from "react";
import { ViewMode } from "@/interface/ICalendar";
import { MONTHS, MONTHS_SHORT, getWeekStart } from "@/util/calendarUtils";

const today = new Date();

export function useScheduleCalendar(views: ViewMode[]) {
    const [view, setView]           = useState<ViewMode>(views[0]);
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [viewYear, setViewYear]   = useState(today.getFullYear());
    const [weekStart, setWeekStart] = useState(getWeekStart(today));
    const [selectedDay, setSelectedDay] = useState<Date | null>(today);

    function prevPeriod() {
        if (view !== 'week') {
            if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
            else setViewMonth(m => m - 1);
        } else {
            setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() - 7); return n; });
        }
    }

    function nextPeriod() {
        if (view !== 'week') {
            if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
            else setViewMonth(m => m + 1);
        } else {
            setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() + 7); return n; });
        }
    }

    function goToToday() {
        setViewMonth(today.getMonth());
        setViewYear(today.getFullYear());
        setWeekStart(getWeekStart(today));
        setSelectedDay(today);
    }

    const periodLabel = useMemo(() => {
        if (view !== 'week') return `${MONTHS[viewMonth]} ${viewYear}`;
        const end = new Date(weekStart);
        end.setDate(end.getDate() + 6);
        if (weekStart.getMonth() === end.getMonth())
            return `${weekStart.getDate()}–${end.getDate()} de ${MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
        return `${weekStart.getDate()} ${MONTHS_SHORT[weekStart.getMonth()]} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]} ${end.getFullYear()}`;
    }, [view, viewMonth, viewYear, weekStart]);

    return {
        today,
        view, setView,
        viewMonth, viewYear,
        weekStart,
        selectedDay, setSelectedDay,
        prevPeriod, nextPeriod, goToToday,
        periodLabel,
    };
}
