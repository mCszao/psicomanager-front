"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleCalendarProps, ViewMode } from "@/interface/ICalendar";
import { useScheduleCalendar } from "@/hooks/useScheduleCalendar";
import MonthView from "./schedule-calendar-month";
import WeekView from "./schedule-calendar-week";
import ListView from "./schedule-calendar-list";

const VIEW_LABELS: Record<ViewMode, string> = {
    month: 'Mês',
    week:  'Semana',
    list:  'Lista',
};

export default function ScheduleCalendar({ sessions, views = ['month', 'week', 'list'] }: ScheduleCalendarProps) {
    const {
        today,
        view, setView,
        viewMonth, viewYear,
        weekStart,
        selectedDay, setSelectedDay,
        prevPeriod, nextPeriod, goToToday,
        periodLabel,
    } = useScheduleCalendar(views);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5 shrink-0 flex-wrap">
                <div className="flex items-center gap-1">
                    {view !== 'list' && (
                        <button onClick={prevPeriod} className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors text-content-secondary">
                            <ChevronLeft size={18} />
                        </button>
                    )}
                    <button onClick={goToToday} className="text-sm px-3 py-1.5 rounded-lg border border-border-default hover:bg-surface-raised transition-colors font-medium text-content-primary">
                        Hoje
                    </button>
                    {view !== 'list' && (
                        <button onClick={nextPeriod} className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors text-content-secondary">
                            <ChevronRight size={18} />
                        </button>
                    )}
                    <span className="font-semibold text-base text-content-primary capitalize ml-2">
                        {periodLabel}
                    </span>
                </div>

                {views.length > 1 && (
                    <div className="ml-auto flex rounded-lg border border-border-default overflow-hidden text-sm">
                        {views.map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-4 py-1.5 font-medium transition-colors border-r last:border-r-0 border-border-default
                                    ${view === v
                                        ? 'bg-royalBlue text-white'
                                        : 'text-content-secondary hover:bg-surface-raised'}`}
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
