import { z } from "zod";

export const createScheduleSchema = z.object({
    patientId: z.string().nullable(),
    dateStart: z.string().min(1, 'A data de início é obrigatória'),
    dateEnd: z.string().nullable().optional(),
}).refine(
    (data) => {
        if (!data.dateEnd || data.dateEnd === '') return true;
        return new Date(data.dateStart) < new Date(data.dateEnd);
    },
    { message: 'A data final deve ser posterior à data de início', path: ['dateEnd'] }
);

export type CreateScheduleFormData = z.infer<typeof createScheduleSchema>;
