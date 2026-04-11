import ScheduleDTO from "@/types/schedule.dto";
import { parseResponse } from "./http";

const baseUrl = "http://localhost:8080/schedules";

export async function getSchedules(){
    const response = await fetch(baseUrl+"?order=desc");
    return parseResponse(response);
}

export async function getSchedule(scheduleId: string){
    const response = await fetch(baseUrl+"/"+scheduleId);
    return parseResponse(response);
}

export async function registerSchedule(schedule: ScheduleDTO){
    const response = await fetch(baseUrl+"/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(schedule)
    });
    return parseResponse(response);
}
