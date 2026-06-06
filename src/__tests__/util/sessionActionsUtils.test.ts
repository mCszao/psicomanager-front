import { describe, it, expect } from 'vitest';
import { formatClosedDate } from '@/util/sessionActionsUtils';
import { MONTHS } from '@/util/calendarUtils';

// #region formatClosedDate

describe('formatClosedDate', () => {
    it('deve formatar data no padrão "D de Mês de YYYY às HH:MM"', () => {
        const result = formatClosedDate('25-04-2025 14:30:00');
        expect(result).toBe(`25 de ${MONTHS[3]} de 2025 às 14:30`);
    });

    it('deve formatar data em janeiro corretamente', () => {
        const result = formatClosedDate('01-01-2024 09:00:00');
        expect(result).toBe(`1 de ${MONTHS[0]} de 2024 às 09:00`);
    });

    it('deve formatar data em dezembro corretamente', () => {
        const result = formatClosedDate('31-12-2024 23:59:00');
        expect(result).toBe(`31 de ${MONTHS[11]} de 2024 às 23:59`);
    });

    it('deve formatar horário com zero à esquerda nos minutos', () => {
        const result = formatClosedDate('10-06-2025 08:05:00');
        expect(result).toContain('08:05');
    });
});

// #endregion
