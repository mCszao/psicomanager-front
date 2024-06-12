import BaseResponse from "@/interface/IBaseResponse";
import { Schedule } from "@/interface/ISchedule";
import ItemScheduleSession from "./item-schedule-session";
import fetchSchedules  from "@/app/api/consults";



export default async function NextSessions(){
      let response = await fetchSchedules() as BaseResponse<Schedule[]>;      
    return (
        <div className="flex w-full min-h-screen flex-wrap p-24 pt-10 gap-5 text-[#fff]">
            <h2 className="text-3xl font-semibold text-royalBlue">Próximas Consultas</h2>
            <section className="mb-32 mt-12  grid text-center gap-5 lg:mb-0 lg:w-full lg:max-w-7xl lg:grid-cols-4 lg:text-left">
                {response.object && response.object?.map((schedule) => (
                    <ItemScheduleSession key={schedule.id}  data={schedule}/>
                ))}
            </section>
        </div>
    );
}