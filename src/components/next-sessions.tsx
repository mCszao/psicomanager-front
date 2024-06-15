import BaseResponse from "@/interface/IBaseResponse";
import Session  from "@/interface/ISchedule";
import ItemScheduleSession from "./item-schedule-session";
import {fetchSchedules}  from "@/api/consults";



export default async function NextSessions(){
      let response = await fetchSchedules() as BaseResponse<Session[]>;      
    return (
        <div className="flex w-full min-h-screen flex-wrap p-24 pt-10 gap-5 text-[#fff]">
            <section className="mb-32 mt-12  grid text-center gap-5 lg:mb-0 lg:w-full lg:max-w-7xl lg:grid-cols-4 lg:text-left">
                {response.object && response.object?.map((schedule) => (
                    <ItemScheduleSession key={schedule.id}  data={schedule}/>
                ))}
            </section>
        </div>
    );
}