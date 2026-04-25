import {z} from "zod";
import {AttendanceTypeEnum} from "@/types/schedule.dto";

const attendanceTypeValues: [AttendanceTypeEnum, ...AttendanceTypeEnum[]] = ['PRESENTIAL', 'REMOTE'];

export const createScheduleSchema = z.object({
    patientId: z.string().nullable(),
    dateStart: z.string().min(1, 'A data de início é obrigatória'),
    dateEnd: z.string().nullable().optional(),
    type: z.enum(attendanceTypeValues, {required_error: 'A modalidade é obrigatória'}),
    sessionValue: z.string().optional(),
}).refine(
    (data) => {
        if (!data.dateEnd || data.dateEnd === '') return true;
        return new Date(data.dateStart) < new Date(data.dateEnd);
    },
    {message: 'A data final deve ser posterior à data de início', path: ['dateEnd']}
);

export type CreateScheduleFormData = z.infer<typeof createScheduleSchema>;
