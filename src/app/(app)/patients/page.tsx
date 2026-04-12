import { getPatients } from "@/services/api";
import BaseResponse from "@/interface/IBaseResponse";
import { PatientResume } from "@/interface/IPatientResume";
import metadataFactory from "@/util/metadataFactory";
import FilterPatientList from "@/components/filter-patient-list";

export const metadata = metadataFactory("Lista de pacientes");

export default async function Page(){
    let response = await getPatients() as BaseResponse<PatientResume[]>;
    return (
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden">
            <div className="shrink-0 mb-5">
                <h2 className="text-3xl font-semibold text-royalBlue">Pacientes</h2>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
                <FilterPatientList data={response}/>
            </div>
        </div>
    )
}
