const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

// region Errors

export class UnauthorizedError extends Error {
    constructor(message = 'Sessão expirada. Faça login novamente.') {
        super(message);
    }
}

/**
 * Lançada quando o `fetch` rejeita antes de obter uma resposta — ou seja, o
 * servidor está indisponível/offline (ECONNREFUSED, DNS, timeout de rede).
 *
 * O `digest` é preservado pelo Next ao propagar o erro de um Server Component
 * para o `error.tsx`, permitindo distinguir falha de conexão de outros erros
 * mesmo em produção (onde a `message` é omitida).
 */
export class ConnectionError extends Error {
    digest = 'CONNECTION_ERROR';
    constructor(message = 'Não foi possível conectar ao servidor.') {
        super(message);
        this.name = 'ConnectionError';
    }
}

// endregion

// region Shared fetch builder

export function buildUrl(path: string): string {
    return BASE_URL + path;
}

// endregion
