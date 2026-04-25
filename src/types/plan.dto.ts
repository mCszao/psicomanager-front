export type FrequencyEnum = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

export const FREQUENCY_LABEL: Record<FrequencyEnum, string> = {
    DAILY: 'Diário',
    WEEKLY: 'Semanal',
    BIWEEKLY: 'Quinzenal',
    MONTHLY: 'Mensal',
};

export type PlanTemplateDTO = {
    title: string;
    pricePerSession: number;
    sessionsCount: number;
    frequency: FrequencyEnum;
};

export type PlanRegisterDTO = {
    patientId: string;
    planTemplateId?: string;
    title?: string;
    pricePerSession?: number;
    sessionsCount?: number;
    frequency?: FrequencyEnum;
    adherenceDate: string;
    estimatedEndDate?: string;
    isContinuous: boolean;
    generateSessions: boolean;
    sessionStartTime?: string;
};
