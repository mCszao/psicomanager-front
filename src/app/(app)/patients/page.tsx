import { getPatients } from "@/services/api";
import BaseResponse from "@/interface/IBaseResponse";
import { PatientResume } from "@/interface/IPatientResume";
import metadataFactory from "@/util/metadataFactory";
import FilterPatientList from "@/components/filter-patient-list";

export const metadata = metadataFactory("Lista de pacientes");

export default async function Page(){
    let response = await getPatients() as BaseResponse<PatientResume[]>;
    return (
        <>
            <FilterPatientList data={response}/>
        </>
    )
}
