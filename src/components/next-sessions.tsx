import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";
import ScheduleCalendar from "./schedule-calendar";
import { getSchedules } from "@/services/api";

type ViewMode = 'month' | 'week' | 'list';

interface Props {
    views?: ViewMode[];
}

export default async function NextSessions({ views }: Props) {
    const response = await getSchedules() as BaseResponse<Session[]>;
    return <ScheduleCalendar sessions={response.object ?? []} views={views} />;
}
