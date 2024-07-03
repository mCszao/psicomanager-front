import { z } from "zod"; 

export const createScheduleSchema = z.object({
    patientId: z.string().nullable(),
    dateStart: z.string().min(3, 'Data informada não está dentro dos padrões'),
    dateEnd: z.string().nullable()
});
