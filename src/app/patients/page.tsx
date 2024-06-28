import { getPatients } from "@/services/api"; 
import BaseResponse from "@/interface/IBaseResponse";
import { PatientResume } from "@/interface/IPatientResume";
import { Cake } from "lucide-react";
import Link from "next/link";
import metadataFactory from "@/util/metadataFactory";
import ContainerH6 from './../../components/ui/container-h6';

export const metadata = metadataFactory("Lista de pacientes");

export default async function Page(){
    let response = await getPatients() as BaseResponse<PatientResume[]>; 
    return (
            <nav className="flex flex-col p-24 font-sans text-base font-normal gap-3 text-blue-gray-700 text-gray-700 w-full">
                {response.object && response.object?.map((patient) : any => (
                   <abbr key={patient.id} title={patient.email}>
                      <Link href={"/patients/"+patient.id} key={patient.id} role="button"
                      className="flex justify-between items-center p-5 leading-tight transition-all outline-none  text-4xl text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-gray-500 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 group bg-white hover:bg-royalBlue shadow-md  rounded-xl bg-clip-border ">
                      <ContainerH6>
                        {patient.name}
                      </ContainerH6>
                      <ContainerH6>
                          <Cake/> 
                          {patient.birthdayDate} 
                      </ContainerH6>
                    </Link>
                   </abbr>
                ))}     
        </nav>
    )
}