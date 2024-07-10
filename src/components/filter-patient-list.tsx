'use client';

import BaseResponse from "@/interface/IBaseResponse";
import ContainerH6 from "./ui/container-h6";
import { PatientResume } from "@/interface/IPatientResume";
import Link from "next/link";
import { Cake } from "lucide-react";
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";
type Props = {
    data : BaseResponse<PatientResume[]>
}
export default function FilterPatientList({ data }: Props) {
    const [search, setSearch] = useState<string>('');
    const filteredPatients = useFilter(search, data?.object, 'name');
    
    return (
        <nav className="flex flex-col p-24 font-sans text-base font-normal gap-3 text-blue-gray-700 text-gray-700 w-full">
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onChange={(e) => setSearch(e.target.value)} placeholder="Digite o nome do paciente"/> 
                  {search.length > 0 ? filteredPatients?.map((patient) : any => (
                    <abbr key={patient.id} title={patient.email}>
                      <Link href={"/patients/"+patient.id} key={patient.id} role="button"
                      className="flex justify-between items-center p-5 leading-tight transition-all outline-none  text-4xl text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-gray-500 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 group bg-white hover:bg-royalBlue shadow-md  rounded-xl bg-clip-border ">
                        <ContainerH6>
                          {patient.name}
                        </ContainerH6>
                        <ContainerH6>
                          <Cake/> 
                          {patient.birthdayDate ?? 'Não informado'} 
                        </ContainerH6>
                      </Link>
                    </abbr>
                  )) 
                  :
                    data.object?.map((patient) : any => (
                    <abbr key={patient.id} title={patient.email}>
                      <Link href={"/patients/"+patient.id} key={patient.id} role="button"
                      className="flex justify-between items-center p-5 leading-tight transition-all outline-none  text-4xl text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-gray-500 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 group bg-white hover:bg-royalBlue shadow-md  rounded-xl bg-clip-border ">
                        <ContainerH6>
                          {patient.name}
                        </ContainerH6>
                        <ContainerH6>
                          <Cake/> 
                          {patient.birthdayDate ?? 'Não informado'} 
                        </ContainerH6>
                      </Link>
                    </abbr>
                  ))}     
        </nav>
    )
}