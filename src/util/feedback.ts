import BaseResponse from '@/interface/IBaseResponse';

/**
 * Extrai a mensagem de erro de um BaseResponse da API.
 * Suporta tanto `object: string` quanto `object: Record<string, unknown>` (erros de validação).
 */
export function extractApiError(response: BaseResponse<unknown>): string {
    if (!response.object) return 'Ocorreu um erro inesperado.';
    if (typeof response.object === 'string') return response.object;
    if (typeof response.object === 'object') {
        const messages = Object.values(response.object as Record<string, unknown>).map(String);
        return messages.join('\n');
    }
    return 'Ocorreu um erro inesperado.';
}
