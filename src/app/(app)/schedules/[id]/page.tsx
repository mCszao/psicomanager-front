import { getSchedule } from "@/services/api";
import BaseResponse from "@/interface/IBaseResponse";
import Schedule from "@/interface/ISchedule";
import metadataFactory from "@/util/metadataFactory";
import stageObjectBuilder from "@/util/stageObjectBuilder";
import attendanceTypeObjectBuilder from "@/util/attendanceTypeObjectBuilder";
import { parseDate, formatTime, STAGE_STYLES, TYPE_STYLES, MONTHS } from "@/util/calendarUtils";
import { FileText, Clock } from "lucide-react";
import Link from "next/link";
import SessionActions from "@/components/session-actions";

export const metadata = metadataFactory("Informações da sessão");

type PageProps = {
    params: { id: string }
}

export default async function Page({ params }: PageProps) {
    const { object } = await getSchedule(params.id) as BaseResponse<Schedule>;
    const { ptStage, color } = stageObjectBuilder(object.stage);
    const { ptType, color: typeColor } = attendanceTypeObjectBuilder(object.type);

    const start    = parseDate(object.dateStart);
    const end      = object.dateEnd ? parseDate(object.dateEnd) : null;
    const fullDate = `${start.getDate()} de ${MONTHS[start.getMonth()]} de ${start.getFullYear()}`;
    const timeRange = end
        ? `${formatTime(start)} – ${formatTime(end)}`
        : formatTime(start);

    return (
        <div className="flex flex-col h-screen px-8 pt-8 pb-6 overflow-hidden">

            {/* Header */}
            <div className="shrink-0 mb-6 flex items-start justify-between gap-6 pb-6 border-b border-border-default">
                <div className="border-l-4 border-royalBlue pl-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <Link
                            href={`/patients/${object.patient?.id}`}
                            className="text-3xl font-bold text-royalBlue hover:underline leading-tight"
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
                    <div className="flex items-center gap-4 mt-2 text-sm text-content-secondary flex-wrap">
                        <span className="flex items-center gap-1.5 capitalize">
                            {fullDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} className="shrink-0" />
                            {timeRange}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 flex gap-6">

                {/* Left — Annotations */}
                <div className="flex-1 flex flex-col border border-border-default rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-content-primary">
                            <FileText size={18} /> Anotações
                        </h2>
                    </div>
                    <div className="flex-1 flex flex-col p-4 gap-3 min-h-0">
                        <textarea
                            name="annotations"
                            placeholder="Registre as anotações desta sessão…"
                            className="flex-1 resize-none bg-surface-sunken text-content-primary placeholder:text-content-disabled border border-border-default rounded-lg p-4 text-sm focus:ring-royalBlue focus:border-royalBlue outline-none"
                        />
                        <button className="self-end text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium">
                            Salvar anotação
                        </button>
                    </div>
                </div>

                {/* Right — Details + Actions */}
                <div className="w-72 shrink-0 flex flex-col gap-4 overflow-y-auto">

                    {/* Details card */}
                    <div className="border border-border-default rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-border-default bg-surface-raised shrink-0">
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
                    <SessionActions scheduleId={object.id} stage={object.stage as string} />

                </div>
            </div>
        </div>
    );
}
