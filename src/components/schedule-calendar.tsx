"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleCalendarProps, ViewMode } from "@/interface/ICalendar";
import { MONTHS, MONTHS_SHORT, getWeekStart } from "@/util/calendarUtils";
import MonthView from "./schedule-calendar-month";
import WeekView from "./schedule-calendar-week";
import ListView from "./schedule-calendar-list";

const VIEW_LABELS: Record<ViewMode, string> = {
    month: 'Mês',
    week:  'Semana',
    list:  'Lista',
};

export default function ScheduleCalendar({ sessions, views = ['month', 'week', 'list'] }: ScheduleCalendarProps) {
    const today = new Date();
    const [view, setView]               = useState<ViewMode>(views[0]);
    const [viewMonth, setViewMonth]     = useState(today.getMonth());
    const [viewYear, setViewYear]       = useState(today.getFullYear());
    const [weekStart, setWeekStart]     = useState(getWeekStart(today));
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

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5 shrink-0 flex-wrap">
                <div className="flex items-center gap-1">
                    {view !== 'list' && (
                        <button onClick={prevPeriod} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600">
                            <ChevronLeft size={18} />
                        </button>
                    )}
                    <button onClick={goToToday} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-200">
                        Hoje
                    </button>
                    {view !== 'list' && (
                        <button onClick={nextPeriod} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600">
                            <ChevronRight size={18} />
                        </button>
                    )}
                    <span className="font-semibold text-base text-gray-700 dark:text-gray-200 capitalize ml-2">
                        {periodLabel}
                    </span>
                </div>

                {views.length > 1 && (
                    <div className="ml-auto flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">
                        {views.map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-4 py-1.5 font-medium transition-colors border-r last:border-r-0 border-gray-200 dark:border-gray-700
                                    ${view === v
                                        ? 'bg-royalBlue text-white'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            >
                                {VIEW_LABELS[v]}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 min-h-0">
                {view === 'month' && (
                    <MonthView
                        sessions={sessions}
                        viewMonth={viewMonth}
                        viewYear={viewYear}
                        today={today}
                        selectedDay={selectedDay}
                        onSelectDay={setSelectedDay}
                    />
                )}
                {view === 'week' && (
                    <WeekView sessions={sessions} weekStart={weekStart} today={today} />
                )}
                {view === 'list' && (
                    <ListView sessions={sessions} />
                )}
            </div>
        </div>
    );
}
