import PatientDTO from "@/types/patient.dto";
import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import { PatientResume } from "@/interface/IPatientResume";

const baseUrl = "http://localhost:8080/patients"

export async function getPatients(): Promise<BaseResponse<PatientResume[]>>{
    let response = await fetch(baseUrl+"/resume");
    let json = await response.json();
    return json;
}

export async function getPatient(patientId:string): Promise<BaseResponse<Patient>>{
    let response = await fetch(baseUrl+"/"+patientId);
    let json = await response.json();
    return json;    
}

export async function registerPatient(patient: PatientDTO){
    let response = await fetch(baseUrl+"/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},  
        body: JSON.stringify(patient)
    })
    return response.json();
}