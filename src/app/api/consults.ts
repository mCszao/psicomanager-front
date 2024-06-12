const baseUrl = "http://localhost:8080/schedules"
const baseHeader = {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwc2ljb21hbmFnZXItYXV0aC1sb2dpbiIsInN1YiI6ImtlbHppbmhhIiwiZXhwIjoxNzE4MTg4NzA3fQ.Pr3MwpyvDGjDTy0TP089wdLZit_pEPglX89vyE1V4M8"}

export default async function fetchSchedules(){
    let response = await fetch(baseUrl, {headers: baseHeader});
    let json = await response.json();
    
    return json;
}