import { z } from "zod";

export const signInSchema = z.object({
    username: z.string().min(3, 'O usuário precisa ter no mínimo 3 caracteres'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

export const signUpSchema = z.object({
    username: z
        .string()
        .min(3, 'O usuário precisa ter no mínimo 3 caracteres')
        .regex(/^[a-zA-Z0-9._-]+$/, 'Use apenas letras, números, ponto, hífen ou underscore — sem espaços'),
    name: z.string().min(2, 'Informe o nome'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    phone: z
        .string()
        .min(1, 'Telefone é obrigatório')
        .transform(v => v.replace(/\D/g, ''))
        .refine(v => v.length >= 10 && v.length <= 11, 'Telefone deve ter 10 ou 11 dígitos'),
    email: z.string().email('Formato de e-mail inválido'),
});
