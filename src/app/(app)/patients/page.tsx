import BaseResponse from "@/interface/IBaseResponse";
import {PatientResume} from "@/interface/IPatientResume";
import metadataFactory from "@/util/metadataFactory";
import FilterPatientList from "@/components/filter-patient-list";
import {serverGet} from "@/services/api/http-server";

export const metadata = metadataFactory("Lista de pacientes");

export default async function Page() {
    const response = await serverGet<BaseResponse<PatientResume[]>>('/patients/resume');

    return (
        <div className="flex flex-col h-screen px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-3 md:gap-5">
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-4 py-3 md:px-5 md:py-4">
                <h2 className="text-xl md:text-3xl font-semibold text-royalBlue">Pacientes</h2>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-border-default shadow-lg bg-surface-default p-4 md:p-5">
                <FilterPatientList data={response}/>
            </div>
        </div>
    );
}
