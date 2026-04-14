const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

async function getToken(): Promise<string> {
    if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers');
        return cookies().get('authToken')?.value ?? '';
    }
    const match = document.cookie.match(/(?:^|;\s*)authToken=([^;]*)/);
    return match?.[1] ?? '';
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
        handleUnauthorized();
    }

    const text = await response.text();
    if (!text) return { object: null } as T;
    return JSON.parse(text) as T;
}

/**
 * Clears the auth cookie and redirects to the login page.
 * Called whenever the API returns 401 (token expired or invalid).
 */
function handleUnauthorized(): never {
    if (typeof window !== 'undefined') {
        document.cookie = 'authToken=; Max-Age=0; path=/';
        window.location.href = '/login';
    }
    throw new Error('Unauthorized');
}

async function buildHeaders(withBody = false): Promise<HeadersInit> {
    const token = await getToken();
    return {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(withBody && { 'Content-Type': 'application/json' }),
    };
}

export async function get<T>(path: string): Promise<T> {
    const response = await fetch(BASE_URL + path, {
        headers: await buildHeaders(),
    });
    return parseResponse<T>(response);
}

export async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(BASE_URL + path, {
        method: 'POST',
        headers: await buildHeaders(true),
        body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
}

export async function put<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(BASE_URL + path, {
        method: 'PUT',
        headers: await buildHeaders(true),
        body: JSON.stringify(body),
    });
    return parseResponse<T>(response);
}

export async function del<T>(path: string): Promise<T> {
    const response = await fetch(BASE_URL + path, {
        method: 'DELETE',
        headers: await buildHeaders(),
    });
    return parseResponse<T>(response);
}

export async function patch<T>(path: string, body?: unknown): Promise<T> {
    const hasBody = body !== undefined;
    const response = await fetch(BASE_URL + path, {
        method: 'PATCH',
        headers: await buildHeaders(hasBody),
        ...(hasBody && { body: JSON.stringify(body) }),
    });
    return parseResponse<T>(response);
}

export async function postMultipart<T>(path: string, formData: FormData): Promise<T> {
    const token = await getToken();
    const response = await fetch(BASE_URL + path, {
        method: 'POST',
        headers: {
            // Content-Type is intentionally omitted — the browser sets it automatically
            // with the correct multipart boundary when body is FormData.
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
    });
    return parseResponse<T>(response);
}
