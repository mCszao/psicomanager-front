"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { getSchedulesByPatient, registerSchedule } from "@/services/api";
import { Plan } from "@/interface/IPlan";
import Schedule from "@/interface/ISchedule";
import BaseResponse from "@/interface/IBaseResponse";
import { extractApiError } from "@/util/feedback";

interface UsePlanCardProps {
    plan: Plan;
    patientId: string;
    initialSchedules: Schedule[];
}

export function usePlanCard({ plan, patientId, initialSchedules }: UsePlanCardProps) {
    const toast = useToast();
    const router = useRouter();

    const [expanded, setExpanded] = useState(false);
    const [showLaunch, setShowLaunch] = useState(false);
    const [startDateTime, setStartDateTime] = useState('');
    const [sessionsToLaunch, setSessionsToLaunch] = useState('');
    const [isLaunching, setIsLaunching] = useState(false);
    const [linkedSchedules, setLinkedSchedules] = useState<Schedule[]>(
        initialSchedules.filter(s => s.plan?.id === plan.id)
    );

    const activeLinked = linkedSchedules.filter(s =>
        s.stage === 'OPENED' || s.stage === 'CONCLUDED'
    );
    const concluded = linkedSchedules.filter(s => s.stage === 'CONCLUDED').length;

    // Para planos finitos calcula as restantes; para contínuos não há limite definido
    const remaining = !plan.isContinuous && plan.sessionsCount
        ? Math.max(0, plan.sessionsCount - activeLinked.length)
        : 0;

    const displayTitle = plan.title ?? plan.planTemplate?.title ?? 'Plano sem título';

    // Contínuos: botão sempre visível enquanto ativo e com frequência definida
    // Finitos: botão visível enquanto houver sessões restantes
    const canLaunchRemaining = plan.isActive && !!plan.frequency &&
        (plan.isContinuous || remaining > 0);

    const launchButtonLabel = plan.isContinuous
        ? 'Lançar mais sessões'
        : `${remaining} restantes`;

    async function refreshLinkedSchedules() {
        const res = await getSchedulesByPatient(patientId) as BaseResponse<Schedule[]>;
        if (res.success && res.object) {
            setLinkedSchedules(res.object.filter(s => s.plan?.id === plan.id));
        }
    }

    async function handleLaunch() {
        if (!startDateTime) {
            toast.error('Informe a data e hora de início das sessões');
            return;
        }

        const count = plan.isContinuous
            ? Number(sessionsToLaunch)
            : remaining;

        if (!count || count <= 0) {
            toast.error('Informe a quantidade de sessões a lançar');
            return;
        }

        setIsLaunching(true);
        setShowLaunch(false);

        const res = await registerSchedule({
            patientId,
            dateStart: startDateTime,
            planId: plan.id,
            frequency: plan.frequency!,
            sessionsCount: count,
            type: plan.attendanceType ?? undefined,
        }) as BaseResponse<string>;

        if (!res.success) {
            setIsLaunching(false);
            setShowLaunch(true);
            toast.error(extractApiError(res));
            return;
        }

        toast.success(`${count} sessões lançadas com sucesso!`);
        setStartDateTime('');
        setSessionsToLaunch('');
        await refreshLinkedSchedules();
        setIsLaunching(false);
        router.refresh();
    }

    return {
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
    };
}
