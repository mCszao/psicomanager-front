"use client";

import {useState} from "react";
import {
    CalendarDays,
    CalendarPlus,
    CalendarX,
    ChevronDown,
    ChevronUp,
    FileX,
    FolderOpen,
    Layers,
    Loader2,
    Plus
} from "lucide-react";
import {Plan} from "@/interface/IPlan";
import Schedule from "@/interface/ISchedule";
import Document from "@/interface/IDocument";
import {ATTENDANCE_TYPE_LABEL, FREQUENCY_LABEL} from "@/types/plan.dto";
import {formatTime, getStagePresentation, parseDate, STAGE_STYLES} from "@/util/calendarUtils";
import {usePlanCard} from "@/hooks/usePlanCard";
import PatientScheduleItem from "./patient-schedule-item";
import PatientDocumentItem from "./patient-document-item";
import PatientUploadButton from "./patient-upload-button";
import CreatePlanDialog from "./create-plan-dialog";
import Link from "next/link";

type Tab = 'schedules' | 'plans' | 'documents';

interface Props {
    patientId: string;
    schedules: Schedule[];
    plans: Plan[];
    documents: Document[];
}

// region Subcomponentes

function PlanSessionRow({schedule}: { schedule: Schedule }) {
    const {ptStage, color} = getStagePresentation(schedule.stage);
    const start = parseDate(schedule.dateStart);

    return (
        <Link
            href={`/schedules/${schedule.id}`}
            className="flex items-center gap-3 px-5 py-4 bg-surface-sunken border-t border-border-default hover:bg-surface-hover transition-colors"
        >
            <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{background: color === 'green' ? '#16a34a' : color === 'blue' ? '#2563eb' : color === 'red' ? '#dc2626' : '#9ca3af'}}
            />
            <span className="text-xs text-content-primary flex-1">
                {start.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })} — {formatTime(start)}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STAGE_STYLES[color ?? 'yellow']}`}>
                {ptStage}
            </span>
        </Link>
    );
}

function PlanCard({plan, initialSchedules, patientId}: {
    plan: Plan;
    initialSchedules: Schedule[];
    patientId: string
}) {
    const {
        expanded, setExpanded,
        showLaunch, setShowLaunch,
        startDateTime, setStartDateTime,
        sessionsToLaunch, setSessionsToLaunch,
        isLaunching,
        linkedSchedules,
        concluded,
        remaining,
        displayTitle,
        canLaunchRemaining,
        launchButtonLabel,
        handleLaunch,
    } = usePlanCard({plan, patientId, initialSchedules});

    const countToLaunch = plan.isContinuous ? Number(sessionsToLaunch) : remaining;

    return (
        // overflow-hidden removido — a lista de sessões cresce livremente e o scroll fica no container pai da aba
        <div className="border border-border-default rounded-xl">

            {/* Cabeçalho do plano */}
            <div className="flex items-start gap-3 px-4 py-3 bg-surface-default rounded-t-xl">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-content-primary">{displayTitle}</p>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium border ${plan.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-surface-sunken text-content-secondary border-border-default'}`}>
                            {plan.isActive ? 'Ativo' : 'Encerrado'}
                        </span>
                        {plan.frequency && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {FREQUENCY_LABEL[plan.frequency]}
                            </span>
                        )}
                        {plan.attendanceType && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border
                                ${plan.attendanceType === 'PRESENTIAL'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                                {ATTENDANCE_TYPE_LABEL[plan.attendanceType]}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                        {plan.sessionsCount && (
                            <span className="text-xs text-content-secondary">
                                {concluded}/{plan.sessionsCount} sessões · R$ {plan.pricePerSession?.toFixed(2)}/sessão
                            </span>
                        )}
                        <span className="text-xs text-content-secondary">
                            Adesão: {plan.adherenceDate}
                        </span>
                        {plan.estimatedEndDate && (
                            <span className="text-xs text-content-secondary">
                                Est. fim: {plan.estimatedEndDate}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {canLaunchRemaining && (
                        <button
                            type="button"
                            onClick={() => setShowLaunch(v => !v)}
                            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors
                                ${showLaunch
                                ? 'bg-surface-sunken text-content-secondary border-border-default'
                                : 'bg-royalBlue/10 text-royalBlue border-royalBlue/30 hover:bg-royalBlue/20'}`}
                        >
                            <CalendarPlus size={12}/>
                            {launchButtonLabel}
                        </button>
                    )}
                    {linkedSchedules.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setExpanded(v => !v)}
                            className="flex items-center gap-1 text-xs text-royalBlue hover:opacity-70 transition-opacity"
                        >
                            {expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                            {linkedSchedules.length} sessões
                        </button>
                    )}
                </div>
            </div>

            {/* Painel de lançamento de sessões */}
            {showLaunch && (
                <div className="flex items-center gap-3 px-4 py-3 bg-surface-raised border-t border-border-default flex-wrap">

                    {plan.isContinuous && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-content-secondary shrink-0">Quantidade:</span>
                            <input
                                type="number"
                                min="1"
                                value={sessionsToLaunch}
                                onChange={e => setSessionsToLaunch(e.target.value)}
                                placeholder="Ex: 8"
                                className="w-20 bg-surface-sunken border border-border-default text-content-primary text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue p-1.5"
                            />
                        </div>
                    )}

                    {!plan.isContinuous && (
                        <span className="text-xs text-content-secondary shrink-0">
                            {remaining} {remaining === 1 ? 'sessão restante' : 'sessões restantes'}:
                        </span>
                    )}

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-content-secondary shrink-0">Início:</span>
                        <input
                            type="datetime-local"
                            value={startDateTime}
                            onChange={e => setStartDateTime(e.target.value)}
                            className="bg-surface-sunken border border-border-default text-content-primary text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue p-1.5"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleLaunch}
                        disabled={isLaunching || countToLaunch <= 0}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-60"
                    >
                        {isLaunching ? <Loader2 size={12} className="animate-spin"/> : <CalendarPlus size={12}/>}
                        {isLaunching
                            ? 'Lançando...'
                            : countToLaunch > 0
                                ? `Lançar ${countToLaunch} ${countToLaunch === 1 ? 'sessão' : 'sessões'}`
                                : 'Lançar'}
                    </button>
                </div>
            )}

            {/* Lista de sessões — cresce livremente, scroll gerenciado pelo container pai da aba */}
            {expanded && linkedSchedules.length > 0 && (
                <div className="border-t border-border-default rounded-b-xl overflow-hidden">
                    {[...linkedSchedules]
                        .sort((a, b) => parseDate(a.dateStart).getTime() - parseDate(b.dateStart).getTime())
                        .map(s => <PlanSessionRow key={s.id} schedule={s}/>)
                    }
                </div>
            )}
        </div>
    );
}

// endregion

// region Painel principal

export default function PatientTabbedPanel({patientId, schedules, plans, documents}: Props) {
    const [activeTab, setActiveTab] = useState<Tab>('schedules');
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

    const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
        {key: 'schedules', label: 'Acompanhamentos', icon: <CalendarDays size={14}/>},
        {key: 'plans', label: 'Planos', icon: <Layers size={14}/>},
        {key: 'documents', label: 'Documentos', icon: <FolderOpen size={14}/>},
    ];

    return (
        <section className="flex flex-col h-full rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden">

            <div className="flex items-center border-b border-border-default bg-surface-raised shrink-0">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px
                            ${activeTab === tab.key
                            ? 'border-royalBlue text-royalBlue'
                            : 'border-transparent text-content-secondary hover:text-content-primary'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}

                <div className="ml-auto pr-4">
                    {activeTab === 'plans' && (
                        <button
                            type="button"
                            onClick={() => setIsPlanDialogOpen(true)}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                        >
                            <Plus size={13}/> Novo plano
                        </button>
                    )}
                    {activeTab === 'documents' && (
                        <PatientUploadButton patientId={patientId}/>
                    )}
                </div>
            </div>

            {/* Área de conteúdo — scroll único no container pai, cards de plano expandem naturalmente */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-2">
                {activeTab === 'schedules' && (
                    <>
                        {!schedules.length ? (
                            <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                                <CalendarX size={36} strokeWidth={1.5}/>
                                <p className="text-sm font-medium">Sem acompanhamentos registrados.</p>
                            </div>
                        ) : (
                            schedules.map((s, i) => <PatientScheduleItem key={i} schedule={s}/>)
                        )}
                    </>
                )}

                {activeTab === 'plans' && (
                    <>
                        {!plans.length ? (
                            <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                                <Layers size={36} strokeWidth={1.5}/>
                                <p className="text-sm font-medium">Nenhum plano cadastrado.</p>
                            </div>
                        ) : (
                            plans.map(p => (
                                <PlanCard
                                    key={p.id}
                                    plan={p}
                                    initialSchedules={schedules}
                                    patientId={patientId}
                                />
                            ))
                        )}
                    </>
                )}

                {activeTab === 'documents' && (
                    <>
                        {!documents.length ? (
                            <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                                <FileX size={36} strokeWidth={1.5}/>
                                <p className="text-sm font-medium">Nenhum documento enviado.</p>
                            </div>
                        ) : (
                            documents.map((d, i) => <PatientDocumentItem key={i} document={d}/>)
                        )}
                    </>
                )}
            </div>

            {isPlanDialogOpen && (
                <CreatePlanDialog
                    patientId={patientId}
                    externalFunc={() => setIsPlanDialogOpen(false)}
                />
            )}
        </section>
    );
}

// endregion
