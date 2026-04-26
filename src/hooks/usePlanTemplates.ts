"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { createPlanTemplate, deletePlanTemplate } from "@/services/api";
import { PlanTemplate } from "@/interface/IPlan";
import { AttendanceTypeEnum, FrequencyEnum, PlanTemplateDTO } from "@/types/plan.dto";
import BaseResponse from "@/interface/IBaseResponse";
import { extractApiError } from "@/util/feedback";

interface UsePlanTemplatesProps {
    initialTemplates: PlanTemplate[];
}

export function usePlanTemplates({ initialTemplates }: UsePlanTemplatesProps) {
    const toast = useToast();
    const router = useRouter();

    const [isCreating, setIsCreating] = useState(false);
    const [title, setTitle] = useState('');
    const [pricePerSession, setPricePerSession] = useState('');
    const [sessionsCount, setSessionsCount] = useState('');
    const [frequency, setFrequency] = useState<FrequencyEnum>('WEEKLY');
    const [attendanceType, setAttendanceType] = useState<AttendanceTypeEnum>('PRESENTIAL');

    const totalValue = pricePerSession && sessionsCount
        ? (Number(pricePerSession) * Number(sessionsCount)).toFixed(2)
        : null;

    function resetForm() {
        setTitle('');
        setPricePerSession('');
        setSessionsCount('');
        setFrequency('WEEKLY');
        setAttendanceType('PRESENTIAL');
        setIsCreating(false);
    }

    async function handleCreate() {
        if (!title || !pricePerSession || !sessionsCount || !frequency) {
            toast.error('Preencha todos os campos');
            return;
        }

        const dto: PlanTemplateDTO = {
            title,
            pricePerSession: Number(pricePerSession),
            sessionsCount: Number(sessionsCount),
            frequency,
            attendanceType,
        };

        const res = await createPlanTemplate(dto) as BaseResponse<string>;
        if (!res.success) {
            toast.error(extractApiError(res));
            return;
        }

        toast.success('Template criado com sucesso!');
        resetForm();
        router.refresh();
    }

    async function handleDelete(id: string) {
        const res = await deletePlanTemplate(id) as BaseResponse<string>;
        if (!res.success) {
            toast.error(extractApiError(res));
            return;
        }

        toast.success('Template removido.');
        router.refresh();
    }

    return {
        isCreating, setIsCreating,
        title, setTitle,
        pricePerSession, setPricePerSession,
        sessionsCount, setSessionsCount,
        frequency, setFrequency,
        attendanceType, setAttendanceType,
        totalValue,
        handleCreate,
        handleDelete,
        resetForm,
    };
}
