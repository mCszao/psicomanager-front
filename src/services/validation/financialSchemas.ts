import { z } from 'zod';

export const paymentSchema = z.object({
    transactionId: z.string().min(1, 'Transação obrigatória'),
    amountPaid: z
        .number({ invalid_type_error: 'Informe um valor válido' })
        .positive('Valor deve ser maior que zero'),
    paymentMethod: z.enum(['PIX', 'CARD', 'CASH', 'TRANSFER'], {
        required_error: 'Forma de pagamento obrigatória',
    }),
    notes: z.string().optional(),
});

export const advancePaymentSchema = z.object({
    patientId: z.string().min(1, 'Paciente obrigatório'),
    amount: z
        .number({ invalid_type_error: 'Informe um valor válido' })
        .positive('Valor deve ser maior que zero'),
    paymentMethod: z.enum(['PIX', 'CARD', 'CASH', 'TRANSFER'], {
        required_error: 'Forma de pagamento obrigatória',
    }),
    notes: z.string().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type AdvancePaymentFormValues = z.infer<typeof advancePaymentSchema>;
