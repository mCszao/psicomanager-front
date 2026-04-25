export type AlertType = 'MANUAL' | 'SYSTEM';
export type AlertScope = 'PATIENT' | 'SESSION';

export interface IAlert {
    id: string;
    patientId: string;
    sessionId?: string | null;
    type: AlertType;
    scope: AlertScope;
    message: string;
    isActive: boolean;
    createdAt: string;
}

export type AlertRegisterDTO = {
    patientId: string;
    sessionId?: string;
    scope: AlertScope;
    message: string;
};
