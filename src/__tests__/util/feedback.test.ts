import { describe, it, expect } from 'vitest';
import { extractApiError } from '@/util/feedback';
import BaseResponse from '@/interface/IBaseResponse';

// #region extractApiError

describe('extractApiError', () => {
    it('deve retornar mensagem padrão quando object é null', () => {
        const response: BaseResponse<null> = { success: false, object: null };
        expect(extractApiError(response)).toBe('Ocorreu um erro inesperado.');
    });

    it('deve retornar a string diretamente quando object é string', () => {
        const response: BaseResponse<string> = { success: false, object: 'Sessão não encontrada.' };
        expect(extractApiError(response)).toBe('Sessão não encontrada.');
    });

    it('deve juntar mensagens com \\n quando object é um objeto de validação', () => {
        const response: BaseResponse<Record<string, string>> = {
            success: false,
            object: { dateStart: 'Campo obrigatório.', dateEnd: 'Data inválida.' },
        };
        const result = extractApiError(response);
        expect(result).toContain('Campo obrigatório.');
        expect(result).toContain('Data inválida.');
        expect(result).toContain('\n');
    });

    it('deve retornar mensagem padrão para tipo inesperado (number)', () => {
        const response = { success: false, object: 42 } as BaseResponse<unknown>;
        expect(extractApiError(response)).toBe('Ocorreu um erro inesperado.');
    });
});

// #endregion
