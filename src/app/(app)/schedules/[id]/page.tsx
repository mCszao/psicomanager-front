import BaseResponse from "@/interface/IBaseResponse";
import metadataFactory from "@/util/metadataFactory";
import {serverGet} from "@/services/api/http-server";
import {
    formatTime,
    getStagePresentation,
    getTypePresentation,
    MONTHS,
    parseDate,
    STAGE_STYLES,
    TYPE_STYLES
} from "@/util/calendarUtils";
import {Clock} from "lucide-react";
import Link from "next/link";
import SessionActions from "@/components/session-actions";
import AnnotationsPanel from "@/components/annotations-panel";
import AlertsPanel from "@/components/alerts-panel";
import {IAlert} from "@/interface/IAlert";

export const metadata = metadataFactory("Informações da sessão");
export const dynamic = 'force-dynamic';

type PageProps = {
    params: { id: string }
}

export default async function Page({params}: PageProps) {
    const {object} = await serverGet<BaseResponse<any>>(`/schedules/${params.id}`);
    const alertsRes = await serverGet<BaseResponse<IAlert[]>>(`/alerts/session/${params.id}`);
    const sessionAlerts = alertsRes.object ?? [];
    const {ptStage, color} = getStagePresentation(object.stage);
    const {ptType, color: typeColor} = getTypePresentation(object.type);

    const start = parseDate(object.dateStart);
    const end = object.dateEnd ? parseDate(object.dateEnd) : null;
    const fullDate = `${start.getDate()} de ${MONTHS[start.getMonth()]} de ${start.getFullYear()}`;
    const timeRange = end
        ? `${formatTime(start)} – ${formatTime(end)}`
        : formatTime(start);

    return (
        <div className="flex flex-col h-screen px-4 pt-4 pb-2 md:px-8 md:pt-8 md:pb-6 overflow-hidden gap-3 md:gap-5">

            {/* Header */}
            <div className="shrink-0 rounded-2xl border border-border-default shadow-lg bg-surface-default px-4 py-3 md:px-5 md:py-4">
                <div className="border-l-4 border-royalBlue pl-3 md:pl-4">
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                        <Link
                            href={`/patients/${object.patient?.id}`}
                            className="text-xl md:text-3xl font-bold text-royalBlue hover:underline leading-tight"
                        >
                            {object.patient?.name}
                        </Link>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${TYPE_STYLES[typeColor]}`}>
                            {ptType}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${STAGE_STYLES[color ?? 'yellow']}`}>
                            {ptStage}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 mt-1 md:mt-2 text-sm text-content-secondary flex-wrap">
                        <span className="capitalize">{fullDate}</span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} className="shrink-0"/>
                            {timeRange}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body — coluna única em mobile, duas colunas em desktop */}
            <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-3 md:gap-5 overflow-y-auto md:overflow-hidden">

                {/* Annotations — cresce em desktop, altura automática em mobile */}
                <div className="md:flex-1 md:min-h-0 min-h-64">
                    <AnnotationsPanel
                        scheduleId={object.id}
                        initialAnnotations={object.annotations ?? null}
                    />
                </div>

                {/* Coluna lateral — linha abaixo em mobile, coluna fixa em desktop */}
                <div className="w-full md:w-72 md:shrink-0 flex flex-col gap-3 md:gap-5 md:min-h-0 md:overflow-y-auto">

                    {/* Details */}
                    <div className="rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden shrink-0">
                        <div className="px-4 py-3 md:px-5 md:py-4 border-b border-border-default bg-surface-raised">
                            <h2 className="text-base font-semibold text-content-primary">Detalhes</h2>
                        </div>
                        <div className="p-4 flex flex-col gap-3 text-sm">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-content-secondary shrink-0">Paciente</span>
                                <Link
                                    href={`/patients/${object.patient?.id}`}
                                    className="text-royalBlue hover:underline font-medium truncate"
                                >
                                    {object.patient?.name}
                                </Link>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-content-secondary shrink-0">Modalidade</span>
                                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${TYPE_STYLES[typeColor]}`}>
                                    {ptType}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-content-secondary shrink-0">Status</span>
                                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${STAGE_STYLES[color ?? 'yellow']}`}>
                                    {ptStage}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-content-secondary shrink-0">Data</span>
                                <span className="text-content-primary font-medium capitalize">{fullDate}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-content-secondary shrink-0">Horário</span>
                                <span className="text-content-primary font-medium">{timeRange}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <SessionActions
                        scheduleId={object.id}
                        stage={object.stage as string}
                        dateEnd={object.dateEnd}
                        rescheduledTo={object.rescheduledTo}
                    />

                    {/* Alerts */}
                    <div className="rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden shrink-0">
                        <div className="px-4 py-3 md:px-5 border-b border-border-default bg-surface-raised flex items-center gap-2">
                            <span className="text-sm font-semibold text-content-primary">Avisos</span>
                            {sessionAlerts.filter(a => a.isActive).length > 0 && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium border border-amber-200">
                                    {sessionAlerts.filter(a => a.isActive).length}
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <AlertsPanel
                                initialAlerts={sessionAlerts}
                                patientId={object.patient?.id}
                                sessionId={object.id}
                                scope="SESSION"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
