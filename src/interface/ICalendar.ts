import Session from "./ISchedule";

export type ViewMode = 'month' | 'week' | 'list';

export interface ScheduleCalendarProps {
    sessions: Session[];
    views?: ViewMode[];
}

export interface MonthViewProps {
    sessions: Session[];
    viewMonth: number;
    viewYear: number;
    today: Date;
    selectedDay: Date | null;
    onSelectDay: (d: Date) => void;
}

export interface WeekViewProps {
    sessions: Session[];
    weekStart: Date;
    today: Date;
}

export interface ListViewProps {
    sessions: Session[];
}
