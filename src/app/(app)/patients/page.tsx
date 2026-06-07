import BaseResponse from "@/interface/IBaseResponse";
import {PatientResume} from "@/interface/IPatientResume";
import metadataFactory from "@/util/metadataFactory";
import FilterPatientList from "@/components/filter-patient-list";
import {serverGet} from "@/services/api/http-server";

export const metadata = metadataFactory("Lista de pacientes");

export default async function Page() {
    const response = await serverGet<BaseResponse<PatientResume[]>>('/patients/resume');

    return (
        <div className="flex flex-col h-full px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-4">
            <div className="shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-content-primary">Pacientes</h1>
                <p className="text-sm text-content-secondary mt-1">Gerencie seus pacientes e cadastros</p>
            </div>
            <div className="flex-1 min-h-0">
                <FilterPatientList data={response}/>
            </div>
        </div>
    );
}
