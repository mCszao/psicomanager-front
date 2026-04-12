import { getPatients } from "@/services/api";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import BaseResponse from "@/interface/IBaseResponse";
import { X } from "lucide-react";
import { PatientResume } from "@/interface/IPatientResume";
import { useEffect, useState, useContext } from "react";
import { PatientSelectedContext } from "@/contexts/PatientSelectedContext";
import { useFilter } from "@/hooks/useFilter";

type Props = {
    externalFunc: () => void;
}

const patientItemClass = "p-4 block leading-tight transition-all outline-none text-xl text-start rounded-xl cursor-pointer text-content-primary bg-surface-raised border border-border-default hover:bg-royalBlue hover:text-white hover:border-royalBlue shadow-sm";

export default function DialogPatientList({ externalFunc }: Props) {
    const [patients, setPatients] = useState<PatientResume[] | null>(null);
    const [search, setSearch]     = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const { object } = await getPatients() as BaseResponse<PatientResume[]>;
            setPatients(object);
        }
        fetchData();
    }, []);

    const patientSelectedContext = useContext(PatientSelectedContext);
    const filteredPatients       = useFilter(search, patients, 'name');
    const list                   = search.length === 0 ? patients : filteredPatients;

    function selectPatient(patient: PatientResume) {
        patientSelectedContext?.setPatient(patient);
        externalFunc();
    }

    return (
        <Dialog>
            <DialogHeader title="Pesquisar paciente" textButton={<X />} functionButton={externalFunc} />
            <div className="p-4">
                <Input placeholder="Digite o nome do paciente" onChange={(e) => setSearch(e.target.value)} />
                <nav className="mt-3 flex flex-col gap-2">
                    {list?.map((patient) => (
                        <abbr key={patient.id} title={patient.email}>
                            <div onClick={() => selectPatient(patient)} className={patientItemClass}>
                                {patient.name}
                            </div>
                        </abbr>
                    ))}
                </nav>
            </div>
        </Dialog>
    )
}
