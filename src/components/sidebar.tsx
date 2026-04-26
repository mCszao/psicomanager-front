'use client'
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
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import CreateSessionDialog from "./create-session-dialog";
import CreatePatientDialog from "./create-patient-dialog";
import SideButton from "./side-button";
import SideLink from "./side-link";
import ThemeSelector from "./theme-selector";
import { signOut } from "@/services/api";

export default function SideLinks() {
    const [isOpenSession, setOpenSession] = useState(false);
    const [isOpenPatient, setOpenPatient] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    function handleAddSession() {
        setOpenSession(!isOpenSession);
        setOpenPatient(false);
    }

    function handleAddPatient() {
        setOpenPatient(!isOpenPatient);
        setOpenSession(false);
    }

    async function handleLogout() {
        try {
            await signOut();
        } finally {
            document.cookie = 'username=; Max-Age=0; path=/';
            router.push("/login");
        }
    }

    // Links exibidos no bottom nav mobile (itens principais apenas)
    const mobileNavItems = [
        { path: "/", icon: LayoutDashboard, label: "Início" },
        { path: "/patients", icon: UsersRound, label: "Pacientes" },
        { path: "/schedules", icon: CalendarDays, label: "Agenda" },
        { path: "/settings/plan-templates", icon: Layers, label: "Templates" },
    ];

    return (
        <>
            {/* ── Sidebar desktop (md+) ─────────────────────────────── */}
            <aside className="hidden md:flex bg-royalBlue flex-col fixed left-0 top-0 w-20 h-full z-50 shadow-2xl">

                {/* Logo */}
                <div className="flex items-center justify-center h-16 border-b border-white/10 shrink-0">
                    <BrainCircuit size={26} className="text-white"/>
                </div>

                {/* Navegação principal */}
                <nav className="flex flex-col pt-4 flex-1">
                    <SideLink path="/" icon={LayoutDashboard} label="Dashboard"/>
                    <div className="my-2 mx-4 border-t border-white/10"/>
                    <SideLink path="/patients" icon={UsersRound} label="Pacientes"/>
                    <SideLink path="/schedules" icon={CalendarDays} label="Agendamentos"/>
                    <SideLink path="/reports" icon={FileText} label="Relatórios" implemented={false}/>
                    <SideLink path="/analytics" icon={BarChart3} label="Estatísticas" implemented={false}/>
                    <SideLink path="/settings/plan-templates" icon={Layers} label="Templates"/>
                    <div className="my-2 mx-4 border-t border-white/10"/>
                    <SideButton icon={CalendarPlus} label="Nova Sessão" onClick={handleAddSession}/>
                    <SideButton icon={UserPlus} label="Novo Paciente" onClick={handleAddPatient}/>
                </nav>

                {/* Rodapé */}
                <div className="flex flex-col pb-4 border-t border-white/10 pt-2">
                    <SideLink path="/help" icon={HelpCircle} label="Ajuda" implemented={false}/>
                    <SideLink path="/settings" icon={Settings} label="Configurações" implemented={false}/>
                    <ThemeSelector/>
                    <div className="my-2 mx-4 border-t border-white/10"/>
                    <SideButton icon={LogOut} label="Sair" onClick={handleLogout} variant="danger"/>
                </div>
            </aside>

            {/* ── Bottom nav mobile (< md) ──────────────────────────── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-royalBlue border-t border-white/10 flex items-center justify-around px-2 h-16 shadow-2xl">
                {mobileNavItems.map(({ path, icon: Icon, label }) => {
                    const isActive = pathname === path || (path !== "/" && pathname.startsWith(path));
                    return (
                        <a
                            key={path}
                            href={path}
                            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors
                                ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}
                        >
                            <Icon size={20} className={isActive ? "text-white" : "text-blue-200"}/>
                            <span className={`text-[10px] font-medium ${isActive ? "text-white" : "text-blue-200"}`}>
                                {label}
                            </span>
                        </a>
                    );
                })}
                <button
                    onClick={handleAddSession}
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                    <CalendarPlus size={20} className="text-blue-200"/>
                    <span className="text-[10px] font-medium text-blue-200">Sessão</span>
                </button>
            </nav>

            {/* Dialogs */}
            {isOpenSession && <CreateSessionDialog externalFunc={handleAddSession}/>}
            {isOpenPatient && <CreatePatientDialog externalFunc={handleAddPatient}/>}
        </>
    );
}
