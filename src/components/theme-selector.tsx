"use client";

import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Palette } from "lucide-react";
import { useTheme, ThemeMode } from "@/contexts/ThemeContext";

const OPTIONS: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light',  label: 'Claro',   icon: <Sun  size={14} /> },
    { value: 'dark',   label: 'Escuro',  icon: <Moon size={14} /> },
    { value: 'custom', label: 'Custom',  icon: <Palette size={14} /> },
];

export default function ThemeSelector() {
    const { mode, customColor, setMode, setCustomColor } = useTheme();
    const [isOpen, setIsOpen]       = useState(false);
    const [inputColor, setInputColor] = useState(customColor);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setInputColor(customColor); }, [customColor]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    function applyCustomColor(value: string) {
        setInputColor(value);
        setCustomColor(value);
        setMode('custom');
    }

    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={() => setIsOpen(o => !o)}
                className="flex flex-col items-center gap-1 w-full py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
                <Palette size={20} />
                <span className="text-[10px]">Tema</span>
            </button>

            {isOpen && (
                <div className="absolute left-[5.5rem] bottom-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 z-50">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Aparência
                    </p>

                    <div className="flex gap-2 mb-4">
                        {OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    setMode(opt.value);
                                    if (opt.value !== 'custom') setIsOpen(false);
                                }}
                                className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-lg text-xs font-medium border transition-colors
                                    ${mode === opt.value
                                        ? 'bg-royalBlue text-white border-royalBlue'
                                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                {opt.icon}
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {mode === 'custom' && (
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Cor de fundo</p>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="color"
                                    value={inputColor.startsWith('#') ? inputColor : '#ffffff'}
                                    onChange={e => applyCustomColor(e.target.value)}
                                    className="w-9 h-9 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600 p-0.5 bg-transparent"
                                />
                                <input
                                    type="text"
                                    value={inputColor}
                                    onChange={e => setInputColor(e.target.value)}
                                    onBlur={() => applyCustomColor(inputColor)}
                                    onKeyDown={e => e.key === 'Enter' && applyCustomColor(inputColor)}
                                    placeholder="Ex: #f0f4ff"
                                    className="flex-1 text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-300"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
