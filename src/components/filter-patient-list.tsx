'use client';

import BaseResponse from "@/interface/IBaseResponse";
import ContainerH6 from "./ui/container-h6";
import { PatientResume } from "@/interface/IPatientResume";
import Link from "next/link";
import { Cake, UserX } from "lucide-react";
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";

type Props = {
    data: BaseResponse<PatientResume[]>
}

const patientLinkClass = "flex justify-between items-center p-5 leading-tight transition-all outline-none text-4xl text-start group bg-surface-raised hover:bg-royalBlue shadow-md rounded-xl bg-clip-border border border-border-default";

export default function FilterPatientList({ data }: Props) {
    const [search, setSearch] = useState<string>('');
    const filteredPatients = useFilter(search, data?.object, 'name');
    const list = search.length > 0 ? filteredPatients : data.object;

    const isEmpty        = !data?.object || data.object.length === 0;
    const noSearchResult = !isEmpty && search.length > 0 && filteredPatients.length === 0;

    return (
        <nav className="flex flex-col px-0 font-sans text-base font-normal gap-3 text-content-primary w-full">
            <input
                type="text"
                className="bg-surface-sunken border border-border-default text-content-primary placeholder:text-content-disabled text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue block w-full p-2.5"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite o nome do paciente"
            />

            {isEmpty && (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-content-secondary">
                    <UserX size={48} strokeWidth={1.5} />
                    <p className="text-base font-medium">Nenhum paciente cadastrado.</p>
                    <p className="text-sm">Adicione um paciente para começar.</p>
                </div>
            )}

            {noSearchResult && (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-content-secondary">
                    <UserX size={48} strokeWidth={1.5} />
                    <p className="text-base font-medium">Nenhum paciente encontrado para &quot;{search}&quot;.</p>
                </div>
            )}

            {!isEmpty && !noSearchResult && list?.map((patient: any) => (
                <abbr key={patient.id} title={patient.email}>
                    <Link href={"/patients/" + patient.id} role="button" className={patientLinkClass}>
                        <ContainerH6>{patient.name}</ContainerH6>
                        <ContainerH6>
                            <Cake />
                            {patient.birthdayDate ?? 'Não informado'}
                        </ContainerH6>
                    </Link>
                </abbr>
            ))}
        </nav>
    )
}
