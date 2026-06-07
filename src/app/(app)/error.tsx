'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WifiOff, AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Error boundary do grupo (app). Renderiza dentro do shell autenticado
 * (sidebar + conteúdo principal), então o usuário mantém a navegação.
 *
 * Distingue falha de conexão com o servidor (ConnectionError, identificada
 * pelo `digest`) de outros erros de renderização, e em ambos os casos não
 * carrega dados — apenas informa e oferece nova tentativa.
 */
export default function AppError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();
    const isConnection = error.digest === 'CONNECTION_ERROR';

    useEffect(() => {
        console.error(error);
    }, [error]);

    function retry() {
        // Revalida os dados server-side antes de re-renderizar o segmento.
        router.refresh();
        reset();
    }

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-content-secondary">
                {isConnection ? <WifiOff size={26} /> : <AlertTriangle size={26} />}
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-lg font-semibold text-content-primary">
                    {isConnection ? 'Sem conexão com o servidor' : 'Algo deu errado'}
                </h1>
                <p className="text-sm text-content-secondary max-w-sm">
                    {isConnection
                        ? 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente em instantes.'
                        : 'Ocorreu um erro ao carregar esta página. Tente novamente.'}
                </p>
            </div>

            <button
                onClick={retry}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-royalBlue text-white hover:opacity-90 transition-opacity font-medium"
            >
                <RefreshCw size={15} /> Tentar novamente
            </button>
        </div>
    );
}
