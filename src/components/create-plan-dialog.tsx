"use client";

import { useEffect } from "react";
import { X, Repeat } from "lucide-react";
import Dialog from "./ui/dialog";
import DialogHeader from "./ui/dialog-header";
import BaseForm from "./ui/base-form";
import ButtonSubmit from "./ui/button-submit";
import LabelContainer from "./ui/label-container";
import Input from "./ui/input";
import { useCreatePlan } from "@/hooks/useCreatePlan";
import { FrequencyEnum, FREQUENCY_LABEL } from "@/types/plan.dto";

const FREQUENCIES: FrequencyEnum[] = ['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY'];

type Props = {
    patientId: string;
    externalFunc: () => void;
};

export default function CreatePlanDialog({ patientId, externalFunc }: Props) {
    const {
        templates, loadTemplates, selectedTemplateId, applyTemplate,
        title, setTitle,
        pricePerSession, setPricePerSession,
        sessionsCount, setSessionsCount,
        frequency, setFrequency,
        adherenceDate, setAdherenceDate,
        generateSessions, setGenerateSessions,
        sessionStartTime, setSessionStartTime,
        isLoading, submit,
    } = useCreatePlan({ patientId, onSuccess: externalFunc });

    useEffect(() => { loadTemplates(); }, []);

    return (
        <Dialog>
            <DialogHeader title="Novo plano" textButton={<X />} functionButton={externalFunc} />
            <BaseForm onSubmit={async (e) => { e.preventDefault(); await submit(); }}>

                {templates.length > 0 && (
                    <LabelContainer title="Template (opcional)" labelFor="template">
                        <select
                            id="template"
                            value={selectedTemplateId}
                            onChange={e => applyTemplate(e.target.value)}
                            className="bg-surface-sunken border border-border-default text-content-primary text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue block w-full p-2.5"
                        >
                            <option value="">Sem template</option>
                            {templates.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.title} — R$ {t.pricePerSession.toFixed(2)} · {t.sessionsCount}x · {FREQUENCY_LABEL[t.frequency]}
                                </option>
                            ))}
                        </select>
                    </LabelContainer>
                )}

                <LabelContainer title="Título (opcional)" labelFor="title">
                    <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Acompanhamento semanal" />
                </LabelContainer>

                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-content-primary">Valor/sessão (R$)</label>
                        <Input type="number" step="0.01" value={pricePerSession} onChange={e => setPricePerSession(e.target.value)} placeholder="75,00" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-content-primary">Nº de sessões</label>
                        <Input type="number" min="1" value={sessionsCount} onChange={e => setSessionsCount(e.target.value)} placeholder="4" />
                    </div>
                </div>

                <LabelContainer title="Frequência (opcional)" labelFor="frequency">
                    <div className="flex rounded-lg border border-border-default overflow-hidden text-sm">
                        <button
                            type="button"
                            onClick={() => setFrequency('')}
                            className={`flex-1 py-2 font-medium transition-colors border-r border-border-default
                                ${frequency === '' ? 'bg-royalBlue text-white' : 'text-content-secondary hover:bg-surface-raised'}`}
                        >
                            Nenhuma
                        </button>
                        {FREQUENCIES.map(f => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFrequency(f)}
                                className={`flex-1 py-2 font-medium transition-colors border-r last:border-r-0 border-border-default
                                    ${frequency === f ? 'bg-royalBlue text-white' : 'text-content-secondary hover:bg-surface-raised'}`}
                            >
                                {FREQUENCY_LABEL[f]}
                            </button>
                        ))}
                    </div>
                </LabelContainer>

                <LabelContainer title="Data de adesão *" labelFor="adherenceDate">
                    <Input id="adherenceDate" type="date" value={adherenceDate} onChange={e => setAdherenceDate(e.target.value)} />
                </LabelContainer>

                {frequency && sessionsCount && (
                    <div className="mb-5">
                        <label className="flex items-center gap-2 text-sm font-medium text-content-primary cursor-pointer">
                            <input
                                type="checkbox"
                                checked={generateSessions}
                                onChange={e => setGenerateSessions(e.target.checked)}
                                className="rounded border-border-default"
                            />
                            <Repeat size={14} />
                            Gerar {sessionsCount} sessões automaticamente
                        </label>
                    </div>
                )}

                {generateSessions && (
                    <LabelContainer title="Horário de início das sessões *" labelFor="sessionStartTime">
                        <Input id="sessionStartTime" type="time" value={sessionStartTime} onChange={e => setSessionStartTime(e.target.value)} />
                    </LabelContainer>
                )}

                <ButtonSubmit title={isLoading ? 'Criando...' : 'Criar plano'} />
            </BaseForm>
        </Dialog>
    );
}
