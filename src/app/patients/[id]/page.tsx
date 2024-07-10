import { getPatient } from "@/services/api"; 
import BaseResponse from "@/interface/IBaseResponse";
import Patient from "@/interface/IPatient";
import metadataFactory from "@/util/metadataFactory";

export const metadata = metadataFactory("Prontuário");

type PageProps = {
    params : {
        id: string
    }
}
const tableItems = [
    {
        name: "Solo learn app",
        date: "Oct 9, 2023",
        status: "Active",
    },
    {
        name: "Window wrapper",
        date: "Oct 12, 2023",
        status: "Active",
    },
    {
        name: "Unity loroin",
        date: "Oct 22, 2023",
        status: "Archived",
    },
    {
        name: "Background remover",
        date: "Jan 5, 2023",
        status: "Active",
    },
    {
        name: "Colon tiger",
        date: "Jan 6, 2023",
        status: "Active",
    },
] 

export default async function Page({ params } : PageProps){
    const {success, object} = await getPatient(params.id) as BaseResponse<Patient>;
    
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
                <a target="_blank" href={`http://localhost:8080/documents/generate-contract?patientId=${object.id}`} className=" text-[#fff] bg-royalBlue py-1.5 px-3 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                    Gerar contrato
                </a>
        </div>    
            </div>

        </section>
        <div className="flex m-10 ">
            <section className="mt-5 max-w-[95vw] border rounded-md flex-1 flex-col shadow-lg p-5">
                <h2 className="text-2xl mt-5 font-semibold">
                    Acompanhamentos
                </h2>
                {tableItems.map((item, index) => (
                    <div key={index} className="border border-royalBlue bg hover:bg-royalBlue hover:text-white rounded-md mt-2 p-2 cursor-pointer">
                        <p className="m-1 max-w-[30ch] text-sm opacity-50">
                            Data: {item.date}
                        </p>
                        <p className="m-1 max-w-[30ch] text-sm opacity-50">
                            Status: {item.status}
                        </p>
                    </div>
                ) )}
                
            </section>
            <section className="mt-5 ml-5 max-w-[95vw] flex-1 shadow-lg p-5 border rounded-md ">
                <h2 className="text-2xl mt-5 font-semibold">
                Documentos
                </h2>
                <p className="m-1 max-w-[30ch] text-sm opacity-50">
                    Email: marc.khk11@gmail.com
                </p>
                <p className="m-1 max-w-[30ch] text-sm opacity-50">
                    Telefone: 65 99222-4696
                </p>
                <p className="m-1 max-w-[30ch] text-sm opacity-50">
                    Data de Nascimento: 24/01/2001
                </p>
                
            </section>
            
        </div>
    </main>
    )
}