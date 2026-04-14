'use client';

import { useToasts, ToastType } from '@/contexts/ToastContext';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

const STYLES: Record<ToastType, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error:   'bg-red-100  border-red-400   text-red-900',
    info:    'bg-blue-50  border-blue-200  text-blue-800',
};

const ICONS: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 size={18} className="text-green-600 shrink-0" />,
    error:   <XCircle      size={20} className="text-red-600   shrink-0" />,
    info:    <Info         size={18} className="text-blue-600  shrink-0" />,
};

export default function ToastContainer() {
    const toasts = useToasts();
    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 w-96">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`flex items-start gap-3 px-4 py-3.5 rounded-lg border shadow-md text-sm animate-fade-in ${STYLES[t.type]}`}
                >
                    {ICONS[t.type]}
                    <span className={`flex-1 leading-snug ${t.type === 'error' ? 'font-medium' : ''}`}>
                        {t.message}
                    </span>
                </div>
            ))}
        </div>
    );
}
