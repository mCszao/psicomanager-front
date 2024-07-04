import { getPatients } from "@/services/api"; 
import BaseResponse from "@/interface/IBaseResponse";
import { PatientResume } from "@/interface/IPatientResume";
import { Cake } from "lucide-react";
import Link from "next/link";
import metadataFactory from "@/util/metadataFactory";
import ContainerH6 from './../../components/ui/container-h6';
import FilterPatientList from "@/components/filter-patient-list";

export const metadata = metadataFactory("Lista de pacientes");

export default async function Page(){
    let response = await getPatients() as BaseResponse<PatientResume[]>; 
    return (
              <>
                <FilterPatientList data={response}/>
              </>
           
            )
}