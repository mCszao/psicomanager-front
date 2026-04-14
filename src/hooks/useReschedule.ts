import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const rescheduleSchema = z.object({
    dateStart: z.string().min(1, 'A nova data de início é obrigatória').refine(
        (val) => new Date(val) > new Date(),
        { message: 'A data deve ser futura' }
    ),
    dateEnd: z.string().nullable().optional(),
}).refine(
    (data) => {
        if (!data.dateEnd || data.dateEnd === '') return true;
        return new Date(data.dateStart) < new Date(data.dateEnd);
    },
    { message: 'A data de término deve ser posterior à data de início', path: ['dateEnd'] }
);

export type RescheduleFormData = z.infer<typeof rescheduleSchema>;

interface UseRescheduleProps {
    onConfirm: (dateStart: string, dateEnd?: string) => void;
}

export function useReschedule({ onConfirm }: UseRescheduleProps) {
    const form = useForm<RescheduleFormData>({
        resolver: zodResolver(rescheduleSchema),
    });

    function submit(data: RescheduleFormData) {
        onConfirm(data.dateStart, data.dateEnd ?? undefined);
    }

    return { form, submit };
}
