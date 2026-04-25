import {AlertRegisterDTO, IAlert} from "@/interface/IAlert";
import BaseResponse from "@/interface/IBaseResponse";
import {get, patch, post} from "./http";

export function getAlertsByPatient(patientId: string): Promise<BaseResponse<IAlert[]>> {
    return get(`/alerts/patient/${patientId}`);
}

export function getAlertsBySession(sessionId: string): Promise<BaseResponse<IAlert[]>> {
    return get(`/alerts/session/${sessionId}`);
}

export function createAlert(dto: AlertRegisterDTO): Promise<BaseResponse<string>> {
    return post('/alerts', dto);
}

export function dismissAlert(id: string): Promise<BaseResponse<string>> {
    return patch(`/alerts/${id}/dismiss`);
}
