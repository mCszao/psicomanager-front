'use client';

import { useSidebar } from '@/contexts/SidebarContext';

export default function MainContent({ children }: { children: React.ReactNode }) {
    const { expanded } = useSidebar();

    return (
        <main
            className="pb-16 md:pb-0 h-screen overflow-hidden transition-all duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
                paddingLeft: expanded ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width-collapsed)',
            }}
        >
            {children}
        </main>
    );
}
