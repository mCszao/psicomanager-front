'use client';

import { X } from "lucide-react";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import Input from "./ui/input";
import { PatientResume } from "@/interface/IPatientResume";
import { usePatientList } from "@/hooks/usePatientList";

type Props = {
    onSelect: (patient: PatientResume) => void;
    externalFunc: () => void;
}

const patientItemClass = "p-4 block leading-tight transition-all outline-none text-xl text-start rounded-xl cursor-pointer text-content-primary bg-surface-raised border border-border-default hover:bg-royalBlue hover:text-white hover:border-royalBlue shadow-sm";

export default function DialogPatientList({ onSelect, externalFunc }: Props) {
    const { list, setSearch, selectPatient } = usePatientList({ onSelect, onClose: externalFunc });

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
    );
}
