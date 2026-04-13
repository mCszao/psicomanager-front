'use client';

import BaseResponse from "@/interface/IBaseResponse";
import {PatientResume} from "@/interface/IPatientResume";
import Link from "next/link";
import {Cake, Mail, UserX} from "lucide-react";
import {useState} from "react";
import {useFilter} from "@/hooks/useFilter";

type Props = {
    data: BaseResponse<PatientResume[]>
}

export default function FilterPatientList({data}: Props) {
    const [search, setSearch] = useState<string>('');
    const filteredPatients = useFilter(search, data?.object, 'name');
    const list = search.length > 0 ? filteredPatients : data.object;

    const isEmpty = !data?.object || data.object.length === 0;
    const noSearchResult = !isEmpty && search.length > 0 && filteredPatients.length === 0;

    return (
        <div className="flex flex-col gap-3 w-full h-full">
            <input
                type="text"
                className="shrink-0 bg-surface-sunken border border-border-default text-content-primary placeholder:text-content-disabled text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue block w-full p-2.5"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite o nome do paciente"
            />

            <div className="flex-1 overflow-y-auto pr-1">
                {isEmpty && (
                    <div className="flex flex-col items-center justify-center gap-3 py-20 text-content-secondary">
                        <UserX size={48} strokeWidth={1.5}/>
                        <p className="text-base font-medium">Nenhum paciente cadastrado.</p>
                        <p className="text-sm">Adicione um paciente para começar.</p>
                    </div>
                )}

                {noSearchResult && (
                    <div className="flex flex-col items-center justify-center gap-3 py-20 text-content-secondary">
                        <UserX size={48} strokeWidth={1.5}/>
                        <p className="text-base font-medium">Nenhum paciente encontrado para &quot;{search}&quot;.</p>
                    </div>
                )}

                {!isEmpty && !noSearchResult && (
                    <ul className="flex flex-col gap-2">
                        {list?.map((patient: PatientResume) => (
                            <li key={patient.id}>
                                <Link
                                    href={"/patients/" + patient.id}
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors bg-surface-raised hover:bg-surface-hover border border-border-default"
                                >
                                    <p className="flex-1 font-semibold text-sm text-content-primary truncate min-w-0">
                                        {patient.name}
                                    </p>

                                    {patient.email && (
                                        <span
                                            className="hidden sm:flex items-center gap-1.5 text-xs text-content-secondary shrink-0">
                                            <Mail size={13} strokeWidth={1.75}/>
                                            {patient.email}
                                        </span>
                                    )}

                                    <span
                                        className="flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 bg-blue-100 text-blue-700 border-blue-200">
                                        <Cake size={12} strokeWidth={1.75}/>
                                        {patient.birthdayDate ?? 'Não informado'}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
