"use client";

import {AlertTriangle, Plus, X} from "lucide-react";
import {AlertScope, IAlert} from "@/interface/IAlert";
import {useAlerts} from "@/hooks/useAlerts";

interface Props {
    initialAlerts: IAlert[];
    patientId: string;
    sessionId?: string;
    scope: AlertScope;
}

export default function AlertsPanel({initialAlerts, patientId, sessionId, scope}: Props) {
    const {
        activeAlerts,
        message, setMessage,
        showForm, setShowForm,
        isCreating,
        handleCreate,
        handleDismiss,
    } = useAlerts({initialAlerts, patientId, sessionId, scope});

    return (
        <div className="flex flex-col gap-2">

            {/* Avisos ativos */}
            {activeAlerts.length > 0 && (
                <div className="flex flex-col gap-1.5">
                    {activeAlerts.map(alert => (
                        <div
                            key={alert.id}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200"
                        >
                            <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5"/>
                            <p className="flex-1 text-sm text-amber-800">{alert.message}</p>
                            <button
                                type="button"
                                onClick={() => handleDismiss(alert.id)}
                                className="shrink-0 text-amber-400 hover:text-amber-600 transition-colors"
                                title="Descartar aviso"
                            >
                                <X size={14}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Formulário de criação */}
            {showForm ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') handleCreate();
                        }}
                        placeholder="Escreva o aviso..."
                        className="flex-1 bg-surface-sunken border border-border-default text-content-primary text-sm rounded-lg focus:ring-royalBlue focus:border-royalBlue p-2"
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={isCreating}
                        className="text-xs px-3 py-1.5 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-60 shrink-0"
                    >
                        {isCreating ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowForm(false);
                            setMessage('');
                        }}
                        className="p-2 rounded-lg text-content-secondary hover:bg-surface-raised transition-colors shrink-0"
                    >
                        <X size={15}/>
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-1.5 text-xs text-content-secondary hover:text-content-primary transition-colors self-start"
                >
                    <Plus size={13}/>
                    {activeAlerts.length === 0 ? 'Adicionar aviso' : 'Novo aviso'}
                </button>
            )}
        </div>
    );
}
