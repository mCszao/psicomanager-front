import {z} from "zod";

export const createPatientSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres'),
    email: z.string().email('Formato de e-mail inválido').or(z.literal('')).optional(),
    cpf: z
        .string()
        .min(1, 'CPF é obrigatório')
        .transform(v => v.replace(/\D/g, ''))
        .refine(v => v.length === 11, 'CPF deve conter 11 dígitos'),
    phone: z
        .string()
        .min(1, 'Telefone é obrigatório')
        .transform(v => v.replace(/\D/g, ''))
        .refine(v => v.length >= 10 && v.length <= 11, 'Telefone deve ter 10 ou 11 dígitos'),
    birthdayDate: z.string().optional(),
    zipcode: z
        .string()
        .transform(v => v.replace(/\D/g, ''))
        .refine(v => v.length === 0 || v.length === 8, 'CEP deve conter 8 dígitos')
        .optional(),
});

export type CreatePatientFormData = z.infer<typeof createPatientSchema>;
