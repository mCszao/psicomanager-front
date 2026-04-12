'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    toasts: Toast[];
    toast: {
        success: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
    };
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION_MS = 3500;

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const counter = useRef(0);

    const add = useCallback((message: string, type: ToastType) => {
        const id = ++counter.current;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, DURATION_MS);
    }, []);

    const toast = {
        success: (message: string) => add(message, 'success'),
        error:   (message: string) => add(message, 'error'),
        info:    (message: string) => add(message, 'info'),
    };

    return (
        <ToastContext.Provider value={{ toasts, toast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx.toast;
}

export function useToasts() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToasts must be used inside <ToastProvider>');
    return ctx.toasts;
}
