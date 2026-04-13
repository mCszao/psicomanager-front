import { PendingAction } from "@/types/session-action.types";
import { ScheduleRescheduledTo } from "./ISchedule";

export interface ConfirmDialogProps {
    title: string;
    description: string;
    confirmLabel: string;
    confirmClassName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface SessionActionsProps {
    scheduleId: string;
    stage: string;
    dateEnd: string;
    rescheduledTo?: ScheduleRescheduledTo | null;
}

export interface ConfirmActionConfig {
    title: string;
    description: string;
    confirmLabel: string;
    confirmClassName: string;
}

export type ConfirmConfigMap = Record<Exclude<PendingAction, null>, ConfirmActionConfig>;
