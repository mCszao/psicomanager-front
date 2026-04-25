"use client";

import { Layers, Plus, Trash2, X, Building2 } from "lucide-react";
import { PlanTemplate } from "@/interface/IPlan";
import { FrequencyEnum, FREQUENCY_LABEL } from "@/types/plan.dto";
import { usePlanTemplates } from "@/hooks/usePlanTemplates";
import Input from "@/components/ui/input";

const FREQUENCIES: FrequencyEnum[] = ['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY'];

interface Props {
    initialTemplates: PlanTemplate[];
}

export default function PlanTemplateList({ initialTemplates }: Props) {
    const {
        isCreating, setIsCreating,
        title, setTitle,
        pricePerSession, setPricePerSession,
        sessionsCount, setSessionsCount,
        frequency, setFrequency,
        totalValue,
        handleCreate,
        handleDelete,
    } = usePlanTemplates({ initialTemplates });

    return (
        <div className="flex flex-col h-full">

            {/* Barra de ação */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-default bg-surface-raised shrink-0">
                <span className="text-sm text-content-secondary">
                    {initialTemplates.length} {initialTemplates.length === 1 ? 'template' : 'templates'}
                </span>
                <button
                    type="button"
                    onClick={() => setIsCreating(v => !v)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                >
                    {isCreating ? <><X size={15} /> Cancelar</> : <><Plus size={15} /> Novo template</>}
                </button>
            </div>

            {/* Formulário de criação */}
            {isCreating && (
                <div className="p-5 border-b border-border-default bg-surface-default shrink-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-content-primary">Título *</label>
                            <Input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Ex: Plano Padrão"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-content-primary">Valor/sessão (R$) *</label>
                            <Input
                                type="number"
                                step="0.01"
                                value={pricePerSession}
                                onChange={e => setPricePerSession(e.target.value)}
                                placeholder="75,00"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-content-primary">Nº de sessões *</label>
                            <Input
                                type="number"
                                min="1"
                                value={sessionsCount}
                                onChange={e => setSessionsCount(e.target.value)}
                                placeholder="4"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-content-primary">Frequência *</label>
                        <div className="flex rounded-lg border border-border-default overflow-hidden text-sm">
                            {FREQUENCIES.map(f => (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => setFrequency(f)}
                                    className={`flex-1 py-2.5 font-medium transition-colors border-r last:border-r-0 border-border-default
                                        ${frequency === f ? 'bg-royalBlue text-white' : 'text-content-secondary hover:bg-surface-raised'}`}
                                >
                                    {FREQUENCY_LABEL[f]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {totalValue && (
                        <p className="text-sm text-content-secondary mb-4">
                            Valor total do plano: <strong className="text-content-primary">R$ {totalValue}</strong>
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleCreate}
                        className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
                    >
                        <Plus size={15} /> Criar template
                    </button>
                </div>
            )}

            {/* Lista */}
            {!initialTemplates.length ? (
                <div className="flex flex-col items-center justify-center gap-2 flex-1 text-content-secondary">
                    <Building2 size={36} strokeWidth={1.5} />
                    <p className="text-sm font-medium">Nenhum template criado ainda.</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-2 p-4 overflow-y-auto">
                    {initialTemplates.map(t => (
                        <li
                            key={t.id}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-raised hover:bg-surface-hover border border-border-default transition-colors"
                        >
                            <p className="flex-1 font-semibold text-sm text-content-primary truncate min-w-0">
                                {t.title}
                            </p>
                            <span className="text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 bg-blue-100 text-blue-700 border-blue-200">
                                {FREQUENCY_LABEL[t.frequency]}
                            </span>
                            <span className="hidden sm:block text-xs text-content-secondary shrink-0 min-w-[72px] text-right">
                                {t.sessionsCount}x sessões
                            </span>
                            <span className="text-xs text-content-secondary shrink-0 min-w-[100px] text-right">
                                R$ {t.pricePerSession.toFixed(2)}/sessão
                            </span>
                            <span className="text-xs font-semibold text-content-primary shrink-0 min-w-[80px] text-right">
                                R$ {t.totalValue.toFixed(2)}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleDelete(t.id)}
                                className="p-2 rounded-lg text-content-secondary hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
