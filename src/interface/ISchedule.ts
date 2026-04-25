import { PatientResume } from "./IPatientResume";
import { StageEnum, AttendanceTypeEnum } from "../types/schedule.dto";

export interface ScheduleRescheduledTo {
    id: string;
    dateStart: string;
    dateEnd: string;
}

export default interface Schedule {
    id: string;
    dateStart: string;
    dateEnd: string;
    annotations?: string;
    stage: StageEnum;
    type: AttendanceTypeEnum;
    patient: PatientResume;
    rescheduledTo?: ScheduleRescheduledTo | null;
    plan?: { id: string; title?: string | null } | null;
    sessionValue?: number | null;
}
