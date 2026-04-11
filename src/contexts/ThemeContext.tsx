"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeMode = 'light' | 'dark' | 'custom';

interface ThemeContextValue {
    mode: ThemeMode;
    customColor: string;
    setMode: (mode: ThemeMode) => void;
    setCustomColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode]               = useState<ThemeMode>('light');
    const [customColor, setCustomColor] = useState('#ffffff');

    useEffect(() => {
        const savedMode  = localStorage.getItem('theme-mode') as ThemeMode | null;
        const savedColor = localStorage.getItem('theme-custom-color');
        if (savedMode)  setMode(savedMode);
        if (savedColor) setCustomColor(savedColor);
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        if (mode === 'dark') html.classList.add('dark');
        else html.classList.remove('dark');

        document.body.style.backgroundColor = mode === 'custom' ? customColor : '';

        localStorage.setItem('theme-mode', mode);
    }, [mode, customColor]);

    useEffect(() => {
        localStorage.setItem('theme-custom-color', customColor);
    }, [customColor]);

    return (
        <ThemeContext.Provider value={{ mode, customColor, setMode, setCustomColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
