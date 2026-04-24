const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

// region Errors

export class UnauthorizedError extends Error {
    constructor(message = 'Sessão expirada. Faça login novamente.') {
        super(message);
    }
}

// endregion

// region Shared fetch builder

export function buildUrl(path: string): string {
    return BASE_URL + path;
}

// endregion
