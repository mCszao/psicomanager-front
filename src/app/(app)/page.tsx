import NextSessions from "@/components/next-sessions";
import Greeting from "@/components/greeting";
import metadataFactory from "@/util/metadataFactory";
import { serverGet } from "@/services/api/http-server";
import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";

export const metadata = metadataFactory("Página Inicial");

export default async function Home() {
    const response = await serverGet<BaseResponse<Session[]>>('/schedules?order=desc');
    const sessions = response.object ?? [];

    return (
        <div className="flex flex-col h-screen px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-3 md:gap-5">
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-4 py-3 md:px-5 md:py-4">
                <Greeting />
            </div>
            <div className="flex-1 min-h-0 rounded-2xl border border-border-default shadow-lg bg-surface-default p-4 md:p-5 overflow-hidden flex flex-col">
                <h2 className="text-xl md:text-3xl font-semibold text-royalBlue mb-3 md:mb-5 shrink-0">Calendário de Consultas</h2>
                <div className="flex-1 min-h-0">
                    <NextSessions sessions={sessions} views={['month', 'week']} />
                </div>
            </div>
        </div>
    );
}
