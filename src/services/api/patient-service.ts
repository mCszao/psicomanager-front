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