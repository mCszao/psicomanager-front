import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createScheduleSchema, CreateScheduleFormData } from "@/services/validation/schedule.schema";
import { registerSchedule } from "@/services/api";
import { extractApiError } from "@/util/feedback";
import { useToast } from "@/contexts/ToastContext";
import { PatientSelectedContext } from "@/contexts/PatientSelectedContext";
import ScheduleFactory from "@/util/ScheduleFactory";
import BaseResponse from "@/interface/IBaseResponse";

interface UseCreateSessionProps {
    onSuccess: () => void;
}

export function useCreateSession({ onSuccess }: UseCreateSessionProps) {
    const toast = useToast();
    const patientContext = useContext(PatientSelectedContext);
    const [isPatientListOpen, setPatientListOpen] = useState(false);

    const form = useForm<CreateScheduleFormData>({
        resolver: zodResolver(createScheduleSchema),
    });

    function togglePatientList() {
        setPatientListOpen(prev => !prev);
    }

    async function submit(data: CreateScheduleFormData) {
        const schedule = ScheduleFactory(data as any, patientContext?.patient?.id);
        const response = await registerSchedule(schedule) as BaseResponse<unknown>;

        if (!response.success) {
            toast.error(extractApiError(response));
            return;
        }

        toast.success('Sessão agendada com sucesso!');
        onSuccess();
    }

    return {
        form,
        submit,
        selectedPatient: patientContext?.patient ?? null,
        isPatientListOpen,
        togglePatientList,
    };
}
