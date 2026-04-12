import { PatientResume } from "./IPatientResume";
import { StageEnum, AttendanceTypeEnum } from "../types/schedule.dto";

export default interface Schedule {
    id: string;
    dateStart: string;
    dateEnd: string;
    annotations?: string;
    stage: StageEnum;
    type: AttendanceTypeEnum;
    patient: PatientResume;
}
