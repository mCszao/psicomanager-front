'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { SESSION_EXPIRED_EVENT } from '@/services/api/http';

/**
 * Mounts invisibly inside the app layout and listens for session-expired
 * events dispatched by the HTTP client when a 401 cannot be recovered via refresh.
 *
 * On receiving the event it shows a toast with the server message and redirects
 * to /login, ensuring the user always gets feedback before being logged out.
 */
export default function AuthGuard() {
    const router = useRouter();
    const toast  = useToast();

    useEffect(() => {
        function handleSessionExpired(event: Event) {
            const message = (event as CustomEvent<{ message: string }>).detail?.message
                ?? 'Sessão expirada. Faça login novamente.';

            toast.error(message);

            setTimeout(() => {
                router.push('/login');
            }, 2000); // give the toast time to be read before navigating
        }

        window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
        return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    }, [router, toast]);

    return null;
}
