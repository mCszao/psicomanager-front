import { CheckCircle2, CalendarClock, UserX, XCircle } from "lucide-react";
import { PendingAction } from "@/types/session-action.types";

type Props = {
    loading: boolean;
    onAction: (action: PendingAction) => void;
    onReschedule: () => void;
};

type ActionButtonProps = {
    onClick: () => void;
    disabled: boolean;
    icon: React.ReactNode;
    label: string;
    className: string;
};

function ActionButton({ onClick, disabled, icon, label, className }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {icon}
            <span className="hidden sm:inline md:hidden lg:inline">
                {disabled ? "Processando..." : label}
            </span>
            <span className="sm:hidden lg:hidden">
                {disabled ? "..." : label}
            </span>
        </button>
    );
}

export default function SessionActionButtons({ loading, onAction, onReschedule }: Props) {
    return (
        /* Grid 2x2 em mobile, coluna única em desktop */
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            <ActionButton
                onClick={() => onAction('conclude')}
                disabled={loading}
                icon={<CheckCircle2 size={16} className="shrink-0" />}
                label="Concluir sessão"
                className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
            />
            <ActionButton
                onClick={onReschedule}
                disabled={loading}
                icon={<CalendarClock size={16} className="shrink-0" />}
                label="Reagendar"
                className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            />
            <ActionButton
                onClick={() => onAction('absent')}
                disabled={loading}
                icon={<UserX size={16} className="shrink-0" />}
                label="Marcar falta"
                className="bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100"
            />
            <ActionButton
                onClick={() => onAction('cancel')}
                disabled={loading}
                icon={<XCircle size={16} className="shrink-0" />}
                label="Cancelar sessão"
                className="text-red-600 border border-red-200 hover:bg-red-50"
            />
        </div>
    );
}
