import { ConfirmConfigMap } from "@/interface/ISessionActions";

export const CLOSED_STAGES: string[] = ['CANCELLED', 'CONCLUDED', 'ABSENT', 'RESCHEDULED'];

export const CONFIRM_CONFIG: ConfirmConfigMap = {
    conclude: {
        title: "Concluir sessão",
        description: "Tem certeza que deseja concluir esta sessão? Esta ação não poderá ser desfeita.",
        confirmLabel: "Concluir",
        confirmClassName: "bg-green-600 hover:bg-green-700 text-white",
    },
    cancel: {
        title: "Cancelar sessão",
        description: "Tem certeza que deseja cancelar esta sessão? Esta ação não poderá ser desfeita.",
        confirmLabel: "Cancelar sessão",
        confirmClassName: "bg-red-600 hover:bg-red-700 text-white",
    },
    absent: {
        title: "Marcar falta",
        description: "Tem certeza que deseja registrar falta para esta sessão? Esta ação não poderá ser desfeita.",
        confirmLabel: "Marcar falta",
        confirmClassName: "bg-orange-500 hover:bg-orange-600 text-white",
    },
};
