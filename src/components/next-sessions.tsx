import { ScheduleCalendarProps } from "@/interface/ICalendar";
import ScheduleCalendar from "./schedule-calendar";

type ViewMode = 'month' | 'week' | 'list';

interface Props extends ScheduleCalendarProps {
    views?: ViewMode[];
}

/**
 * Pure presentational wrapper — receives sessions as props from the Server Component page
 * and delegates rendering to the client-side ScheduleCalendar.
 */
export default function NextSessions({ sessions, views }: Props) {
    return <ScheduleCalendar sessions={sessions} views={views} />;
}
