import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";
import ScheduleDTO from "@/types/schedule.dto";
import { get, post } from "./http";

export function getSchedules(): Promise<BaseResponse<Session[]>> {
    return get('/schedules?order=desc');
}

export function getSchedule(scheduleId: string): Promise<BaseResponse<Session>> {
    return get(`/schedules/${scheduleId}`);
}

export function registerSchedule(schedule: ScheduleDTO) {
    return post('/schedules/register', schedule);
}
