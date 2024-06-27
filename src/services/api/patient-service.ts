import PatientDTO from "@/app/types/patient.dto";

const baseUrl = "http://localhost:8080/patients"

export async function getPatients(){
    let response = await fetch(baseUrl+"/resume");
    let json = await response.json();
    return json;
}

export async function getPatient(patientId:string){
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