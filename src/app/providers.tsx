'use client';

import {ToastProvider} from '@/contexts/ToastContext';
import ToastContainer from '@/components/ui/toast';

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            {children}
            <ToastContainer/>
        </ToastProvider>
    );
}
