import { describe, it, expect } from 'vitest';
import ScheduleFactory from '@/util/ScheduleFactory';

// #region ScheduleFactory

describe('ScheduleFactory', () => {
    const baseForm = {
        dateStart: '2025-04-25T14:30',
        dateEnd: '2025-04-25T15:30',
    };

    it('deve gerar payload com patientId, dateStart e dateEnd formatados', () => {
        const payload = ScheduleFactory(baseForm, 'patient-123');
        expect(payload.patientId).toBe('patient-123');
        expect(payload.dateStart).toBe('25-04-2025 14:30:00');
        expect(payload.dateEnd).toBe('25-04-2025 15:30:00');
    });

    it('deve omitir dateEnd do payload quando não informado', () => {
        const payload = ScheduleFactory({ dateStart: '2025-04-25T14:30' }, 'patient-123');
        expect(payload.dateEnd).toBeUndefined();
    });

    it('deve omitir dateEnd do payload quando string vazia', () => {
        const payload = ScheduleFactory({ dateStart: '2025-04-25T14:30', dateEnd: '' }, 'patient-123');
        expect(payload.dateEnd).toBeUndefined();
    });

    it('deve incluir type no payload quando informado', () => {
        const payload = ScheduleFactory({ ...baseForm, type: 'REMOTE' }, 'patient-123');
        expect(payload.type).toBe('REMOTE');
    });

    it('deve incluir sessionValue convertido para number quando informado', () => {
        const payload = ScheduleFactory({ ...baseForm, sessionValue: '150' }, 'patient-123');
        expect(payload.sessionValue).toBe(150);
    });

    it('deve omitir sessionValue quando não informado', () => {
        const payload = ScheduleFactory(baseForm, 'patient-123');
        expect(payload.sessionValue).toBeUndefined();
    });

    it('patientId do argumento deve ter precedência sobre formData.patientId', () => {
        const payload = ScheduleFactory({ ...baseForm, patientId: 'ignored-id' }, 'real-patient-id');
        expect(payload.patientId).toBe('real-patient-id');
    });

    it('não deve mutar o formData original', () => {
        const form = { dateStart: '2025-04-25T14:30', dateEnd: '2025-04-25T15:30' };
        ScheduleFactory(form, 'patient-123');
        expect(form.dateStart).toBe('2025-04-25T14:30');
        expect(form.dateEnd).toBe('2025-04-25T15:30');
    });
});

// #endregion
