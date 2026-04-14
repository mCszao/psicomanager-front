import { StageEnum, AttendanceTypeEnum } from '@/types/schedule.dto';

export const WEEKDAYS     = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const MONTHS       = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
export const MONTHS_SHORT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

export const FIRST_HOUR  = 0;
export const LAST_HOUR   = 23;
export const HOUR_HEIGHT = 64;
export const HOURS       = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => i + FIRST_HOUR);

// #region Stage

export type StagePresentation = {
    color: string;
    ptStage: string;
};

export const STAGE_MAP: Record<StageEnum, StagePresentation> = {
    OPENED:      { color: 'blue',   ptStage: 'ABERTO'    },
    CONCLUDED:   { color: 'green',  ptStage: 'CONCLUIDO' },
    CANCELLED:   { color: 'red',    ptStage: 'CANCELADO' },
    RESCHEDULED: { color: 'dark',   ptStage: 'REMARCADO' },
    ABSENT:      { color: 'orange', ptStage: 'FALTA'     },
};

const STAGE_FALLBACK: StagePresentation = { color: 'yellow', ptStage: 'Status não catalogado' };

export function getStagePresentation(stage: StageEnum | string): StagePresentation {
    return STAGE_MAP[stage as StageEnum] ?? STAGE_FALLBACK;
}

// #endregion

// #region AttendanceType

export type TypePresentation = {
    color: string;
    ptType: string;
    icon: string;
};

export const TYPE_MAP: Record<AttendanceTypeEnum, TypePresentation> = {
    PRESENTIAL: { color: 'indigo', ptType: 'PRESENCIAL', icon: '🏢' },
    REMOTE:     { color: 'teal',   ptType: 'REMOTO',     icon: '💻' },
};

const TYPE_FALLBACK: TypePresentation = { color: 'indigo', ptType: 'PRESENCIAL', icon: '🏢' };

export function getTypePresentation(type: AttendanceTypeEnum | string | undefined): TypePresentation {
    return TYPE_MAP[type as AttendanceTypeEnum] ?? TYPE_FALLBACK;
}

// #endregion

export const STAGE_STYLES: Record<string, string> = {
    blue:   'bg-blue-100 text-blue-700 border-blue-200',
    green:  'bg-green-100 text-green-700 border-green-200',
    red:    'bg-red-100 text-red-700 border-red-200',
    dark:   'bg-gray-100 text-gray-700 border-gray-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
};

export const STAGE_CARD_STYLES: Record<string, string> = {
    blue:   'bg-blue-500 hover:bg-blue-600 text-white',
    green:  'bg-green-500 hover:bg-green-600 text-white',
    red:    'bg-red-500 hover:bg-red-600 text-white',
    dark:   'bg-gray-500 hover:bg-gray-600 text-white',
    yellow: 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900',
    orange: 'bg-orange-500 hover:bg-orange-600 text-white',
};

export const TYPE_STYLES: Record<string, string> = {
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    teal:   'bg-teal-100 text-teal-700 border-teal-200',
};

export function parseDate(dateStr: string): Date {
    const [datePart, timePart = '00:00:00'] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [h, m, s = 0] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, h, m, s);
}

export function isSameDay(a: Date, b: Date): boolean {
    return a.getDate() === b.getDate()
        && a.getMonth() === b.getMonth()
        && a.getFullYear() === b.getFullYear();
}

export function getWeekStart(date: Date): Date {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
}

export function formatTime(d: Date): string {
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
