import { get, post, patch } from './http';
import {
    AdvancePaymentRegisterDTO,
    FinancialSummary,
    FinancialTransaction,
    PaymentRegisterDTO,
} from '@/interface/IFinancial';
import BaseResponse from '@/interface/IBaseResponse';

export const getTransactions = () =>
    get<BaseResponse<FinancialTransaction[]>>('/financial/transactions');

export const getTransactionsByPatient = (patientId: string) =>
    get<BaseResponse<FinancialTransaction[]>>(`/financial/transactions/patient?id=${patientId}`);

export const getFinancialSummary = () =>
    get<BaseResponse<FinancialSummary>>('/financial/summary');

export const registerPayment = (body: PaymentRegisterDTO) =>
    post<BaseResponse<string>>('/financial/payments', body);

export const registerAdvance = (body: AdvancePaymentRegisterDTO) =>
    post<BaseResponse<string>>('/financial/advance', body);

export const cancelTransaction = (id: string) =>
    patch<BaseResponse<string>>(`/financial/transactions/${id}/cancel`);
