export type StageEnum = 'CONCLUDED' | 'OPENED' | 'CANCELLED' | 'RESCHEDULED' | 'ABSENT';

export type AttendanceTypeEnum = 'PRESENTIAL' | 'REMOTE';

type ScheduleDTO = {
    patientId: string;
    dateStart: string;
    dateEnd?: string | null;
    stage?: StageEnum;
    type?: AttendanceTypeEnum;
}

export default ScheduleDTO;
