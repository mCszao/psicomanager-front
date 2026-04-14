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
} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import CreateSessionDialog from "./create-session-dialog";
import CreatePatientDialog from "./create-patient-dialog";
import SideButton from "./side-button";
import SideLink from "./side-link";
import ThemeSelector from "./theme-selector";

export default function SideLinks() {
    const [isOpenSession, setOpenSession] = useState(false);
    const [isOpenPatient, setOpenPatient] = useState(false);
    const router = useRouter();

    function handleAddSession() {
        setOpenSession(!isOpenSession);
        setOpenPatient(false);
    }

    function handleAddPatient() {
        setOpenPatient(!isOpenPatient);
        setOpenSession(false);
    }

    function handleLogout() {
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/login");
    }

    return (
        <aside className="bg-royalBlue flex flex-col fixed left-0 top-0 w-20 h-full z-50 shadow-2xl">

            {/* Logo / Branding */}
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

            {/* Dialogs */}
            {isOpenSession && (
                <CreateSessionDialog externalFunc={handleAddSession}/>
            )}
            {isOpenPatient && (
                <CreatePatientDialog externalFunc={handleAddPatient}/>
            )}
        </aside>
    );
}
