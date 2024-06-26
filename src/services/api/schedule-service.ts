const baseUrl = "http://localhost:8080/schedules";

export async function getSchedules(){
    let response = await fetch(baseUrl);
    let json = await response.json();
    
    return json;
}

export async function getSchedule(scheduleId: string){
    let response = await fetch(baseUrl+"/"+scheduleId);
    let json = await response.json();

    return json;
}