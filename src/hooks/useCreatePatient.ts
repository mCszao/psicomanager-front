import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPatientSchema, CreatePatientFormData } from "@/services/validation/patient.schema";
import { registerPatient } from "@/services/api";
import { reverseDate } from "@/util/DateUtils";
import { extractApiError } from "@/util/feedback";
import { useToast } from "@/contexts/ToastContext";
import BaseResponse from "@/interface/IBaseResponse";

interface UseCreatePatientProps {
    onSuccess: () => void;
}

export function useCreatePatient({ onSuccess }: UseCreatePatientProps) {
    const toast = useToast();

    const form = useForm<CreatePatientFormData>({
        resolver: zodResolver(createPatientSchema),
    });

    async function submit(data: CreatePatientFormData) {
        const payload = {
            ...data,
            birthdayDate: data.birthdayDate ? reverseDate(data.birthdayDate) : undefined,
            address: data.zipcode ? { zipcode: data.zipcode } : undefined,
        };

        const response = await registerPatient(payload as any) as BaseResponse<unknown>;

        if (!response.success) {
            toast.error(extractApiError(response));
            return;
        }

        toast.success('Paciente cadastrado com sucesso!');
        onSuccess();
    }

    return { form, submit };
}
