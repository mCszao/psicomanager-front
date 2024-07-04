import { getSchedule } from "@/services/api" 
import BaseResponse from "@/interface/IBaseResponse"
import Session  from "@/interface/ISchedule"
import { getFormatedDateToSchedule } from "@/util/DateUtils"
import stageObjectBuilder from "@/util/stageObjectBuilder"
import metadataFactory from "@/util/metadataFactory"

export const metadata = metadataFactory("Informações da sessão");

type PageProps = {
    params : {
        id: string
    }
}

export default async function Page({ params } : PageProps){
    const { object } = await getSchedule(params.id) as BaseResponse<Session>
    const stageProps = stageObjectBuilder(object.stage);
    return (
    <main className="p-14">
        <section className="p-7 ml-32 flex flex-wrap border items-center justify-around border-l-8 border-l-royalBlue border-b-0border-t-0 border-r-0">
             <h1 className="text-7xl text-royalBlue font-semibold">
                {object.patient?.name}
            </h1>
            <div className="text-md flex gap-2 flex-wra;">
                <span className={`bg-${stageProps.color}-100 text-${stageProps.color}-800 font-medium text-center me-2 px-2.5 py-0.5 rounded dark:bg-${stageProps.color}-900 dark:text-${stageProps.color}-300`}>
                    {stageProps.ptStage}
                </span>
                <span className="bg-blue-100 text-blue-800 font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                    {getFormatedDateToSchedule(object.dateStart)}
                </span>
                <span className="bg-gray-100 text-gray-800 font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                    {getFormatedDateToSchedule(object.dateEnd)}
                </span>
            </div>

        </section>
        <div className="flex m-10 w-full">
            <section className="mt-5 max-w-full border rounded-md flex-1 flex-col shadow-lg p-5">
                <h2 className="text-2xl mt-5 font-semibold">
                    Anotações
                </h2>
                <textarea name="annotations" className="w-full p-10 text-2xl"/>
                <div className="w-full table-auto text-xl text-left mt-5">
                    <a href="#" className=" text-[#fff] bg-royalBlue py-1.5 px-3 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                        Salvar Anotação
                    </a>
                </div>
            </section>
        </div>
    </main>
    )
}