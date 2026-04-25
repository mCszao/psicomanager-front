import { FrequencyEnum } from "./plan.dto";

export type StageEnum = 'CONCLUDED' | 'OPENED' | 'CANCELLED' | 'RESCHEDULED' | 'ABSENT';

export type AttendanceTypeEnum = 'PRESENTIAL' | 'REMOTE';

type ScheduleDTO = {
    patientId: string;
    dateStart: string;
    dateEnd?: string | null;
    stage?: StageEnum;
    type?: AttendanceTypeEnum;
    planId?: string;
    frequency?: FrequencyEnum;
    sessionsCount?: number;
};

export default ScheduleDTO;
