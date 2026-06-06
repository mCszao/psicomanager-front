import NextSessions from "@/components/next-sessions";
import Greeting from "@/components/greeting";
import metadataFactory from "@/util/metadataFactory";
import { serverGet } from "@/services/api/http-server";
import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";
import { IOrganization } from "@/interface/IOrganization";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = metadataFactory("Página Inicial");
export const dynamic = 'force-dynamic';

export default async function Home() {
    // Lê o username do cookie setado no login
    const cookieStore = cookies();
    const username = cookieStore.get('username')?.value ?? 'usuário';
    // Verifica se o usuário tem organização — redireciona no servidor,
    // sem depender do AuthGuard do cliente para esse caso.
    const orgsRes = await serverGet<BaseResponse<IOrganization[]>>('/organizations/my');
    const orgs = orgsRes?.object ?? [];
    if (!Array.isArray(orgs) || orgs.length === 0) {
        redirect('/onboarding');
    }

    const response = await serverGet<BaseResponse<Session[]>>('/schedules?order=desc');
    const sessions = Array.isArray(response?.object) ? response.object : [];

    return (
        <div className="flex flex-col h-screen px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-3 md:gap-5">
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-4 py-3 md:px-5 md:py-4">
                <Greeting username={username} />
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
