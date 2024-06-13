const baseUrl = "http://localhost:8080/patients"

export async function fetchPatients(){
    let response = await fetch(baseUrl);
    let json = await response.json();
    return json;
}

export async function fetchPatient(patientId:string){
    let response = await fetch(baseUrl+"/"+patientId);
    let json = await response.json();
    return json;    
}