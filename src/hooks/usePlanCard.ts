"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { registerSchedule, getSchedulesByPatient } from "@/services/api";
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
    const [isLaunching, setIsLaunching] = useState(false);
    const [linkedSchedules, setLinkedSchedules] = useState<Schedule[]>(
        initialSchedules.filter(s => s.plan?.id === plan.id)
    );

    const activeLinked = linkedSchedules.filter(s =>
        s.stage === 'OPENED' || s.stage === 'CONCLUDED'
    );
    const concluded = linkedSchedules.filter(s => s.stage === 'CONCLUDED').length;
    const remaining = plan.sessionsCount && plan.frequency
        ? Math.max(0, plan.sessionsCount - activeLinked.length)
        : 0;

    const displayTitle = plan.title ?? plan.planTemplate?.title ?? 'Plano sem título';
    const canLaunchRemaining = remaining > 0 && plan.isActive && !!plan.frequency;

    async function refreshLinkedSchedules() {
        const res = await getSchedulesByPatient(patientId) as BaseResponse<Schedule[]>;
        if (res.success && res.object) {
            setLinkedSchedules(res.object.filter(s => s.plan?.id === plan.id));
        }
        console.log(linkedSchedules)
    }

    async function handleLaunch() {
        if (!startDateTime) {
            toast.error('Informe a data e hora de início das sessões');
            return;
        }

        const countToLaunch = remaining;
        if (countToLaunch <= 0) return;

        setIsLaunching(true);
        setShowLaunch(false);

        const res = await registerSchedule({
            patientId,
            dateStart: startDateTime,
            planId: plan.id,
            frequency: plan.frequency!,
            sessionsCount: countToLaunch,
        }) as BaseResponse<string>;

        if (!res.success) {
            setIsLaunching(false);
            setShowLaunch(true);
            toast.error(extractApiError(res));
            return;
        }

        toast.success(`${countToLaunch} sessões lançadas com sucesso!`);
        setStartDateTime('');
        await refreshLinkedSchedules();
        setIsLaunching(false);
        router.refresh();
    }

    return {
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
    };
}
