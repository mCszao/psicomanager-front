import ScheduleDTO from "@/types/schedule.dto";

const baseUrl = "http://localhost:8080/schedules";

export async function getSchedules(){
    let response = await fetch(baseUrl+"?order=desc");
    let json = await response.json();
    
    return json;
}

export async function getSchedule(scheduleId: string){
    let response = await fetch(baseUrl+"/"+scheduleId);
    let json = await response.json();

    return json;
}

export async function registerSchedule(schedule: ScheduleDTO){
    let response = await fetch(baseUrl+"/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},  
        body: JSON.stringify(schedule)
    })

    return response.json();
}