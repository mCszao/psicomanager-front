import ScheduleDTO from "@/types/schedule.dto";
import { getFormatDates } from "./DateUtils";

export default function ScheduleFactory(data: ScheduleDTO, patientId: string | undefined) {
  const { dateStart, dateEnd } = getFormatDates(data);  
  let newObject = {} as any;
  newObject.patientId = patientId ?? data.patientId;
  newObject.dateStart = dateStart;
  if(data.dateEnd != null) newObject.dateEnd = dateEnd

  return newObject;
}