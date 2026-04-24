import { buildUrl, UnauthorizedError } from './http-core';

// region Session events

const SESSION_EXPIRED_EVENT = 'psico:session-expired';

/**
 * Dispatches a custom event carrying the message to be shown in the toast.
 * Any mounted AuthGuard listener will pick this up and handle the redirect.
 */
function dispatchSessionExpired(message: string) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail: { message } }));
    }
}

export { SESSION_EXPIRED_EVENT };

// endregion

// region Response parsing

async function parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
        const text = await response.text();
        let message = 'Sessão expirada. Faça login novamente.';
        try {
            const body = JSON.parse(text);
            if (body?.object && typeof body.object === 'string') {
                message = body.object;
            }
        } catch { /* ignore parse errors */ }

        throw new UnauthorizedError(message);
    }

    const text = await response.text();
    if (!text) return { object: null } as T;
    return JSON.parse(text) as T;
}

// endregion

// region Token refresh

/**
 * Attempts POST /auth/refresh.
 * Returns true if a new access token was successfully issued.
 */
async function attemptRefresh(): Promise<boolean> {
    try {
        const response = await fetch(buildUrl('/auth/refresh'), {
            method: 'POST',
            credentials: 'include',
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Fires the session-expired event (which triggers toast + redirect)
 * and throws to stop the current execution chain.
 */
function handleUnauthorized(message: string): never {
    document.cookie = 'username=; Max-Age=0; path=/';
    dispatchSessionExpired(message);
    throw new UnauthorizedError(message);
}

// endregion

// region Request executor

async function executeWithRefresh<T>(requestFn: () => Promise<Response>): Promise<T> {
    try {
        const response = await requestFn();
        return await parseResponse<T>(response);
    } catch (err) {
        if (!(err instanceof UnauthorizedError)) throw err;

        const refreshed = await attemptRefresh();
        if (!refreshed) {
            handleUnauthorized(err.message);
        }

        // Retry with the new access token now in the cookie
        const retryResponse = await requestFn();
        return await parseResponse<T>(retryResponse);
    }
}

// endregion

// region HTTP methods

export async function get<T>(path: string): Promise<T> {
    return executeWithRefresh(() =>
        fetch(buildUrl(path), { credentials: 'include' })
    );
}

export async function post<T>(path: string, body: unknown): Promise<T> {
    return executeWithRefresh(() =>
        fetch(buildUrl(path), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        })
    );
}

export async function put<T>(path: string, body: unknown): Promise<T> {
    return executeWithRefresh(() =>
        fetch(buildUrl(path), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        })
    );
}

export async function del<T>(path: string): Promise<T> {
    return executeWithRefresh(() =>
        fetch(buildUrl(path), {
            method: 'DELETE',
            credentials: 'include',
        })
    );
}

export async function patch<T>(path: string, body?: unknown): Promise<T> {
    const hasBody = body !== undefined;
    return executeWithRefresh(() =>
        fetch(buildUrl(path), {
            method: 'PATCH',
            credentials: 'include',
            ...(hasBody && {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }),
        })
    );
}

export async function postMultipart<T>(path: string, formData: FormData): Promise<T> {
    return executeWithRefresh(() =>
        fetch(buildUrl(path), {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
    );
}

// endregion
