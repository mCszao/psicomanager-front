import Link from "next/link";

interface BaseResponse {
    sucess: boolean;
    object: Schedule[];
}

interface Schedule {
    id: string;
    dateStart: string;
    stage: String;
    patient: PatientResume;
}

interface PatientResume {
    id: string;
    name: string;
    phone: string;
}

export default async function NextSessions(){
    const request = await fetch('http://localhost:8080/schedules', {
        headers: {Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwc2ljb21hbmFnZXItYXV0aC1sb2dpbiIsInN1YiI6ImtlbHppbmhhIiwiZXhwIjoxNzE4MDgyNjc2fQ.CXUS5bv_bQsDxDm9XgWCDAg1C3dJCGuUJUwrwWqKMJc"}
      })
      let {object} =  await request.json() as BaseResponse;
    return (
        <div>
            <h2 className="text-3xl font-semibold text-royalBlue">Próximas Consultas</h2>
            {object && object?.map((schedule): any => (
                 <section key={schedule.id} className="mb-32 grid text-center gap-5 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                    <Link
                    href={schedule.id}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-royalBlue hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <h2 className="mb-3 text-2xl font-semibold">
                        {schedule.patient.name}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        {/* 24/05/2024 - Sexta Feira, 19h */}
                        {schedule.dateStart}
                    </p>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        {schedule.stage}
                    </p>
                    </Link>
                 </section>
            ))}
        </div>
    );
}