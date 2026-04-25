"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CalendarDays, FolderOpen, Layers, Plus, CalendarX, FileX, CalendarPlus, Loader2 } from "lucide-react";
import { Plan } from "@/interface/IPlan";
import Schedule from "@/interface/ISchedule";
import Document from "@/interface/IDocument";
import { FREQUENCY_LABEL } from "@/types/plan.dto";
import { parseDate, formatTime, STAGE_STYLES, getStagePresentation } from "@/util/calendarUtils";
import { usePlanCard } from "@/hooks/usePlanCard";
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

function PlanSessionRow({ schedule }: { schedule: Schedule }) {
    const { ptStage, color } = getStagePresentation(schedule.stage);
    const start = parseDate(schedule.dateStart);

    return (
        <Link
            href={`/schedules/${schedule.id}`}
            className="flex items-center gap-3 px-4 py-2.5 bg-surface-sunken border-t border-border-default hover:bg-surface-hover transition-colors"
        >
            <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: color === 'green' ? '#16a34a' : color === 'blue' ? '#2563eb' : color === 'red' ? '#dc2626' : '#9ca3af' }}
            />
            <span className="text-xs text-content-primary flex-1">
                {start.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })} — {formatTime(start)}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STAGE_STYLES[color ?? 'yellow']}`}>
                {ptStage}
            </span>
        </Link>
    );
}

function PlanCard({ plan, initialSchedules, patientId }: { plan: Plan; initialSchedules: Schedule[]; patientId: string }) {
    const {
        expanded, setExpanded,
        showLaunch, setShowLaunch,
        startDateTime, setStartDateTime,
        isLaunching,
        linkedSchedules,
        concluded,
        remaining,
        displayTitle,
        canLaunchRemaining,
        handleLaunch,
    } = usePlanCard({ plan, patientId, initialSchedules });

    return (
        <div className="border border-border-default rounded-xl overflow-hidden">

            <div className="flex items-start gap-3 px-4 py-3 bg-surface-default">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-content-primary">{displayTitle}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${plan.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-surface-sunken text-content-secondary border-border-default'}`}>
                            {plan.isActive ? 'Ativo' : 'Encerrado'}
                        </span>
                        {plan.frequency && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {FREQUENCY_LABEL[plan.frequency]}
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
                            <CalendarPlus size={12} />
                            {remaining} restantes
                        </button>
                    )}
                    {linkedSchedules.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setExpanded(v => !v)}
                            className="flex items-center gap-1 text-xs text-royalBlue hover:opacity-70 transition-opacity"
                        >
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {linkedSchedules.length} sessões
                        </button>
                    )}
                </div>
            </div>

            {showLaunch && (
                <div className="flex items-center gap-3 px-4 py-3 bg-surface-raised border-t border-border-default">
                    <span className="text-xs text-content-secondary shrink-0">
                        Início das {remaining} sessões:
                    </span>
                    <input
                        type="datetime-local"
                        value={startDateTime}
                        onChange={e => setStartDateTime(e.target.value)}
                        className="bg-surface-sunken border border-border-default text-content-primary text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue p-1.5"
                    />
                    <button
                        type="button"
                        onClick={handleLaunch}
                        disabled={isLaunching}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-60"
                    >
                        {isLaunching ? <Loader2 size={12} className="animate-spin" /> : <CalendarPlus size={12} />}
                        {isLaunching ? 'Lançando...' : 'Lançar'}
                    </button>
                </div>
            )}

            {expanded && linkedSchedules.length > 0 && (
                <div>
                    {[...linkedSchedules]
                        .sort((a, b) => parseDate(a.dateStart).getTime() - parseDate(b.dateStart).getTime())
                        .map(s => <PlanSessionRow key={s.id} schedule={s} />)
                    }
                </div>
            )}
        </div>
    );
}

// endregion

// region Painel principal

export default function PatientTabbedPanel({ patientId, schedules, plans, documents }: Props) {
    const [activeTab, setActiveTab] = useState<Tab>('schedules');
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

    const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
        { key: 'schedules', label: 'Acompanhamentos', icon: <CalendarDays size={14} /> },
        { key: 'plans',     label: 'Planos',          icon: <Layers size={14} />      },
        { key: 'documents', label: 'Documentos',      icon: <FolderOpen size={14} />  },
    ];

    return (
        <section className="flex flex-col rounded-2xl border border-border-default shadow-lg bg-surface-default overflow-hidden">

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
                            <Plus size={13} /> Novo plano
                        </button>
                    )}
                    {activeTab === 'documents' && (
                        <PatientUploadButton patientId={patientId} />
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {activeTab === 'schedules' && (
                    <>
                        {!schedules.length ? (
                            <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                                <CalendarX size={36} strokeWidth={1.5} />
                                <p className="text-sm font-medium">Sem acompanhamentos registrados.</p>
                            </div>
                        ) : (
                            schedules.map((s, i) => <PatientScheduleItem key={i} schedule={s} />)
                        )}
                    </>
                )}

                {activeTab === 'plans' && (
                    <>
                        {!plans.length ? (
                            <div className="flex flex-col items-center justify-center gap-2 py-12 text-content-secondary">
                                <Layers size={36} strokeWidth={1.5} />
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
                                <FileX size={36} strokeWidth={1.5} />
                                <p className="text-sm font-medium">Nenhum documento enviado.</p>
                            </div>
                        ) : (
                            documents.map((d, i) => <PatientDocumentItem key={i} document={d} />)
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
