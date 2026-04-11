import { z } from "zod";

export const signInSchema = z.object({
    username: z.string().min(3, 'O usuário precisa ter no mínimo 3 caracteres'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

export const signUpSchema = z.object({
    username: z.string().min(3, 'O usuário precisa ter no mínimo 3 caracteres'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    phone: z.string().regex(/^\d{11,15}$/, 'Telefone deve conter entre 11 e 15 dígitos'),
    email: z.string().email('Formato de e-mail inválido'),
});
