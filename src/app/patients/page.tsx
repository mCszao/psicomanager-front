import { fetchPatients } from "@/app/api/index";
import BaseResponse from "@/interface/IBaseResponse";
import { PatientResume } from "@/interface/IPatientResume";
import { Cake } from "lucide-react";
import Link from "next/link";
export default async function Page(){
    let response = await fetchPatients() as BaseResponse<{}>; 
    return (
            <nav className="flex flex-col p-24 font-sans text-base font-normal gap-3 text-blue-gray-700 text-gray-700 w-full">
                {response.object && response.object?.map((patient) : any => (
                   <Link href={"/patients/"+patient.id} key={patient.id} role="button"
                     className="flex justify-between items-center p-5 leading-tight transition-all outline-none  text-4xl text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-gray-500 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 group bg-white hover:bg-royalBlue shadow-md  rounded-xl bg-clip-border ">
                     <div>
                       <h6
                         className="block font-sans text-center antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 group-hover:text-white">
                         {patient.name}
                       </h6>
                     </div>
                     <div className="hidden sm:block">
                       <h6
                         className="font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 group-hover:text-white flex gap-5 items-center">
                         <Cake/> {patient.birthdayDate}
                       </h6>
                     </div>
                   </Link>
                ))}     
        </nav>
    )
}