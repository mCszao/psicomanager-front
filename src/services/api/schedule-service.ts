import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";
import ScheduleDTO from "@/types/schedule.dto";
import { get, post, patch } from "./http";

export function getSchedules(): Promise<BaseResponse<Session[]>> {
    return get('/schedules?order=desc');
}

export function getSchedule(scheduleId: string): Promise<BaseResponse<Session>> {
    return get(`/schedules/${scheduleId}`);
}

export function registerSchedule(schedule: ScheduleDTO) {
    return post('/schedules/register', schedule);
}

export function concludeSession(scheduleId: string): Promise<BaseResponse<string>> {
    return patch(`/schedules/${scheduleId}/conclude`);
}

export function cancelSession(scheduleId: string): Promise<BaseResponse<string>> {
    return patch(`/schedules/${scheduleId}/cancel`);
}

export function markAsAbsent(scheduleId: string): Promise<BaseResponse<string>> {
    return patch(`/schedules/${scheduleId}/absent`);
}
