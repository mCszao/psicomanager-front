import { z } from "zod"; 

export const createScheduleSchema = z.object({
    patientId: z.string().uuid('O padrão do id enviado não é válido'),
});
