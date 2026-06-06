'use client';

import {
    LayoutDashboard,
    UsersRound,
    CalendarDays,
    CalendarPlus,
    UserPlus,
    FileText,
    BarChart3,
    Settings,
    HelpCircle,
    BrainCircuit,
    LogOut,
    Layers,
    DollarSign,
    Building2,
    ChevronLeft,
} from 'lucide-react';
import { ElementType, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CreateSessionDialog from './create-session-dialog';
import CreatePatientDialog from './create-patient-dialog';
import OrgSwitcher from './org-switcher';
import SettingsDialog from './settings-dialog';
import { useSidebar } from '@/contexts/SidebarContext';
import { signOut } from '@/services/api';

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function Tooltip({ label, warn }: { label: string; warn?: boolean }) {
    return (
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
            <div className="bg-gray-900 text-white text-xs font-medium rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                <p>{label}</p>
                {warn && <p className="text-yellow-400 mt-0.5">⚠ Não implementado</p>}
            </div>
        </div>
    );
}

// ─── NavRow — base de alinhamento para todos os itens ────────────────────────
//
// Garante que TODOS os itens da sidebar tenham exatamente a mesma estrutura:
//   [ícone 36×36] [label com overflow hidden]
//
// O wrapper tem h-9 fixo, sem py, sem margin vertical no ícone.
// O espaçamento vertical entre itens é controlado pelo gap do nav pai.

function NavRow({
    icon: Icon,
    label,
    iconClass = 'text-blue-100',
    labelClass = 'text-blue-100',
    rowClass = '',
    children,
}: {
    icon: ElementType;
    label: string;
    iconClass?: string;
    labelClass?: string;
    rowClass?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className={`flex items-center h-9 w-full rounded-xl ${rowClass}`}>
            {/* Ícone — sempre centralizado, 36px, nunca muda */}
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <Icon size={18} className={iconClass} />
            </div>
            {/* Label — aparece/desaparece via CSS da sidebar */}
            <span className={`nav-label text-[13px] font-medium leading-none ${labelClass}`}>
                {label}
            </span>
            {children}
        </div>
    );
}

// ─── NavLink ─────────────────────────────────────────────────────────────────

function NavLink({
    path,
    icon,
    label,
    implemented = true,
    expanded,
}: {
    path: string;
    icon: ElementType;
    label: string;
    implemented?: boolean;
    expanded: boolean;
}) {
    const pathname = usePathname();
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    const [hovered, setHovered] = useState(false);

    const activeIcon  = isActive ? 'text-white'    : 'text-blue-100';
    const activeLabel = isActive ? 'text-white'    : 'text-blue-100';
    const activeBg    = isActive ? 'bg-white/20'   : 'hover:bg-white/10';

    if (!implemented) {
        return (
            <div
                className="relative mx-2"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <NavRow
                    icon={icon}
                    label={label}
                    iconClass="text-blue-200 opacity-40"
                    labelClass="text-blue-200 opacity-40"
                    rowClass="cursor-not-allowed"
                />
                {hovered && !expanded && <Tooltip label={label} warn />}
            </div>
        );
    }

    return (
        <div
            className="relative mx-2"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href={path} className={`block rounded-xl transition-colors duration-150 ${activeBg}`}>
                <NavRow icon={icon} label={label} iconClass={activeIcon} labelClass={activeLabel} />
            </Link>
            {hovered && !expanded && <Tooltip label={label} />}
        </div>
    );
}

// ─── NavButton ────────────────────────────────────────────────────────────────

function NavButton({
    icon,
    label,
    onClick,
    variant = 'default',
    expanded,
}: {
    icon: ElementType;
    label: string;
    onClick: () => void;
    variant?: 'default' | 'danger';
    expanded: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    const isDanger = variant === 'danger';

    return (
        <div
            className="relative mx-2"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button
                onClick={onClick}
                className={`block w-full rounded-xl transition-colors duration-150 ${
                    isDanger ? 'hover:bg-red-500/20' : 'hover:bg-white/10'
                }`}
            >
                <NavRow
                    icon={icon}
                    label={label}
                    iconClass={isDanger ? 'text-red-300' : 'text-blue-100'}
                    labelClass={isDanger ? 'text-red-300' : 'text-blue-100'}
                />
            </button>
            {hovered && !expanded && <Tooltip label={label} />}
        </div>
    );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="nav-section px-3 pt-3 pb-0.5">
            <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                {label}
            </span>
        </div>
    );
}

function Separator() {
    return <div className="mx-3 my-1 border-t border-white/10" />;
}

// ─── Sidebar principal ────────────────────────────────────────────────────────

export default function SideLinks() {
    const { expanded, setExpanded } = useSidebar();
    const [isOpenSession, setOpenSession] = useState(false);
    const [isOpenPatient, setOpenPatient] = useState(false);
    const [isOpenSettings, setOpenSettings] = useState(false);
    const pathname = usePathname();

    function handleAddSession() { setOpenSession(v => !v); setOpenPatient(false); }
    function handleAddPatient() { setOpenPatient(v => !v); setOpenSession(false); }

    async function handleLogout() {
        try { await signOut(); } finally {
            document.cookie = 'username=; Max-Age=0; path=/';
            // Hard navigation — limpa o Router cache e força releitura dos cookies
            window.location.href = '/login';
        }
    }

    const mobileNavItems = [
        { path: '/', icon: LayoutDashboard, label: 'Início' },
        { path: '/patients', icon: UsersRound, label: 'Pacientes' },
        { path: '/schedules', icon: CalendarDays, label: 'Agenda' },
        { path: '/financial', icon: DollarSign, label: 'Financeiro' },
    ];

    return (
        <>
            {/* ── Sidebar desktop ───────────────────────────────────────── */}
            <aside
                className={`psico-sidebar ${expanded ? 'expanded' : ''} hidden md:flex bg-royalBlue flex-col fixed left-0 top-0 h-full z-50 shadow-2xl`}
            >
                {/* Header: logo + botão colapsar */}
                <div className="flex items-center h-14 border-b border-white/10 shrink-0">
                    {/* Ícone do logo — alinhado com os itens do nav */}
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 ml-[10px]">
                        <BrainCircuit size={22} className="text-white" />
                    </div>

                    {/* Nome — visível só quando expandida */}
                    <span className="nav-label text-sm font-semibold text-white ml-2 flex-1 min-w-0 truncate">
                        Psicomanager
                    </span>

                    {/* Botão de colapsar — dentro da sidebar, canto direito */}
                    <button
                        onClick={() => setExpanded(false)}
                        className={`nav-label w-7 h-7 rounded-lg flex items-center justify-center mr-2 shrink-0 hover:bg-white/15 transition-all duration-200 ${
                            expanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                        aria-label="Colapsar menu"
                    >
                        <ChevronLeft size={15} className="text-white/70" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex flex-col flex-1 pt-2 gap-0.5 overflow-y-auto overflow-x-hidden">

                    {/* Overlay clicável para expandir quando colapsada */}
                    {!expanded && (
                        <button
                            onClick={() => setExpanded(true)}
                            className="absolute inset-0 z-10 bg-transparent cursor-pointer"
                            aria-label="Expandir menu"
                            style={{ top: 56 }}
                        />
                    )}

                    <NavLink path="/" icon={LayoutDashboard} label="Dashboard" expanded={expanded} />

                    <SectionLabel label="Clínica" />
                    <NavLink path="/patients"  icon={UsersRound}   label="Pacientes"     expanded={expanded} />
                    <NavLink path="/schedules" icon={CalendarDays} label="Agendamentos"   expanded={expanded} />
                    <NavLink path="/financial" icon={DollarSign}   label="Financeiro"     expanded={expanded} />

                    <SectionLabel label="Ações rápidas" />
                    <NavButton icon={CalendarPlus} label="Nova sessão"   onClick={handleAddSession} expanded={expanded} />
                    <NavButton icon={UserPlus}     label="Novo paciente" onClick={handleAddPatient} expanded={expanded} />

                    <SectionLabel label="Configurar" />
                    <NavLink path="/settings/plan-templates" icon={Layers}   label="Templates"    expanded={expanded} />
                    <NavLink path="/organization"            icon={Building2} label="Organização"  expanded={expanded} />
                    <NavLink path="/reports"   icon={FileText}  label="Relatórios"   implemented={false} expanded={expanded} />
                    <NavLink path="/analytics" icon={BarChart3} label="Estatísticas" implemented={false} expanded={expanded} />
                </nav>

                {/* Rodapé */}
                <div className="border-t border-white/10 pt-2 pb-3 flex flex-col gap-0.5 shrink-0">
                    <OrgSwitcher expanded={expanded} />
                    <Separator />
                    <NavButton icon={Settings} label="Configurações" onClick={() => setOpenSettings(true)} expanded={expanded} />
                    <NavLink path="/help"     icon={HelpCircle} label="Ajuda"         implemented={false} expanded={expanded} />
                    <NavButton icon={LogOut} label="Sair" onClick={handleLogout} variant="danger" expanded={expanded} />
                </div>
            </aside>

            {/* ── Bottom nav mobile ─────────────────────────────────────── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-royalBlue border-t border-white/10 flex items-center justify-around px-2 h-16 shadow-2xl">
                {mobileNavItems.map(({ path, icon: Icon, label }) => {
                    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
                    return (
                        <a
                            key={path}
                            href={path}
                            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                                isActive ? 'bg-white/20' : 'hover:bg-white/10'
                            }`}
                        >
                            <Icon size={20} className={isActive ? 'text-white' : 'text-blue-200'} />
                            <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-blue-200'}`}>
                                {label}
                            </span>
                        </a>
                    );
                })}
                <button
                    onClick={handleAddSession}
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                    <CalendarPlus size={20} className="text-blue-200" />
                    <span className="text-[10px] font-medium text-blue-200">Sessão</span>
                </button>
            </nav>

            {isOpenSession && <CreateSessionDialog externalFunc={handleAddSession} />}
            {isOpenPatient && <CreatePatientDialog externalFunc={handleAddPatient} />}
            {isOpenSettings && <SettingsDialog onClose={() => setOpenSettings(false)} />}
        </>
    );
}
