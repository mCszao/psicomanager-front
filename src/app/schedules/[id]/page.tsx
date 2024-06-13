import { fetchSchedule } from "@/app/api"
import BaseResponse from "@/interface/IBaseResponse"
import Session  from "@/interface/ISchedule"

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
    const { object } = await fetchSchedule(params.id) as BaseResponse<Session>
    return (
    <main className="p-14">
        <section className="p-7 ml-32 flex flex-wrap border items-center justify-around border-l-8 border-l-royalBlue border-b-0border-t-0 border-r-0">
             <h1 className="text-7xl text-royalBlue font-semibold">
                {object.patient?.name}
            </h1>
            <div className="text-md flex gap-2 flex-wra;">
                <span className="bg-green-100 text-green-800 font-medium text-center me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    {object.stage}
                </span>
                <span className="bg-blue-100 text-blue-800 font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                    {object.dateStart}
                </span>
                <span className="bg-gray-100 text-gray-800 font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                    {object.dateEnd}
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