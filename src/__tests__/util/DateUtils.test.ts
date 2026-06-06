import { describe, it, expect } from 'vitest';
import {
    reverseDate,
    formatDate,
    normalizeDates,
    getFormatedDateToSchedule,
    getFormatedWeekDay,
    getFormatedHour,
    changeScore,
} from '@/util/DateUtils';

// #region reverseDate

describe('reverseDate', () => {
    it('deve inverter uma data no formato dd-MM-yyyy para yyyy-MM-dd', () => {
        expect(reverseDate('25-04-2025')).toBe('2025-04-25');
    });

    it('deve inverter uma data no formato yyyy-MM-dd para dd-MM-yyyy', () => {
        expect(reverseDate('2025-04-25')).toBe('25-04-2025');
    });

    it('deve lidar com dia e mês de um dígito', () => {
        expect(reverseDate('01-01-2024')).toBe('2024-01-01');
    });
});

// #endregion

// #region formatDate

describe('formatDate', () => {
    it('deve converter de yyyy-MM-ddTHH:mm:ss para dd-MM-yyyy HH:mm:ss', () => {
        expect(formatDate('2025-04-25T14:30:00')).toBe('25-04-2025 14:30:00');
    });

    it('deve retornar undefined quando recebe null', () => {
        expect(formatDate(null)).toBeUndefined();
    });

    it('deve retornar undefined quando recebe undefined', () => {
        expect(formatDate(undefined)).toBeUndefined();
    });

    it('deve converter corretamente com segundos zerados', () => {
        expect(formatDate('2024-01-01T00:00:00')).toBe('01-01-2024 00:00:00');
    });
});

// #endregion

// #region normalizeDates

describe('normalizeDates', () => {
    it('deve formatar dateStart e dateEnd com :00 concatenado', () => {
        const result = normalizeDates('2025-04-25T14:30', '2025-04-25T15:00');
        expect(result.dateStart).toBe('25-04-2025 14:30:00');
        expect(result.dateEnd).toBe('25-04-2025 15:00:00');
    });

    it('deve retornar dateEnd null quando recebe string vazia', () => {
        const result = normalizeDates('2025-04-25T14:30', '');
        expect(result.dateEnd).toBeNull();
    });

    it('deve retornar dateEnd null quando recebe null', () => {
        const result = normalizeDates('2025-04-25T14:30', null);
        expect(result.dateEnd).toBeNull();
    });

    it('deve retornar dateEnd null quando recebe undefined', () => {
        const result = normalizeDates('2025-04-25T14:30', undefined);
        expect(result.dateEnd).toBeNull();
    });

    it('não deve mutar os argumentos originais', () => {
        const start = '2025-04-25T14:30';
        const end = '2025-04-25T15:00';
        normalizeDates(start, end);
        expect(start).toBe('2025-04-25T14:30');
        expect(end).toBe('2025-04-25T15:00');
    });
});

// #endregion

// #region getFormatedDateToSchedule

describe('getFormatedDateToSchedule', () => {
    it('deve retornar data por extenso com hora no formato "25 de abril de 2025 às 14:30:00"', () => {
        const result = getFormatedDateToSchedule('25-04-2025 14:30:00');
        expect(result).toContain('2025');
        expect(result).toContain('14:30:00');
        expect(result).toContain('às');
    });
});

// #endregion

// #region getFormatedWeekDay

describe('getFormatedWeekDay', () => {
    it('deve retornar o dia da semana em português', () => {
        // 25-04-2025 é uma sexta-feira
        const result = getFormatedWeekDay('25-04-2025 00:00:00');
        expect(result.toLowerCase()).toMatch(/sexta/);
    });
});

// #endregion

// #region getFormatedHour

describe('getFormatedHour', () => {
    it('deve retornar hora formatada sem minutos quando minuto é 0', () => {
        const result = getFormatedHour('25-04-2025 14:00:00');
        expect(result).toBe('14h');
    });

    it('deve retornar hora formatada com minutos quando minuto é diferente de 0', () => {
        const result = getFormatedHour('25-04-2025 14:30:00');
        expect(result).toBe('14h30');
    });
});

// #endregion

// #region changeScore

describe('changeScore', () => {
    it('deve retornar data no formato localizado pt-BR', () => {
        const result = changeScore('25-04-2025 00:00:00');
        expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
});

// #endregion
