import NextSessions from "@/components/next-sessions";
import HelpButton from "@/components/ui/help-button";
import metadataFactory from "@/util/metadataFactory";
import {serverGet} from "@/services/api/http-server";
import BaseResponse from "@/interface/IBaseResponse";
import Session from "@/interface/ISchedule";

export const metadata = metadataFactory("Agendamentos");

export default async function SchedulesPage() {
    const response = await serverGet<BaseResponse<Session[]>>('/schedules?order=desc');
    const sessions = Array.isArray(response.object) ? response.object : [];

    return (
        <div className="flex flex-col h-full px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-4">
            <div className="shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-content-primary">Agendamentos</h1>
                <p className="text-sm text-content-secondary mt-1">Acompanhe e gerencie suas sessões</p>
            </div>
            <div className="flex-1 min-h-0 rounded-2xl border border-border-default shadow-lg bg-surface-default p-4 md:p-5 overflow-y-auto">
                <NextSessions sessions={sessions} views={['list']}/>
            </div>
            <HelpButton title="Como usar os agendamentos">
                <div className="flex flex-col gap-4">
                    <p>
                        Esta tela lista as suas <strong className="font-semibold text-content-primary">sessões</strong>,
                        das mais recentes para as mais antigas, com o status de cada uma.
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-content-primary">Como usar</p>
                        <ul className="flex flex-col gap-1.5 list-disc list-inside">
                            <li>Clique em uma sessão para ver os <strong className="font-semibold text-content-primary">detalhes</strong> e as ações disponíveis.</li>
                            <li>Em sessões abertas você pode <strong className="font-semibold text-content-primary">concluir</strong>, <strong className="font-semibold text-content-primary">cancelar</strong>, <strong className="font-semibold text-content-primary">marcar falta</strong> ou <strong className="font-semibold text-content-primary">reagendar</strong>.</li>
                            <li>A etiqueta colorida indica o status da sessão (aberta, concluída, cancelada, falta, reagendada).</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-content-primary">Dica</p>
                        <p>Para criar uma nova sessão, use a opção de adicionar na barra lateral.</p>
                    </div>
                </div>
            </HelpButton>
        </div>
    );
}
