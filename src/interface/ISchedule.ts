import { PatientResume } from "./IPatientResume";
export interface Schedule {
    id: string;
    dateStart: string;
    stage: String;
    patient: PatientResume;
}