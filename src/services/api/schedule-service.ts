import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";
import ScheduleDTO from "@/types/schedule.dto";
import { get, post, patch } from "./http";

/**
 * Client-side: lista de todas as sessões.
 * Para uso server-side, chame serverGet('/schedules?order=desc') diretamente na page.
 */
export function getSchedules(): Promise<BaseResponse<Session[]>> {
    return get('/schedules?order=desc');
}

/**
 * Client-side: detalhes de uma sessão.
 * Para uso server-side, chame serverGet('/schedules/:id') diretamente na page.
 */
export function getSchedule(scheduleId: string): Promise<BaseResponse<Session>> {
    return get(`/schedules/${scheduleId}`);
}

export function getSchedulesByPatient(patientId: string): Promise<BaseResponse<Session[]>> {
    return get(`/schedules/patient?id=${patientId}`);
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

export function rescheduleSession(scheduleId: string, dateStart: string, dateEnd?: string): Promise<BaseResponse<string>> {
    return patch(`/schedules/${scheduleId}/reschedule`, { dateStart, ...(dateEnd && { dateEnd }) });
}

export function saveAnnotations(scheduleId: string, annotations: string): Promise<BaseResponse<string>> {
    return patch(`/schedules/${scheduleId}/annotations`, { annotations });
}
