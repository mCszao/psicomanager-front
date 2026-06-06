import { describe, it, expect } from 'vitest';
import {
    parseDate,
    isSameDay,
    getWeekStart,
    formatTime,
    getStagePresentation,
    getTypePresentation,
    STAGE_MAP,
    TYPE_MAP,
    MONTHS,
    MONTHS_SHORT,
    WEEKDAYS,
} from '@/util/calendarUtils';
import { StageEnum, AttendanceTypeEnum } from '@/types/schedule.dto';

// #region parseDate

describe('parseDate', () => {
    it('deve converter "dd-MM-yyyy HH:mm:ss" para um objeto Date correto', () => {
        const date = parseDate('25-04-2025 14:30:00');
        expect(date.getFullYear()).toBe(2025);
        expect(date.getMonth()).toBe(3); // abril = índice 3
        expect(date.getDate()).toBe(25);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(30);
    });

    it('deve usar 00:00:00 como horário padrão quando não informado', () => {
        const date = parseDate('01-01-2024');
        expect(date.getHours()).toBe(0);
        expect(date.getMinutes()).toBe(0);
    });

    it('deve lidar com datas no início do ano', () => {
        const date = parseDate('01-01-2024 00:00:00');
        expect(date.getFullYear()).toBe(2024);
        expect(date.getMonth()).toBe(0);
        expect(date.getDate()).toBe(1);
    });
});

// #endregion

// #region isSameDay

describe('isSameDay', () => {
    it('deve retornar true para dois Date no mesmo dia', () => {
        const a = new Date(2025, 3, 25, 10, 0);
        const b = new Date(2025, 3, 25, 22, 59);
        expect(isSameDay(a, b)).toBe(true);
    });

    it('deve retornar false para datas em dias diferentes', () => {
        const a = new Date(2025, 3, 25);
        const b = new Date(2025, 3, 26);
        expect(isSameDay(a, b)).toBe(false);
    });

    it('deve retornar false para mesmo dia mas mês diferente', () => {
        const a = new Date(2025, 3, 25);
        const b = new Date(2025, 4, 25);
        expect(isSameDay(a, b)).toBe(false);
    });

    it('deve retornar false para mesmo dia e mês mas ano diferente', () => {
        const a = new Date(2024, 3, 25);
        const b = new Date(2025, 3, 25);
        expect(isSameDay(a, b)).toBe(false);
    });
});

// #endregion

// #region getWeekStart

describe('getWeekStart', () => {
    it('deve retornar o domingo da semana para uma quinta-feira', () => {
        const thursday = new Date(2025, 3, 24); // quinta 24/04/2025
        const weekStart = getWeekStart(thursday);
        expect(weekStart.getDay()).toBe(0); // domingo
        expect(weekStart.getDate()).toBe(20);
    });

    it('deve retornar o próprio dia quando for domingo', () => {
        const sunday = new Date(2025, 3, 20); // domingo 20/04/2025
        const weekStart = getWeekStart(sunday);
        expect(weekStart.getDay()).toBe(0);
        expect(weekStart.getDate()).toBe(20);
    });

    it('deve zerar o horário (00:00:00)', () => {
        const date = new Date(2025, 3, 24, 15, 30, 45);
        const weekStart = getWeekStart(date);
        expect(weekStart.getHours()).toBe(0);
        expect(weekStart.getMinutes()).toBe(0);
        expect(weekStart.getSeconds()).toBe(0);
    });

    it('não deve mutar o Date original', () => {
        const date = new Date(2025, 3, 24, 15, 30);
        const original = date.getTime();
        getWeekStart(date);
        expect(date.getTime()).toBe(original);
    });
});

// #endregion

// #region formatTime

describe('formatTime', () => {
    it('deve formatar horas e minutos com zero à esquerda', () => {
        expect(formatTime(new Date(2025, 3, 25, 9, 5))).toBe('09:05');
    });

    it('deve formatar sem zero à esquerda quando dígito é duplo', () => {
        expect(formatTime(new Date(2025, 3, 25, 14, 30))).toBe('14:30');
    });

    it('deve formatar meia-noite corretamente', () => {
        expect(formatTime(new Date(2025, 3, 25, 0, 0))).toBe('00:00');
    });
});

// #endregion

// #region getStagePresentation

describe('getStagePresentation', () => {
    const stages: StageEnum[] = ['OPENED', 'CONCLUDED', 'CANCELLED', 'RESCHEDULED', 'ABSENT'];

    it.each(stages)('deve retornar apresentação correta para stage %s', (stage) => {
        const result = getStagePresentation(stage);
        expect(result).toEqual(STAGE_MAP[stage]);
        expect(result.color).toBeTruthy();
        expect(result.ptStage).toBeTruthy();
    });

    it('deve retornar o fallback amarelo para stage desconhecido', () => {
        const result = getStagePresentation('UNKNOWN_STAGE');
        expect(result.color).toBe('yellow');
        expect(result.ptStage).toBe('Status não catalogado');
    });
});

// #endregion

// #region getTypePresentation

describe('getTypePresentation', () => {
    const types: AttendanceTypeEnum[] = ['PRESENTIAL', 'REMOTE'];

    it.each(types)('deve retornar apresentação correta para tipo %s', (type) => {
        const result = getTypePresentation(type);
        expect(result).toEqual(TYPE_MAP[type]);
        expect(result.color).toBeTruthy();
        expect(result.ptType).toBeTruthy();
        expect(result.icon).toBeTruthy();
    });

    it('deve retornar o fallback presencial para tipo desconhecido', () => {
        const result = getTypePresentation('UNKNOWN_TYPE');
        expect(result.ptType).toBe('PRESENCIAL');
    });

    it('deve retornar o fallback presencial para undefined', () => {
        const result = getTypePresentation(undefined);
        expect(result.ptType).toBe('PRESENCIAL');
    });
});

// #endregion

// #region Constantes

describe('Constantes de calendário', () => {
    it('WEEKDAYS deve ter 7 dias', () => {
        expect(WEEKDAYS).toHaveLength(7);
    });

    it('MONTHS deve ter 12 meses', () => {
        expect(MONTHS).toHaveLength(12);
    });

    it('MONTHS_SHORT deve ter 12 meses abreviados', () => {
        expect(MONTHS_SHORT).toHaveLength(12);
    });

    it('MONTHS deve começar com Janeiro e terminar com Dezembro', () => {
        expect(MONTHS[0]).toBe('Janeiro');
        expect(MONTHS[11]).toBe('Dezembro');
    });
});

// #endregion
