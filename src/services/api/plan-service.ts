import BaseResponse from "@/interface/IBaseResponse";
import { Plan, PlanTemplate } from "@/interface/IPlan";
import { PlanRegisterDTO, PlanTemplateDTO } from "@/types/plan.dto";
import { get, post, patch, del } from "./http";

export function getPlanTemplates(): Promise<BaseResponse<PlanTemplate[]>> {
    return get('/plans/templates');
}

export function getPlanTemplate(id: string): Promise<BaseResponse<PlanTemplate>> {
    return get(`/plans/templates/${id}`);
}

export function createPlanTemplate(dto: PlanTemplateDTO): Promise<BaseResponse<string>> {
    return post('/plans/templates', dto);
}

export function deletePlanTemplate(id: string): Promise<BaseResponse<string>> {
    return del(`/plans/templates/${id}`);
}

export function getPlansByPatient(patientId: string): Promise<BaseResponse<Plan[]>> {
    return get(`/plans/patient/${patientId}`);
}

export function getPlan(id: string): Promise<BaseResponse<Plan>> {
    return get(`/plans/${id}`);
}

export function createPlan(dto: PlanRegisterDTO): Promise<BaseResponse<string>> {
    return post('/plans', dto);
}

export function deactivatePlan(id: string): Promise<BaseResponse<string>> {
    return patch(`/plans/${id}/deactivate`);
}
