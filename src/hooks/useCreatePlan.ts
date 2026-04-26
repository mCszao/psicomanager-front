"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { createPlan, getPlanTemplates } from "@/services/api";
import { PlanTemplate } from "@/interface/IPlan";
import { AttendanceTypeEnum, FrequencyEnum, PlanRegisterDTO } from "@/types/plan.dto";
import BaseResponse from "@/interface/IBaseResponse";
import { extractApiError } from "@/util/feedback";

interface UseCreatePlanProps {
    patientId: string;
    onSuccess: () => void;
}

export function useCreatePlan({ patientId, onSuccess }: UseCreatePlanProps) {
    const toast = useToast();
    const router = useRouter();

    const [templates, setTemplates] = useState<PlanTemplate[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    const [title, setTitle] = useState('');
    const [pricePerSession, setPricePerSession] = useState('');
    const [sessionsCount, setSessionsCount] = useState('');
    const [frequency, setFrequency] = useState<FrequencyEnum | ''>('');
    const [adherenceDate, setAdherenceDate] = useState('');
    const [generateSessions, setGenerateSessions] = useState(false);
    const [isContinuous, setIsContinuous] = useState(true);
    const [sessionStartTime, setSessionStartTime] = useState('');
    const [attendanceType, setAttendanceType] = useState<AttendanceTypeEnum>('PRESENTIAL');
    const [isLoading, setIsLoading] = useState(false);

    async function loadTemplates() {
        const res = await getPlanTemplates() as BaseResponse<PlanTemplate[]>;
        if (res.success) setTemplates(res.object ?? []);
    }

    function applyTemplate(templateId: string) {
        setSelectedTemplateId(templateId);
        const tpl = templates.find(t => t.id === templateId);
        if (!tpl) return;
        setPricePerSession(String(tpl.pricePerSession));
        setSessionsCount(String(tpl.sessionsCount));
        setFrequency(tpl.frequency);
        setTitle(tpl.title);
        if (tpl.attendanceType) {
            setAttendanceType(tpl.attendanceType);
        }
    }

    async function submit() {
        if (!adherenceDate) {
            toast.error('Data de adesão é obrigatória');
            return;
        }
        if (!frequency) {
            toast.error('A frequência é obrigatória para qualquer tipo de plano.');
            return;
        }
        if (!isContinuous && (!sessionsCount || Number(sessionsCount) < 1)) {
            toast.error('Planos finitos exigem o número de sessões informado.');
            return;
        }
        if (generateSessions) {
            if (!sessionsCount || Number(sessionsCount) < 1) {
                toast.error('Para gerar sessões automaticamente é necessário informar o número de sessões.');
                return;
            }
            if (!sessionStartTime) {
                toast.error('Informe o horário de início das sessões.');
                return;
            }
        }

        setIsLoading(true);
        const dto: PlanRegisterDTO = {
            patientId,
            planTemplateId: selectedTemplateId || undefined,
            title: title || undefined,
            pricePerSession: pricePerSession ? Number(pricePerSession) : undefined,
            sessionsCount: sessionsCount ? Number(sessionsCount) : undefined,
            frequency: frequency || undefined,
            adherenceDate,
            isContinuous,
            generateSessions,
            sessionStartTime: generateSessions ? sessionStartTime : undefined,
            attendanceType: generateSessions ? attendanceType : undefined,
        };

        const res = await createPlan(dto) as BaseResponse<string>;
        setIsLoading(false);

        if (!res.success) {
            toast.error(extractApiError(res));
            return;
        }

        toast.success('Plano criado com sucesso!');
        router.refresh();
        onSuccess();
    }

    return {
        templates,
        loadTemplates,
        selectedTemplateId,
        applyTemplate,
        title, setTitle,
        pricePerSession, setPricePerSession,
        sessionsCount, setSessionsCount,
        frequency, setFrequency,
        adherenceDate, setAdherenceDate,
        generateSessions, setGenerateSessions,
        isContinuous, setIsContinuous,
        sessionStartTime, setSessionStartTime,
        attendanceType, setAttendanceType,
        isLoading,
        submit,
    };
}
