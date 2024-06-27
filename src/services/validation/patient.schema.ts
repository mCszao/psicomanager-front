import { z } from "zod"; 

export const createPatientSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres'),
    email: z.string().email('Formato de e-mail inválido'),
    cpf: z.string().refine( isNumber ,'Digite apenas números inteiros'),
    phone:  z.string().refine( isNumber ,'Digite apenas números inteiros'),
    birthdayDate: z.string(),
    zipcode: z.string().nullable()
});

function isNumber(field: string) {
    return Number.parseInt(field) > 0;
}