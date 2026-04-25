"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/contexts/ToastContext";
import {createAlert, dismissAlert} from "@/services/api";
import {AlertRegisterDTO, AlertScope, IAlert} from "@/interface/IAlert";
import BaseResponse from "@/interface/IBaseResponse";
import {extractApiError} from "@/util/feedback";

interface UseAlertsProps {
    initialAlerts: IAlert[];
    patientId: string;
    sessionId?: string;
    scope: AlertScope;
}

export function useAlerts({initialAlerts, patientId, sessionId, scope}: UseAlertsProps) {
    const toast = useToast();
    const router = useRouter();

    const [alerts, setAlerts] = useState<IAlert[]>(initialAlerts);
    const [message, setMessage] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const activeAlerts = alerts.filter(a => a.isActive);

    async function handleCreate() {
        if (!message.trim()) {
            toast.error('O aviso não pode estar vazio.');
            return;
        }

        setIsCreating(true);
        const dto: AlertRegisterDTO = {
            patientId,
            sessionId: scope === 'SESSION' ? sessionId : undefined,
            scope,
            message: message.trim(),
        };

        const res = await createAlert(dto) as BaseResponse<string>;
        setIsCreating(false);

        if (!res.success) {
            toast.error(extractApiError(res));
            return;
        }

        toast.success('Aviso criado com sucesso!');
        setMessage('');
        setShowForm(false);
        router.refresh();
    }

    async function handleDismiss(id: string) {
        const res = await dismissAlert(id) as BaseResponse<string>;
        if (!res.success) {
            toast.error(extractApiError(res));
            return;
        }
        setAlerts(prev => prev.map(a => a.id === id ? {...a, isActive: false} : a));
    }

    return {
        activeAlerts,
        message, setMessage,
        showForm, setShowForm,
        isCreating,
        handleCreate,
        handleDismiss,
    };
}
