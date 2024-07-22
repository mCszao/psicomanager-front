import { getPatient } from "@/services/api"; 
import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import metadataFactory from "@/util/metadataFactory";
import { Download } from "lucide-react";
import PatientScheduleList from "@/components/patient-schedule-list";
import PatientScheduleItem from "@/components/patient-schedule-item";
import PatientDocumentList from "@/components/patient-document-list";
import PatientDocumentItem from "@/components/patient-document-item";
import { compareDate } from "@/util/DateUtils";

export const metadata = metadataFactory("Prontuário");

type PageProps = {
    params : {
        id: string
    }
}

export default async function Page({ params } : PageProps){
    const {success, object} = await getPatient(params.id) as BaseResponse<Patient>;
    object?.schedules.sort((a, b) => compareDate(a,b));

    
    return (
    <main className="p-14">
        <section className="p-7 ml-32 flex flex-wrap border items-center justify-around border-l-8 border-l-royalBlue border-b-0 border-t-0 border-r-0">
             <h1 className="text-7xl text-royalBlue font-semibold">
                {object.name}
            </h1>
            <div className="">
                <div>
                    <h3>Informações Básicas</h3>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        Email: {object.email}
                    </p>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        Telefone: {object.phone}
                    </p>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        Data de Nascimento: {object.birthdayDate}
                    </p>
                </div>
                <div>
                    <h3>Endereço</h3>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        Rua: {object.address[0]?.street}
                    </p>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        Bairro: {object.address[0]?.district}
                    </p>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        CEP: {object.address[0]?.zipcode}
                    </p>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                        Complemento: {object.address[0]?.complement}
                    </p>
                    <p className="m-1 max-w-[30ch] text-sm opacity-50">
                    {object.address[0]?.city} - {object.address[0]?.abbreviation}
                    </p>
                </div>  
                <div className="w-full table-auto text-2xl text-left mt-5">
                <a href={`http://localhost:8080/documents/generate-contract?patientId=${object.id}`} className=" flex items-center gap-3 text-[#fff] bg-royalBlue py-1.5 px-3 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                    <Download /> Gerar contrato
                </a>
        </div>    
            </div>

        </section>
        <div className="flex m-10 ">
            <PatientScheduleList>
                {object.schedules === undefined || object.schedules.length === 0 ? <h2 className="flex justify-center items-center gap-3 text-xl mt-5 font-semibold">Sem acompanhamentos</h2> : object.schedules?.map((item, index) => (
                    <PatientScheduleItem key={index} schedule={item}/>
                ) )}     
            </PatientScheduleList>
            <PatientDocumentList>
                {object.documents === undefined || object.documents.length === 0 ? <h2 className="flex justify-center items-center gap-3 text-xl mt-5 font-semibold">Sem documentos</h2> : object.documents?.map((item, index) => (
                    <PatientDocumentItem key={index} document={item}/>
                ) )}
            </PatientDocumentList>
            
        </div>
    </main>
    )
}