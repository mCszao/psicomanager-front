import { PatientResume } from "./IPatientResume";
export default interface Schedule {
    id: string;
    dateStart: string;
    dateEnd: string
    stage: String;
    patient: PatientResume;
}