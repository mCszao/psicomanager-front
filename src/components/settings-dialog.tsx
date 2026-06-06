'use client';

import { useState } from 'react';
import { X, Sun, Moon, Palette } from 'lucide-react';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';

// ─── Seções disponíveis — adicionar novas aqui no futuro ─────────────────────

type Section = {
    id: string;
    label: string;
};

const SECTIONS: Section[] = [
    { id: 'appearance', label: 'Aparência' },
    // { id: 'notifications', label: 'Notificações' },
    // { id: 'account', label: 'Conta' },
];

// ─── Painel de Aparência ──────────────────────────────────────────────────────

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light',  label: 'Claro',         icon: <Sun    size={16} /> },
    { value: 'dark',   label: 'Escuro',         icon: <Moon   size={16} /> },
    { value: 'custom', label: 'Personalizado',  icon: <Palette size={16} /> },
];

function AppearancePanel() {
    const { mode, customColor, setMode, setCustomColor } = useTheme();
    const [inputColor, setInputColor] = useState(customColor);

    function applyColor(value: string) {
        setInputColor(value);
        setCustomColor(value);
        setMode('custom');
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-sm font-semibold text-content-primary">Tema</h3>
                <p className="text-xs text-content-secondary mt-0.5">
                    Escolha como o sistema vai aparecer para você.
                </p>
            </div>

            {/* Opções de tema */}
            <div className="flex flex-col gap-2">
                {THEME_OPTIONS.map(opt => {
                    const active = mode === opt.value;
                    return (
                        <button
                            key={opt.value}
                            onClick={() => setMode(opt.value)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors text-left ${
                                active
                                    ? 'border-royalBlue bg-royalBlue/5'
                                    : 'border-border-default hover:bg-surface-hover'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                active
                                    ? 'bg-royalBlue text-white'
                                    : 'bg-surface-sunken text-content-secondary'
                            }`}>
                                {opt.icon}
                            </div>
                            <span className={`text-sm font-medium flex-1 ${
                                active ? 'text-royalBlue' : 'text-content-primary'
                            }`}>
                                {opt.label}
                            </span>
                            {/* Radio visual */}
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                active ? 'border-royalBlue' : 'border-border-default'
                            }`}>
                                {active && <div className="w-2 h-2 rounded-full bg-royalBlue" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Color picker — só aparece com custom ativo */}
            {mode === 'custom' && (
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-sunken border border-border-default">
                    <p className="text-xs font-medium text-content-secondary">Cor de fundo</p>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={inputColor.startsWith('#') ? inputColor : '#ffffff'}
                            onChange={e => applyColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border border-border-default p-0.5 bg-transparent shrink-0"
                        />
                        <input
                            type="text"
                            value={inputColor}
                            onChange={e => setInputColor(e.target.value)}
                            onBlur={() => applyColor(inputColor)}
                            onKeyDown={e => e.key === 'Enter' && applyColor(inputColor)}
                            placeholder="#f0f4ff"
                            className="flex-1 text-sm border border-border-default rounded-lg px-3 py-2 bg-surface-raised text-content-primary placeholder:text-content-disabled focus:outline-none focus:ring-2 focus:ring-royalBlue font-mono"
                        />
                    </div>
                    <p className="text-xs text-content-disabled">
                        Aceita hex, rgb ou hsl
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── Mapa de seção → conteúdo ─────────────────────────────────────────────────

const PANELS: Record<string, React.ReactNode> = {
    appearance: <AppearancePanel />,
};

// ─── Modal principal ──────────────────────────────────────────────────────────

type Props = {
    onClose: () => void;
};

export default function SettingsDialog({ onClose }: Props) {
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl h-[480px] bg-surface-raised border border-border-default rounded-2xl shadow-2xl flex overflow-hidden">

                {/* ── Sidebar interna ── */}
                <div className="w-48 shrink-0 border-r border-border-default flex flex-col bg-surface-sunken">
                    {/* Título */}
                    <div className="px-4 py-4 border-b border-border-default">
                        <h2 className="text-sm font-semibold text-content-primary">Configurações</h2>
                    </div>

                    {/* Itens de navegação */}
                    <nav className="flex flex-col gap-0.5 p-2 flex-1">
                        {SECTIONS.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                    activeSection === section.id
                                        ? 'bg-surface-raised text-content-primary font-medium shadow-sm'
                                        : 'text-content-secondary hover:bg-surface-hover hover:text-content-primary'
                                }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>

                    {/* Versão no rodapé */}
                    <div className="px-4 py-3 border-t border-border-default">
                        <p className="text-[11px] text-content-disabled">Psicomanager v1.0</p>
                    </div>
                </div>

                {/* ── Conteúdo ── */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header com botão fechar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border-default shrink-0">
                        <h3 className="text-sm font-semibold text-content-primary">
                            {SECTIONS.find(s => s.id === activeSection)?.label}
                        </h3>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-hover transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Painel ativo */}
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                        {PANELS[activeSection]}
                    </div>
                </div>
            </div>
        </div>
    );
}
