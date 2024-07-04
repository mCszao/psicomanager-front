import ScheduleDTO from "@/app/types/schedule.dto";
import { getFormattSchedule } from "./DateUtils";

export default function ScheduleFactory(data: ScheduleDTO, patientId: string | undefined) {
  const { dateStart, dateEnd } = getFormattDates(data);  
  let newObject = {} as any;
  newObject.patientId = patientId ?? data.patientId;
  newObject.dateStart = dateStart;
  if(data.dateEnd != null) newObject.dateEnd = dateEnd

  return newObject;
}