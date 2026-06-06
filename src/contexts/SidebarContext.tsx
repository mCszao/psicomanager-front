'use client';

import { createContext, useContext, useState } from 'react';

interface SidebarContextValue {
    expanded: boolean;
    setExpanded: (v: boolean) => void;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <SidebarContext.Provider value={{ expanded, setExpanded, toggle: () => setExpanded(v => !v) }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error('useSidebar must be used inside <SidebarProvider>');
    return ctx;
}
