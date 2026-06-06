'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { SESSION_EXPIRED_EVENT } from '@/services/api/http';
import { getMyOrganizations } from '@/services/api/organization-service';

/**
 * Monta-se invisível no layout e faz duas verificações:
 *
 * 1. Sessão expirada — escuta o evento do HTTP client e redireciona para /login.
 * 2. Sem organização ativa — chama /organizations/my e redireciona para /onboarding
 *    caso o usuário não tenha nenhuma organização.
 */
export default function AuthGuard() {
    const router   = useRouter();
    const pathname = usePathname();
    const toast    = useToast();

    // Guard de sessão expirada
    useEffect(() => {
        function handleSessionExpired(event: Event) {
            const message = (event as CustomEvent<{ message: string }>).detail?.message
                ?? 'Sessão expirada. Faça login novamente.';
            toast.error(message);
            setTimeout(() => router.push('/login'), 2000);
        }

        window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
        return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    }, [router, toast]);

    // Guard de organização — só roda em rotas do app, não no onboarding
    useEffect(() => {
        if (pathname === '/onboarding') return;

        async function checkOrganization() {
            try {
                const res = await getMyOrganizations();
                const orgs = res?.object ?? [];
                if (orgs.length === 0) {
                    router.push('/onboarding');
                }
            } catch {
                // Em caso de erro de rede, não redireciona — evita loop em falhas de auth
            }
        }

        checkOrganization();
    }, [pathname, router]);

    return null;
}
