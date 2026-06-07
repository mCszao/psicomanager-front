import BaseResponse from "@/interface/IBaseResponse";
import {PatientResume} from "@/interface/IPatientResume";
import metadataFactory from "@/util/metadataFactory";
import FilterPatientList from "@/components/filter-patient-list";
import HelpButton from "@/components/ui/help-button";
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
            <HelpButton title="Como usar a lista de pacientes">
                <div className="flex flex-col gap-4">
                    <p>
                        Aqui ficam <strong className="font-semibold text-content-primary">todos os seus pacientes cadastrados</strong>.
                        A partir desta tela você acessa os detalhes e o prontuário de cada um.
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-content-primary">Como usar</p>
                        <ul className="flex flex-col gap-1.5 list-disc list-inside">
                            <li>Use a <strong className="font-semibold text-content-primary">busca</strong> no topo para filtrar pelo nome.</li>
                            <li>Clique em um paciente para abrir seus <strong className="font-semibold text-content-primary">detalhes e prontuário</strong>.</li>
                            <li>Cada item mostra o e-mail e a data de nascimento do paciente.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-content-primary">Dica</p>
                        <p>Para cadastrar um novo paciente, use a opção de adicionar na barra lateral.</p>
                    </div>
                </div>
            </HelpButton>
        </div>
    );
}
