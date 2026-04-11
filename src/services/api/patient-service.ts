import PatientDTO from "@/types/patient.dto";
import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import { PatientResume } from "@/interface/IPatientResume";
import { parseResponse } from "./http";

const baseUrl = "http://localhost:8080/patients"

export async function getPatients(): Promise<BaseResponse<PatientResume[]>>{
    const response = await fetch(baseUrl+"/resume");
    return parseResponse<BaseResponse<PatientResume[]>>(response);
}

export async function getPatient(patientId:string): Promise<BaseResponse<Patient>>{
    const response = await fetch(baseUrl+"/"+patientId);
    return parseResponse<BaseResponse<Patient>>(response);
}

export async function registerPatient(patient: PatientDTO){
    const response = await fetch(baseUrl+"/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(patient)
    });
    return parseResponse(response);
}
