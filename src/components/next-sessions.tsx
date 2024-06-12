import BaseResponse from "@/interface/IBaseResponse";
import { Schedule } from "@/interface/ISchedule";
import ItemScheduleSession from "./item-schedule-session";
import {fetchSchedules} from "@/app/api/index";


export default async function NextSessions(){
      const response = await fetchSchedules() as BaseResponse<Schedule[]>;      
    return (
        <div>
            <h2 className="text-3xl font-semibold text-royalBlue">Próximas Consultas</h2>
            {response.object && response.object?.map(schedule => (
                 <ItemScheduleSession key={schedule.id}  data={schedule}/>
            ))}
        </div>
    );
}