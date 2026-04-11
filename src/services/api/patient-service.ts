import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import { PatientResume } from "@/interface/IPatientResume";
import PatientDTO from "@/types/patient.dto";
import { get, post } from "./http";

export function getPatients(): Promise<BaseResponse<PatientResume[]>> {
    return get('/patients/resume');
}

export function getPatient(patientId: string): Promise<BaseResponse<Patient>> {
    return get(`/patients/${patientId}`);
}

export function registerPatient(patient: PatientDTO) {
    return post('/patients/register', patient);
}
