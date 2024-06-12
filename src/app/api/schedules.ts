


const baseUrl = "http://localhost:8080/schedules"
const baseHeader = {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwc2ljb21hbmFnZXItYXV0aC1sb2dpbiIsInN1YiI6ImtlbHppbmhhIiwiZXhwIjoxNzE4MTcxOTE2fQ.UZqBTuU1AQerZ1WRIKbydD8SwR_tJTeboiUdKlyN1yc"}

export async function fetchSchedules(){
    let request = await fetch(baseUrl, {headers: baseHeader});
    let json = await request.json();
    return json;
}