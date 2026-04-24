import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { buildUrl, UnauthorizedError } from './http-core';

// region Response parsing

async function parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
        throw new UnauthorizedError();
    }
    const text = await response.text();
    if (!text) return { object: null } as T;
    return JSON.parse(text) as T;
}

// endregion

// region Headers

/**
 * Builds request headers for server-side fetches, forwarding the authToken
 * HttpOnly cookie as a Cookie header so the API can authenticate the request.
 */
async function buildServerHeaders(withBody = false): Promise<HeadersInit> {
    const cookieStore = cookies();
    const authToken = cookieStore.get('authToken')?.value;

    return {
        ...(authToken && { Cookie: `authToken=${authToken}` }),
        ...(withBody && { 'Content-Type': 'application/json' }),
    };
}

// endregion

// region Request executor

/**
 * Executes a server-side fetch. On 401, redirects immediately to /login —
 * token refresh is not possible in Server Components.
 */
async function executeServer<T>(requestFn: () => Promise<Response>): Promise<T> {
    try {
        const response = await requestFn();
        return await parseResponse<T>(response);
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            redirect('/login');
        }
        throw err;
    }
}

// endregion

// region HTTP methods

export async function serverGet<T>(path: string): Promise<T> {
    const headers = await buildServerHeaders();
    return executeServer(() =>
        fetch(buildUrl(path), {
            headers,
            cache: 'no-store',
        })
    );
}

export async function serverPost<T>(path: string, body: unknown): Promise<T> {
    const headers = await buildServerHeaders(true);
    return executeServer(() =>
        fetch(buildUrl(path), {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
    );
}

export async function serverPatch<T>(path: string, body?: unknown): Promise<T> {
    const hasBody = body !== undefined;
    const headers = await buildServerHeaders(hasBody);
    return executeServer(() =>
        fetch(buildUrl(path), {
            method: 'PATCH',
            headers,
            ...(hasBody && { body: JSON.stringify(body) }),
        })
    );
}

// endregion
