'use client';

import { useToasts, ToastType } from '@/contexts/ToastContext';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

const STYLES: Record<ToastType, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error:   'bg-red-50   border-red-200   text-red-800',
    info:    'bg-blue-50  border-blue-200  text-blue-800',
};

const ICONS: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 size={16} className="text-green-600 shrink-0" />,
    error:   <XCircle      size={16} className="text-red-600   shrink-0" />,
    info:    <Info         size={16} className="text-blue-600  shrink-0" />,
};

export default function ToastContainer() {
    const toasts = useToasts();
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 w-80">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`flex items-start gap-2.5 px-4 py-3 rounded-lg border shadow-md text-sm animate-fade-in ${STYLES[t.type]}`}
                >
                    {ICONS[t.type]}
                    <span className="flex-1 leading-snug">{t.message}</span>
                </div>
            ))}
        </div>
    );
}
