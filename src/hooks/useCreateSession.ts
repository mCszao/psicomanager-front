import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createScheduleSchema, CreateScheduleFormData } from "@/services/validation/schedule.schema";
import { registerSchedule } from "@/services/api";
import { extractApiError } from "@/util/feedback";
import { useToast } from "@/contexts/ToastContext";
import { PatientResume } from "@/interface/IPatientResume";
import ScheduleFactory from "@/util/ScheduleFactory";
import BaseResponse from "@/interface/IBaseResponse";

interface UseCreateSessionProps {
    onSuccess: () => void;
}

export function useCreateSession({ onSuccess }: UseCreateSessionProps) {
    const toast = useToast();
    const router = useRouter();

    const [selectedPatient, setSelectedPatient] = useState<PatientResume | null>(null);
    const [isPatientListOpen, setPatientListOpen] = useState(false);

    const form = useForm<CreateScheduleFormData>({
        resolver: zodResolver(createScheduleSchema),
    });

    const { watch, setValue } = form;
    const dateStart = watch('dateStart');
    const dateEnd   = watch('dateEnd');

    useEffect(() => {
        if (!dateStart) return;
        if (dateEnd) return;

        const start = new Date(dateStart);
        if (isNaN(start.getTime())) return;

        const end = new Date(start.getTime() + 60 * 60 * 1000);
        const pad = (n: number) => String(n).padStart(2, '0');
        const formatted = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}`;
        setValue('dateEnd', formatted, { shouldValidate: true });
    }, [dateStart]);

    function togglePatientList() {
        setPatientListOpen(prev => !prev);
    }

    async function submit(data: CreateScheduleFormData) {
        const schedule = ScheduleFactory(data as any, selectedPatient?.id);
        const response = await registerSchedule(schedule) as BaseResponse<unknown>;

        if (!response.success) {
            toast.error(extractApiError(response));
            return;
        }

        toast.success('Sessão agendada com sucesso!');
        router.refresh();
        onSuccess();
    }

    return {
        form,
        submit,
        selectedPatient,
        setSelectedPatient,
        isPatientListOpen,
        togglePatientList,
    };
}
