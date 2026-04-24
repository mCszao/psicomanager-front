import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import { PatientResume } from "@/interface/IPatientResume";
import PatientDTO from "@/types/patient.dto";
import { get, post } from "./http";

/**
 * Client-side: lista resumida de pacientes.
 * Para uso server-side, chame serverGet('/patients/resume') diretamente na page.
 */
export function getPatients(): Promise<BaseResponse<PatientResume[]>> {
    return get('/patients/resume');
}

/**
 * Client-side: detalhes completos de um paciente.
 * Para uso server-side, chame serverGet('/patients/:id') diretamente na page.
 */
export function getPatient(patientId: string): Promise<BaseResponse<Patient>> {
    return get(`/patients/${patientId}`);
}

export function registerPatient(patient: PatientDTO) {
    return post('/patients/register', patient);
}
