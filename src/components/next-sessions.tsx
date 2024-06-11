import BaseResponse from "@/interface/IBaseResponse";
import { Schedule } from "@/interface/ISchedule";
import ItemScheduleSession from "./item-schedule-session";

export default async function NextSessions(){
    const request = await fetch('http://localhost:8080/schedules', {
        headers: {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwc2ljb21hbmFnZXItYXV0aC1sb2dpbiIsInN1YiI6ImtlbHppbmhhIiwiZXhwIjoxNzE4MTMyNTgxfQ.WI-hwsT50fZ8Gq6qI1VbyyXGe2nkpLb8QGa1i7a--Nk"}
      })
      let {object} =  await request.json() as BaseResponse<Schedule[]>;
    return (
        <div>
            <h2 className="text-3xl font-semibold text-royalBlue">Próximas Consultas</h2>
            {object && object?.map(schedule => (
                 <ItemScheduleSession key={schedule.id}  data={schedule}/>
            ))}
        </div>
    );
}