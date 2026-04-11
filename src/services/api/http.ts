export async function parseResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    if (!text) return { object: null } as T;
    return JSON.parse(text) as T;
}
